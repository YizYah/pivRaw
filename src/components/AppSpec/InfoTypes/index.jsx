// ns__custom_start unit: appSpec, comp: InfoTypes, loc: beforeImports
'use strict';
// ns__custom_end unit: appSpec, comp: InfoTypes, loc: beforeImports
import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import InfoTypeCreationForm from '../InfoTypeCreationForm';
import InfoType from '../InfoType';
import _ from 'lodash';

// ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedImports
import getChildData from '../../../custom/getChildData';
import { Context as UnitDataContext } from '../../../custom/UnitDataContext';

// ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedImports

// ns__custom_start unit: appSpec, comp: InfoTypes, loc: styling

const InfoTypesStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: appSpec, comp: InfoTypes, loc: styling

class InfoTypes extends Component {
  // ns__custom_start unit: appSpec, comp: InfoTypes, loc: beginning
  static contextType = UnitDataContext;
  // ns__custom_end unit: appSpec, comp: InfoTypes, loc: beginning
  state = {
    selectedInfoTypeId: null,
    // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedState
    childState: [],
    parentState: [],
    // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedState
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: InfoTypes, loc: componentDidMount
    const { childState, parentState } = this.state;
    const { infoTypes } = this.props;
    const { setChildState, state, setCurrentStage } = this.context;
    

    if (!childState.length || !parentState.length) {
      let [parentData, childData] = getChildData(infoTypes);
      
      
      this.setState({
        childState: childData,
        parentState: parentData,
      },);
    }

    // ns__custom_end unit: appSpec, comp: InfoTypes, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: InfoTypes, loc: componentWillUnmount
    // ns__custom_end unit: appSpec, comp: InfoTypes, loc: componentWillUnmount
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedInfoTypeId: null });
    }
  };

  handleSelect = (id) => this.setState({ selectedInfoTypeId: id });

  render() {
    const {screenId, infoTypes, refetchQueries, onUpdate} = this.props;
    const {selectedInfoTypeId} = this.state;

    // ns__custom_start unit: appSpec, comp: InfoTypes, loc: renderBeginning
    const {state} = this.context;
    console.log(`infotype state context`, state)
    const {childState, parentState} = this.state;
    const {children} = this.props;
    let validateInfoTypes = infoTypes.length;
    // ns__custom_end unit: appSpec, comp: InfoTypes, loc: renderBeginning

    return (
      <InfoTypesStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <InfoTypeCreationForm
          parentId={screenId}
          refetchQueries={refetchQueries}
          // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedPropsForCreationForm
          label={'Info Type'}
          validateInfoTypes={validateInfoTypes}
          // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedPropsForCreationForm
        />
        {parentState.map((infoType) => {
          if (infoType.parentId) return;

          return (
            <InfoType
              key={v4()}
              infoType={infoType}
              selected={infoType.id === selectedInfoTypeId}
              onUpdate={onUpdate}
              parentId={screenId}
              refetchQueries={refetchQueries}
              onSelect={this.handleSelect}
              // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedPropsForChildren
              hasParentId={infoType.parentId}
              childState={childState}
              // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedPropsForChildren
            />
          );
        })}
        {/* ns__custom_start unit: appSpec, comp: InfoTypes, loc: renderEnding */}
        {/* ns__custom_end unit: appSpec, comp: InfoTypes, loc: renderEnding */}
      </InfoTypesStyleWrapper>
    );
  }
}

export default InfoTypes;
