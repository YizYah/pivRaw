import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';

// np__added_start unit: appSpec, comp: InfoTypes_Creation, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// np__added_end unit: appSpec, comp: InfoTypes_Creation, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function InfoTypeCreationForm({ parentId, createInfoType, refetchQueries }) {
  const [ infoTypeValue, updateInfoTypeValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateInfoTypeValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!infoTypeValue) {
      return;
    }

    updateLoading(true);

    const createInfoTypeResponse = await createInfoType({
      variables: {
        actionId: CREATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: infoTypeValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newInfoTypeData = JSON.parse(createInfoTypeResponse.data.Execute);

    


    updateInfoTypeValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor="infoType-value">
        InfoType:
        <input
          id="infoType-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ infoTypeValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating InfoType...'
            : 'Create InfoType'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createInfoType' }),
  
)(InfoTypeCreationForm);
