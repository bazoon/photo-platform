import React, {useEffect, useRef} from "react";
import FormControl from "../FormControl";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Form } from "react-final-form";
import { Message } from "primereact/message";
import {isNil} from "crocks/predicates";
import isEmpty from "crocks/predicates/isEmpty";

export default function FForm({
  record, 
  visible, 
  onCancel, 
  onOk, 
  onChange, 
  saveError, 
  fields, 
  title,
  dialogConfig = {}
}) {
  const {message} = saveError;

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
  }, [saveError, fields]);
  
  const validateForm = values => {
    let r = fields.reduce((a, {dataIndex, required}) => required && isNil(values[dataIndex]) ? ({...a, [dataIndex]: "required"}) : a, {});
    let d = isEmpty(r) ? true : r;
    return d;
  };

  return (
    <div>
      <Form
        validate={validateForm}
        initialValues={record}
        className="overflow-y-auto max-h-96"
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Dialog
            header={title}
            visible={visible}
            style={{ width: "50vw" }}
            onHide={cancel}
            footer={renderFooter(handleSubmit)}
            {...dialogConfig}
          >
            {message && <Message severity="error" text={message} />}
            <form onSubmit={handleSubmit} className="p-10 p-fluid">
              {
                fields.map(f => <div className="mb-4" key={f.dataIndex}>
                  <FormControl title={f.title} type={f.type}  dataIndex={f.dataIndex} options={f.options} width={f.width} onChange={onChange}  /></div>)
              }
            </form>
          </Dialog>
        )}>

      </Form>
    </div>

  );

}


