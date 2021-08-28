import React, {useState, useEffect} from "react";
import { InputTextarea } from "primereact/inputtextarea";
import {asyncGet, asyncPost, asyncPut} from "../../../core/api";
import {Form} from "react-final-form";
import FormControl from "../../../components/FormControl";
import {keys} from "lodash/fp";
import {Button} from "primereact/button";
import identity from "crocks/combinators/identity";

const Config = () => {
  const [config, setConfig] = useState({});
  const [scheme, setScheme] = useState();

  const loadFailed = () => {

  };

  const loadOk = ({scheme, options}) => {
    setScheme(scheme);
    setConfig(options);
  };

  console.log(config);
  console.log(scheme);


  const load = () => {
    asyncGet("api/admin/config").fork(loadFailed, loadOk);
  };
  

  useEffect(() => {
    load();
  }, []);

  const submitFailed = () => {

  };

  const submitOk = d => {

  };

  const submit = v => {
    asyncPut("api/admin/config", v).fork(submitFailed, submitOk);
  };

  const buildField = fieldName => {
    return <div className="mb-4"><FormControl title={scheme[fieldName].title} type={scheme[fieldName].type} dataIndex={fieldName}/></div>;
  };

  return (
    <Form
      initialValues={config}
      className="overflow-y-auto max-h-96"
      onSubmit={submit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="p-10 p-fluid">
          {
            keys(config).map(f => buildField(f))
          }
          <Button type="submit" label="Submit" className="p-mt-2" />
        </form>
      )}>

    </Form>
  );
};

export default Config;
