import React, {useEffect, useRef, useState} from "react";
import { useTranslation } from "react-i18next";
import {asyncGet, asyncPut, asyncDel} from "../../core/api";
import {Button} from "primereact/button";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";
import SectionsMachine from "./SectionsMachine";
import {get, nth, map, compose, keys, isEmpty} from "lodash/fp";
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
import {Checkbox} from "primereact/checkbox";

const renderRequiredAsterix = (isRequired, fieldName) => isRequired(fieldName) && <sup>*</sup> || null;
const isFormFieldValid = meta => !!(meta?.touched && meta?.error);

const Photowork = daggy.tagged("Photowork", ["id", "name", "filename", "year", "place", "description"]);

const UploadImage = daggy.taggedSum("UploadImage", {
  Some: ["photowork", "file"],
  Empty: []
});

const Section = daggy.taggedSum("Section", {
  Filled: ["id", "name", "maxCountImg", "images"],
  None: []
});

// if (location.href.includes("foto.ru")) {
//   inspect({
//     url: "https://statecharts.io/inspect",
//     iframe: false
//   });
// }

const initialContext = {
  isOpen: false,
  applications: [],
  message: "",
  applicationMessage: "",
  rejectionReason: "",
  photoworks: [],
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

            <div className="grid grid-cols-2 m-auto w-3/5 text-base items-center">
                <Sections className="flex-1 mr-10" sections={sections}/>
                <div>
                  { 
                    <Button className="uppercase flex-1 w-64 h-12" onClick={handleSubmit}>Подать заявку</Button>
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

const getFormErrorMessage = (meta) => {
  const {t} = useTranslation("namespace1");
  return isFormFieldValid(meta) && <small className="p-error">{t(meta.error)}</small>;
};

const ImageForm = ({image, onSubmit, onChange, onRemove}) => {
  const [imageFields, setImageFields] = useState([]);
  const [required, setRequired] = useState([]);

  const loadFieldsFailed = () => {

  };

  const loadFieldsOk = ({properties, required}) => {
    setImageFields(properties);
    setRequired(required);
  };

  const loadFields = () => {
    asyncGet("api/applications/imageForm/meta").fork(loadFieldsFailed, loadFieldsOk);
  };
  
  const handleRemove = e => {
    e.preventDefault();
    onRemove(image);
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
      render={({ handleSubmit, submitting }) => (
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
                            <input name={name} type={type} {...input} className="text-semi-bright w-full text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright" />
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
                  <Button disabled={submitting} className="uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5 mr-10" onClick={handleSubmit}>Сохранить</Button>
                  <Button className="uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5" onClick={handleRemove}>Удалить</Button>
                </div>
              }
            </form>
          }
        </div>
      )}/>
  );
};

const Image = ({image, onSelect, isSelected}) => {
  const cls = cn("object-cover w-full h-full", {
    "opacity-30": !Number.isInteger(image?.photowork?.id)
  });

  const wrapCsl = cn("w-52 h-52 cursor-pointer flex-shrink-0 flex-grow-0 pt-5", {
    "border-0 border-t-2 border-coolGray-50 selected-image": isSelected,
  });

  const src = image.cata({
    Some: (photowork, file) => file?.name ? URL.createObjectURL(file) : photowork.filename,
    Empty: () => ""
  });
  const key = image.cata({
    Some: photowork => photowork.id,
    Empty: () => "empty"
  });

  return (
    <div onClick={() => onSelect(image)} className={wrapCsl} key={key}>
      <img src={src} className={cls}/>
    </div>
    );
};

const Images = ({images, className, onSelect, selectedImage}) => {
  const selectImage = image => {
    onSelect(image);
  }; 

  window.ims = images;

  return (
    <div className={`flex gap-5 overflow-x-auto h-64 p-5 overflow-y-hidden hidden-scroll relative ${className}`}>
      {
        images.map(im => <Image image={im} onSelect={selectImage} key={im?.photowork?.id} isSelected={im === selectedImage}/>)
      }
    </div>
  );
};

