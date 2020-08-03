/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: Screens

// ns__custom_start unit: appSpec, comp: Screens, loc: beforeImports
// ns__custom_end unit: appSpec, comp: Screens, loc: beforeImports

import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import ScreenCreationForm from '../ScreenCreationForm';
import Screen from '../Screen';

// ns__custom_start unit: appSpec, comp: Screens, loc: addedImports
// ns__custom_end unit: appSpec, comp: Screens, loc: addedImports

// ns__custom_start unit: appSpec, comp: Screens, loc: styling

const ScreensStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: appSpec, comp: Screens, loc: styling

// ns__custom_start unit: appSpec, comp: Screens, loc: beginning
// ns__custom_end unit: appSpec, comp: Screens, loc: beginning

class Screens extends Component {
  state = {
    selectedScreenId: null,
    // ns__custom_start unit: appSpec, comp: Screens, loc: addedState
    // ns__custom_end unit: appSpec, comp: Screens, loc: addedState
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: Screens, loc: componentDidMount
    // ns__custom_end unit: appSpec, comp: Screens, loc: componentDidMount
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
    // ns__custom_start unit: appSpec, comp: Screens, loc: componentWillUnmount
    // ns__custom_end unit: appSpec, comp: Screens, loc: componentWillUnmount
  }

  handleClick = (e) => {
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedScreenId: null });
    }
  };

  handleSelect = (id) => {
    console.log(`id screens`, id);

    this.setState({ selectedScreenId: id });
  };

  render() {
    const { userTypeId, screens, refetchQueries, onUpdate } = this.props;
    const { selectedScreenId } = this.state;

    console.log(`screens`, screens);

    // ns__custom_start unit: appSpec, comp: Screens, loc: renderBeginning
    const validateScreens = screens.length;
    // ns__custom_end unit: appSpec, comp: Screens, loc: renderBeginning

    return (
      <ScreensStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <ScreenCreationForm
          parentId={userTypeId}
          refetchQueries={refetchQueries}
          // ns__custom_start unit: appSpec, comp: Screens, loc: addedPropsForCreationForm
          validateScreens={validateScreens}
          // ns__custom_end unit: appSpec, comp: Screens, loc: addedPropsForCreationForm
        />

        {screens.map((screen) => (
          <Screen
            key={v4()}
            screen={screen}
            selected={screen.id === selectedScreenId}
            onUpdate={onUpdate}
            parentId={userTypeId}
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
            // ns__custom_start unit: appSpec, comp: Screens, loc: addedPropsForChildren
            // ns__custom_end unit: appSpec, comp: Screens, loc: addedPropsForChildren
          />
        ))}
        {/* ns__custom_start unit: appSpec, comp: Screens, loc: renderEnding */}
        {/* ns__custom_end unit: appSpec, comp: Screens, loc: renderEnding */}
      </ScreensStyleWrapper>
    );
  }
}

export default Screens;
