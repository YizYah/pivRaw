import gql from 'graphql-tag';

  export const SOURCE_PARENT_QUERY = gql`
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
            }
        }
    
    }
  }
`;

export const PARENT_RELATIONSHIPS = {
   infoType: {
        screen: null
    },
};