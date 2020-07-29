import React, { useState, createRef } from 'react';

import styled from 'styled-components';
import { v4 } from 'uuid';
import SubInfoTypeCreationForm from '../SubInfoTypeCreationForm';
import SubChildInfoType from '../SubChildInfoType';

const SubInfoChildTypes = ({
  refetchQueries,
  label,
  hasParentId,
  parentId,
  childState,
  subInfoId,
}) => {
  const [subInfoTypeID, setSubInfoTypeID] = useState(null);
  const wrapperRef = createRef();
  const [subInfoTypeData, setInfoTypeData] = useState(childState);
  const [validateCount, setvalidateCount] = useState(0);

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
        /* // ns__custom_start unit: appSpec, comp: SubInfoChildTypes, loc: addedPropsForCreationForm */
        validateSubInfoTypes={validateCount}
        childId={subInfoId}

        /* // ns__custom_end unit: appSpec, comp: SubInfoChildTypes, loc: addedPropsForCreationForm */
      />

      {subInfoTypeData.map((infoType) => {
        
        if (subInfoId === infoType.parentId) {
          if (validateCount === 0) setvalidateCount(validateCount + 1);
          return (
            <SubChildInfoType
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
          );
        }
      })}
    </div>
  );
};

export default SubInfoChildTypes;
