import React, {useEffect, useState} from "react";
import { Button } from "primereact/button";
import {asyncGet} from "./core/api";
import {dateFormat} from "./core/utils";
import { store } from "react-recollect";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";

function MainPage({history}) {
  const [config, setConfig] = useState({});
  const info = store.info || {};

  const loadConfigFailed = () => {

  };

  const loadConfigOk = ({options}) => {
    setConfig(options);
  };

  const loadConfig = () => {
    asyncGet("api/admin/config").fork(loadConfigFailed, loadConfigOk);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const handleSendPhoto = () => {
    if (!store.user) {
      history.push("/signup");
    }
  };

  const tempNote = () => <img src="inwork.jpg"/>;

  const renderStats = () => {
    return null;
    // return (
    //   <div className="flex justify-center mt-12 uppercase text-white-80">
    //     <div className="p-10">
    //       <div className="text-lg">2762</div>
    //       <div className="text-sm">УЧАСТНИКОВ</div>
    //     </div>
    //     <div className="p-10">
    //       <div className="text-lg">8212</div>
    //       <div className="text-sm">фотографий</div>
    //     </div>
    //   </div>
    // );
  };

  const renderContent = () => {
    return (
      <div>
        <div className="mt-20 text-center uppercase text-11xl text-white-80 font-header">
          {info.salone}
        </div>
        <div className="mt-10 text-center uppercase text-tiny text-white-80">
          {info.name}
        </div>
        <div className="mt-24 text-center uppercase text-tiny text-white-80">
            прием работ {dateFormat(info.dateStart)} - {dateFormat(info.dateStop)} 
          <br/>
        </div>
        <br/><br/>
        {renderStats()}
        <div className="flex justify-center">
          <Button className="uppercase" onClick={handleSendPhoto}>отправить фото</Button>
          <div className="mr-12"></div>
          {null && <Button className="uppercase p-button-secondary">проголосовать</Button>}
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="container flex justify-center bg-darkgreen"> 
        <div className="pb-40 wrap">
          {
            config.isOnService ? tempNote() : renderContent()
          }

        </div>
      </div>
    </>
  );
}


export default(withRouter(MainPage));
