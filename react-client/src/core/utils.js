import safe from "crocks/Maybe/safe";
import {compose, identity} from "lodash/fp";
import option from "crocks/pointfree/option";
import ReactDOM from "react-dom";
import React from "react";
import Async from "crocks/Async";
import { Dialog } from "primereact/dialog";
import {Button} from "primereact/button";
import { Form } from "react-final-form";


export const showConfirm = function ShowConfirm({content, initialValues = {}, header, cancelButton = "Нет", confirmButton = "Да"}) {
  const elem = document.createElement("div");
  const clean = () => {
    ReactDOM.unmountComponentAtNode(elem);
    elem.remove();
  };

  return Async((rej, res) => {
    const cancel = () => {
      ReactDOM.unmountComponentAtNode(elem);
      clean();
      rej();
    };
    const confirm = () => {
      clean();
      res();
    };

    const footer = (submit) => (
      <div className="flex mt-10 justify-end">
        <Button label={cancelButton} icon="pi pi-times" className="mr-5" onClick={cancel} />
        <Button label={confirmButton} icon="pi pi-check" onClick={values => { submit(values); confirm(); } } />
      </div>
    );

    ReactDOM.render(
        <Form
          initialValues={initialValues}
          className="overflow-y-auto max-h-96"
          onSubmit={values => res(values)}
          render={({ handleSubmit }) => (
            <Dialog 
              className="w-1/3"
              visible={true}
              confirmButton={confirmButton} 
              header={header} 
              cancelButton={cancelButton} 
              onHide={cancel} 
              onConfirm={confirm}
            >
              <form onSubmit={handleSubmit} className="p-10 p-fluid">
                {content}
                {footer(handleSubmit)}
              </form>
            </Dialog>
          )}>
        </Form>
      , elem);
    document.body.appendChild(elem);
  });
};


export const submit = ({form, record, onOk}) => {
  form
    .validateFields()
    .then(values => {
      form.resetFields();
      onOk({...values, id: record.id});
    })
    .catch(info => {
      //console.log("Validate Failed:", info);
    });
};

export const cancel = ({form, onCancel}) => {
  form.resetFields();
  onCancel();
};

export const dateFormat = (date = new Date, locale = "ru-RU") => {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const loadLanguage = () => compose(option("ru"), safe(identity))(localStorage.getItem("lang"));
export const saveLanguage = lang => { localStorage.setItem("lang", lang); };


