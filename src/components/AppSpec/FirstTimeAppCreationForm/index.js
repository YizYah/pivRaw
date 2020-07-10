import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_APP_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';

 // ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: additionalImport
 import { CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';
// ns__added_end unit: appSpec, comp: FirstTimeApplication_Creation, loc: additionalImport

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

function AppCreationForm({ customerId, createApp, refetchQueries, 
  // ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: createDescription
  createDescription 
  // ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: createDescription
}) {
  const [ appValue, updateAppValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

  // ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: additionalDeclaration
  const [ descriptionValue, updateDescriptionValue ] = useState('');


  function handleDescChange(e) {
    updateDescriptionValue(e.target.value);
  }

 // ns__added_end unit: appSpec, comp: FirstTimeApplication_Creation, loc: additionalDeclaration
 
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

    const newAppData = JSON.parse(createAppResponse.data.Execute);

    // ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: descriptionCreation
    const createDescriptionResponse = await createDescription({
      variables: {
        actionId: CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: newAppData.instanceId,
          value: descriptionValue,
        }),
        unrestricted: false,
      },
      refetchQueries
    });

    const newDescriptionData = JSON.parse(createDescriptionResponse.data.Execute);
    updateDescriptionValue('')
   // ns__added_end unit: appSpec, comp: FirstTimeApplication_Creation, loc: descriptionCreation

    

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
          required
        />
      </label>
      {/* ns__added_start unit: appSpec, comp: FirstTimeApplication_Creation, loc: descriptionLabel} */}
      <label htmlFor="description-value">
        Description:
        <input
          id="description-value"
          type="text"
          onChange={handleDescChange}
          onKeyPress={handleKeyPress}
          value={ descriptionValue }
          disabled={loading}
          required
        />
      </label>
      {/* ns__added_end unit: appSpec, comp: FirstTimeApplication_Creation, loc: descriptionLabel} */}
      <Button type="submit"  disabled={loading || !appValue || !descriptionValue}  onClick={handleSubmit}>
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
  graphql(EXECUTE, { name: 'createDescription' }),
  
  
  
)(AppCreationForm);
