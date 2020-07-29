import React, { useState, useEffect, createRef } from 'react';
import SubInfoTypeCreationForm from '../SubInfoTypeCreationForm';
import styled from 'styled-components';
import { EXECUTE } from '@nostack/no-stack';
import compose from '@shopify/react-compose';
import { graphql } from '@apollo/react-hoc';
import { v4 } from 'uuid';

import EditInstanceForm from '../../components/EditInstanceForm';
import DeleteInstanceMenu from '../../components/DeleteInstanceMenu';

import {
  UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
  DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
} from '../../config';

const SubInfoTypeWrapper = styled.div(
  ({ selected, isDeleting }) => `
    margin: 2em 1em;
    padding: 1.5em;
    border: ${selected ? '1px solid aquamarine' : '1px solid white'};
    border-radius: 10px;
    box-shadow: 5px 5px 10px #888888;
    background-color: ${isDeleting && 'tomato'};
    cursor: ${selected ? 'auto' : 'pointer'};
  
    &:hover {
      border: 1px solid aquamarine;
    }
  `
);
// ns__custom_end unit: appSpec, comp: InfoType, loc: styling

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  &:hover {
    color: ${(props) => props.hoverColor || '#000000'};
  }
`;

const InfoTypesStyleWrapper = styled.div``;

const SubInfoComponent = ({
  infoType,
  instanceId,
  parentId,
  refetchQueries,
  updateInstance,
  deleteInstance,
}) => {
  const [infoTypeValue, setSubInfoTypeValue] = useState('');
  const [show, setShow] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedInfoTypeId, setselectedInfoTypeId] = useState(null);
  const [subInfoTypeID, setSubInfoTypeID] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  let wrapperRef = createRef();

  useEffect(() => {
    if (!currentId) {
      setCurrentId(instanceId);
    }
  }, [isEditMode]);

  async function handleInfoTypeValueSave() {
    setIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: infoTypeValue,
          instanceId: currentId,
        }),
      },
      refetchQueries,
    });

    setIsEditMode(false);
    
    setIsSaving(false);
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: currentId,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      setIsDeleting(false);
    }
  };

  const handleSubInfoTypeValueChange = (e) => {
    setSubInfoTypeValue(e.target.value);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    
  };

  const handleCanelDelete = () => {
    setIsDeleteMode(false);
  };

  if (isEditMode) {
    return (
      <SubInfoTypeWrapper>
        <EditInstanceForm
          id={currentId}
          label='SubInfoType Value:'
          value={infoTypeValue}
          onChange={handleSubInfoTypeValueChange}
          onSave={handleInfoTypeValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </SubInfoTypeWrapper>
    );
  }

  if (isDeleteMode) {
    return (
      <SubInfoTypeWrapper isDeleting={isDeleting}>
        {infoTypeValue}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCanelDelete}
          disabled={isDeleting}
        />
      </SubInfoTypeWrapper>
    );
  }

  //

  const checkID = (id, data) => {
    if (!data || !data.length) return null;
    if (id === data[0].parentId) {
      setShow(!show);
    }
  };

  const handleSelect = (id) => {
    setSubInfoTypeID(id);
  };

  if (!infoType) return null;

  

  return (
    <InfoTypesStyleWrapper ref={wrapperRef} key={v4()}>
      <SubInfoTypeCreationForm
        key={v4()}
        parentId={parentId}
        childId={currentId}
        refetchQueries={refetchQueries}
      />
      {infoType.map((instance) => {
        if (instanceId === instance.parentId) {
          return (
            <SubInfoTypeWrapper key={v4()}>
              <span
                onClick={() => {
                  checkID(instance.id, instance._children);
                  setCurrentId(instance.id);
                }}
                onChange={() => handleSubInfoTypeValueChange}
              >
                {instance.value}
              </span>
              <Button
                type='button'
                onClick={() => {
                  setIsEditMode(true);
                  setCurrentId(instance.id);
                  setSubInfoTypeValue(instance.value);
                }}
              >
                &#9998;
              </Button>
              <Button
                type='button'
                onClick={() => {
                  setIsDeleteMode(true);
                  setCurrentId(instance.id);
                  setSubInfoTypeValue(instance.value);
                }}
              >
                &#128465;
              </Button>

              <Child
                {...instance}
                show={show}
                parentId={parentId}
                instanceId={instance.id}
                selected={instance.id === currentId}
                instanceId={instanceId}
                refetchQueries={refetchQueries}
                updateInstance={updateInstance}
                deleteInstance={deleteInstance}
              />
              {instance._children.length ? (
                <SubInfoComponent
                  data={instance._children}
                  key={v4()}
                  refetchQueries={refetchQueries}
                  updateInstance={updateInstance}
                deleteInstance={deleteInstance}
                />
              ) : null}
            </SubInfoTypeWrapper>
          );
        }
      })}
    </InfoTypesStyleWrapper>
  );
};




const Child = ({
  _children,
  instanceId,
  show,
  parentId,
  refetchQueries,
  last,
  updateInstance,
  isEditMode,
  deleteInstance
}) => {
  const [currentId, setChildCurrentId] = useState('');
  const [showChild, setshowChild] = useState(!show);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [infoTypeValue, setChildSubInfoTypeValue] = useState(null);
  const [childState, setChildState] = useState([]);
  const [isChildEditMode, setIsChildEditMode] =useState(false)
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setChildState(_children);
  }, [isEditMode, isChildEditMode, currentId]);
  console.log(`updateInstance`, updateInstance)
  async function handleInfoTypeValueSave() {
    setIsSaving(true);

    await updateInstance({
      variables: {
        actionId: UPDATE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
        executionParameters: JSON.stringify({
          value: infoTypeValue,
          instanceId: currentId,
        }),
      },
      refetchQueries,
    });

    
    setIsChildEditMode(false);
    setIsSaving(false);
  }

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteInstance({
        variables: {
          actionId: DELETE_INFO_TYPE_FOR_APP_SPEC_ACTION_ID,
          executionParameters: JSON.stringify({
            parentInstanceId: parentId,
            instanceId: currentId,
          }),
        },
        refetchQueries,
      });
    } catch (e) {
      setIsDeleting(false);
    }
  };


  const handleSubInfoTypeValueChange = (e) => {
    setChildSubInfoTypeValue(e.target.value);
  };

  const handleCancelEdit = () => {
    
    setIsChildEditMode(false);
  };

  const handleCanelDelete = () => {
    setIsDeleteMode(false);
  };

  if (isChildEditMode) {
    return (
      <SubInfoTypeWrapper>
        <EditInstanceForm
          id={instanceId}
          label='SubInfoType Value:'
          value={infoTypeValue}
          onChange={handleSubInfoTypeValueChange}
          onSave={handleInfoTypeValueSave}
          onCancel={handleCancelEdit}
          disabled={isSaving}
        />
      </SubInfoTypeWrapper>
    );
  }

  if (isDeleteMode) {
    return (
      <SubInfoTypeWrapper isDeleting={isDeleting}>
        {infoTypeValue}
        <DeleteInstanceMenu
          onDelete={handleDelete}
          onCancel={handleCanelDelete}
          disabled={isDeleting}
        />
      </SubInfoTypeWrapper>
    );
  }

  return (
    <>
      {!last ? <SubInfoTypeCreationForm
        parentId={parentId}
        childId={currentId}
        refetchQueries={refetchQueries}
      /> : null}
      {childState.map((instance) => {
        return (
          <React.Fragment key={v4()}>
            {show ? (
              <SubInfoTypeWrapper key={v4()}>
                <span
                  onClick={() => {
                    setChildCurrentId(instance.id);
                  }}
                  onChange={handleSubInfoTypeValueChange}
                  key={v4()}
                >
                  {instance.value}
                </span>

                <Button
                  type='button'
                  onClick={() => {
                    setIsChildEditMode(true);
                    setChildCurrentId(instance.id);
                    setChildSubInfoTypeValue(instance.value);
                  }}
                >
                  &#9998;
                </Button>
                <Button
                  type='button'
                  onClick={() => {
                    setIsDeleteMode(true);
                    setChildCurrentId(instance.id);
                    setChildSubInfoTypeValue(instance.value);
                  }}
                >
                  &#128465;
                </Button>

                <Child
                  {...instance}
                  show={showChild}
                  last={true}
                  instanceId={instance.id}
                  refetchQueries={refetchQueries}
                  updateInstance={()=> updateInstance}
                  deleteInstance={()=>deleteInstance}
                />
              </SubInfoTypeWrapper>
            ) : null}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default compose(
  graphql(EXECUTE, { name: 'updateInstance' }),
  graphql(EXECUTE, { name: 'deleteInstance' })
)(SubInfoComponent, Child);