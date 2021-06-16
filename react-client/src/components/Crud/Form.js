import i18n from "i18next";
import React, {useEffect, useState, useRef} from "react";
import FormControl from "../FormControl";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Form } from "react-final-form";
import { Message } from "primereact/message";

export default function FForm({record, visible, onCancel, onOk, onChange, saveError, fields}) {
  const ref =useRef(null);
  const {message, errors} = saveError;

  const validate = (data) => {
    let errors = {};
    return errors;
  };

  const onSubmit = (data, form) => {
    form.restart();
    onOk(data);
  };

  const cancel = () => {
    onCancel();
  };

  const renderFooter = (submit) => {
    return (
      <div>
        <Button label="cancel" icon="pi pi-times" onClick={cancel} className="p-button-text" />
        <Button label="Ok" type="submit" icon="pi pi-check" onClick={submit} autoFocus />
      </div>
    );
  };
  
  useEffect(() => {
    if (saveError) {
      // ref.current.show();
    }
  }, [saveError]);


  console.log(saveError);

  return (
    <div>
      <Form
        initialValues={record}
        className="overflow-y-auto max-h-96"
        validate={validate}
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Dialog
            header="edit"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={cancel}
            footer={renderFooter(handleSubmit)}
          >
            {message && <Message severity="error" text={message} />}
            <form onSubmit={handleSubmit} className="p-fluid p-10">
              {fields.map(f => <div className="mb-4" key={f.dataIndex}><FormControl {...f}  /></div>)}
            </form>
          </Dialog>
        )}>

      </Form>
    </div>

  );

}


