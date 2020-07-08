import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_SCREEN_FOR_APP_SPEC_ACTION_ID,
  DELETE_SCREEN_FOR_APP_SPEC_ACTION_ID, TYPE_INFO_TYPE_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';


import InfoTypes from '../InfoTypes';



// add styling here
const ScreenStyleWrapper = styled.div(({
  selected,
  isDeleting,
}) => `
  margin: 2em 1em;
  padding: 1.5em;
  border: ${selected ? '1px solid aquamarine': '1px solid white'};
  border-radius: 10px;
  box-shadow: 5px 5px 10px #888888;
  background-color: ${isDeleting && 'tomato'};
  cursor: ${selected ? 'auto' : 'pointer'};

  &:hover {
    border: 1px solid aquamarine;
  }
`);

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${props => props.hoverColor || '#000000'};
  }
`;

function Screen({
  screen,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [screenValue, updateScreenValue] = useState(screen.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  
  const infoTypeData = screen.children && screen.children.find(child => child.typeId === TYPE_INFO_TYPE_ID);
  const infoTypes = infoTypeData ? infoTypeData.instances : [];


  if (!selected) {
    return (
      <ScreenStyleWrapper onClick={() => onSelect(screen.id)}>
        { screenValue }
      </ScreenStyleWrapper>
    );
  }

  function handleScreenValueChange(e) {
    updateScreenValue(e.target.value);
  }

  async function handleScreenValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_SCREEN_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: screenValue,
          instanceId: screen.id,
        }),
      },
      refetchQueries,
    });

    updateIsEditMode(false);
    updateIsSaving(false);
  }

  function handleCancelEdit() {
    updateIsEditMode(false);
  }

  if (isEditMode) {
    return (
      <ScreenStyleWrapper>
        <EditInstanceForm
          id={ screen.id }
          label="Screen Value:"
          value={ screenValue }
          onChange={handleScreenValueChange}
          onSave={handleScreenValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </ScreenStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_SCREEN_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: screen.id,
          }),
        },
        refetchQueries
      });
    } catch (e) {
      updateIsDeleting(false);
    }
  }

  function handleCancelDelete() {
    updateIsDeleteMode(false);
  }

  if (isDeleteMode) {
    return (
      <ScreenStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        { screenValue }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </ScreenStyleWrapper>
    );
  }

  return (
    <ScreenStyleWrapper selected={selected}>
      { screenValue }
      <Button
        type="button"
        onClick={() => updateIsEditMode(true)}
      >
        &#9998;
      </Button>
      <Button
        type="button"
        onClick={() => updateIsDeleteMode(true)}
      >
        &#128465;
      </Button>

      
< InfoTypes
              infoTypes = { infoTypes }
              screenId = { screen.id }
              label="InfoType?"
              refetchQueries={refetchQueries}
      />


    </ScreenStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Screen);
