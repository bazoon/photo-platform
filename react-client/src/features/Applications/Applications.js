import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet} from "../../core/api";
import {Button} from "primereact/button";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import {get, nth, map, compose, keys} from "lodash/fp";
import { Form, Field } from "react-final-form";
import ProfileMenu from "../ProfileMenu";
import {inspect} from "@xstate/inspect";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import daggy from "daggy";
import identity from "crocks/combinators/identity";
import cn from "classnames";
import {make as ApplicationInfo} from "./ApplicationInfo.bs";




const renderRequiredAsterix = (isRequired, fieldName) => isRequired(fieldName) && <sup>*</sup> || null;
const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place"]);
const UploadImage = daggy.taggedSum("UploadImage", {
  Draft: ["file"],
  Uploaded: ["photowork"]
});

const Section = daggy.tagged("Section", ["id", "name", "maxCountImg", "images"]);

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
            <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-2 m-auto w-3/5 text-base items-baseline">
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

const validateImageForm = () => {

};


const ImageForm = ({onSubmit, image}) => {
  const [imageFields, setImageFields] = useState([]);
  const {t} = useTranslation("namespace1");
  const required = new Set([]);


  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{t(meta.error)}</small>;
  };

  const loadFieldsFailed = () => {

  };

  const loadFieldsOk = ({properties}) => {
    setImageFields(properties);
    console.log(properties.map(f => f.name));
  };

  const loadFields = () => {
    asyncGet("api/applications/imageForm/meta").fork(loadFieldsFailed, loadFieldsOk);
  };
  
  const handleRemove = () => {

  };

  const imageInfo = image && image.cata({
    Draft: file => file,
    Uploaded: photowork => photowork
  });

  console.log(imageInfo);

  useEffect(() => {
    loadFields();
  }, []);

  return (
    <Form
      validate={validateImageForm}
      className="overflow-y-auto max-h-96"
      onSubmit={onSubmit}
      initialValues={imageInfo}
      render={({ handleSubmit }) => (
        <div>
          {
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-5">  
                {
                  imageFields.map(({name, title, type}) => {
                    return (
                      <Field name={name} key={name} render={({ input, meta }) => (
                        <>
                          <label className="text-tiny place-self-end mr-5 mb-5">
                            {title} 
                            {renderRequiredAsterix(name => required.has(name), name)}
                          </label>
                          <div className="w-full relative col-span-4 mb-5">
                            <input name={name} type={type} {...input} className="text-bright w-full text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright" />
                            <div className="absolute">
                              {getFormErrorMessage(meta)}
                            </div>
                          </div>
                        </>
                      )}/>
                    );
                  })
                }
              </div>

              { 
                <div className="flex justify-center">
                  <Button className="uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5 mr-10" onClick={handleSubmit}>Сохранить</Button>
                  <Button className="uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5" onClick={handleRemove}>Удалить</Button>
                </div>
              }
            </form>
          }
        </div>
      )}/>
  );


};


const Images = ({images, className, onSelect}) => {
  const count = images.length;
  const [selectedImage, setSelectedImage] = useState();
  
  const selectImage = image => {
    setSelectedImage(image);
    onSelect(image);
  }; 

  return (
    <div className={`flex gap-5 overflow-x-auto h-64 p-5 overflow-y-hidden hidden-scroll ${className}`}>
      {
        images.map(image => {
          const cls = cn("object-cover w-full h-full", {"border-brown-light2 border-2 border-dotted": image === selectedImage });
          const src = image.cata({
            Draft: file => URL.createObjectURL(file),
            Uploaded: photowork => photowork.filename
          });
          const key = image.cata({
            Draft: file => file.name,
            Uploaded: photowork => photowork.id
          });
          return <div onClick={() => selectImage(image)} className="w-52 h-52 cursor-pointer flex-shrink-0 flex-grow-0" key={key}><img src={src} className={cls}/></div>;
        })
      }
    </div>
  );
};

const UploadButton = ({onChooseFiles, className}) => {
  const fileRef = useRef();
  
  const handleChooseFiles = files => {
    onChooseFiles(files);
  };
  
  return (
    <div className={className}>
      <div className="mb-5">
        <input type="file" ref={fileRef} className="hidden" multiple onChange={({target}) => handleChooseFiles(target.files) }/>
        <Button className=" uppercase max-w-md" onClick={() => fileRef.current.click() }>Загрузить</Button>
      </div>
    </div>
  );
};

const SectionSelector = ({sections = [], t, onLoadSection}) => {
  const count = sections.length;
  const [current, setCurrent] = useState(0);
  const section = nth(current, sections);
  const left = () => current > 0 && setCurrent(c => (c - 1) % count);
  const right = () => current < sections.length && setCurrent(c => (c + 1) % count);
  const [, setImages] = useState();
  const [selectedImage, setSelectedImage] = useState();


  console.assert(Section.is(section), "Not a section!", section);

  useEffect(() => {
    onLoadSection(section.id);
  }, [current]);

  
  const chooseFiles = files => {
    setCurrent(current => {
      setImages(files);
      return current;
    });
  };

  const handleSelect = image => {
    setSelectedImage(image);
  };

  return (
    <div>
      <div className="flex justify-center text-base relative">
        <div className="flex items-center">
          <i className="pi-angle-left pi text-xl absolute left-44 cursor-pointer" onClick={left}/>
          <span>{section?.name}</span>
          <i className="pi-angle-right pi text-xl absolute right-44 cursor-pointer" onClick={right}/>
          <div className="right-20 absolute flex flex-col justify-center">
            <div className="uppercase text-lg text-brown-light2">{section?.maxCountImg}</div>
            <div className="text-sm">{t("limit-photo")}</div>
          </div>
        </div>
      </div>
      <div className="m-auto w-2/5 mb-5 text-center" >{t("chooseCategory")}</div>

      <Images className="mb-5" onSelect={handleSelect} images={section?.images || []}/>

      <UploadButton className="m-auto w-min text-lg" onChooseFiles={chooseFiles}>{t("chooseFile")}</UploadButton>
      <ImageForm onSubmit={identity} image={selectedImage}/>
    </div>
  );
};

