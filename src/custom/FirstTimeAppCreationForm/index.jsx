/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */

import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_APP_FOR_APP_SPEC_ACTION_ID } from '../../config';

// ns__custom_start unit: appSpec, comp: DescriptionCreationForm, loc: addedImports
import PropTypes from 'prop-types';
// ns__custom_end unit: appSpec, comp: DescriptionCreationForm, loc: addedImports

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

const Button = styled.button`
  margin-left: 1em;
`;

function AppCreationForm({ customerId, createApp, refetchQueries }) {
  const [appValue, updateAppValue] = useState('');
  const [loading, updateLoading] = useState(false);

  function handleChange(e) {
    updateAppValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!appValue) {
      return;
    }

    updateLoading(true);

    const createAppResponse = await createApp({
      variables: {
        actionId: CREATE_APP_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: customerId,
          value: appValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    updateAppValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor='app-value'>
        App:
        <input
          id='app-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={appValue}
          disabled={loading}
        />
      </label>
      <Button type='submit' disabled={loading} onClick={handleSubmit}>
        {loading ? 'Creating App...' : 'Create App'}
      </Button>
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: 'createApp' }))(
  AppCreationForm
);

AppCreationForm.propTypes = {
  customerId: PropTypes.string,
  refetchQueries: PropTypes.array,
  createApp: PropTypes.func,
  // ns__custom_start unit: appSpec, comp: AppCreationForm, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: AppCreationForm, loc: addedPropTypes
};
