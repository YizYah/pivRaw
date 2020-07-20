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
import getChildData from '../../../custom/getChildData'
// ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedImports

// ns__custom_start unit: appSpec, comp: InfoTypes, loc: styling

const InfoTypesStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: appSpec, comp: InfoTypes, loc: styling

class InfoTypes extends Component {
  state = {
    selectedInfoTypeId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedInfoTypeId: null });
    }
  };

  handleSelect = (id) => this.setState({ selectedInfoTypeId: id });

  render() {
    const { screenId, infoTypes, refetchQueries, onUpdate } = this.props;
    const { selectedInfoTypeId } = this.state;
    
  

    /* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedDeclaration */
    
    let validateInfoTypes = infoTypes.length;
    const [parentData] = getChildData(infoTypes);
    
    
    

    /* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedDeclaration */
    {
      /* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: renderBeginning */
    }
    {
      /* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: renderBeginning */
    }

    return (
      <InfoTypesStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <InfoTypeCreationForm
          parentId={screenId}
          label={'Info Type'}
          refetchQueries={refetchQueries}
          validateInfoTypes={validateInfoTypes}
          /* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedProps */
          /* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedProps */
        />
        {/* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedLogic */}
        {parentData.map((infoType) => {
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
              /* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: addedProps */
              hasParentId={infoType.parentId}
              parentTree={parentData}
              /* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedProps */
            />
          );
        })}
         {/* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: addedLogic */}  
        {/* // ns__custom_start unit: appSpec, comp: InfoTypes, loc: renderEnding */}
        {/* // ns__custom_end unit: appSpec, comp: InfoTypes, loc: renderEnding */}
      </InfoTypesStyleWrapper>
    );
  }
}

export default InfoTypes;
