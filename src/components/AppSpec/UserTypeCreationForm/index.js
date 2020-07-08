import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';

// np__added_start unit: appSpec, comp: UserTypes_Creation, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// np__added_end unit: appSpec, comp: UserTypes_Creation, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function UserTypeCreationForm({ parentId, createUserType, refetchQueries }) {
  const [ userTypeValue, updateUserTypeValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  function handleChange(e) {
    updateUserTypeValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!userTypeValue) {
      return;
    }

    updateLoading(true);

    const createUserTypeResponse = await createUserType({
      variables: {
        actionId: CREATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: userTypeValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newUserTypeData = JSON.parse(createUserTypeResponse.data.Execute);

    


    updateUserTypeValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <label htmlFor="userType-value">
        UserType:
        <input
          id="userType-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ userTypeValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating UserType...'
            : 'Create UserType'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createUserType' }),
  
  
)(UserTypeCreationForm);
