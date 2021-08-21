import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import {asyncPost, asyncGet} from "../../core/api";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { collect } from "react-recollect";
import {useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import {Dialog} from "primereact/dialog";
import {Message} from "primereact/message";
import Machine from "./ApplicationsMachine";
import { useMachine } from "@xstate/react";

const initialContext = {
  isOpen: false,
  files: [],
  applications: [],
  message: "",
  applicationMessage: ""
};

const api = "applications";
const apiParams = "";

export default function Main() {
  const history = useHistory();
  const { t } = useTranslation("namespace1");
  const [current, send] = useMachine(Machine({api, context: initialContext, apiParams, t}), {devTools: true});
  const {context} = current;
  const {isApproved, files, message, applicationMessage} = context;

  console.log(message);

  useEffect(() => {
    send("load", {});
  }, []);
  



  const renderFooter = (submit) => {
    return (
      <div>
        <Button label="cancel" icon="pi pi-times" onClick={() => send("close")} className="p-button-text" />
        <Button label="Ok" type="submit" icon="pi pi-check" onClick={() => send("submit")} autoFocus />
      </div>
    );
  };

  const renderFile = file => {
    return <img key={file.name} className="w-40" src={URL.createObjectURL(file)}/>;
  };

  const UploadModal = () => {
    return (
      <Dialog
        header={t("load_photo")}
        visible={current.value === "opened"}
        style={{ width: "50vw" }}
        onHide={() => send("close")}
        footer={renderFooter()}
      >
        {message && <Message text={message} />}
        <form className="p-10 p-fluid">
          <input type="file" multiple onChange={({target}) => send("choose", {files: target.files})}/>
        </form>
        <div>
          {files.map(renderFile)}
        </div>

      </Dialog>
    );
  };


  return (
    <div className="container bg-brown-dark2 text-bright" style={{minHeight: "calc(100vh - 21rem)"}}> 
      <div className="uppercase text-lg pt-24 mb-24 text-bright font-header text-center">Мои заявки</div>
      {
        <div className="text-center mb-24">
          { applicationMessage && <Message text={applicationMessage}/> }
        </div>
      }
      <div className="flex justify-center mb-24">
        {
          !(isApproved === true) && <Button disabled={isApproved === false} className="uppercase mr-5" onClick={() => send("apply") }>Подать заявку</Button>
        }
        {
          isApproved && <Button className="uppercase" onClick={() => send("open") }>Загрузить</Button>
        }
      </div>

      <div className="grid grid-flow-row auto-rows-max grid-cols-2 w-4/5 m-auto">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>3</div>
      </div>

      <UploadModal/>

    </div>
  );

}
