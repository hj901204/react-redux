import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import {routerMiddleware} from 'react-router-redux'

function configureStore(history, initialState) {
  const middlewares = [
    thunk,
    routerMiddleware(history)
  ]
  const dev = process.env.NODE_ENV !== 'production' && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
  const enhancers = [
    applyMiddleware(...middlewares),
    dev ? window.devToolsExtension() : f => f
  ]

  const store = createStore(rootReducer, initialState, compose(...enhancers))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      try {
        const nextReducer = require('./reducer').default
        store.replaceReducer(nextReducer)
      } catch (error) {
        console.error(`==> 😭  Reducer hot reloading error ${error}`)
      }
    })
  }

  return store
}

export default configureStore
