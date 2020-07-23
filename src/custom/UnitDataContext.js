import createDataContext from '../context/createDataContext';

const unitDataReducer = (state, action) => {
  switch (action.type) {
    case 'getUnitData':
      return { unitData: action.payload };
    case 'setStage':
      return { currentStage: action.payload };
    case 'setChildState':
      return { ...state, childState: action.payload };
    default:
      return state;
  }
};

const getUnitData = (dispatch) => (data) => {
  dispatch({ type: 'getUnitData', payload: data });
};

const setCurrentStage = (dispatch) => (stage) => {
  dispatch({ type: 'setStage', payload: stage });
};

const setChildState = (dispatch) => (state) => {
  dispatch({ type: 'setChildState', payload: state });
};

export const { Context, Provider } = createDataContext(
  unitDataReducer,
  { getUnitData, setCurrentStage, setChildState },
  {
    unitData: [],
    currentStage: 0,
    childState: [],
  }
);
