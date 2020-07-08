import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

import AppCreationForm from '../AppCreationForm';
import App from '../App';

import { SOURCE_APP_SPEC_ID } from '../../../config';
import { APP_SPEC_RELATIONSHIPS, SOURCE_APP_SPEC_QUERY } from '../../source-props/appSpec';

// np__added_start unit: appSpec, comp: Apps, loc: styling

// add styling here
const AppsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
// np__added_end unit: appSpec, comp: Apps, loc: styling

class Apps extends Component {
// np__added_start unit: appSpec, comp: Apps, loc: beginning
// np__added_end unit: appSpec, comp: Apps, loc: beginning
  state = {
    selectedAppId: null,
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
      this.setState({ selectedAppId: null });
    }
  }

  handleSelect = id => this.setState({ selectedAppId: id });

  render() {
    const { customerId } = this.props;
    const { selectedAppId } = this.state;

    const parameters = {
      currentCustomer: customerId,
    };

    return (
      <Unit
        id={ SOURCE_APP_SPEC_ID }
        typeRelationships={ APP_SPEC_RELATIONSHIPS }
        query={ SOURCE_APP_SPEC_QUERY }
        parameters={parameters}
      >
        {({loading, error, data, refetchQueries}) => {
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`
          };

          const apps = data.unitData.map(el => flattenData(el));

          return (
            <>
              <AppCreationForm  customerId={ customerId } refetchQueries={refetchQueries}/>
              <AppsStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
                { apps && apps.map(app => (
                  <App
                    key={v4()}
                    parentId={ customerId }
                    app={ app }
                    selected={ app.id === selectedAppId }
                    refetchQueries={refetchQueries}
                    onSelect={this.handleSelect}
                  />
                )) }
              </AppsStyleWrapper>
                {/* np__added_start unit: appSpec, comp: Apps, loc: renderEnding */}
                {/* np__added_end unit: appSpec, comp: Apps, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Apps;
