
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),

);

sagaMiddleware.run(rootSaga);


