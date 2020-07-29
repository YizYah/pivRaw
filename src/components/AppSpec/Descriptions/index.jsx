/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: Descriptions

// ns__custom_start unit: appSpec, comp: Descriptions, loc: beforeImports
'use strict';
// ns__custom_end unit: appSpec, comp: Descriptions, loc: beforeImports

import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import DescriptionCreationForm from '../DescriptionCreationForm';
import Description from '../Description';

// ns__custom_start unit: appSpec, comp: Descriptions, loc: addedImports
// ns__custom_end unit: appSpec, comp: Descriptions, loc: addedImports

// ns__custom_start unit: appSpec, comp: Descriptions, loc: styling

const DescriptionsStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: appSpec, comp: Descriptions, loc: styling

class Descriptions extends Component {
  // ns__custom_start unit: appSpec, comp: Descriptions, loc: beginning
  // ns__custom_end unit: appSpec, comp: Descriptions, loc: beginning

  state = {
    selectedDescriptionId: null,
    // ns__custom_start unit: appSpec, comp: Descriptions, loc: addedState
    // ns__custom_end unit: appSpec, comp: Descriptions, loc: addedState
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: Descriptions, loc: componentDidMount
    // ns__custom_end unit: appSpec, comp: Descriptions, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: Descriptions, loc: componentWillUnmount
    // ns__custom_end unit: appSpec, comp: Descriptions, loc: componentWillUnmount
  }

  handleClick = (e) =>{
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedDescriptionId: null });
    }
  };

  handleSelect = (id) =>this.setState({ selectedDescriptionId: id });

  render() {
    const { appId, descriptions, refetchQueries, onUpdate } = this.props;
    const { selectedDescriptionId } = this.state;

    // ns__custom_start unit: appSpec, comp: Descriptions, loc: renderBeginning
    // ns__custom_end unit: appSpec, comp: Descriptions, loc: renderBeginning

    return (
      <DescriptionsStyleWrapper
        ref={this.wrapperRef}
        onClick={this.handleClick}
      >
        <DescriptionCreationForm
          parentId={appId}
          refetchQueries={refetchQueries}
          // ns__custom_start unit: appSpec, comp: Descriptions, loc: addedPropsForCreationForm
          // ns__custom_end unit: appSpec, comp: Descriptions, loc: addedPropsForCreationForm
        />

        {descriptions.map((description) =>(
          <Description
            key={v4()}
            description={description}
            selected={description.id === selectedDescriptionId}
            onUpdate={onUpdate}
            parentId={appId}
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
            // ns__custom_start unit: appSpec, comp: Descriptions, loc: addedPropsForChildren
            // ns__custom_end unit: appSpec, comp: Descriptions, loc: addedPropsForChildren
          />
        ))}
        {/* ns__custom_start unit: appSpec, comp: Descriptions, loc: renderEnding */}
        {/* ns__custom_end unit: appSpec, comp: Descriptions, loc: renderEnding */}
      </DescriptionsStyleWrapper>
    );
  }
}

export default Descriptions;
