import React, {useEffect} from "react";
import { Dropdown } from "primereact/dropdown";
import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Calendar } from "primereact/calendar";
import { FileUpload } from "primereact/fileupload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {TheUploadAdapterPlugin} from "./UploadAdapter";
import {useTranslation} from "react-i18next";
import { Checkbox } from "primereact/checkbox";
import {SelectButton} from "primereact/selectbutton";
import { InputNumber } from "primereact/inputnumber";

const editorConfig = {
  alignment: {
    options: ["left", "right", "center"]
  },
  toolbar: {
    viewportTopOffset: 30,
    shouldNotGroupWhenFull: true
  },
  // extraPlugins: [PasteFromOffice],
  extraPlugins: [TheUploadAdapterPlugin],
  mediaEmbed: {
    previewsInData: true
  },
  image: {
    resizeUnit: "%",
    resizeOptions: [ {
      name: "imageResize:original",
      value: null
    },
    {
      name: "imageResize:50",
      value: "50"
    },
    {
      name: "imageResize:75",
      value: "75"
    } ]
  }
};

const Upl = ({onChange}) => {
  return (
    <FileUpload name="demo[]" onSelect={({files}) => onChange(files[0])} multiple accept="image/*" maxFileSize={1000000} />
  );
};

const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
const getFormErrorMessage = (meta) => {
  return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
};

  const renderEnum = field => {
    const {name, title, items} = field;
    return (
      <Field name={name}  render={({ input, meta }) => (
        <div className="p-field">
          <div>
            <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <SelectButton className="grid grid-cols-4 p-5 gap-5" optionLabel="label" optionValue="name" value={input.value} options={items?.enum} onChange={(e) => {input.onChange(e.value);}} />  
          </div>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

  const renderSelect = field => {
    const {name, title, items} = field;
    return (
      <Field name={name}  render={({ input, meta }) => (
        <div className="p-field">
          <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
          <Dropdown id={name} {...input} options={items?.enum} optionLabel="label" />
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

  const renderSelectButton = field => {
    const {name, title, items} = field;
    return (
      <Field name={name}  render={({ input, meta }) => (
        <div className="p-field">
          <span>
            <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <SelectButton optionLabel="label" optionValue="name" value={input.value} options={items?.enum} onChange={(e) => {input.onChange(e.value);}} />  
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

  const renderBoolean = field => {
    const {name, title} = field;
    return (
      <Field name={name} type="checkbox" render={({ input, meta }) => (
        <div className="p-field-checkbox">
          <Checkbox inputId={name} checked={input.checked} onChange={input.onChange} />
          &nbsp;&nbsp;
          <label htmlFor={name}>{title}</label>
        </div>
      )} />
    );
  };

  const renderFile = field => {
    const {name} = field;
    return (
      <Field name={name} render={({ input }) => (
        <Upl {...input} />
      )}/>
    );
  };

  const renderEditor = field => {
    const {name, title} = field;
    return (
      <Field name={name} render={({ meta, input }) => (
        <>
          <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
          <CKEditor
            onReady={ editor => {
              // Insert the toolbar before the editable area.
              editor.ui.getEditableElement().parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
            } }
            onError={ ( { willEditorRestart } ) => {
              // If the editor is restarted, the toolbar element will be created once again.
              // The `onReady` callback will be called again and the new toolbar will be added.
              // This is why you need to remove the older toolbar.
              if ( willEditorRestart ) {
                this.editor.ui.view.toolbar.element.remove();
              }
            } }
            onChange={ ( event, editor ) => { input.onChange(editor.getData()); } }
            editor={ DecoupledEditor }
            data={input.value}
            config={editorConfig}
          />

        </>
      )}/>
    );
  };

  const renderDate = field => {
    const {name, title} = field;
    return (
      <Field name={name} render={({ input, meta }) => (
        <div className="p-field">
          <span className="p-input-icon-right">
            <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <Calendar id="basic" {...input} value={input.value ? new Date(input.value) : ""} />
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

  const renderNumber = field => {
    const {name, title, max} = field;
    return (
      <Field name={name} render={({ input, meta }) => (
        <div className="p-field">
          <span className="p-input-icon-right">
            <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <InputNumber id={name} max={max} value={input.value} onChange={({value}) => input.onChange(value)} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

  const renderText = field => {
    const {name, title} = field;
    return (
      <Field name={name} render={({ input, meta }) => (
        <div className="p-field">
          <span className="p-input-icon-right">
            <label htmlFor={name} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
            <InputText id={name}  {...input} className={classNames({ "p-invalid": isFormFieldValid(meta) })} />
          </span>
          {getFormErrorMessage(meta)}
        </div>
      )} />
    );
  };

const FormControl = ({field}) => {
  const render = {
    enum: renderEnum,
    array: renderSelect,
    selectButton: renderSelectButton,
    boolean: renderBoolean,
    file: renderFile,
    text: renderEditor,
    date: renderDate,
    number: renderNumber,
  }[field.type] || renderText;
  
  return render(field);
};

export default FormControl;
