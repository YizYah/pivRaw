import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID } from '../../../config';

// ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: addedImports
import PropTypes from 'prop-types';
// ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: addedImports

// ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
`;
// ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function DescriptionCreationForm({
  parentId,
  createDescription,
  refetchQueries,
  // ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: addedProps
  // ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: addedProps
}) {
  const [descriptionValue, updateDescriptionValue] = useState('');
  const [loading, updateLoading] = useState(false);
  // ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: beginning
  // ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: beginning

  function handleChange(e) {
    updateDescriptionValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!descriptionValue) {
      return;
    }

    updateLoading(true);

    const createDescriptionResponse = await createDescription({
      variables: {
        actionId: CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: descriptionValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    updateDescriptionValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor='description-value'>
        Description:
        <input
          id='description-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={descriptionValue}
          disabled={loading}
        />
      </label>
      <Button type='submit' disabled={loading} onClick={handleSubmit}>
        {loading ? 'Creating Description...' : 'Create Description'}
      </Button>
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: 'createDescription' }))(
  DescriptionCreationForm
);

DescriptionCreationForm.propTypes = {
  parentId: PropTypes.string,
  refetchQueries: PropTypes.array,
  createDescription: PropTypes.func,
  // ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: addedPropTypes
};
