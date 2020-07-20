import React, { Component, createRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import UserTypeCreationForm from '../UserTypeCreationForm';
import UserType from '../UserType';

// ns__custom_start unit: appSpec, comp: UserTypes, loc: styling

const UserTypesStyleWrapper = styled.div``;

const Button = styled.button`
  display: block;
  margin: 0 auto;
`;
// ns__custom_end unit: appSpec, comp: UserTypes, loc: styling

class UserTypes extends Component {
  state = {
    selectedUserTypeId: null,
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
      this.setState({ selectedUserTypeId: null });
    }
  }

  handleSelect = id => this.setState({ selectedUserTypeId: id });

  render () {
    const { appId, userTypes, refetchQueries, onUpdate } = this.props;
    const { selectedUserTypeId } = this.state;


    // ns__custom_start unit: appSpec, comp: UserTypes, loc: additionalDeclaratoin
    const validateUserTypes = userTypes.length
    // ns__custom_end unit: appSpec, comp: UserTypes, loc: additionalDeclaratoin

    {/* ns__custom_start unit: appSpec, comp: UserTypes, loc: renderBeginning */}
    {/* ns__custom_end unit: appSpec, comp: UserTypes, loc: renderBeginning */}

    return (
      <UserTypesStyleWrapper ref={this.wrapperRef} onClick={this.handleClick}>
        <UserTypeCreationForm
          parentId={ appId }
          refetchQueries={refetchQueries}
          // ns__custom_start unit: appSpec, comp: UserTypes, loc: validateUserTypes 
          validateUserTypes={validateUserTypes}
          // ns__custom_start unit: appSpec, comp: UserTypes, loc: validateUserTypes 
        />

        { userTypes.map(userType => (
          <UserType
            key={v4()}
            userType={ userType }
            selected={ userType.id === selectedUserTypeId }
            onUpdate={onUpdate}
            parentId={ appId }
            refetchQueries={refetchQueries}
            onSelect={this.handleSelect}
          />
        )) }
  {/* ns__custom_start unit: appSpec, comp: UserTypes, loc: renderEnding */}
  {/* ns__custom_end unit: appSpec, comp: UserTypes, loc: renderEnding */}

  </UserTypesStyleWrapper>
  )
  }
}

export default UserTypes;