import { 
  createStore,
  compose,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

import { reducer as common } from './common'
import { reducer as header } from './header'
import { reducer as guidance } from './guidance'
import { reducer as management } from './management'
import { reducer as document } from './document'

const reducers = combineReducers({
  common,
  header,
  guidance,
  management,
  document
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))
const store = createStore(reducers, compose(applyMiddleware(thunk)))

export default store