import { Platform } from 'react-native'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import devTools from 'remote-redux-devtools'
import promise from 'redux-promise'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import RootReducer from './Reducers'

const middleware = applyMiddleware(thunk, promise, logger)

let composeEnhancers = compose
if (__DEV__) {
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
    ...require('../package.json').remotedev
  });
  /* eslint-enable no-underscore-dangle */
}

const enhancer = composeEnhancers(middleware)

const Store = function configureStore(initialState) {
  return createStore(RootReducer, initialState, enhancer)
}

export default Store
