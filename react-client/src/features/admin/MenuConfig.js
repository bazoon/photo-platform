import React, {useState, useEffect} from "react";
import {showConfirm} from "../../core/utils";
import {asyncGet, asyncPost, asyncPut, asyncDel} from "../../core/api";
import {Field} from "react-final-form";
import { Dropdown } from "primereact/dropdown";
import {Button} from "primereact/button";
import Tree from "react-animated-tree";
import useMessage from "../../core/useMessage";

const MenuConfig = ({id}) => {
  const [parent, setParent] = useState();
  const [children, setChildren] = useState([]);
  const [lexicons, setLexicons] = useState([]);
  const {renderMessage, showErrorMessage} = useMessage({timeout: 3000});

  const failed = () => {
    console.log("FAILED");
  };

  const add = () => {

  };

  const cancel = () => {

  };

  const renderAddDialog = () => {
    return (
      <div>
        <Field name="lexiconId" render={({input}) => (
          <div className="p-field">
            <div>
              <label htmlFor="lexiconId">Lexicon</label>
              <Dropdown id="id" value={input.value} onChange={input.onChange} options={lexicons} optionLabel="code" />
            </div>
          </div>
        )} />
      </div>
    );
  };

  const renderEditDialog = () => {
    return (
      <div>
        <Field name="lexiconId" render={({input}) => (
          <div className="p-field">
            <div>
              <label htmlFor="lexiconId">Lexicon</label>
              <Dropdown id="lexiconId" value={input.value} onChange={input.onChange} options={lexicons} optionValue="id" optionLabel="code" />
            </div>
          </div>
        )} />
      </div>
    );
  };

  const createItem = payload => {
    return asyncPost("api/admin/menuConfig", payload);
  };
  
  const updateItem = payload => {
    return asyncPut("api/admin/menuConfig/" + payload.id, payload);
  };

  const addOk = (item, {lexiconId}) => {
    const createItemFailed = e => {
      showErrorMessage("Во время сохранения произошла ошибка");
    };

    const createItemOk = newItem => {
      setChildren(ch => ch.concat([newItem]));
    };
    createItem({lexiconId: lexiconId.id, parentId: item.id, contestId: id}).fork(createItemFailed, createItemOk);
  };

  const editOk = (item, {lexiconId}) => {
    const editItemFailed = () => {
      showErrorMessage("Во время сохранения произошла ошибка");
    };

    const editItemOk = updatedItem => {
      setChildren(ch => ch.map(item =>  item.id === updatedItem.id ? updatedItem : item));
    };
    updateItem({...item, lexiconId}).fork(editItemFailed, editItemOk);
  };

  const handleAdd = item => {
    showConfirm({
      content: renderAddDialog(item),
      cancelButton: "Отмена",
      confirmButton: "Сохранить"
    }).fork(cancel, values => addOk(item, values));
  };

  const handleEdit = item => {
    showConfirm({
      initialValues: item,
      content: renderEditDialog(item),
      cancelButton: "Отмена",
      confirmButton: "Сохранить"
    }).fork(cancel, values => editOk(item, values));
  };

  const handleDelete = item => {
      const deleteFailed = () => {
        showErrorMessage("Во время удаления произошла ошибка");
      };

      const deleteOk = d => {
        setChildren(ch => ch.filter(i => i.id != item.id));
      };
    asyncDel("api/admin/menuConfig/" + item.id).fork(deleteFailed, deleteOk);
  };

  const renderControls = item => {
    return (
      <div className="inline-flex">
        <div className="mr-5">{item.code}</div>
        <Button className="mr-2" icon="pi pi-pencil" onClick={() => handleEdit(item)}/>
        <Button className="mr-2" icon="pi pi-plus" onClick={() => handleAdd(item)}/>
        <Button className="mr-2" icon="pi pi-trash" onClick={() => handleDelete(item)}/>
        <Button className="mr-2" icon="pi pi-arrow-down" onClick={() => handleEdit(item)}/>
        <Button className="mr-2" icon="pi pi-arrow-up" onClick={() => handleEdit(item)}/>
      </div>
    );
  };

  const renderItem = (item, items, level) => {
    const children = items.filter(i => i.parentId === item.id);
      
    if (children.length === 0) {
      return <Tree key={item.id} content={renderControls(item)} />;
    } else {
      return <Tree open={true} key={item.id} content={renderControls(item)} type="">
        {
          children.map(i => renderItem(i, items, level * 8))
        }
      </Tree>;
    }
  };

  const loadOk = menu => {
    setChildren(menu.children);
    setParent(menu.parent);
  };


  const load = () => {
    asyncGet("api/admin/menuConfig/" + id).fork(failed, loadOk);
  };

  const loadLexiconsOk = d => {
    setLexicons(d);
  };

  const loadLexicons = () => {
    asyncGet("api/admin/lexicons").fork(failed, loadLexiconsOk);
  };
  
  useEffect(() => {
    load();
    loadLexicons();
  }, []);

  return (
    <div className="mt-10 text-3xl">
      {renderMessage()}
      {
        parent && renderItem(parent, children, 1)
      }
    </div>
  );
};

export default MenuConfig;

