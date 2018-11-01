import { SET_CARS, SET_SEARCH_TEXT, SET_SELECTED_CAR, LOG_OUT } from './redux.actions';
import { CarData } from '../models';

export interface IAppState {
  cars: CarData[],
  search_text: string,
  selected_car: CarData,
}

export const INITIAL_STATE: IAppState = {
  cars: [],
  search_text: '',
  selected_car: null
};

export interface Action {
    type: string,
    payload?: any
}

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch(action.type) {
    case SET_CARS: 
      return Object.assign({}, lastState, {
        cars: action.payload.cars,
      });
    case SET_SEARCH_TEXT: 
      return Object.assign({}, lastState, {
        search_text: action.payload.search_text,
      });
    case SET_SELECTED_CAR: 
      return Object.assign({}, lastState, {
        selected_car: action.payload.selected_car,
      });
    case LOG_OUT: 
      return Object.assign({}, lastState, INITIAL_STATE);
  }

  return lastState;
}