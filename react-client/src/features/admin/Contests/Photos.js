import React, {useState, useEffect} from "react";
import Grid from "../../../components/Crud/Grid";
import {Dropdown} from "primereact/dropdown";
import {asyncGet, asyncPut} from "../../../core/api";
import {get} from "lodash/fp";
import {TriStateCheckbox} from "primereact/tristatecheckbox";
import CrudMachine from "../../machines/CrudMachine";

const mapOptions = (options) => options.map(({id, name}) => ({label: name, value: id}));

export default function Photos({id}) {
  const [sectionId, setSectionId] = useState(undefined);
  const [sections, setSections] = useState([]);
  const approve = record => asyncPut(`api/admin/contestPhotos/approve/${record.id}`).fork(() => {}, () => { approveOk(record); });
  const decline = record => asyncPut(`api/admin/contestPhotos/decline/${record.id}`).fork(() => {}, () => { declineOk(record); });
  const machine = CrudMachine({api: "api/admin/contestsPhotos", apiParams: {sectionId}});

  const changeApproval = (record, value) => {
    if (value === false) {
      decline(record);
    } else {
      approve(record);
    }
  };

  let refresh;

  const setRefresh = ref => {
    refresh = ref;
  };
  
  const customOperations = [
    record => <TriStateCheckbox value={record.approved} onChange={(e) => changeApproval(record, e.value)} />
  ];


  function approveOk(record) {
    record.approved = true;
    refresh();
  }

  function declineOk(record) {
    record.approved = false;
    refresh();
  }

  const G = ({sectionId}) => {
    if (!sectionId) return null;
    const F = Grid({customOperations, machine, canEdit: false, canDelete: false, canAdd: false, setRefresh});
    return <F/>;
  };

  useEffect(() => {
    asyncGet(`api/admin/contestSections/${id}`).fork(() => {}, data => {
      setSections(mapOptions(data));
      setSectionId(get("[0].id", data));
    });
  }, [id]);

  const handleChangeSection = ({value}) => {
    setSectionId(value);
  };


  return (
    <div>
      <Dropdown className="mb-10" value={sectionId} onChange={handleChangeSection} options={sections}/>
      <G sectionId={sectionId}/>
    </div>
  );
}
