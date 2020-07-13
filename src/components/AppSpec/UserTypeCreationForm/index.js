import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled, { keyframes } from 'styled-components';
import { withNoStack, EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';


// ns__added_start unit: appSpec, comp: UserType_Creation, loc: additionalImports
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/Button';
import { CREATE_USER_TYPE_FOR_APP_SPEC_ACTION_ID } from '../../../config';

// ns__added_end unit: appSpec, comp: UserType_Creation, loc: additionalImports

// ns__added_start unit: appSpec, comp: UserTypes_Creation, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Input = styled.input`
  :focus,
  textarea:focus,
  select:focus {
    outline: none;
    border: 0;
  }
  border: 0;
  -webkit-appearance: none;
  background-color: inherit;
  padding: 10px 0;
  border-radius: 10px;
`;

const InputContainer = styled.div`
  background-color: white;
  border-radius: 10px;
`;

const fadeInDown = keyframes`
0% {
  opacity: 0;
  
}
100% {
  opacity: 1;
  
}
`;

const CalloutBox = styled.div`
  padding: 1rem;
  animation: ${fadeInDown} 1.5s;
  background-color: #f9d162;
  width: 100%;
  border-radius: 10px;  
  position: relative;
  margin: .5rem;
  display: flex;
  justify-content: space-between;
  

  :after{
    background-color: #f9d162;
    position: absolute;
    width: 30px;
    height: 10px;
    border-top: 0px solid #f9d162;
    border-right: 2px solid #f9d162;
    border-left: 0px solid #f9d162;
    border-bottom: 2px solid #f9d162;
    left: 60%;
    
    content: '';
    transform: rotate(45deg);
    margin-top: -13px;
    }
  }
`;

const useStyles = makeStyles({
  button: {
    minWidth: 0,
  },
  customWidth: {
    maxWidth: '500',
    minWidth: '300',
    backgroundColor: 'blue',
  },
  helpIcon: {
    fontSize: '1.5rem',
    color: '#f9d162',
  },
  closeIcon: {
    color: 'white',
    fontSize: '1.2rem',
  },
});

// ns__added_end unit: appSpec, comp: UserTypes_Creation, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function UserTypeCreationForm({
  parentId,
  createUserType,
  refetchQueries,
  // ns__added_start unit: appSpec, comp: UserTypes_Creation, loc: validateUserTYpes
  validateUserTypes,
  // ns__added_end unit: appSpec, comp: UserTypes_Creation, loc: validateUserTYpes
}) {
  const [userTypeValue, updateUserTypeValue] = useState('');
  const [loading, updateLoading] = useState(false);

  // ns__added_start unit: appSpec, comp: UserTypes_Creation, loc: additionalDeclaration
  const styles = useStyles();
  const [callout, setCallout] = useState(false);
  const showCalloutBox = callout || validateUserTypes === 0;
  const callOutText = 'What\'s the type of user for this App?';
  // ns__added_end unit: appSpec, comp: UserTypes_Creation, loc: additionalDeclaration

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
      refetchQueries,
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
  // ns__added_start unit: appSpec, comp: UserTypes_Creation, loc: callOutFunction*/
  const showCallout = () => {
    setCallout(!callout);
  };
  // ns__added_end unit: appSpec, comp: UserTypes_Creation, loc: callOutFunction*/

  return (
    <Form>
      {/* // ns__added_start unit: appSpec, comp: UserTypes_Creation, loc: callOut */}
      <Label htmlFor="userType-value">
        UserType:
        <InputContainer>
          <Input
            id="userType-value"
            type="text"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={userTypeValue}
            disabled={loading}
          />

          <IconButton className={styles.button} onClick={showCallout}>
            <HelpOutlineIcon className={styles.helpIcon} />
          </IconButton>
        </InputContainer>
     
        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          {loading ? 'Creating UserType...' : 'Create UserType'}
        </Button>
      </Label>
      {showCalloutBox ? (
        <CalloutBox>
          {callOutText}{' '}
          <CloseIcon className={styles.closeIcon} onClick={showCallout} />
        </CalloutBox>
      ) : null}
    {/* // ns__added_end unit: appSpec, comp: UserTypes_Creation, loc: callOut */}
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: 'createUserType' }))(
  UserTypeCreationForm
);