const UploadDialog = ({visible, onHide, header, sections, t, onLoadSection}) => {
  return (
    <Dialog visible={visible} className="bg-brown-light3 w-3/5 text-bright" contentClassName="bg-brown-light3 text-bright" onHide={onHide}>
      <div className="text-lg uppercase text-center mb-4">{header}</div>
      
      <div className="mb-8">
        <SectionSelector sections={sections} t={t} onLoadSection={onLoadSection}/>
      </div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod ligula odio, at blandit orci facilisis in. Nam mollis odio a aliquam fringilla. Maecenas lacinia, ante quis facilisis tincidunt, libero felis laoreet est, a interdum magna justo sit amet libero. Sed purus justo, pellentesque eu lacus sit amet, iaculis dignissim felis. Curabitur euismod interdum turpis, id venenatis justo accumsan sit amet. Nulla scelerisque lectus vel justo venenatis, dictum pharetra tellus maximus. Praesent dui eros, rutrum in sapien non, luctus sollicitudin dolor. Morbi et ipsum lobortis, imperdiet orci maximus, fermentum turpis. Morbi dapibus convallis auctor. Aliquam dictum pretium varius. Cras est eros, mattis dapibus interdum quis, tempus quis odio. Praesent maximus lorem sed sem luctus porttitor at ac tellus. Mauris quis fermentum felis, lobortis placerat nibh. Sed pulvinar, quam auctor tempor commodo, turpis felis dictum neque, et gravida nunc diam eget turpis. Vestibulum et purus eget erat facilisis porta quis ut felis. Donec facilisis orci vel lectus consectetur, eget bibendum nisi suscipit.

    </Dialog>
  );
};

const renderFile = file => {
  return <div className="m-0 w-60 h-60"><img key={file.name} className="w-full h-full object-cover" src={URL.createObjectURL(file)}/></div>;
};


const validateForm = () => {
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
  getSections: () => asyncGet("api/sections").toPromise(),
  loadImages: (_, {id}) => asyncGet(`api/sections/${id}/images`).map(images => ({ images: map(compose(UploadImage.Uploaded, Photowork.from), images), id})).toPromise(),
};


export default function Main() {
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const [sectionsCurrent, sendToSection]= useMachine(SectionsMachine({context: { sections: []}, services: sectionsService}), {devTools: true});
  const {context} = current;
  const sections = map(compose(Section.from, e => ({...e, images: e.images || []})), sectionsCurrent.context.sections);
  const {isApproved, applicationMessage} = context;
  const { i18n } = useTranslation("namespace1");
  const [contestName, setContestName] = useState("");
  const dateReg = get("application.dateReg", context);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [aboutText, setAboutText] = useState("");


  useEffect(() => {
    send("load", {});
    sendToSection("load");
  }, []);

  
  const handleApply = data => {
    send("apply", {data});
  };


  
  const loadContestInfoFailed = () => {

  };

  const loadContestInfoOk = ({name}) => {
    setContestName(name);
  };

  const loadContestInfo = () => {
    asyncGet(`api/mainPage/${i18n.language}`).fork(loadContestInfoFailed, loadContestInfoOk);
  };

    const loadAboutFailed = () => {

    };

    const loadAboutOk = ({content}) => {
      setAboutText(content);
    };

    const loadAbout = () => {
      asyncGet(`api/salones/about/${i18n.language}`).fork(loadAboutFailed, loadAboutOk);
    };
  


  useEffect(() => {
    loadContestInfo();
    loadAbout();
  }, []);
  
  const handleHideUpload = () => {
    setIsUploadVisible(false);
  };
  
  const openUpload = () => {
    console.log("openUpload");
    setIsUploadVisible(true);
  };

  const loadSection = id => {
    sendToSection("loadImages", {id});
  };

// /api/salones/about

  const About = () => {
    return (
      <div className="m-auto w-3/5 text-base items-baseline" dangerouslySetInnerHTML={{__html: aboutText}}/>
    );
  };

  return (
    
      <div className="container flex bg-brown-dark2 text-bright" style={{minHeight: "calc(100vh - 21rem)"}}> 
        <div className="relative flex justify-center w-full">
          <div className="flex-1">
            <div className="uppercase text-lg pt-24 mb-24 text-bright font-header text-center">{t("myApplications")}</div>
            
            <ApplicationInfo
              contestName={contestName}
              status={applicationMessage}
              dateReg={dateReg}
              canUpload={isApproved}
              openUpload={openUpload}
            />


              {
                current.value !== "hasApplication" && <ApplyForm onSubmit={handleApply} sections={sections} />
              }
              {
                isApproved && <UploadDialog onLoadSection={loadSection} header={contestName} visible={isUploadVisible} onHide={handleHideUpload} sections={sections} t={t}/> 
              }
              <div className="mb-10"/>
              <About />
            
          </div>
          <ProfileMenu/>
        </div>
      </div>

  );
}
