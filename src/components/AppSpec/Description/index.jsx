/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: Description

// ns__custom_start unit: appSpec, comp: Description, loc: beforeImports
'use strict';
// ns__custom_end unit: appSpec, comp: Description, loc: beforeImports

import React, { useState } from 'react';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';

import PropTypes from 'prop-types';
import {
  UPDATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
  DELETE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
} from '../../../config';

import EditInstanceForm from '../../EditInstanceForm';
import DeleteInstanceMenu from '../../DeleteInstanceMenu';

// ns__custom_start unit: appSpec, comp: Description, loc: addedImports
// ns__custom_end unit: appSpec, comp: Description, loc: addedImports

// ns__custom_start unit: appSpec, comp: Description, loc: styling
// add styling here
const DescriptionStyleWrapper = styled.div(
  ({ selected, isDeleting }) =>`
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
// ns__custom_end unit: appSpec, comp: Description, loc: styling

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

function Description({
  description,
  parentId,
  selected,
  updateInstance,
  deleteInstance,
  refetchQueries,
  onSelect,
  // ns__custom_start unit: appSpec, comp: Description, loc: addedProps
  // ns__custom_end unit: appSpec, comp: Description, loc: addedProps
}) {
  const [descriptionValue, updateDescriptionValue] = useState(
    description.value
  );
  const [isEditMode, updateIsEditMode] = useState(false);
  const [isSaving, updateIsSaving] = useState(false);
  const [isDeleteMode, updateIsDeleteMode] = useState(false);
  const [isDeleting, updateIsDeleting] = useState(false);
  // ns__custom_start unit: appSpec, comp: Description, loc: beginning
  // ns__custom_end unit: appSpec, comp: Description, loc: beginning

  // ns__custom_start unit: appSpec, comp: Description, loc: beforeReturn
  // ns__custom_end unit: appSpec, comp: Description, loc: beforeReturn

  if (!selected) {
    return (
      <DescriptionStyleWrapper onClick={() =>onSelect(description.id)}>
        {descriptionValue}
      </DescriptionStyleWrapper>
    );
  }

  function handleDescriptionValueChange(e) {
    updateDescriptionValue(e.target.value);
  }

  async function handleDescriptionValueSave() {
    updateIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: descriptionValue,
          instanceId: description.id,
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
      <DescriptionStyleWrapper>
        <EditInstanceForm
          id={description.id}
          label='Description Value:'
          value={descriptionValue}
          onChange={handleDescriptionValueChange}
          onSave={handleDescriptionValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </DescriptionStyleWrapper>
    );
  }

  async function handleDelete() {
    updateIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: description.id,
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
      <DescriptionStyleWrapper selected={selected} isDeleting={isDeleting}>
        {descriptionValue}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCancelDelete}
          disabled={isDeleting}
        />
      </DescriptionStyleWrapper>
    );
  }

  return (
    <DescriptionStyleWrapper selected={selected}>
      {descriptionValue}
      <Button type='button' onClick={() =>updateIsEditMode(true)}>
        &#9998;
      </Button>
      <Button type='button' onClick={() =>updateIsDeleteMode(true)}>
        &#128465;
      </Button>

      {/* ns__custom_start unit: appSpec, comp: Description, loc: renderEnding */}
      {/* ns__custom_end unit: appSpec, comp: Description, loc: renderEnding */}
    </DescriptionStyleWrapper>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(Description);

Description.propTypes = {
  description: PropTypes.object,
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
  description: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
  }),
  // ns__custom_start unit: appSpec, comp: Description, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: Description, loc: addedPropTypes
};
