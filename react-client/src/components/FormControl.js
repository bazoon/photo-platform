import React, {useState, useEffect} from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import useApi from "../core/hooks/useApi";
import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FileUpload } from "primereact/fileupload";

const mapOptions = (options) => options.map(({key, dataIndex, label}) => ({label: label, value: dataIndex}));

const Upl = ({onChange}) => {
  return (
    <FileUpload name="demo[]" onSelect={({files}) => onChange(files[0])} multiple accept="image/*" maxFileSize={1000000} />
  );
};

const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
const getFormErrorMessage = (meta) => {
  return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};


export default function FormControl({title, dataIndex, options, key, type}) {
  const filterOption = (inp, {children}) => {
    return children.includes(inp);
  };
  
  switch(true) {
  case (!!options):
    return (
      <Field name={dataIndex} render={({ input, meta }) => (
        <div className="p-field">
          <span>
            <label htmlFor={dataIndex} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <Dropdown id={key} {...input} options={mapOptions(options)} optionLabel="label" />
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
    
  case (type === "file"):
    return (
      <Field name={dataIndex} render={({ input, meta }) => (
        <Upl {...input} />
      )}/>
    );

  default:
    return (
      <Field name={dataIndex} render={({ input, meta }) => (
        <div className="p-field">
          <span className="p-input-icon-right">
            <label htmlFor={key} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <InputText id={key} {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />

    );
  }
}
