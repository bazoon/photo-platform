import React from "react";
import {make as ShortList} from "./ShortList.bs";
import ProfileMenu from "./ProfileMenu";

const JuryShortList = ({id}) => {
  return (
  <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright">
    <ShortList id={id}/>
    <ProfileMenu />
  </div>
  );
};

export default JuryShortList;
