import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_APP_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';


// ns__added_start unit: appSpec, comp: Descriptions_Creation, loc: additonalImports
import PropTypes from 'prop-types'; 
// ns__added_end unit: appSpec, comp: Descriptions_Creation, loc: additonalImports

// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;

const Button = styled.button`
  margin-left: 1em;
`;

function AppCreationForm({ customerId, createApp, refetchQueries }) {
  const [ appValue, updateAppValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

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
      <label htmlFor="app-value">
        App:
        <input
          id="app-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ appValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating App...'
            : 'Create App'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createApp' }),
  
  
  
)(AppCreationForm);


// ns__added_start unit: appSpec, comp: Apps_Creation, loc: propTypesDeclaration
AppCreationForm.propTypes = {
  customerId: PropTypes.string,
  refetchQueries: PropTypes.array,
  createApp: PropTypes.func
}
// ns__added_end unit: appSpec, comp: Apps_Creation, loc: propTypesDeclaration