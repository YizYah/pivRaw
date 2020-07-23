import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { CREATE_SCREEN_FOR_APP_SPEC_ACTION_ID } from '../../../config';

// ns__custom_start unit: appSpec, comp: ScreenCreationForm, loc: addedImports
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { keyframes } from 'styled-components';
// ns__custom_end unit: appSpec, comp: ScreenCreationForm, loc: addedImports

// ns__custom_start unit: appSpec, comp: ScreenCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin: 2em;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
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
  width: inherit;
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
    left: 63%;
    
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
    fontSize: '1rem',
  },
});

// ns__custom_end unit: appSpec, comp: ScreenCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function ScreenCreationForm({
  parentId,
  createScreen,
  refetchQueries,
  // ns__custom_start unit: appSpec, comp: ScreenCreationForm, loc: addedProps
  validateScreens,
  // ns__custom_end unit: appSpec, comp: ScreenCreationForm, loc: addedProps
}) {
  const [screenValue, updateScreenValue] = useState('');
  const [loading, updateLoading] = useState(false);

  // ns__custom_start unit: appSpec, comp: Screens_creation, loc: addedDeclaration
  const styles = useStyles();
  const [callout, setCallout] = useState(false);
  const showCalloutBox = callout || validateScreens === 0;
  const callOutText = "What's the name of this screen?";
  // ns__custom_end unit: appSpec, comp: Screens_creation, loc: addedDeclaration

  function handleChange(e) {
    updateScreenValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!screenValue) {
      return;
    }

    updateLoading(true);

    const createScreenResponse = await createScreen({
      variables: {
        actionId: CREATE_SCREEN_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: parentId,
          value: screenValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    updateScreenValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  // ns__custom_start unit: appSpec, comp: Screens_creation, loc: beforeReturn*/
  const showCallout = () => {
    setCallout(!callout);
  };
  // ns__custom_end unit: appSpec, comp: Screens_creation, loc: beforeReturn*/

  return (
    <Form>
      {/* // ns__custom_start unit: appSpec, comp: Screens_creation, loc: callOut */}
      <Label htmlFor='screen-value'>
        Screen:
        <InputContainer>
          <Input
            id='screen-value'
            type='text'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={screenValue}
            disabled={loading}
          />

          <IconButton className={styles.button} onClick={showCallout}>
            <HelpOutlineIcon className={styles.helpIcon} />
          </IconButton>
        </InputContainer>
        <Button type='submit' disabled={loading} onClick={handleSubmit}>
          {loading ? 'Creating Screen...' : 'Create Screen'}
        </Button>
      </Label>
      {showCalloutBox ? (
        <CalloutBox>
          {callOutText}{' '}
          <CloseIcon className={styles.closeIcon} onClick={showCallout} />
        </CalloutBox>
      ) : null}
      {/* // ns__custom_end unit: appSpec, comp: Screens_creation, loc: callOut */}
    </Form>
  );
}

export default compose(graphql(EXECUTE, { name: 'createScreen' }))(
  ScreenCreationForm
);

ScreenCreationForm.propTypes = {
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  createScreen: PropTypes.func,
  refetchQueries: PropTypes.array,
  onSelect: PropTypes.func,
  validateScreens: PropTypes.number,
  // ns__custom_start unit: appSpec, comp: Info_Type, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: Info_Type, loc: addedPropTypes
};
