/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: InfoTypeCreationForm

// ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: beforeImports

// ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: beforeImports

import React, { useState } from 'react';
import { graphql } from '@apollo/react-hoc';
import styled, { keyframes } from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';

// ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: addedImports
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, TextField, InputAdornment } from '@material-ui/core';
import IconButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { CREATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID } from '../../../config';

// ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: addedImports

// ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: styling
// change styling here
const Form = styled.div`
  margin:  0 0 0 7%;
  border: none;
  border-radius: 5px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
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
    left: 62%;
    
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
  textField: {
    width: '100%'
  }
});
// ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: styling

const Button = styled.button`
  margin-left: 1em;
`;

function InfoTypeCreationForm({
  parentId,
  createInfoType,
  refetchQueries,
  // ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: addedProps
  validateInfoTypes,
  label,
  // ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: addedProps
}) {
  const [infoTypeValue, updateInfoTypeValue] = useState('');
  const [loading, updateLoading] = useState(false);

  // ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: beginning
  const styles = useStyles();
  const [callout, setCallout] = useState(false);
  const showCalloutBox = callout || validateInfoTypes === 0;
  const callOutText = "What's the name of the type info?";
  // ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: beginning

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
      refetchQueries,
    });

    updateInfoTypeValue('');
    updateLoading(false);
  }

  function handleKeyPress(e) {
    // ns__custom_start unit: appSpec, comp: UserTypeCreationForm, loc: insideHandleKeyPress
    // if (e.charCode === 13) {
    //   handleSubmit(e);
    // }
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
    // ns__custom_end unit: appSpec, comp: UserTypeCreationForm, loc: insideHandleKeyPress
  }

  // ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: beforeReturn
  const showCallout = () => {
    setCallout(!callout);
  };
  return (
    <Form>
      <Label htmlFor='infoType-value'>
        <TextField
          className={styles.textField}
          label='Info Type'
          value={label}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={infoTypeValue}
          disabled={loading}
          variant='outlined'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <HelpOutlineIcon
                  className={styles.helpIcon}
                  onClick={showCallout}
                />
              </InputAdornment>
            ),
          }}
        />
      </Label>

      {showCalloutBox ? (
        <CalloutBox>
          {callOutText}{' '}
          <CloseIcon className={styles.closeIcon} onClick={showCallout} />
        </CalloutBox>
      ) : null}
    </Form>
  );
  // ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: beforeReturn

  // ns__start_replacement return
  // return (
  //   <Form>
  //     <Label htmlFor='infoType-value'>
  //       {label}
  //       <TextField
  //          className={styles.textField}
  //          label="Info Type"
  //          value={label}
  //          onChange={handleChange}
  //          onKeyPress={handleKeyPress}
  //          value={label}
  //          disabled={loading}
  //          variant="outlined"
  //          InputProps={{
  //            endAdornment: (
  //              <InputAdornment position="end">
  //                   <HelpOutlineIcon className={styles.helpIcon} onClick={showCallout}/>
  //              </InputAdornment>
  //            )
  //          }}
  //       />
  //       <InputContainer>
  //         <Input
  //           id='infoType-value'
  //           type='text'
  //           onChange={handleChange}
  //           onKeyPress={handleKeyPress}
  //           value={infoTypeValue}
  //           disabled={loading}
  //         />
  //         <IconButton className={styles.button} onClick={showCallout}>
  //           <HelpOutlineIcon className={styles.helpIcon} />
  //         </IconButton>
  //       </InputContainer>
  //       <Button type='submit' disabled={loading} onClick={handleSubmit}>
  //         {loading ? 'Creating InfoType...' : 'Create InfoType'}
  //       </Button>
  //     </Label>

  //     {showCalloutBox ? (
  //       <CalloutBox>
  //         {callOutText}{' '}
  //         <CloseIcon className={styles.closeIcon} onClick={showCallout} />
  //       </CalloutBox>
  //     ) : null}
  //   </Form>
  // );
  // ns__end_replacement return
}

export default compose(graphql(EXECUTE, { name: 'createInfoType' }))(
  InfoTypeCreationForm
);

InfoTypeCreationForm.propTypes = {
  parentId: PropTypes.string,
  selected: PropTypes.bool,
  validateInfoTypes: PropTypes.number,
  createInfoType: PropTypes.func,
  refetchQueries: PropTypes.array,
  onSelect: PropTypes.func,
  app: PropTypes.shape({
    children: PropTypes.array,
    id: PropTypes.string,
  }),
  infoType: PropTypes.shape({
    value: PropTypes.string,
    id: PropTypes.string,
  }),

  // ns__custom_start unit: appSpec, comp: InfoTypeCreationForm, loc: addedPropTypes
  // ns__custom_end unit: appSpec, comp: InfoTypeCreationForm, loc: addedPropTypes
};
