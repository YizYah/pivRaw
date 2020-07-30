import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import PropTypes from 'prop-types';
import {
  UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
  DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
  ADD_HAS_PARENT_FOR_PARENT_ACTION_ID,
  CREATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
  TYPE_INFO_TYPE_ID,
} from '../../config';

import EditInstanceForm from '../../components/EditInstanceForm';
import DeleteInstanceMenu from '../../components/DeleteInstanceMenu';

// ns__custom_start unit: appSpec, comp: SubInfoChildType, loc: addedImports
import SubInfoChildTypes from '../SubInfoChildTypes';
// ns__custom_end unit: appSpec, comp: SubInfoChildType, loc: addedImports

const SubInfoTypeWrapper = styled.div(
  ({ selected, isDeleting }) => `
  margin: 2em 1em;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine' : '1px solid white'};
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }
`
);

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${(props) => props.hoverColor || '#000000'};
  }
`;

const SubInfoType = ({
  infoType,
  infoTypeId,
  parentId,
  selected,
  label,
  hasParentId,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  childState
}) => {
  const [infoTypeValue, setSubInfoTypeValue] = useState(infoType.value);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const infoTypeData =
    infoType.children &&
    infoType.children.find((child) => child.typeId === TYPE_INFO_TYPE_ID);
  const infoTypes = infoTypeData ? infoTypeData.instances : [];

  if (!selected) {
    return (
      <SubInfoTypeWrapper onClick={() => onSelect(infoTypeId)}>
        {infoTypeValue}
      </SubInfoTypeWrapper>
    );
  }

  const handleSubInfoTypeValueChange = (e) => {
    setSubInfoTypeValue(e.target.value);
  };

  const handleSubInfoInfoTypeValueSave = async () => {
    setIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: infoTypeValue,
          instanceId: infoType.id,
        }),
      },
      refetchQueries,
    });

    setIsEditMode(false);
    setIsSaving(false);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  if (isEditMode) {
    return (
      <SubInfoTypeWrapper>
        <EditInstanceForm
          id={infoTypeId}
          label='SubInfoType Value:'
          value={infoTypeValue}
          onChange={handleSubInfoTypeValueChange}
          onSave={handleSubInfoInfoTypeValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </SubInfoTypeWrapper>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: infoTypeId,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      setIsDeleting(false);
    }
  };

  const handleCanelDelete = () => {
    setIsDeleteMode(false);
  };

  if (isDeleteMode) {
    return (
      <SubInfoTypeWrapper selected={selected} isDeleting={isDeleting}>
        {infoTypeValue}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCanelDelete}
          disabled={isDeleting}
        />
      </SubInfoTypeWrapper>
    );
  }

    return (
    <SubInfoTypeWrapper selected={selected}>
      {infoTypeValue}
      
      <Button type='button' onClick={() => setIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button' onClick={() => setIsDeleteMode(true)}>
        &#128465;
      </Button>

      
    </SubInfoTypeWrapper>
  );
};

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(SubInfoType);
