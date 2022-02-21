import React, {useState, useEffect} from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
import Compress from "compress.js";
import {map} from "lodash/fp";
import {Button} from "primereact/button";
import { Dialog } from "primereact/dialog";


const delRecordToParams = (api, record) => api + "/" + record.id + "/" + record.slug;

function dataURLtoFile({alt, data, ext}) {
  const arr = data.split(",");
  const bstr = atob(data); 
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], alt, {type: ext});
}

// [File] -> Promise(File)
const compress = data => {
  return new Promise((resolve, reject) => {
    const compress = new Compress();
    compress.compress(data, {
      size: 2, 
      quality: .95, 
      resize: true, 
    }).then(files => {
      const compressed = map(dataURLtoFile, files);
      resolve(compressed);
    });
  });
};

const toFormData = (obj) => {
  const keys = Object.keys(obj);
  
  const promiseFields = keys.map(k => {
    const data = obj[k];

    if (Array.isArray(data)) {
      const compressed = compress(data);
      return compressed.then(d => ({[k]: d}));
    } else if ((data instanceof File) && data.type.includes("image")) {
      const compressed = compress([data]);
      return compressed.then(d => ({[k]: d}));
    } else {
      return Promise.resolve({[k]: data});
    }
  });  

  
  return new Promise((resolve, reject) => {
    const formData = new FormData;
    Promise.all(promiseFields).then(fields => {
      fields.forEach(field => { 
        Object.keys(field).forEach(k => {
          const fieldData = field[k];
          if (Array.isArray(fieldData)) {
            fieldData.forEach(d => {
              formData.append(k, d);
            });
          } else {
            formData.append(k, fieldData);
          }
        });
      });
      resolve(formData);
    });
  });
};


export default (record) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState();
  const [imageDimensions, setImageDimensions] = useState({});
  const [size, setSize] = useState(0);

  const machine = CrudMachine({api: "api/admin/saloneFiles", apiParams: {saloneId: record.id, slug: record.slug}, delRecordToParams, toFormData});

  const handleView = rowData => {
    setOpen(true);
    setImage(rowData.url);
    setSize(rowData.fileSize);
  };

  const onHide = () => {
    setOpen(false);
  };

  const customOperations = [
    rowData => <Button key={rowData.id} icon="pi pi-eye" className="ml-5 p-button-rounded p-button-success" onClick={() => handleView(rowData)} />
  ];

  useEffect(() => {
    if (image) {
      var img = new Image();
      img.onload = function() {
        setImageDimensions({width: img.width, height: img.height});
      };
      img.src = image;
    }
  }, [image]);


  const G = Grid({machine, customOperations});
  return (
    <>
      <G/>
      <Dialog header="Header Text" visible={open} style={{width: "60vw", height: "40vh"}} modal onHide={onHide}>
        <div className="flex flex-col">
          <img src={image} className="h-96 mb-10 object-contain block" />
          <div className="grid grid-cols-5 grid-rows-2">
            <div className="col-span-1">Размер</div>
            <div className="col-span-4">{size} kb</div>
            <div className="col-span-1">Ширина</div>
            <div className="col-span-4">{imageDimensions.width} px</div>
            <div className="col-span-1">Высота</div>
            <div className="col-span-4">{imageDimensions.height} px</div>
          </div>
        </div>
      </Dialog>
    </>
  );
};


















