import {useState} from "react";
import {asyncGet, asyncPut} from "../api";

export default function(send, record) {
  const onCancel = () => {
    send("close");
  };

  const onOk = (record) => {
    send("save", {record});
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
