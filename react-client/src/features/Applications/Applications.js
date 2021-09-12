import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet} from "../../core/api";
import {Button} from "primereact/button";
import {Message} from "primereact/message";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import {keys, get} from "lodash/fp";
import { Form, Field } from "react-final-form";
import ProfileMenu from "../ProfileMenu";
import {inspect} from "@xstate/inspect";
import { MultiSelect } from "primereact/multiselect";
import {constant} from "lodash";

if (location.href.includes("foto.ru")) {
  inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
  });
}

const initialContext = {
  isOpen: false,
  applications: [],
  message: "",
  applicationMessage: "",
  photoworks: {},
  payload: {},
  application: {}
};

const ApplyForm = ({onSubmit, sections}) => {
  return (
    <Form
      validate={validateForm}
      className="overflow-y-auto max-h-96"
      onSubmit={onSubmit}
      initialValues={{files: [], sections: null}}
      render={({ handleSubmit }) => (
        <div>
          {
            <form className="p-10" onSubmit={handleSubmit}>
              <div className="flex justify-center w-3/5">
                <Sections className="flex-1 mr-10" sections={sections}/>
                <div>
                  { 
                    <Button className="uppercase flex-1" onClick={handleSubmit}>Подать заявку</Button>
                  }
                </div>
              </div>

            </form>
          }
        </div>
      )}/>
  );
};

const UploadSection = ({section, onChooseFiles}) => {
  const [images, setImages] = useState([]);
  const fileRef = useRef();
  
  const handleChooseFiles = files => {
    setImages(Array.from(files));
    onChooseFiles(section, files);
  };
  
  return (
    <div>
      <div className="grid grid-cols-2 max-w-6xl gap-4 m-auto mb-5">
        <div className="text-tiny">{section.name}</div>
        <div>
          <input type="file" ref={fileRef} className="hidden" multiple onChange={({target}) => handleChooseFiles(target.files) }/>
          <Button className=" uppercase max-w-md" onClick={() => fileRef.current.click() }>Загрузить</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {renderImages(images)}
      </div>
    </div>
  );
};

const ImagesForm = ({onSubmit, onChooseFiles, sections}) => {
  return (
    <Form
      validate={validateForm}
      className="overflow-y-auto max-h-96"
      onSubmit={onSubmit}
      initialValues={{files: [], sections: []}}
      render={({ handleSubmit }) => (
        <>
          <div className="grid grid-cols-1 w-3/5 gap-4 m-auto">
            {
              sections.map(section => <UploadSection onChooseFiles={onChooseFiles} section={section} key={section.id}/>)
            }

            <div className='grid grid-cols-2 max-w-6xl gap-4 m-auto'>
              <div></div>
              <Button onClick={onSubmit}>Сохранить</Button>
            </div>
          </div>
        </>
      )}/>
  );
};

const renderFile = file => {
  return <div className="m-0 w-60 h-60"><img key={file.name} className="w-full h-full object-cover" src={URL.createObjectURL(file)}/></div>;
};

const renderImages = files => {
  return files.map(renderFile);
};

const validateForm = data => {
  // return keys(data).reduce((a, e) => data[e] ? a : {...a, [e]: "Это поле обязательно для заполнения !"}, {});
  return {};
};

const Sections = ({sections, className}) => {
  const options = sections.map(s => ({label: s.name, value: s.id}));
  return (
    <Field name='sections'>
      {({ input }) => (
        <MultiSelect optionLabel="label" display="chip" value={input.value} className={className} onChange={({value}) => input.onChange(value)} options={options}/>
      )}
    </Field>
  );
};

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
  const { i18n } = useTranslation("namespace1");
  const [contestName, setContestName] = useState("");
  const dateReg = get("application.dateReg", context);


  useEffect(() => {
    send("load", {});
    sendToSection("load");
  }, []);

  const renderSection = (title, photos) => {
    return (
      <React.Fragment key={title}>
        <div className="uppercase text-sm pt-24 mb-6 text-bright font-header text-center">{title}</div>
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 w-4/5 m-auto gap-10">
          {photos.map(p => <img className="w-full" key={p.src} src={p.src}/>)}
        </div>
      </React.Fragment>
    );  
  };
  
  const handleApply = data => {
    send("apply", {data});
  };

  const handleChooseFiles = (section, files) => {
    const f = Array.from(files);
    send("choose", {[section.id]: f});
  };

  const postImages = () => {
    send("submit");
  };
  
  const loadContestInfoFailed = () => {

  };

  const loadContestInfoOk = ({name}) => {
    setContestName(name);
  };

  const loadContestInfo = () => {
    asyncGet(`api/mainPage/${i18n.language}`).fork(loadContestInfoFailed, loadContestInfoOk);
  };

  useEffect(() => {
    loadContestInfo();
  }, []);
  

  return (
    <div className="container flex bg-brown-dark2 text-bright" style={{minHeight: "calc(100vh - 21rem)"}}> 
      <div className="relative flex justify-center w-full">
        <div className="flex-1">
          <div className="uppercase text-lg pt-24 mb-24 text-bright font-header text-center">Мои заявки</div>



          <div className="grid grid-cols-2 m-auto w-3/5 text-base items-baseline">

            <div>Текущий конкурс</div>
            <div className="uppercase text-lg text-brown-light2 font-header">{contestName}</div>

            <div>Статус</div>
            <div>{applicationMessage}</div>

            <div>Создана</div>
            <div>{dateReg && new Intl.DateTimeFormat("ru").format(new Date(dateReg))}</div>
          </div>

          {
            current.value !== "hasApplication" && <ApplyForm onSubmit={handleApply} sections={sections} />
          }
          {
            // isApproved && <ImagesForm onSubmit={postImages} onChooseFiles={handleChooseFiles} sections={sections} />
          }
          {
            // keys(photoworks).map(s => renderSection(s, photoworks[s]))
          }
        </div>
        <ProfileMenu/>
      </div>
    </div>
  );

}
