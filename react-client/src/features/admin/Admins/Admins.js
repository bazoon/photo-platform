import i18n from "i18next";
import React, {useState, useEffect} from "react";
import {asyncGet, asyncPost, asyncPut} from "../../../core/api";
import Table from "antd/lib/table/Table";
import EditOutlined from "@ant-design/icons/EditOutlined";
import Form from "./AdminForm";
import Input from "antd/lib/input/Input";
import AdminForm from "./AdminForm";
import dataColumns from "./columns";
import useApi from "../../../core/hooks/useApi";

export default function Main() {
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [users, usersError, {getApi: getUsers}] = useApi();
  const [admins, adminsError, {getApi: getAdmins, putApi: putAdmin}] = useApi();

  const onCancel = () => {
    setVisible(false); 
  };

  const onOk = (record) => {
    setVisible(false); 
    putAdmin("api/admin/admins", record);
  };

  const handleEdit = (record) => {
    setUser(record);
    setVisible(true);
  }; 

  const editColumn = {
    title: "",
    dataIndex: "operation",
    render: function render (_, record) {
      return <EditOutlined onClick={() => handleEdit(record)}/>;
    }
  };

  const columns = [editColumn].concat(dataColumns);

  useEffect(() => {
    getUsers("api/admin/users");
    getAdmins("api/admin/admins");
  }, []);
  console.log(admins); 
  return (
    <>
      <Table rowKey="user" dataSource={admins} columns={columns} />
      {visible && <AdminForm user={user} visible={visible} onCancel={onCancel} onOk={onOk}/>}
    </>
  );

}
