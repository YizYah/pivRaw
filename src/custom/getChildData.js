import _ from 'lodash';

export default (data) => {
  let parentData = data.map((instance) => ({
    ...instance,
    parentId: instance.children[0].instances[0]
      ? instance.children[0].instances[0].id
      : null,
  }));

  let hasParentId = _.groupBy(parentData, 'parentId');

  parentData = parentData.map((instance) => ({
    ...instance,
    _children: hasParentId[instance.id] || [],
  }));

  let prData = Object.keys(hasParentId);
  let childData = [];

  for (let id in prData) {
    if (prData[id]) {
      parentData.map((instance) => {
        if (instance.parentId && prData[id] === instance.parentId) {
          childData.push(instance);
        }
      });
    }
  }

  return [parentData, childData];
};
