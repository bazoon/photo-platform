import React, {useState} from "react";
import { Document, Page } from "react-pdf";
import {range} from "lodash/fp";

export default function Main() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="container flex justify-center flex-1 bg-brown-dark2 text-bright"> 
      <div className="relative flex justify-center mt-20">
        <Document
          file="./pol.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {range(1, numPages + 1).map(pageNumber => <Page key={"p" + pageNumber} pageNumber={pageNumber} />)}
        </Document>
      </div>

    </div>
  );
}
