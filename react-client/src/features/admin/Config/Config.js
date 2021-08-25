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


  const loadFailed = () => {

  };

  const load = () => {
    asyncGet("api/admin/config").fork(loadFailed, setConfig);
  };
  
  console.log(config);

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
  
  return (
    <Form
      initialValues={config}
      className="overflow-y-auto max-h-96"
      onSubmit={submit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="p-10 p-fluid">
          {
            keys(config).map(f => <div className="mb-4" key={f}>
              <FormControl title={f} type="text"  dataIndex={f} onChange={identity}  /></div>)
          }
          <Button type="submit" label="Submit" className="p-mt-2" />
        </form>
      )}>

    </Form>
  );
};

export default Config;
