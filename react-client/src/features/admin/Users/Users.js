import i18n from "i18next";
import React, {useState, useEffect} from "react";
import {asyncGet, asyncPost, asyncPut} from "../../../core/api";
import Table from "antd/lib/table/Table";
import EditOutlined from "@ant-design/icons/EditOutlined";
import Form from "./UserForm";
import Input from "antd/lib/input/Input";
import UserForm from "./UserForm";
import dataColumns from "./columns";
import compose from "crocks/helpers/compose";
import {findLens, merge} from "lodash-lens";


export default function Main() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
 

  const onCancel = () => {
    setVisible(false); 
  };

  const onOk = (record) => {
    setVisible(false); 
    asyncPut(`api/admin/users/${record.id}`, record).fork(e => e, user => {
      setUsers(
        users.map(u => u.id === record.id ? ({...u, ...user}) : u)
      );
    });
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
    asyncGet("api/admin/users").fork(() => {}, data => setUsers(data));
  }, []);
  
  return (
    <>
      <Table rowKey="nickName" dataSource={users} columns={columns} scroll={{x: "2000px"}}/>
      {visible && <UserForm user={user} visible={visible} onCancel={onCancel} onOk={onOk}/>}
    </>
  );

}
