export const submit = ({form, record, onOk}) => {
  form
    .validateFields()
    .then(values => {
      form.resetFields();
      onOk({...values, id: record.id});
    })
    .catch(info => {
      console.log("Validate Failed:", info);
    });
};

export const cancel = ({form, onCancel}) => {
  form.resetFields();
  onCancel();
};