const UploadButton = ({onChooseFiles, className, disabled}) => {
  const fileRef = useRef();
  
  const handleChooseFiles = files => {
    onChooseFiles(files);
  };
  
  return (
    <div className={className}>
      <div className="mb-5">
        <input type="file" ref={fileRef} className="hidden" onChange={({target}) => handleChooseFiles(target.files) }/>
        <Button disabled={disabled} className="uppercase max-w-md" onClick={() => fileRef.current.click() }>Загрузить</Button>
      </div>
    </div>
  );
};


const UnableMaxCountContest = 1;
const UnableMaxCountSection = 2; 
const UnableMaxCountPersonal = 3; 
const AbleToUpload = 0; 

const UnableMessage = ({status, className}) => {
  const { t } = useTranslation("namespace1");
  const message = {
    [UnableMaxCountContest]: t("unableMaxCountContest"),
    [UnableMaxCountSection]: t("unableMaxCountSection"),
    [UnableMaxCountPersonal]: t("unableMaxCountPersonal")
  }[status];
  
  return (
    <div className={className}>
      {message}     
    </div>
  );  
};

const canUploadToSection = ({maxCountContest, maxCountPersonal, alreadyLoaded}) => section =>  {
  if (alreadyLoaded >= maxCountContest && maxCountContest > 0) return UnableMaxCountContest;
  if (alreadyLoaded >= maxCountPersonal && maxCountPersonal > 0) return UnableMaxCountPersonal;
  if (section?.images?.length >= section?.maxCountImg) return UnableMaxCountSection;
  return AbleToUpload;
};

const SectionSelector = ({t, onLoadSection, application}) => {
  const [current, send]= useMachine(SectionsMachine({context: { sections: []}, services: sectionsService}), {devTools: true});
  const {sections} = current.context;
  const count = sections.length;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [section, setSection] = useState(Section.None);
  const left = () => currentIdx > 0 && setCurrentIdx(c => (c - 1) % count);
  const right = () => currentIdx < sections.length && setCurrentIdx(c => (c + 1) % count);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const {contestMaxCountImg, maxCountImg: maxCountPersonal} = application;
  const alreadyLoaded = (sections || []).reduce((a, s) => a + s.images.length ,0);
  
  
  const loadSection = id => {
    send("loadImages", {id});
  };

  useEffect(() => {
    const s = nth(currentIdx, sections) || Section.None;
    setSection(s);
  }, [sections, currentIdx]);
 
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
  const images = section?.images || [];
  const canUploadStatus = canUploadToSection({ maxCountContest: contestMaxCountImg, maxCountPersonal, alreadyLoaded })(section);
  const canUpload = canUploadStatus === AbleToUpload;

  const chooseFiles = files => {
    if (images.length + files.length > section.maxCountImg) return;
    send("addImages", { files: Array.from(files), id: section.id });
    setSelectedImageIdx(0);
  };

  const handleSelect = image => {
    if (Section.Filled.is(section)) {
      setSelectedImageIdx(section.images.indexOf(image));
    }
  };

  const changeImageInfo = uploadImage => {
    send("updateImage", {uploadImage, id: section.id});
  };


  const handleRemoveImage = image => {
    send("removeImage", { image, id: section.id });
  };

  const handleSubmit = ({file, photowork}) => {
    const saveFailed = () => {
      console.info("ERR");
    };

    const saveOk = ({id}) => {
      const uploadImage = 
        UploadImage.Some.from({
          photowork: Photowork.from({...photowork, id: +id}), file });
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
            <div className="uppercase text-tiny text-brown-light2">{section?.maxCountImg}</div>
            <div className="text-sm">{t("limit-photo")}</div>
          </div>
        </div>
      </div>
      <div className="m-auto w-2/5 mb-5 text-center" >{t("chooseCategory")}</div>

      <Images className="mb-5" onSelect={handleSelect} selectedImage={selectedImage} images={section?.images || []}/>
      {
       canUpload ? 
        <UploadButton disabled={!canUpload} className="m-auto w-min text-tiny h-20" onChooseFiles={chooseFiles}>{t("chooseFile")}</UploadButton>
        :
        <UnableMessage status={canUploadStatus} className="text-red-400 text-center h-20"/>
      }
      <ImageForm onRemove={handleRemoveImage} onSubmit={handleSubmit} onChange={changeImageInfo} image={selectedImage} sectionId={section?.id}/>
    </div>
  );
};

const UploadDialog = ({visible, onHide, application, header, t, onLoadSection = identity}) => {
  return (
    <Dialog visible={visible} showHeader={false} className="bg-brown-light3 w-3/5 text-semi-bright" contentClassName="bg-brown-light3 text-semi-bright" onHide={onHide}>
      <div className="text-tiny uppercase text-center mb-4">{header}</div>
      
      <div className="mb-8">
        <SectionSelector t={t} onLoadSection={onLoadSection} application={application}/>
      </div>
    </Dialog>
  );
};


const validateForm = ({sections}) => {
  return (!sections || sections?.length === 0) && {sections: "sectionsRequired"} || {};
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
      {({ input, meta }) => (
        <div className="flex flex-col">
          <MultiSelect optionLabel="label" display="chip" value={input.value} className={className} onChange={({value}) => input.onChange(value)} options={options}/>
          {
            getFormErrorMessage(meta)
          }
        </div>
      )}
    </Field>
  );
};

