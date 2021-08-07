import { createStore, combineReducers } from "redux";
import MainReducer from './MainReducer';

const rootReducer = combineReducers({
MainReducer
});

export const store = createStore(rootReducer);

