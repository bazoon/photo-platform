import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../core/api";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import {Field, Form} from "react-final-form";
import {filter} from "lodash/fp";
import ProfileMenu from "./ProfileMenu";
import {store} from "react-recollect";


const toFormData = (obj) => {
  const formData = new FormData;
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const renderField = (name, title) => {
  return (
    <Field name={name} key={name} render={({ input }) => (
      <>
        <label className="col-span-2 text-tiny place-self-end">{title}</label>
        <input value={name} onChange={input.onChange} {...input} className="col-span-4 text-bright text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright"/>
      </>
    )}/>
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
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);

  const loadProfileFailed = () => {

  };

  const loadProfileOk = profile => {
    setProfile(profile);
  };

  const loadProfile = () => {
    asyncGet("api/profile").fork(loadProfileFailed, loadProfileOk);
  };

  const loadMetaFailed = () => {

  };

  const loadMetaOk = meta => {
    setFields(filter(field => !field.hidden, meta.properties));
  };

  const loadMeta = () => {
    asyncGet("api/profile/meta").fork(loadMetaFailed, loadMetaOk);
  };



  useEffect(() => {
    loadMeta();
    loadProfile();
  }, []);

  const validateForm = () => {

  };


  const submitFailed = () => {

  };

  const submitOk = user => {
    store.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onSubmit = data => {
    if (!(data.avatar instanceof File)) {
      delete data.avatar;
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



  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center flex-1">
        <div>
          <div className="uppercase text-lg text-bright font-header text-center mt-24">Профиль</div>
          <Form
            validate={validateForm}
            className="overflow-y-auto max-h-96"
            onSubmit={onSubmit}
            initialValues={profile}
            render={({ handleSubmit }) => (
              <form className="w-full p-10 border rounded bg-brown-dark2">
                <div className="grid grid-cols-6 grid-rows-10 gap-12">
                  <Field name="avatar" key={name} render={({ input }) => (
                    <div className="col-span-2 text-tiny place-self-end w-48 h-48 bg-brown-dark">
                      {(file || profile.avatar) && <img className="square" src={file || profile.avatar}/>}
                      <input type="file" style={{display: "none"}} ref={fileRef} onChange={({target}) => handleChooseFile(target.files[0], input.onChange)}/> 
                    </div>   
                  )}/>
                  <div className="col-span-4 text-bright text-sm-2 flex flex-col justify-between">
                    <span>{profile.firstName} {profile.lastName}</span>  
                    <span></span>
                    <Button disabled={!agreed} onClick={handleUploadAvatar} className="uppercase text-sm text-center w-72 uppercase">Загрузить фото</Button>
                  </div>
                  
                  {
                    fields.map(({name, title, type}) => renderField(name, title, type))
                  }
                </div>
                <div className="uppercase text-lg text-bright font-header text-center mt-24">Смена пароля</div>
                <div className="grid grid-cols-6 grid-rows-8 gap-12">
                  {renderField("password", "Текущий пароль")}
                  {renderField("newPassword", "Новый пароль")}
                  {renderField("newPasswordAgain", "Повторить новый пароль")}
                  <div className="col-span-2"></div>
                  <div className="col-span-4">
                    <Button disabled={!agreed} onClick={handleSubmit} className="uppercase text-center">Сохранить</Button>
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
