import _ from 'lodash';

export default (data) => {
  let parentData = data.map((instance) => ({
    ...instance,
    parentId: instance.children[0].instances[0]
      ? instance.children[0].instances[0].id
      : null,
  }));

  let childData = _.groupBy(parentData, 'parentId');

  parentData = parentData.map((instance) => ({
    ...instance,
    _children: childData[instance.id] || [],
  }));

  return [parentData, childData];
  
};
