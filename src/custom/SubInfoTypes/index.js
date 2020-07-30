import React, { useState, createRef } from 'react';

import styled from 'styled-components';
import { v4 } from 'uuid';
import SubInfoTypeCreationForm from '../SubInfoTypeCreationForm';
import SubInfoType from '../SubInfoType';

const SubInfoTypes = ({
  subInfoTypes,
  infoTypeId,
  refetchQueries,
  label,
  hasParentId,
  parentId,
  childState
}) => {
  const [subInfoTypeID, setSubInfoTypeID] = useState(null);
  const wrapperRef = createRef();
  const [subInfoTypeData, setInfoTypeData] = useState(subInfoTypes);
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
        parentId={parentId}
        refetchQueries={refetchQueries}
        /* // ns__custom_start unit: appSpec, comp: SubInfo_Types, loc: addedPropsForCreationForm */
        validateSubInfoTypes={validateSubInfoTypes}
        childId={infoTypeId}
        /* // ns__custom_end unit: appSpec, comp: SubInfo_Types, loc: addedPropsForCreationForm */
      />

      {subInfoTypeData && subInfoTypeData.map((infoType) => (

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
          childState={childState}
        />
      ))}
    </div>
  );
};

export default SubInfoTypes;
