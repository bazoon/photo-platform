import React, {useEffect, useState} from "react";
import { Button } from "primereact/button";
import {asyncGet} from "./core/api";
import {dateFormat} from "./core/utils";
import {withRouter} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {identity} from "lodash/fp";
import i18n from "./core/i18n";
import {collect} from "react-recollect";

function MainPage({history, store}) {
  const [config, setConfig] = useState({});
  const { t } = useTranslation("namespace1");
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
    asyncGet(`api/mainPage/${i18n.language}`).fork(identity, ({regId}) => {
      switch(true) {
      case !!regId:
        history.push("/applications");
        break;
      case store.isLoggedIn:
        history.push("/Applications");
        break;
      default:
        history.push("/login");
      }
    });
  };

  const tempNote = () => <img src="inwork.jpg"/>;

  const renderStats = () => {
    return null;
    // return (
    //   <div className="flex justify-center mt-10 uppercase text-white-80">
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
        <div className="mt-32 text-center uppercase text-9xl text-white-80 font-bebas-bold">
          {info.salone}
        </div>
        <div className="mt-9 text-center uppercase text-2xl font-futura-normal text-white-80">
          {info.name}
        </div>
        <div className="mt-32 text-center uppercase text-2xl font-futura-normal text-white-80">
            прием работ {dateFormat(info.dateStart)} - {dateFormat(info.dateStop)} 
          <br/>
        </div>
        <br/><br/>
        {renderStats()}
        <div className="flex m-48 justify-center">
          <Button className="uppercase w-72 h-12 flex justify-center" onClick={handleSendPhoto}>{t("sendPhoto")}</Button>
          {null && <Button className="uppercase w-72 h-12 p-button-secondary flex justify-center ml-14">{t("vote")}</Button>}
        </div>
      </div>
    );
  };


  return (
    <>
      <div className="container flex justify-center"> 
        <div className="pb-40 wrap">
          {
            config.isOnService ? tempNote() : renderContent()
          }
        </div>
      </div>
    </>
  );
}


export default(withRouter(collect(MainPage)));
