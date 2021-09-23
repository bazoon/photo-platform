import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet, asyncPut} from "../../core/api";
import {Button} from "primereact/button";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import {get, nth, map, compose, keys, curry, isEmpty} from "lodash/fp";
import { Form, Field } from "react-final-form";
import ProfileMenu from "../ProfileMenu";
import {inspect} from "@xstate/inspect";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from "primereact/dialog";
import daggy from "daggy";
import identity from "crocks/combinators/identity";
import cn from "classnames";
import {make as ApplicationInfo} from "./ApplicationInfo.bs";
import AutoSaveImageForm from "./AutoSaveImageForm";
import {over, findLens, pathLens} from "lodash-lens";

const renderRequiredAsterix = (isRequired, fieldName) => isRequired(fieldName) && <sup>*</sup> || null;
const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place", "description"]);

const UploadImage = daggy.taggedSum("UploadImage", {
  Some: ["photowork", "file"],
  Empty: []
});

const Section = daggy.taggedSum("Section", {
  Filled: ["id", "name", "maxCountImg", "images"],
  None: []
});


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


const ImageForm = ({image, sectionId, onSubmit, onChange}) => {
  const [imageFields, setImageFields] = useState([]);
  const {t} = useTranslation("namespace1");
  const [required, setRequired] = useState([]);


  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{t(meta.error)}</small>;
  };

  const loadFieldsFailed = () => {

  };

  const loadFieldsOk = ({properties, required}) => {
    setImageFields(properties);
    setRequired(required);
  };

  const loadFields = () => {
    asyncGet("api/applications/imageForm/meta").fork(loadFieldsFailed, loadFieldsOk);
  };
  
  const handleRemove = () => {

  };

  const saveImageInfo = async (uploadImage) => {
    if (!isEmpty(uploadImage)) {
      onChange(uploadImage);
    }
  };

  useEffect(() => {
    loadFields();
  }, []);

  return (
    <Form
      validate={validateImageForm}
      className="overflow-y-auto max-h-96"
      onSubmit={onSubmit}
      initialValues={image}
      render={({ handleSubmit }) => (
        <div>
        <AutoSaveImageForm debounce={1000} onSave={saveImageInfo}/>
          {
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-5">  
                <Field name="id" render={() => <input type="hidden"/>}/>
                {
                  imageFields.map(({name, title, type}) => {
                    return (
                      <Field name={`photowork.${name}`} key={name} render={({ input, meta }) => (
                        <>
                          <label className="text-tiny place-self-end mr-5 mb-5">
                            {title} 
                            {renderRequiredAsterix(name => required.includes(name), name)}
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

const Images = ({images, className, onSelect, selectedImage}) => {
  const selectImage = image => {
    onSelect(image);
  }; 

  return (
    <div className={`flex gap-5 overflow-x-auto h-64 p-5 overflow-y-hidden hidden-scroll ${className}`}>
      {
        images.map(image => {

          const cls = cn("object-cover w-full h-full", {
            "border-brown-light2 border-2 border-dotted": image === selectedImage,
            "opacity-30": !Number.isInteger(image?.photowork?.id)
          });

          const src = image.cata({
            Some: (photowork, file) => file?.name ? URL.createObjectURL(file) : photowork.filename,
            Empty: () => ""
          });
          const key = image.cata({
            Some: photowork => photowork.id,
            Empty: () => "empty"
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

const SectionSelector = ({t, onLoadSection}) => {
  const [current, send]= useMachine(SectionsMachine({context: { sections: []}, services: sectionsService}), {devTools: true});
  const {sections} = current.context;
  const count = sections.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const section = nth(currentIdx, sections) || Section.None;
  const left = () => current > 0 && setCurrentIdx(c => (c - 1) % count);
  const right = () => current < sections.length && setCurrentIdx(c => (c + 1) % count);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const loadSection = id => {
    send("loadImages", {id});
  };

  useEffect(() => {
    send("load");
  }, []);

  useEffect(() => {
    if (Section.Filled.is(section))
      onLoadSection(section.id);
  }, [current]);

  useEffect(() => {
    if (Section.Filled.is(section)) {
      loadSection(section.id);
      setSelectedImageIdx(0);
    }
  }, [section?.id]);

  const selectedImage = Section.Filled.is(section) ? section?.images[selectedImageIdx] : UploadImage.Empty;
  
  const chooseFiles = files => {
    send("addImages", { files: Array.from(files), id: section.id });
  };

  const handleSelect = image => {
    if (Section.Filled.is(section)) {
      setSelectedImageIdx(section.images.indexOf(image));
    }
  };

  const changeImageInfo = uploadImage => {
    send("updateImage", {uploadImage, id: section.id});
  };

  const handleSubmit = ({file, photowork}) => {
    const saveFailed = () => {
      console.info("ERR");
    };

    const saveOk = ({id}) => {
      const uploadImage = 
        UploadImage.Some.from({
          photowork: Photowork.from({...photowork, id}), file });
      send("replaceImage", {uploadImage, sectionId: section?.id, oldImageId: photowork.id });
    };

    const payload = new FormData();

    if (file instanceof File) {
      payload.append("file", file);
    }

    keys(photowork).forEach(k => {
      payload.append(k, photowork[k]);
    });

    asyncPut(`api/sections/${section.id}/images`, payload, false).fork(saveFailed, saveOk);
  };


  if (Section.None.is(section)) return <div>Loading...</div>;

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

      <Images className="mb-5" onSelect={handleSelect} selectedImage={selectedImage} images={section?.images || []}/>
      <UploadButton className="m-auto w-min text-lg" onChooseFiles={chooseFiles}>{t("chooseFile")}</UploadButton>
      <ImageForm onSubmit={handleSubmit} onChange={changeImageInfo} image={selectedImage} sectionId={section?.id}/>
    </div>
  );
};

const UploadDialog = ({visible, onHide, header, t, onLoadSection = identity}) => {
  return (
    <Dialog visible={visible} className="bg-brown-light3 w-3/5 text-bright" contentClassName="bg-brown-light3 text-bright" onHide={onHide}>
      <div className="text-lg uppercase text-center mb-4">{header}</div>
      
      <div className="mb-8">
        <SectionSelector t={t} onLoadSection={onLoadSection}/>
      </div>
    </Dialog>
  );
};



const validateForm = () => {
  // return keys(data).reduce((a, e) => data[e] ? a : {...a, [e]: "Это поле обязательно для заполнения !"}, {});
  return {};
};

const Sections = ({className}) => {
  const [current, send]= useMachine(SectionsMachine({context: { sections: []}, services: sectionsService}), {devTools: true});
  const {sections} = current.context;
  const options = sections.map(s => ({label: s.name, value: s.id}));
  useEffect(() => {
    send("load");
  }, []);

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

//  
const addFilesToSection = files => section => {
  const emptyPhotowork = {id: Math.random(), name: "", filename: "", year: "", place: "", description: ""};
  const filesToDrafts = files => files.map(f => UploadImage.Some.from({file: f, photowork: Photowork.from(emptyPhotowork)}));
  const filled = {...section, images: section.images.concat(filesToDrafts(files)) };
  return Section.Filled.from(filled); 
};

const upateImageInSection = uploadImage => sections => id => {
  if (UploadImage.Empty.is(uploadImage)) return sections;

  const findImageInSections = compose(
    findLens({id}),
    pathLens("images"), 
    findLens(image => image.photowork.id === uploadImage.photowork.id),
  );

  return over(findImageInSections, _ => UploadImage.Some.from(uploadImage), sections).map(e => Section.Filled.from(e));
};


const replaceImageInSection = uploadImage => sections => (sectionId, oldImageId) => {
  if (UploadImage.Empty.is(uploadImage)) return sections;

  const findImageInSections = compose(
    findLens({id: sectionId}),
    pathLens("images"), 
    findLens(image => image.photowork.id === oldImageId)
  );

  return over(findImageInSections, _ => UploadImage.Some.from(uploadImage), sections).map(e => Section.Filled.from(e));
};

const sectionsService = {
  getSections: () => asyncGet("api/sections").map(map(Section.Filled.from)).toPromise(),
  loadImages: (_, {id}) => asyncGet(`api/sections/${id}/images`).map(images => ({ images: map(compose(p => UploadImage.Some.from({photowork: p, file: null}), Photowork.from), images), id})).toPromise(),
  mapSections: ({sections, images}) => sections.map(section => {
    return Section.Filled.from({...section, images}); 
  }),
  addFilesToSection: ({sections, files, id}) => over(findLens({id}), addFilesToSection(files), sections),
  updateImage: ({sections}, {uploadImage, id}) => upateImageInSection(uploadImage)(sections)(id),
  replaceImage: ({sections}, {uploadImage, sectionId, oldImageId}) => replaceImageInSection(uploadImage)(sections)(sectionId, oldImageId) 
};

export default function Main() {
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const {context} = current;
  const {isApproved, applicationMessage} = context;
  const { i18n } = useTranslation("namespace1");
  const [contestName, setContestName] = useState("");
  const dateReg = get("application.dateReg", context);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [aboutText, setAboutText] = useState("");
  console.info(context);

  useEffect(() => {
    send("load");
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
    setIsUploadVisible(true);
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
                current.value !== "hasApplication" && <ApplyForm onSubmit={handleApply} />
              }
              {
                isApproved && <UploadDialog header={contestName} visible={isUploadVisible} onHide={handleHideUpload} t={t}/> 
              }
              <div className="mb-10"/>
              <About />
            
          </div>
          <ProfileMenu/>
        </div>
      </div>

  );
}
