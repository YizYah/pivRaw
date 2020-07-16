import React, { useState, createRef } from "react";

import styled from "styled-components";
import { v4 } from "uuid";
import SubInfoTypeCreationForm from "../SubInfoTypeCreationForm";
import SubInfoType from "../SubInfoType";

const SubInfoTypes = ({
  infoTypes,
  infoTypeId,
  refetchQueries,
  label,
  hasParentId,
  parentId,
}) => {
  const [subInfoTypeID, setSubInfoTypeID] = useState(null);
  const wrapperRef = createRef();
  const [subInfoTypeData, setInfoTypeData] = useState(infoTypes._children);
  const validateSubInfoTypes = subInfoTypeData.length;



  const handleClick = (e) => {
    const node = wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      setSubInfoTypeID(null);
    }
  };

  const handleSelect = (id) => {
    setSubInfoTypeID(id);
  };


  return (
    <div>
      <SubInfoTypeCreationForm 
        parentId={ parentId }
        refetchQueries={refetchQueries}
        infoTypes={infoTypes}
         /* ns__added_start unit: appSpec, comp: Screens, loc: validateScreens */
         validateSubInfoTypes={validateSubInfoTypes}
         /* ns__added_end unit: appSpec, comp: Screens, loc: validateScreens */
      />

      {subInfoTypeData.map(infoType => (
           <SubInfoType
           key={v4()}
           infoType={infoType}
           infoTypeId={infoType.id}
           selected={infoType.id === subInfoTypeID}
           refetchQueries={refetchQueries}
           label={label}
           hasParentId={hasParentId}
           onSelect={handleSelect}
           parentId={parentId}
         />
      )) }

    
    </div>
  );
};

export default SubInfoTypes;
