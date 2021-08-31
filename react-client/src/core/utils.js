import safe from "crocks/Maybe/safe";
import {compose, identity} from "lodash/fp";
import option from "crocks/pointfree/option";

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

export const dateFormat = (date = new Date, locale = "ru-RU") => {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

export const loadLanguage = () => compose(option("ru"), safe(identity))(localStorage.getItem("lang"));
export const saveLanguage = lang => { localStorage.setItem("lang", lang); };
