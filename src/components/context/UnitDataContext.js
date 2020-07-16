import createDataContext from './createDataContext';

const unitDataReducer = (state, action) => {
    switch(action.type) {
        case 'getUnitData':
            return {unitData: action.payload}
        default:
            return state;
    }
}

const getUnitData = (dispatch) => (data) => {
    dispatch({type: 'getUnitData', payload: data});

}

export const {Context, Provider} = createDataContext(unitDataReducer, {getUnitData}, {
    unitData: []})