const api = "applications";
const apiParams = "";

//  
const addFilesToSection = files => section => {
  const getEmptyPhotowork = () => ({id: Math.random(), name: "", filename: "", year: "", place: "", description: ""});
  const filesToDrafts = files => files.map(f => UploadImage.Some.from({file: f, photowork: Photowork.from(getEmptyPhotowork())}));
  const filled = {...section, images: filesToDrafts(files).concat(section.images) };
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

const removeRemoteImage = (_, {image, id}) => {
  if (Number.isSafeInteger(image.photowork.id)) {
    return asyncDel(`api/photoworks/${image.photowork.id}`).map(_ = () => ({image, id})).toPromise();
  }
  return Promise.resolve({image, id});
};

const removeImage = ({sections}, {image, id}) => {
  const imagesInSections = compose(
    findLens({id}),
    pathLens("images"), 
  );
  return over(imagesInSections, images => images.filter(im => im.photowork.id !== image.photowork.id), sections).map(e => Section.Filled.from(e));
};


const toUploadImage = compose(
  p => UploadImage.Some.from({photowork: p, file: null}),
  im => Photowork.from(im),
);

const loadImages = ({sections}, {id}) => {
  const url = `api/sections/${id}/images`;

  const updateSection = uploadImages => section => {
    const s = Section.Filled.from({...section, images: uploadImages, id});
    return s;
  };

  const applyToSection = sections => uploadImages => {
    return over(findLens({id}), updateSection(uploadImages), sections);
  };


  return asyncGet(url)
    .map(map(toUploadImage))
    .map(applyToSection(sections))
    .toPromise();

   // return Promise.resolve([]);
};

const sectionsService = {
  getSections: () => asyncGet("api/sections").map(map(Section.Filled.from)).toPromise(),
  loadImages: loadImages,
  mapSections: ({sections, images}) => sections.map(section => {
    return Section.Filled.from({...section, images}); 
  }),
  addFilesToSection: ({sections, files, id}) => over(findLens({id}), addFilesToSection(files), sections),
  updateImage: ({sections}, {uploadImage, id}) => upateImageInSection(uploadImage)(sections)(id),
  replaceImage: ({sections}, {uploadImage, sectionId, oldImageId}) => replaceImageInSection(uploadImage)(sections)(sectionId, oldImageId),
  removeImage,
  removeRemoteImage
};

  
const Thumb = ({image, onChange, checked}) => {
  const cls = cn("object-cover w-full h-full");
  return (
    <div className="flex items-start">
      <Checkbox className="mr-10" checked={checked} onChange={(checked) => { onChange(checked); }} />
      <div className="w-52 h-52 cursor-pointer flex-shrink-0 flex-grow-0"><img src={image.src} className={cls}/></div>
      <div className="ml-10 justify-between h-28 cursor-pointer flex-shrink-0 flex-col flex">
        <span className="text-sm-2">{image.name}</span>
        <span className="text-sm-2">{image.description}</span>
        <span className="text-sm-2 text-brown-light4 uppercase">{image.sectionName}</span>
      </div>
    </div>
  );
};

const Thumbs = ({images, onRemove}) => {
  return (
      <Form
        validate={validateImageForm}
        className="overflow-y-auto max-h-96"
        onSubmit={onRemove}
        initialValues={{}}
        render={({ handleSubmit }) => (
          <div>
            {
              <>
                <div className="flex justify-center m-10">
                  <Button className="uppercase flex-shrink-0 flex-grow-0 w-64 h-12 flex justify-center" onClick={handleSubmit}>Удалить</Button>
                </div>
                <form className="p-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-20 m-auto w-3/5 text-base items-baseline">
                    {
                      images.map(image => {
                        return (
                          <Field type="checkbox" name={`id-${image.id}`} key={image.id} render={({ input }) => (
                            <>
                              <Thumb {...input} image={image}/>
                            </>
                          )}/>
                        );
                      })
                    }

                </div>

                  
                </form>
              </>
            }
          </div>
        )}/>
  );
};

export default function Main(props) {
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const {context} = current;
  const {isApproved, applicationMessage} = context;
  const { i18n } = useTranslation("namespace1");
  const [contestName, setContestName] = useState("");
  const dateReg = get("application.dateReg", context);
  const rejectionReason = get("application.rejectionReason", context);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const {application, photoworks} = context;

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
  }, [i18n.language]);

  const handleHideUpload = () => {
    setIsUploadVisible(false);
  };

  const openUpload = () => {
    setIsUploadVisible(true);
  };

  const About = () => {
    return (
      <div className="m-auto w-3/5 text-base items-baseline" dangerouslySetInnerHTML={{__html: aboutText}}/>
    );
  };

  const removeImages = values => {
    const ids = keys(values).map(k => k.split("-")[1]);
    send("remove", { ids });
  };

  const uploadHeader = (onClose) => {
    return (
      <div className="bg-brown-light3 p-5 text-semi-bright flex cursor-pointer justify-between">
        <div>{contestName}</div>
        <i onClick={onClose} className="pi pi-times"/>
      </div>
    );
  };

  return (
    <div className="container flex bg-brown-dark2 text-semi-bright" style={{minHeight: "calc(100vh - 16rem)"}}> 
      <div className="relative flex justify-center w-full">
      <div className="flex-1">
      <div className="uppercase text-4xl pt-24 mb-24 text-semi-bright font-header text-center">{t("myApplications")}</div>

      <ApplicationInfo
        contestName={contestName}
        status={applicationMessage}
        dateReg={dateReg}
        rejectionReason={rejectionReason}
        canUpload={isApproved}
        openUpload={openUpload}
      />

    {
      current.value !== "hasApplication" && <ApplyForm onSubmit={handleApply} />
    }

    {
      isApproved && <UploadDialog application={application} header={uploadHeader(handleHideUpload)} visible={isUploadVisible} onHide={handleHideUpload} t={t}/> 
    } 

      <div className="mb-10"/>
      <About />
      
      <div className="mb-10"/>
    { 
      isApproved && photoworks?.length > 0 && <Thumbs images={photoworks} onRemove={removeImages}/>
    }

    </div>
    

   
    <ProfileMenu/>
    
    </div>
    </div>

  );
}
