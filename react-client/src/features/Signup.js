import React, {useState, useEffect, useRef} from "react";
import {asyncPost, asyncGet} from "../core/api";
import {Button} from "primereact/button";
import UserMachine from "../core/UserMachine";
import {useMachine} from "@xstate/react";
import {assign} from "xstate";
import {Form, Field} from "react-final-form";
import isEmpty from "crocks/predicates/isEmpty";
import {Message} from "primereact/message";
import {keys} from "xstate/lib/utils";
import FormControl from "../components/FormControl";
import {Checkbox} from "primereact/checkbox";
import {InputText} from "primereact/inputtext";
import cn from "classnames";
import {isNil} from "lodash/fp";
import {useTranslation} from "react-i18next";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const handleChange = setfn => e => setfn(e.target.value);
const handleChangeCheckbox = setfn => e => setfn(e.target.checked);
const isFormFieldValid = (meta) => !!(meta.touched && meta.error);

const renderRequiredAsterix = (isRequired, fieldName) => isRequired(fieldName) && <sup>*</sup> || null;

const buildField = ({name, onChange, type, meta, input, className}) => {
  const cls = cn(className, {
    "p-invalid": isFormFieldValid(meta) 
  });

  switch (type) {
  case "boolean":
    return (
      <Checkbox onChange={input.onChange} checked={input.checked} className={cls}/>
    );
  case "email":
    return (
      <input type="email" id={name} onChange={onChange} className={cls} />
    );
  default:
    return (
      <InputText id={name} onChange={onChange} className={cls} />
    );
  }
};

const initialContext = {
  user: {
    agree: true,
    email: undefined
  },
  role: "",
  success: undefined,
};

export default function Main() {
  const message = "";
  const [fields, setFields] = useState([]);
  const [fieldNames, setFieldNames] = useState([]);
  const [required, setRequired] = useState(false);
  const { t } = useTranslation("namespace1");
  const formRef = useRef();

  const actions = {
    successSignup: assign({
      success: true  
    }),
    failedSignup: assign({
      success: false
    }),
    saveUser: assign({
      user: (_, data) => data
    })
  };

  const services = {
    signup: (_, data) => asyncPost("api/signup", data).toPromise(),
  };

  const [current, send] = useMachine(UserMachine({context: initialContext, services, actions}), {devTools: true});
  const {context} = current;
  const {user, success} = context;

  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{t(meta.error)}</small>;
  };

  const onSubmit = data => {
    send("signup", data);
  };

  const loadFieldsFailed = () => {

  };

  const loadFieldsOk = ({fields, required}) => {
    const requiredSet = new Set(required);
    setFields(fields);
    setRequired(requiredSet);
    setFieldNames(keys(fields).filter(fieldName => fieldName !== "agreed"));
  };

  const loadFields = () => {
    asyncGet("api/signupForm/meta").fork(loadFieldsFailed, loadFieldsOk);
  };
  
  useEffect(() => {
    loadFields();
  }, []);

  const validateForm = (data = {}) => {
    let r = fieldNames.reduce((a, fieldName) => required.has(fieldName) && isNil(data[fieldName]) ? ({...a, [fieldName]: "required"}) : a, {});
    if (!validateEmail(data.email)) {
      r.email = t("invalidEmail");
    }
    
    if (!isEmpty(r)) {
      return r;
    } else {
      return asyncGet(`api/checkEmail/${data.email}`).toPromise();
    }

  };

  const signupForm = () => {
    return (
      <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
        <div className="relative flex justify-center w-4/5 wrap">
          <div className="uppercase text-lg text-bright font-header text-center mt-24">Регистрация</div>
          <Form
            validate={validateForm}
            initialValues={user}
            className="overflow-y-auto max-h-96"
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
              <div>
                {message && <Message severity="error" text={message} />}

                <form ref={formRef} className="w-full p-10 border rounded bg-brown-dark2">
                  <div className="grid grid-cols-6 grid-rows-5 gap-12">
                    {
                      fieldNames.map(fieldName => {
                        return (
                          <Field name={fieldName} key={fieldName} render={({ input, meta }) => (
                            <>
                              <label className="col-span-2 text-tiny uppercase place-self-end">
                                {
                                  fields[fieldName].title} {renderRequiredAsterix(fieldName => required.has(fieldName), fieldName)
                                }
                              </label>
                              <div className="col-span-4 w-full relative">
                                <input name={fieldName} type={fields[fieldName].type} onChange={input.onChange} className="text-bright w-full text-tiny focus:outline-none bg-transparent border-solid border-t-0 border-l-0 border-r-0 border-b border-bright" />
                                <div className="absolute">
                                  {getFormErrorMessage(meta)}
                                </div>
                              </div>
                            </>
                          )}/>
                        );
                      })
                    }
                    <Field name="agreed" type="checkbox" render={({ input, meta }) => (
                      <>
                        {buildField({meta, input, type: fields?.agreed?.type, className: "col-span-2 place-self-end" })}
                        <label className="col-span-4 mr-8 text-tiny">{fields?.agreed?.title}</label>
                      </>
                    )}/>

                    <div className="col-span-2"></div>
                    <div className="col-span-4">
                      <Button onClick={handleSubmit} className="uppercase text-center">Регистрация</Button>
                    </div>
                  </div>
                </form>
              </div>
            )}>
          </Form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
        <div className="relative flex justify-center w-4/5 wrap">
          <div className="uppercase text-lg text-bright font-header text-center mt-24">Регистрация прошла успешно</div>
          <div className="text-center text-orange text-base">На почту {user?.email} отправлено письмо с ссылкой для подтверждения регистрации.</div>
        </div>
      </div>
    );
  };




  return success ? successMessage() : signupForm();
}
