import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

import { CREATE_DESCRIPTION_FOR_APP_SPEC_ACTION_ID
 } from '../../../config';

 // ns__added_start unit: appSpec, comp: Descriptions_Creation, loc: additonalImports
import PropTypes from 'prop-types'; 
// ns__added_end unit: appSpec, comp: Descriptions_Creation, loc: additonalImports

// ns__added_start unit: appSpec, comp: Descriptions_Creation, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #F5F5F5;
`;
// ns__added_end unit: appSpec, comp: Descriptions_Creation, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function DescriptionCreationForm({ parentId, createDescription, refetchQueries }) {
  const [ descriptionValue, updateDescriptionValue ] = useState('');
  const [ loading, updateLoading ] = useState(false);

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
      refetchQueries
    });

    // const newDescriptionData = JSON.parse(createDescriptionResponse.data.Execute);

    


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
      <label htmlFor="description-value">
        Description:
        <input
          id="description-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={ descriptionValue }
          disabled={loading}
        />
      </label>
      <Button type="submit"  disabled={loading}  onClick={handleSubmit}>
        {
          loading
            ? 'Creating Description...'
            : 'Create Description'
        }
      </Button>
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, { name: 'createDescription' }),
  
)(DescriptionCreationForm);


// ns__added_start unit: appSpec, comp: Descriptions_Creation, loc: propTypesDeclaration
DescriptionCreationForm.propTypes = {
  parentId: PropTypes.string,
  refetchQueries: PropTypes.array,
  createDescription: PropTypes.func

}
// ns__added_end unit: appSpec, comp: Descriptions_Creation, loc: propTypesDeclaration