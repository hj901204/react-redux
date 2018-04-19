import 'bootstrap/dist/css/bootstrap.css'
import './theme/global.css'
import '../modules/common'

import 'babel-polyfill'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import configureStore from './redux/store'
import AsyncRoutes from './components/AsyncRoutes'
import routes from './routes'

window.Intl = require('intl')

const initialState = window.__INITIAL_STATE__
const history = createHistory({
  basename: ''
})
const store = configureStore(history, initialState)
const mountNode = document.getElementById('app')

let prevLocation = {}
history.listen(location => {
  const pathChanged = prevLocation.pathname !== location.pathname
  const hashChanged = prevLocation.hash !== location.hash
  if (pathChanged || hashChanged) window.scrollTo(0, 0)
  prevLocation = location
})

const renderApp = () => {
  const routes = require('./routes').default

  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <AsyncRoutes routes={routes} store={store}/>
        </Router>
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

  module.hot.accept('./routes', () => {
    setImmediate(() => {
      unmountComponentAtNode(mountNode)
      reRenderApp()
    })
  })
}

renderApp()
