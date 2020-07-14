// ns__added_start unit: appSpec, comp: Apps, loc: beforeImports

// ns__added_end unit: appSpec, comp: Apps, loc: beforeImports

import React, { Component, createRef } from "react";
import { Unit } from "@nostack/no-stack";
import styled from "styled-components";
import { v4 } from "uuid";

import { flattenData } from '../../../flattenData';

// import AppCreationForm from "../AppCreationForm";
import App from "../App";

import { SOURCE_APP_SPEC_ID } from '../../../config';
import { APP_SPEC_RELATIONSHIPS, SOURCE_APP_SPEC_QUERY } from '../../source-props/appSpec';

// ns__added_start unit: appSpec, comp: Apps, loc: addedImports
import FirstTimeAppCreationForm from '../FirstTimeAppCreationForm';
import { TYPE_DESCRIPTION_ID } from '../../../config';
// ns__added_end unit: appSpec, comp: Apps, loc: addedImports

// ns__added_start unit: appSpec, comp: Apps, loc: styling

// add a prop called `show`
const AppsStyleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  // mystyling...
`;
// ns__added_end unit: appSpec, comp: Apps, loc: styling

class Apps extends Component {
// ns__added_start unit: appSpec, comp: Apps, loc: beginning
// ns__added_end unit: appSpec, comp: Apps, loc: beginning
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
            return `Error: ${error.graphQLErrors}`;
          }

          const apps = data.unitData.map((el) => flattenData(el));
          console.log(`apps=${JSON.stringify(apps, null, 2)}`);

          // ns__added_start unit: appSpec, comp: Apps, loc: beforeReturn
          const findDescriptionIdValue = (source, id) => {
            for (let key in source) {
              let item = source[key];
              let length;

              if (typeof item === "object") {
                console.log(`item`, typeof item);
                console.log(item.length);
                length = item.length;
              }

              for (let i = 0; i < length; i++) {
                if (item[i] && item[i].typeId === id) {
                  console.log("inside if item", item[i]);
                  return item[i].instances[0].value;
                }
              }

              // Item not returned yet. Search its children by recursive call.
              if (item.children) {
                console.log(`item.children`, item.children);
                let subresult = findDescriptionIdValue(item.children, id);

                // If the item was found in the subchildren, return it.
                if (subresult) return subresult;
              }
            }
            // Nothing found yet? return null.
            return null;
          };

          const descriptionValue = findDescriptionIdValue(
            apps[0],
            TYPE_DESCRIPTION_ID.toString()
          );

          // ns__added_start unit: appSpec, comp: Apps, loc: beforeReturn
          const noApp = apps.length===0 ||
              !(apps[0].value && apps[0].value !== '') // &&
              // find in apps[0].children array an object o where o.typeId === TYPE_DESCRIPTION_ID
              // and where o.instances contains an object oi where oi.value && oi.value !== ''
          const show = !noApp;
          // ns__added_end unit: appSpec, comp: Apps, loc: beforeReturn

          return (
            <>
              {/*// ns__added_start unit: appSpec, comp: Apps, loc: creationForm*/}
              { noApp && <FirstTimeAppCreationForm  customerId={ customerId } refetchQueries={refetchQueries}/>}
              {/*// ns__added_end unit: appSpec, comp: Apps, loc: creationForm*/}



              <AppsStyleWrapper
                  ref={this.wrapperRef}
                  onClick={this.handleClick}
                  show>
              {apps && apps.map(app => (
                  <App
                      key={v4()}
                      parentId={customerId}
                      app={app}
                      selected={app.id === selectedAppId}
                      refetchQueries={refetchQueries}
                      onSelect={this.handleSelect}
                  />
              ))}
              </AppsStyleWrapper>

                {/* ns__added_start unit: appSpec, comp: Apps, loc: renderEnding */}
                {/* ns__added_end unit: appSpec, comp: Apps, loc: renderEnding */}
            </>
          );
        }}
      </Unit>
    );
  }
}

export default Apps;
