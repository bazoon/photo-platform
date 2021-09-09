import React, {useState} from "react";
import {Button} from "primereact/button";
import G from "../../../components/Crud/Grid";
import {Dialog} from "primereact/dialog";
import {collect} from "react-recollect";
import CrudMachine from "../../machines/CrudMachine";

const Grid = function NominationsGrid({id, store}) {

  const hideSideBar = (key) => {
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== key);
  };

  const renderSidebar = ({baseZIndex, dialogId, nominationId}) => {
    const machine = CrudMachine({api: "api/admin/nominationSections", apiParams: {nominationId}});
    const NominationsNamesGrid = G({machine, dialogConfig: {style: {width: "20vw"}}});
    return (
      <Dialog header="Перевод номинаций" visible={true} baseZIndex={baseZIndex} dismissableMask modal style={{width: "40%"}}  onHide={() => hideSideBar(dialogId)}>
        <NominationsNamesGrid/>
      </Dialog>
    );
  };

  const loadSections = ({id}) => {
    const props = {
      id,
      section: id,
      key: id,
      baseZIndex: 2,
      dialogId: "NominationsNames",
      nominationId: id
    };

    store.sidebars.push({Component: renderSidebar, props});
  };


  const customOperations = [
    record => <Button icon="pi pi-link" onClick={_ => loadSections(record) } className="p-button-rounded" />
  ];
    
  // select * from section_names
  
  const machine = CrudMachine({api: "api/admin/nominations", apiParams: {id}});
  const Grid = G({machine, title: "Номинации", customOperations,  width: "100%"});
  return (
    <>
      <Grid/>
    </>
  );
};

export default(collect(Grid));
