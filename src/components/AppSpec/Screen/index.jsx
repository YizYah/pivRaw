/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: Screen

// ns__custom_start unit: appSpec, comp: Screen, loc: beforeImports
// ns__custom_end unit: appSpec, comp: Screen, loc: beforeImports

import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import {
  UPDATE_SCREEN_FOR_APP_SPEC_ACTION_ID,
  DELETE_SCREEN_FOR_APP_SPEC_ACTION_ID,
  TYPE_INFO_TYPE_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

import InfoTypes from '../InfoTypes';

// ns__custom_start unit: appSpec, comp: Screen, loc: addedImports
import PropTypes from 'prop-types';
// ns__custom_end unit: appSpec, comp: Screen, loc: addedImports

// ns__custom_start unit: appSpec, comp: Screen, loc: styling
// add styling here
const ScreenStyleWrapper = styled.div(
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
// ns__custom_end unit: appSpec, comp: Screen, loc: styling

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

function Screen({
  screen,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  // ns__custom_start unit: appSpec, comp: Screen, loc: addedProps
  // ns__custom_end unit: appSpec, comp: Screen, loc: addedProps
}) {
  const [screenValue, updateScreenValue] = useState(screen.value);
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  // ns__custom_start unit: appSpec, comp: Screen, loc: beginning
  // ns__custom_end unit: appSpec, comp: Screen, loc: beginning

  const infoTypeData =
    screen.children &&
    screen.children.find((child) => child.typeId === TYPE_INFO_TYPE_ID);
  const infoTypes = infoTypeData ? infoTypeData.instances : [];

  // ns__custom_start unit: appSpec, comp: Screen, loc: beforeReturn
  // ns__custom_end unit: appSpec, comp: Screen, loc: beforeReturn

  if (!selected) {
    return (
      <ScreenStyleWrapper onClick={() => onSelect(screen.id)}>
        {screenValue}
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
          id={screen.id}
          label='Screen Value:'
          value={screenValue}
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
        refetchQueries,
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
      <ScreenStyleWrapper selected={selected} isDeleting={isDeleting}>
        {screenValue}
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
      {screenValue}

      <Button type='button' onClick={() => updateIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button' onClick={() => updateIsDeleteMode(true)}>
        &#128465;
      </Button>

      <InfoTypes
        infoTypes={infoTypes}
        screenId={screen.id}
        label='InfoType?'
        refetchQueries={refetchQueries}
      />

      {/* ns__custom_start unit: appSpec, comp: Screen, loc: renderEnding */}
      {/* ns__custom_end unit: appSpec, comp: Screen, loc: renderEnding */}
    </ScreenStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Screen);

Screen.propTypes = {
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  updateInstance: PropTypes.func,
  deleteInstance: PropTypes.func,
  refetchQueries: PropTypes.array,
  onSelect: PropTypes.func,
  app: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
  }),
  screen: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
    children: PropTypes.array,
  }),
  // ns__custom_start unit: appSpec, comp: Screen, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: Screen, loc: addedPropTypes
};
