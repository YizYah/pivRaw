import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID,
  DELETE_USER_TYPE_FOR_APP_SPEC_ACTION_ID, TYPE_SCREEN_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';


import Screens from '../Screens';



// add styling here
const UserTypeStyleWrapper = styled.div(({
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

function UserType({
  userType,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
}) {
  const [userTypeValue, updateUserTypeValue] = useState(userType.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);

  
  const screenData = userType.children && userType.children.find(child => child.typeId === TYPE_SCREEN_ID);
  const screens = screenData ? screenData.instances : [];


  if (!selected) {
    return (
      <UserTypeStyleWrapper onClick={() => onSelect(userType.id)}>
        { userTypeValue }
      </UserTypeStyleWrapper>
    );
  }

  function handleUserTypeValueChange(e) {
    updateUserTypeValue(e.target.value);
  }

  async function handleUserTypeValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: userTypeValue,
          instanceId: userType.id,
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
      <UserTypeStyleWrapper>
        <EditInstanceForm
          id={ userType.id }
          label="UserType Value:"
          value={ userTypeValue }
          onChange={handleUserTypeValueChange}
          onSave={handleUserTypeValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </UserTypeStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_USER_TYPE_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: userType.id,
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
      <UserTypeStyleWrapper
        selected={selected}
        isDeleting={isDeleting}
      >
        { userTypeValue }
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </UserTypeStyleWrapper>
    );
  }

  return (
    <UserTypeStyleWrapper selected={selected}>
      { userTypeValue }
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

      
< Screens
              screens = { screens }
              userTypeId = { userType.id }
              label="Screen?"
              refetchQueries={refetchQueries}
      />


    </UserTypeStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(UserType);
