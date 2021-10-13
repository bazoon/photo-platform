import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import {Field, Form, FormSpy} from "react-final-form";
import {filter, memoize, values, keys, pick} from "lodash/fp";
import ProfileMenu from "./ProfileMenu";
import {store} from "react-recollect";
import {Dropdown} from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import {debounce} from "lodash";

const fieldCls = "col-span-8 text-semi-bright text-lg focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright";
const SAVE_INTERVAL = 2000;


const toFormData = (obj) => {
  const formData = new FormData;
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const validateField = (value, {required}) => {
  return required && !value && "required";
};

const renderLabel = (title, required) => {
  return (
    <label className="col-span-4 text-lg place-self-end">
      {title} {required && <sup>*</sup>}
    </label>
  );
};

const renderTextField = ({name, title, required, input}) => {
  return (
    <>
      {renderLabel(title, required)}
      <input value={name} onChange={input.onChange} {...input} className={fieldCls}/>
    </>
  );
};

const renderDateField = ({name, title, required, input}) => {
  return (
      <>
        {renderLabel(title, required)}
        <Calendar {...input} monthNavigator yearNavigator inputClassName="col-span-4 bg-transparent border-0" className={fieldCls} yearRange="1940:2030" />
      </>
  );
};

const renderMemo = ({name, title, required, input}) => {
  return (
    <>
      {renderLabel(title, required)}
      <InputTextarea {...input} rows={1} cols={30} autoResize className={fieldCls} />
    </>
  );
};

const renderSelect = ({name, title, options, required, input}) => {
  return (
    <>
      {renderLabel(title, required)}
      <Dropdown filter filterInputAutoFocus id={name} {...input} onChange={e => input.onChange(e.value)} options={options} optionValue="key" optionLabel="label" className={fieldCls} />
    </>
  );
};

const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

const getFormErrorMessage = (meta, t) => {
  return isFormFieldValid(meta) && <small className="p-error absolute top-5">{t(meta.error)}</small>;
};

const renderField = ({name, title, type, options, required}, t) => {
  const fns = {
    string: renderTextField,
    date: renderDateField,
    text: renderMemo,
    select: renderSelect
  };

  const fn = fns[type] || renderTextField;
  
  return (
    <Field name={name} key={name} validate={v => validateField(v, {required, name})} render={({ input, meta }) => (
      <>
        {fn({name, title, type, options, required, input})}
        <div className="col-span-4"></div>
        <div className="col-span-8 relative -top-8">{getFormErrorMessage(meta, t)}</div>
      </>
    )} />
  );
};

const isActiveMenuItem = item => {
  return location.href.includes(item.to) || (item.items && item.items.some(isActiveMenuItem));
};

const setTemplateForItems = (items = [], history, t) => {
  items.forEach(item => {
    item.command = item.command || (() => history.push(item.to));
    item.label = t(item.name) || item.name;
    item.className = isActiveMenuItem(item) ? "p-menuitem--active" : "";
    if (item.items) {
      setTemplateForItems(item.items, history, t);
    }
  });
  return [...items];
};

export default function Main() {
  const [profile, setProfile] = useState({});
  const [agreed] = useState(true);
  const [fields, setFields] = useState([]);
  const [requiredFields, setRequiredFields] = useState(new Set([]));
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const { t } = useTranslation("namespace1");
  const [loading, setLoading] = useState(false);

  const loadProfileFailed = () => {

  };

  const loadProfileOk = profile => {
    profile.birthday = profile.birthday && new Date(profile.birthday);
    setProfile(profile);
    setLoading(false);
  };

  const loadProfile = () => {
    asyncGet("api/profile").fork(loadProfileFailed, loadProfileOk);
  };

  const loadMetaFailed = () => {

  };

  const loadMetaOk = meta => {
    const fields = filter(field => !field.hidden, meta.properties).map(field => ({...field, required: meta.required.includes(field.name)}));
    setFields(fields);
    const requiredFields = new Set(fields.filter(f => f.required).map(f => f.name));
    setRequiredFields(requiredFields);
  };

  const loadMeta = () => {
    asyncGet("api/profile/meta").fork(loadMetaFailed, loadMetaOk);
  };

  useEffect(() => {
    setLoading(true);
    loadMeta();
    loadProfile();
  }, []);

  const validateForm = (values, a) => {
    return {};
  };


  const submitFailed = () => {
    setLoading(false);
  };

  const submitOk = user => {
    user.birthday = user.birthday && new Date(user.birthday);
    store.user = user;
    setProfile(user);
    setLoading(false);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onSubmit = (data) => {
    setLoading(true);
    if (!(data.avatar instanceof File)) {
      delete data.avatar;
    }
    
    if (data.birthday) {
      const birthday = new Date(data.birthday);
      data.birthday = (new Date(+birthday - birthday.getTimezoneOffset() * 60 * 1000)).toUTCString();
    }

    asyncPost("api/profile", toFormData(data), false).fork(submitFailed, submitOk);
  };
  
  const handleChooseFile = (file, onChange) => {
    setFile(URL.createObjectURL(file));
    onChange(file);
  };

  const handleUploadAvatar = e => {
    e.preventDefault();
    fileRef.current.click();
  };
  
  const saveRequiredFailed = () => {
    setLoading(false);
  };

  const saveRequiredOk = d => {
    setLoading(false);
  };

  const saveRequired = debounce((fields, form) => {
    setLoading(true);
    asyncPost("api/profile", toFormData(fields), false).fork(saveRequiredFailed, saveRequiredOk);
    setProfile(p => ({...p, ...fields}));
    form.restart();
  }, SAVE_INTERVAL);

  const onFormChange = (state, form) => {
    const {values, modified} = state;
    const fields = keys(values);
    const toSave = fields.reduce((a, f) => modified[f] && requiredFields.has(f) ? [...a, f] : a, []);

    if (toSave.length > 0) {
      const changed = pick(toSave, values);
      saveRequired(changed,form);
    }
  };

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
      <div className="relative flex justify-center flex-1">
        <div>
          <div className="uppercase text-4xl text-semi-bright font-header text-center mt-32">Профиль</div>
          <Form
            validate={validateForm}
            className="overflow-y-auto max-h-96"
            onSubmit={onSubmit}
            initialValues={profile}
            render={({ handleSubmit, form }) => (
              <form className="w-full p-10 border rounded bg-brown-dark2" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-12 grid-rows-10 gap-x-9 gap-y-5">
                  <Field name="avatar" key={name} render={({ input }) => (
                    <div className="col-span-4 text-sm-2 place-self-end w-48 h-48 mb-16 bg-brown-dark">
                      {(file || profile.avatar) && <img className="w-full h-full object-cover " src={file || profile.avatar}/>}
                      <input type="file" style={{display: "none"}} ref={fileRef} onChange={({target}) => handleChooseFile(target.files[0], input.onChange)}/> 
                    </div>   
                  )}/>
                  <FormSpy
                    onChange={f => onFormChange(f, form)}
                  />
                  <div className="col-span-8 text-semi-bright text-sm-2 flex flex-col mb-16 justify-between">
                    <span>{profile.firstName} <span className="uppercase">{profile.lastName}</span></span>  
                    <span></span>
                    <Button disabled={!agreed} onClick={handleUploadAvatar} className="text-sm uppercase w-72 flex justify-center h-12">Загрузить фото</Button>
                  </div>
                  <div className="col-span-4"></div>
                  <div className={`col-span-8 text-brown-light4 ${!loading && "invisible"}`}>{t("isSaving")}...</div>
                  {
                    fields.map(f => renderField(f, t))
                  }
                </div>
                <div className="uppercase text-lg text-semi-bright font-header text-center mt-32">Смена пароля</div>
                <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                  {renderField({name: "password", title: "Текущий пароль"})}
                  {renderField({name: "newPassword", title: "Новый пароль"})}
                  {renderField({name: "newPasswordAgain", title: "Повторить новый пароль"})}
                  <div className="col-span-4"></div>
                  <div className="col-span-8">
                    <Button disabled={!agreed} label="Сохранить" loading={loading} onClick={handleSubmit} className="text-sm uppercase w-72 flex justify-center h-12"/>
                  </div>
                </div>
              </form>
            )}/>
        </div>
      </div>

      <ProfileMenu/>
    </div>
  );

}
