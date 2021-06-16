import React from "react";
import EditOutlined from "@ant-design/icons/EditOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";

export default function useColumns({record, handleEdit, handleDelete}) {

  const editColumn = {
    title: "edit",
    width: "50px",
    dataIndex: "edit",
    render: function render (_, record) {
      return <EditOutlined onClick={() => handleEdit(record)}/>;
    }
  };

  const deleteColumn = {
    title: "del",
    width: "50px",
    dataIndex: "del",
    render: function render (_, record) {
      return <DeleteOutlined onClick={() => handleDelete(record)}/>;
    }
  };
  return {
    editColumn,
    deleteColumn
  };
}

