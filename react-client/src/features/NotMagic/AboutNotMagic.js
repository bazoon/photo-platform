import React, {useEffect, useState} from "react";
import {asyncGet} from "../../core/api";

export default function Main() {
  const [text, setText] = useState({__html: ""});

  const loadFailed = e => {
    console.log(e);
  };

  const loadOk = d => {
    setText({__html: d.text});
  };

  const load = () => {
    asyncGet("about-notmagic").fork(loadFailed, loadOk);
  };


  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container flex justify-center 20 p-20 w-3/4 flex-1 bg-brown-dark2 text-semi-bright">
      <div dangerouslySetInnerHTML={text}>
      </div>
    </div>
  );
}
