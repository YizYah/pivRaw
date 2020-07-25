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
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedDescriptionId: null });
    }
  };

  handleSelect = (id) => this.setState({ selectedDescriptionId: id });

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
        />

        {descriptions.map((description) => (
          <Description
            key={v4()}
            description={description}
            selected={description.id === selectedDescriptionId}
            onUpdate={onUpdate}
            parentId={appId}
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        ))}
        {/* ns__custom_start unit: appSpec, comp: Descriptions, loc: renderEnding */}
        {/* ns__custom_end unit: appSpec, comp: Descriptions, loc: renderEnding */}
      </DescriptionsStyleWrapper>
    );
  }
}

export default Descriptions;
