import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import ScreenCreationForm from '../ScreenCreationForm';
import Screen from '../Screen';

// ns__added_start unit: appSpec, comp: Screens, loc: styling

const ScreensStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__added_end unit: appSpec, comp: Screens, loc: styling

class Screens extends Component {
  state = {
    selectedScreenId: null,
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
      this.setState({ selectedScreenId: null });
    }
  }

  handleSelect = id => this.setState({ selectedScreenId: id });

  render () {
    const { userTypeId, screens, refetchQueries, onUpdate } = this.props;
    const { selectedScreenId } = this.state;

     // ns__added_start unit: appSpec, comp: UserTypes, loc: additionalDeclaratoin
     const validateScreens = screens.length
     // ns__added_end unit: appSpec, comp: UserTypes, loc: additionalDeclaratoin

    {/* ns__added_start unit: appSpec, comp: Screens, loc: renderBeginning */}
    {/* ns__added_end unit: appSpec, comp: Screens, loc: renderBeginning */}

    return (
      <ScreensStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <ScreenCreationForm
          parentId={ userTypeId }
          refetchQueries={refetchQueries}
          /* ns__added_start unit: appSpec, comp: Screens, loc: validateScreens */
          validateScreens={validateScreens}
          /* ns__added_end unit: appSpec, comp: Screens, loc: validateScreens */
        />

        { screens.map(screen => (
          <Screen
            key={v4()}
            screen={ screen }
            selected={ screen.id === selectedScreenId }
            onUpdate={onUpdate}
            parentId={ userTypeId }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        )) }
  {/* ns__added_start unit: appSpec, comp: Screens, loc: renderEnding */}
  {/* ns__added_end unit: appSpec, comp: Screens, loc: renderEnding */}

  </ScreensStyleWrapper>
  )
  }
}

export default Screens;