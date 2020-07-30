/*
  This file has been partially generated!
  To permit updates to the generated portions of this code in the future,
  please follow all rules at https://docs.google.com/document/d/1vYGEyX2Gnvd_VwAcWGv6Ie37oa2vXNL7wtl7oUyyJcw/edit?usp=sharing
 */
// ns__file unit: appSpec, comp: Apps

// ns__custom_start unit: appSpec, comp: Apps, loc: beforeImports
'use strict';
// ns__custom_end unit: appSpec, comp: Apps, loc: beforeImports

import React, { Component, createRef } from 'react';
import { Unit } from '@nostack/no-stack';
import styled from 'styled-components';
import { v4 } from 'uuid';

import { flattenData } from '../../../flattenData';

// ns__remove_import AppCreationForm from '../AppCreationForm';
import App from '../App';

import { SOURCE_APP_SPEC_ID } from '../../../config';
import {
  APP_SPEC_RELATIONSHIPS,
  SOURCE_APP_SPEC_QUERY,
} from '../../source-props/appSpec';

// ns__custom_start unit: appSpec, comp: Apps, loc: addedImports
import FirstTimeAppCreationForm from '../../../custom/FirstTimeAppCreationForm';
import { TYPE_DESCRIPTION_ID } from '../../../config';
import { getDescriptionChild } from '../../../custom/getDescriptionChild';
import { Context as UnitDataContext } from '../../../custom/UnitDataContext';
// ns__custom_end unit: appSpec, comp: Apps, loc: addedImports

// ns__custom_start unit: appSpec, comp: Apps, loc: styling

// add a prop called `show`
const AppsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: column;
  align-content: center;
  // mystyling...
`;
// ns__custom_end unit: appSpec, comp: Apps, loc: styling

class Apps extends Component {
  // ns__custom_start unit: appSpec, comp: Apps, loc: beginning
  static contextType = UnitDataContext;
  // ns__custom_end unit: appSpec, comp: Apps, loc: beginning
  state = {
    selectedAppId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    // ns__custom_start unit: appSpec, comp: Apps, loc: componentDidMount
    const { setCurrentStage } = this.context;

    setCurrentStage(1);
    // ns__custom_end unit: appSpec, comp: Apps, loc: componentDidMount
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    // ns__custom_start unit: appSpec, comp: Apps, loc: componentWillUnmount
    // ns__custom_end unit: appSpec, comp: Apps, loc: componentWillUnmount

    document.removeEventListener('mousedown', this.handleClick);
  }

  handleClick = (e) =>{
    const node = this.wrapperRef.current;

    if (node && node !== e.target && !node.contains(e.target)) {
      this.setState({ selectedAppId: null });
    }
  };

  handleSelect = (id) =>this.setState({ selectedAppId: id });

  render() {
    const { customerId } = this.props;
    const { selectedAppId } = this.state;
    const parameters = {
      currentCustomer: customerId,
    };

    // ns__custom_start unit: appSpec, comp: Apps, loc: renderBeginning
    const { currentStage } = this.context.state;
    // ns__custom_end unit: appSpec, comp: Apps, loc: renderBeginning

    return (
      <Unit
        id={SOURCE_APP_SPEC_ID}
        typeRelationships={APP_SPEC_RELATIONSHIPS}
        query={SOURCE_APP_SPEC_QUERY}
        parameters={parameters}
      >
        {({ loading, error, data, refetchQueries }) =>{
          if (loading) return 'Loading...';

          if (error) {
            console.error(error);
            return `Error: ${error.graphQLErrors}`;
          }

          const apps = data.unitData.map((el) =>flattenData(el));

          // ns__custom_start unit: appSpec, comp: Apps, loc: beforeReturn
          /* NOTE: one app is assumed here. */
          const appInfo = apps[0];
          const descriptionInfo = getDescriptionChild(appInfo.children);
          const descriptionValue = descriptionInfo.instances[0].value;

          // ns__custom_start unit: appSpec, comp: Apps, loc: beforeReturn
          const noApp =
            apps.length === 0 ||
            !((apps[0].value && apps[0].value !== '') || descriptionValue); // &&
          // find in apps[0].children array an object o where o.typeId === TYPE_DESCRIPTION_ID
          // and where o.instances contains an object oi where oi.value && oi.value !== ''
          const show = !noApp;
          // ns__custom_end unit: appSpec, comp: Apps, loc: beforeReturn

          return (
            <>
              {noApp && (
                <FirstTimeAppCreationForm
                  customerId={customerId}
                  refetchQueries={refetchQueries}
                  // ns__custom_start unit: appSpec, comp: Apps, loc: addedPropsForCreationForm
                  // ns__custom_end unit: appSpec, comp: Apps, loc: addedPropsForCreationForm
                />
              )}

              <AppsStyleWrapper
                ref={this.wrapperRef}
                onClick={this.handleClick}
                show
              >
                {apps &&
                  apps.map((app) =>(
                    <App
                      key={v4()}
                      parentId={customerId}
                      app={app}
                      selected={app.id === selectedAppId}
                      refetchQueries={refetchQueries}
                      onSelect={this.handleSelect}
                      // ns__custom_start unit: appSpec, comp: Apps, loc: addedPropsForChildren
                      // ns__custom_end unit: appSpec, comp: Apps, loc: addedPropsForChildren
                    />
                  ))}
              </AppsStyleWrapper>

              {/* ns__custom_start unit: appSpec, comp: Apps, loc: renderEnding */}
              {/* ns__custom_end unit: appSpec, comp: Apps, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Apps;
