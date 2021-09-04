import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet} from "../../core/api";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {Message} from "primereact/message";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import { Dropdown } from "primereact/dropdown";
import {keys} from "lodash/fp";
import { Form, Field } from "react-final-form";
import ProfileMenu from "../ProfileMenu";

const initialContext = {
  isOpen: false,
  files: [],
  applications: [],
  message: "",
  applicationMessage: "",
  photoworks: {}
};


//TODO here!
const UploadModal = ({visible, footer, onHide, children, header}) => {
  return (
    <Dialog
      header={header}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
      footer={footer}
    >
      {children}
    </Dialog>
  );
};


const validateForm = data => {
  return keys(data).reduce((a, e) => data[e] ? a : {...a, [e]: "Это поле обязательно для заполнения !"}, {});
};


const failed = (state, callback) => data => {
  callback({type: state, ...data});
};

const ok = ({state, callback, failedState, params = {}}) => data => {
  if (data.success === false) {
    callback({type: failedState, ...data, ...params});
  } else {
    callback({type: state, data});
  }
};

const api = "applications";
const apiParams = "";
const sectionsService = {
  getSections: () => callback => asyncGet("api/sections")
    .fork(failed("loadingFailed", callback), ok({state: "loadingOk", callback, failedState: "loadingFailed"}))
};

const mapForDropdown = (idField, nameField) => items => items.map(item => ({value: item[idField], label: item[nameField] }));
const mapSections = mapForDropdown("id", "name");

export default function Main() {
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const [sectionsCurrent, sendToSection]= useMachine(SectionsMachine({context: { data: []}, services: sectionsService}), {devTools: true});
  const {context} = current;
  const sections = sectionsCurrent.context.data;
  const {isApproved, files, message, applicationMessage, sectionId, photoworks} = context;
 
  useEffect(() => {
    send("load", {});
    sendToSection("load");
  }, []);

  const renderFooter = (handleSubmit) => {
    return (
      <div>
        <Button label="cancel" icon="pi pi-times" onClick={() => send("close")} className="p-button-text" />
        <Button label="Ok" type="submit" icon="pi pi-check" onClick={handleSubmit} autoFocus />
      </div>
    );
  };

  const renderFile = file => {
    return <img key={file.name} className="w-40" src={URL.createObjectURL(file)}/>;
  };

  const renderSection = (title, photos) => {
    return (
      <>
        <div className="uppercase text-sm pt-24 mb-6 text-bright font-header text-center">{title}</div>
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 w-4/5 m-auto gap-10">
          {photos.map(p => <img className="w-full" key={p.src} src={p.src}/>)}
        </div>
      </>
    );  
  };

  const onSubmit = data => {
    console.log(data);
  };

  const handleChooseFiles = (files, onChange) => {
    const f = Array.from(files);
    send("choose", {files: f});
    onChange(f);
  };

  const apply = e => {
    e.preventDefault();
    send("apply");
  };



  return (
    <div className="container flex bg-brown-dark2 text-bright" style={{minHeight: "calc(100vh - 21rem)"}}> 
      <div className="relative flex justify-center w-4/5 wrap">
        <div className="uppercase text-lg pt-24 mb-24 text-bright font-header text-center">Мои заявки</div>
        {
          <div className="text-center mb-24">
            { applicationMessage && <Message text={applicationMessage}/> }
          </div>
        }
        <div className="flex justify-center mb-24">
          {
            !(isApproved === true) && <Button disabled={isApproved === false} className="uppercase mr-5" onClick={apply}>Подать заявку</Button>
          }
          {
            isApproved && <Button className="uppercase" onClick={() => send("open") }>Загрузить</Button>
          }
        </div>
        {
          keys(photoworks).map(s => renderSection(s, photoworks[s]))
        }


        <Form
          validate={validateForm}
          className="overflow-y-auto max-h-96"
          onSubmit={onSubmit}
          initialValues={{files: [], sectionId: null}}
          render={({ handleSubmit }) => (
            <UploadModal
              header={t("load_photo")}
              visible={current.value === "opened"}
              onHide={() => send("close")}
              message={message}
              sectionId={sectionId}
              footer={renderFooter(handleSubmit)}
              options={mapSections(sections)}
            >
              {message && <Message text={message} />}
              <form className="p-10 p-fluid" onSubmit={handleSubmit}>
                <div>{t("sectionName")}</div>
                <Field name="sectionId">
                  {({ input, meta }) => (
                    <div>
                      <Dropdown className="mb-5"  value={input.value} onChange={({value}) => input.onChange(value) } options={mapSections(sections)}/>
                      {input.value}
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )} 
                </Field>
                <Field name="files">
                  {({ input, meta }) => (
                    <input type="file" multiple onChange={({target}) => handleChooseFiles(target.files, files => input.onChange(files)) }/>
                  )}
                </Field>
              </form>
              <div>
                {files.map(renderFile)}
              </div>
            </UploadModal>
          )}/>
      </div>
      <ProfileMenu/>
    </div>
  );

}
