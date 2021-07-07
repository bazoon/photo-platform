import React, {useState, useEffect} from "react";
import Grid from "../../../components/Crud/Grid";
import {Dropdown} from "primereact/dropdown";
import {asyncGet} from "../../../core/api";
import {get} from "lodash/fp";


const mapOptions = (options) => options.map(({id, name}) => ({label: name, value: id}));

export default function Results({id}) {
  const [sectionId, setSectionId] = useState(undefined);
  const [sections, setSections] = useState([]);

  const G = ({sectionId}) => {
    if (!sectionId) return null;
    const F = Grid({api: "api/admin/results", apiParams: {sectionId}, canEdit: false, canDelete: false, canAdd: false});
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
