import React, {} from "react";
import { Dropdown } from "primereact/dropdown";
import { Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { FileUpload } from "primereact/fileupload";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {TheUploadAdapterPlugin} from "./UploadAdapter";

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

const mapOptions = (options) => options.map(({dataIndex, label}) => ({label: label, value: dataIndex}));

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
      <Field name={dataIndex} render={({ input }) => (
        <Upl {...input} />
      )}/>
    );
  case (type === "editor"):
    return (
      <Field name={dataIndex} render={({ meta, input }) => (
        <>
          <label htmlFor={dataIndex} className={classNames({ "p-error": isFormFieldValid(meta) })}>{title}</label>
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
