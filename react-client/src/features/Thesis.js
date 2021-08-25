import i18n from "i18next";

import React, {useState, useEffect} from "react";
import {asyncGet} from "../core/api";


export default function Main() {
  const [thesis, setThesis] = useState("");
  
  useEffect(() => {
    asyncGet("api/thesis/ru").fork(() => {}, data => { setThesis(data.thesis); });
  }, []);
  
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: thesis}}></div>
    </div>
  );

}
