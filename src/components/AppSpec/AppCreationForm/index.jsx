/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: AppCreationForm

// ns__custom_start unit: appSpec, comp: AppCreationForm, loc: beforeImports



// ns__custom_end unit: appSpec, comp: AppCreationForm, loc: beforeImports

import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_APP_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';

// ns__custom_start unit: appSpec, comp: AppCreationForm, loc: addedImports
// ns__custom_end unit: appSpec, comp: AppCreationForm, loc: addedImports

// ns__custom_start unit: appSpec, comp: AppCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// ns__custom_end unit: appSpec, comp: AppCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function AppCreationForm({
                           customerId,
                           createApp,
                           refetchQueries,
// ns__custom_start unit: appSpec, comp: AppCreationForm, loc: addedProps
// ns__custom_end unit: appSpec, comp: AppCreationForm, loc: addedProps

                         }) {
  const [ appValue, updateAppValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);
  // ns__custom_start unit: appSpec, comp: AppCreationForm, loc: beginning
  // ns__custom_end unit: appSpec, comp: AppCreationForm, loc: beginning

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
      refetchQueries
    });

    // const newAppData = JSON.parse(createAppResponse.data.Execute);

    


    updateAppValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  // ns__custom_start unit: appSpec, comp: AppCreationForm, loc: beforeReturn
  // ns__custom_end unit: appSpec, comp: AppCreationForm, loc: beforeReturn

  // ns__start_section return
  return (
    <Form>
      <label htmlFor='app-value'>
        App:
        <input
          id='app-value'
          type='text'
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ appValue }
          disabled={loading}
        />
      </label>
      <Button type='submit'  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating App...'
            : 'Create App'
        }
      </Button>
    </Form>
  );
  // ns__end_section return
}

export default compose(
  graphql(EXECUTE, { name: 'createApp' }),
  
  
  
)(AppCreationForm);
