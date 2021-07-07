import {useState} from "react";
import {asyncGet, asyncPut} from "../api";

export default function(send, record) {
  const onCancel = () => {
    send("close");
  };

  const onOk = (data) => {
    send("save", {data});
  };

  const handleEdit = (record) => {
    send("edit", record);
  }; 
  const handleAdd = () => {
    send("add");
  }; 


  const handleDelete = (id) => {
    send("remove", id);
  }; 

  const onChange = (changed, all) => {
    console.log(changed);
    send("updateRecord", {record: {...record, ...changed}});
  };

  return {
    onCancel,
    onOk,
    handleEdit,
    handleAdd,
    handleDelete,
    onChange
  };
}
