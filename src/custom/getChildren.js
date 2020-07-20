instances.map(instance => {
    if (instance.children.length > 0) {
        const parentId = instance.children[0];
        if (!infoTreeChildren[parentId]) {
            infoTreeChildren[parentId] = [ instance.id ];
        } else {
            infoTreeChildren[parentId].push( instance.id);
        }
    }
})