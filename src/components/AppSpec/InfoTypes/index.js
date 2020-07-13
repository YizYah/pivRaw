import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import InfoTypeCreationForm from '../InfoTypeCreationForm';
import InfoType from '../InfoType';

// np__added_start unit: appSpec, comp: InfoTypes, loc: styling

const InfoTypesStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// np__added_end unit: appSpec, comp: InfoTypes, loc: styling

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

  handleClick = e => {
    const node = this.wrapperRef.current;

    if (
      node &&
      node !== e.target &&
      !node.contains(e.target)
    ) {
      this.setState({ selectedInfoTypeId: null });
    }
  }

  handleSelect = id => this.setState({ selectedInfoTypeId: id });

  render () {
    const { screenId, infoTypes, refetchQueries, onUpdate } = this.props;
    const { selectedInfoTypeId } = this.state;

    {/* np__added_start unit: appSpec, comp: InfoTypes, loc: renderBeginning */}
    {/* np__added_end unit: appSpec, comp: InfoTypes, loc: renderBeginning */}

    return (
      <InfoTypesStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <InfoTypeCreationForm
          parentId={ screenId }
          refetchQueries={refetchQueries}
        />

        { infoTypes.map(infoType => (
          <InfoType
            key={v4()}
            infoType={ infoType }
            selected={ infoType.id === selectedInfoTypeId }
            onUpdate={onUpdate}
            parentId={ screenId }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        )) }
  {/* np__added_start unit: appSpec, comp: InfoTypes, loc: renderEnding */}
  {/* np__added_end unit: appSpec, comp: InfoTypes, loc: renderEnding */}

  </InfoTypesStyleWrapper>
  )
  }
}

export default InfoTypes;
