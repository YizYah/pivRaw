import gql from 'graphql-tag';

  export const SOURCE_APP_SPEC_QUERY = gql`
  query UNIT(
    $id: ID!
    $typeRelationships: String!
    $parameters: String
  ) {
    unitData(
      unitId: $id
      typeRelationships: $typeRelationships
      parameters: $parameters
    )
    {
      
        instance {
            id
            value
        }
        children {
            typeId
            instances {
                
		instance {
		    id
		    value
		}
		children {
		    typeId
		    instances {
		        
			instance {
			    id
			    value
			}
			children {
			    typeId
			    instances {
			        
				instance {
				    id
				    value
				}
			    }
			}
		    }
		}
            }
        }
    
    }
  }
`;

export const APP_SPEC_RELATIONSHIPS = {
   app: {
        userType: {
        screen: {
        infoType: null
    }
    }, description: null
    },
};