import '../modules/common'
import 'babel-polyfill'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import configureStore from './redux/store'
import {FrameRouter} from './components/Framework'
import routes from './routes'

import './theme/global.css'

const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)
const mountNode = document.getElementById('app')

const renderApp = () => {
  const App = require('./containers/App').default

  render(
    <AppContainer>
      <Provider store={store}>
        <FrameRouter routes={routes} store={store} basename={''}>
          <App />
        </FrameRouter>
      </Provider>
    </AppContainer>,
    mountNode
  )
}

if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp()
    } catch (error) {
      const RedBox = require('redbox-react').default

      render(<RedBox error={error} />, mountNode)
    }
  }

  module.hot.accept('./containers/App', () => {
    setImmediate(() => {
      unmountComponentAtNode(mountNode)
      reRenderApp()
    })
  })
}

renderApp()
