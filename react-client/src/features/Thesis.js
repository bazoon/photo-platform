import i18n from "i18next";

import React, {useState, useEffect} from "react";
import {asyncGet} from "../core/api";


import { Document, Page } from "react-pdf";
import {range} from "lodash/fp";
export default function Main() {
  const [thesis, setThesis] = useState("");
 

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    //console.log(numPages);
  }

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
      <div className="relative flex justify-center mt-20">
        <Document
          file="uploads/docs/tesis.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {range(1, numPages + 1).map(pageNumber => <Page key={"p" + pageNumber} pageNumber={pageNumber} />)}
        </Document>
      </div>

    </div>
  );



  // useEffect(() => {
  //   asyncGet("api/thesis/ru").fork(() => {}, data => { setThesis(data.thesis); });
  // }, []);
 

  // return (
  //   <div>
  //     <div dangerouslySetInnerHTML={{__html: thesis}}></div>
  //   </div>
  // );

}
