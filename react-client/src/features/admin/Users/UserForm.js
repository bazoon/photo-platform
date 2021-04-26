import i18n from "i18next";
import React, {useState, useEffect} from "react";
import {Form} from "antd";
import Modal from "antd/lib/modal/Modal";
import {Input} from "antd";
import Radio from "antd/lib/radio/radio";
import columns from "./columns";


function FormItem({label, rules=[]}) {
  return (
    <Form.Item
      key={label}
      label={label}
      name={label}
      rules={rules}
      shouldUpdate
    >
      <Input />
    </Form.Item>
  );
}

export default function UserForm({user, visible, onCancel, onOk}) {
  const [form] = Form.useForm();

  const submit = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        onOk({...values, id: user.id});
      })
      .catch(info => {
        console.log("Validate Failed:", info);
      });
  };

  const cancel = () => {
    form.resetFields();
    onCancel();
  };
  

  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={cancel}
      onOk={submit}
    >
      <Form
        initialValues={user}
        form={form}
        layout="vertical"
        name="form_in_modal"
        className="overflow-y-auto max-h-96"
      >
        {
          columns.map(col => <FormItem label={col.title} key={col.title} rules={[{required: false}]}/>)
        }
      </Form>
    </Modal>


  );

}


