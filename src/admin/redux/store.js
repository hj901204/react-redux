import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const logger = store => next => action => {
  return next(action)
}

function configureStore(initialState) {
  const middlewares = [
    thunk,
    logger
  ]
  const dev = process.env.NODE_ENV !== 'production' && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
  const enhancers = [
    applyMiddleware(...middlewares),
    dev ? window.devToolsExtension() : f => f
  ]

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default
        store.replaceReducer(nextReducer)
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`)
      }
    })
  }

  return store
}

export default configureStore
