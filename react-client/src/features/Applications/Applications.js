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
import { MultiSelect } from "primereact/multiselect";

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
 
  useEffect(() => {
    send("load", {});
    sendToSection("load");
  }, []);

  const renderFile = file => {
    return <img key={file.name} className="w-40" src={URL.createObjectURL(file)}/>;
  };

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
  
  const onSubmit = data => {
    send("apply", {data});
  };

  const handleChooseFiles = (files, onChange) => {
    const f = Array.from(files);
    send("choose", {files: f});
    onChange(f);
  };

  const apply = (e, data) => {
    e.preventDefault();
  };
  
  console.log(current.value);

  return (
    <div className="container flex bg-brown-dark2 text-bright" style={{minHeight: "calc(100vh - 21rem)"}}> 
      <div className="relative flex justify-center w-full">
        <div className="flex-1">
          <div className="uppercase text-lg pt-24 mb-24 text-bright font-header text-center">Мои заявки</div>
          {
            <div className="text-center mb-24">
              { applicationMessage && <Message text={applicationMessage}/> }
            </div>
          }
          {
            keys(photoworks).map(s => renderSection(s, photoworks[s]))
          }

          <Form
            validate={validateForm}
            className="overflow-y-auto max-h-96"
            onSubmit={onSubmit}
            initialValues={{files: [], sections: null}}
            render={({ handleSubmit }) => (
              <div>
                {message && <Message text={message} />}

                {
                  current.value === "noApplication" && (

                    <form className="p-10" onSubmit={handleSubmit}>
                      <div className="flex justify-center w-3/5">
                        <Sections className="flex-1 mr-10" sections={sections}/>
                        <div>
                          { 
                            !(isApproved === true) && <Button disabled={isApproved === false} className="uppercase flex-1" onClick={handleSubmit}>Подать заявку</Button>
                          }
                        </div>
                      </div>
                      <Field name="files">
                        {({ input }) => (
                          <input type="file" className="hidden" multiple onChange={({target}) => handleChooseFiles(target.files, files => input.onChange(files)) }/>
                        )}
                      </Field>
        
                      <div className="flex justify-center mb-16">
                        {
                          isApproved && <Button className="uppercase" onClick={() => send("open") }>Загрузить</Button>
                        }
                      </div>

                    </form>

                  )
                }

                <div>
                  {files.map(renderFile)}
                </div>
              </div>
            )}/>
        </div>

        <ProfileMenu/>
      </div>
    </div>
  );

}
