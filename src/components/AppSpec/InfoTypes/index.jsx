import React, { Component, createRef } from "react";
import styled from "styled-components";
import { v4 } from "uuid";

import InfoTypeCreationForm from "../InfoTypeCreationForm";
import InfoType from "../InfoType";
import _ from "lodash";

// ns__added_start unit: appSpec, comp: InfoTypes, loc: styling

const InfoTypesStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__added_end unit: appSpec, comp: InfoTypes, loc: styling

class InfoTypes extends Component {
  state = {
    selectedInfoTypeId: null,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
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

    /* ns__added_start unit: appSpec, comp: InfoTypes, loc: additionalDeclaration */
    let validateInfoTypes = infoTypes.length;

    let temp_parent = infoTypes.map((v) => ({
      ...v,
      parentId: v.children[0].instances[0]
        ? v.children[0].instances[0].id
        : null,
    }));

    let temp_children = _.groupBy(temp_parent, "parentId");
    

    temp_parent = temp_parent.map((v) => ({
      ...v,
      _children: temp_children[v.id] || [],
    }));
    /* ns__added_end unit: appSpec, comp: InfoTypes, loc: additionalDeclaration */

    {
      /* ns__added_start unit: appSpec, comp: InfoTypes, loc: renderBeginning */
    }
    {
      /* ns__added_end unit: appSpec, comp: InfoTypes, loc: renderBeginning */
    }

    return (
      <InfoTypesStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <InfoTypeCreationForm
          parentId={screenId}
          refetchQueries={refetchQueries}
          validateInfoTypes={validateInfoTypes}
          /* ns__added_start unit: appSpec, comp: InfoTypes, loc: additionalPropsDeclaration */
          /* ns__added_end unit: appSpec, comp: InfoTypes, loc: additionalProps */
        />

        {temp_parent.map((infoType) => {
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
              /* ns__added_start unit: appSpec, comp: InfoTypes, loc: additionalPropsDeclaration */
              hasParentId={infoType.parentId}
              /* ns__added_end unit: appSpec, comp: InfoTypes, loc: additionalPropsDeclaration */
            />
          );
        })}
        {/* ns__added_start unit: appSpec, comp: InfoTypes, loc: renderEnding */}
        {/* ns__added_end unit: appSpec, comp: InfoTypes, loc: renderEnding */}
      </InfoTypesStyleWrapper>
    );
  }
}

export default InfoTypes;
