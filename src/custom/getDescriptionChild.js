import { TYPE_DESCRIPTION_ID } from '../config';

export const getDescriptionChild = (children) => {
    let returnedChild;

    children.map(child => {
        if (child.TypeId === TYPE_DESCRIPTION_ID) {
            returnedChild = child;
        }

    })

    return returnedChild;
}
