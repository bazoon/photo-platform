import React, {useEffect} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet} from "../../core/api";
import {Button} from "primereact/button";
import {Message} from "primereact/message";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import {keys} from "lodash/fp";
import { Form, Field } from "react-final-form";
import ProfileMenu from "../ProfileMenu";
import {inspect} from "@xstate/inspect";
import { Checkbox } from "primereact/checkbox";

// if (location.href.includes("foto.ru")) {
inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});
//}


const initialContext = {
  isOpen: false,
  files: [],
  applications: [],
  message: "",
  applicationMessage: "",
  photoworks: {}
};


//TODO here!

const validateForm = data => {
  return keys(data).reduce((a, e) => data[e] ? a : {...a, [e]: "Это поле обязательно для заполнения !"}, {});
};




const Section = section => (
  <Field type="checkbox" name={"id-" + section.id}>
    {({ input }) => (
      <div className="mb-10">
        <Checkbox {...input} className="mr-5"/>
        <label>{section.name}</label>
      </div>
    )}
  </Field>
);
const Sections = ({sections}) => (
  sections.map(Section)
);

const api = "applications";
const apiParams = "";
const sectionsService = {
  getSections: () => asyncGet("api/sections").toPromise()
};


export default function Main() {
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const [sectionsCurrent, sendToSection]= useMachine(SectionsMachine({context: { sections: []}, services: sectionsService}), {devTools: true});
  const {context} = current;
  const sections = sectionsCurrent.context.sections;
  const {isApproved, files, message, applicationMessage, photoworks} = context;
 
  useEffect(() => {
    send("load", {});
    sendToSection("load");
  }, []);

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
        <div className="flex justify-center mb-16">
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
            <div>
              {message && <Message text={message} />}
              <form className="p-10 p-fluid" onSubmit={handleSubmit}>
                <div className="flex justify-center flex-col">
                  <Sections sections={sections}/>
                </div>
                <Field name="files">
                  {({ input }) => (
                    <input type="file" className="hidden" multiple onChange={({target}) => handleChooseFiles(target.files, files => input.onChange(files)) }/>
                  )}
                </Field>
              </form>
              <div>
                {files.map(renderFile)}
              </div>
            </div>
          )}/>
      </div>
      <ProfileMenu/>
    </div>
  );

}
