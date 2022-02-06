import React from "react";
import p1 from "../../images/p-01.jpg";
import p2 from "../../images/p-02.jpg";
import p3 from "../../images/p-03.jpg";

export default function Main() {

  return (
    <div className="bg-brown-dark2 pl-20 pr-20 text-semi-bright flex flex-col items-center">
      <h1 className="text-7xl mb-5">Призы</h1>
      <img className="mb-20 mt-20" src={p1} />
      <img className="mb-20" src={p2} />
      <img className="mb-20" src={p3} />
    </div>
  );
}
