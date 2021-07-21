import React, {useState} from "react";
import {Button} from "primereact/button";
import G from "../../../components/Crud/Grid";
import {Dialog} from "primereact/dialog";
import {collect} from "react-recollect";

const Grid= function NominationsGrid({id, store}) {

  const hideSideBar = (key) => {
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== key);
  };

  const renderSidebar = ({baseZIndex, dialogId, nominationId}) => {
    const NominationsNamesGrid = G({api: "api/admin/nominationSections", dialogConfig: {style: {width: "20vw"}}, apiParams: {nominationId}});
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

  const Grid = G({api: "api/admin/nominations", title: "Номинации", customOperations,  width: "100%", apiParams: {id}});
  return (
    <>
      <Grid/>
    </>
  );
};

export default(collect(Grid));
