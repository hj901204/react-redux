import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {matchRoutes} from 'react-router-config'
import Route from './Route'
import Lazy from '../../components/Lazy'

class FrameworkContent extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.shape({
      history: PropTypes.object.isRequired
    }).isRequired,
    frame: PropTypes.shape({
      list: PropTypes.array.isRequired,
      setInstance: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired
    }).isRequired
  };

  setInstance(location, ref) {
    this.context.frame.setInstance(location, ref)
  }

  remove = (location) => {
    this.context.frame.remove(location)
  }

  getRoutes(list) {
    const {history} = this.context.router

    return list.map(({location, branch}, index) => {
      const isCurrent = location.pathname === history.location.pathname
      const branches = (branch && branch.length) ? branch[branch.length - 1] : null

      return {
        location,
        branches,
        style: {
          display: isCurrent ? '' : 'none'
        },
        frame: {
          remove: this.remove
        },
        setRef: this.setInstance.bind(this, location)
      }
    })
  }

  renderRoutes(routes) {
    const {history} = this.context.router
    return routes.map(({location, branches, style, setRef, frame}, index) => {
      if (!branches) {
        return <div data-path={location.pathname} key={location.pathname} style={style}></div>
      }

      const {route, match} = branches
      if (route.asyncComponent) {
        return (
          <div data-path={location.pathname} key={location.pathname} style={style}>
            <Lazy load={route.asyncComponent}>
              {Comp => <Comp ref={setRef} history={history} match={match} frame={frame} />}
            </Lazy>
          </div>
        )
      }

      const Comp = route.component
      return (
        <div data-path={location.pathname} key={location.pathname} style={style}>
          <Comp ref={setRef} history={history} match={match} frame={frame} />
        </div>
      )
    })
  }

  render() {
    const {className} = this.props
    const {list} = this.context.frame
    const routes = this.getRoutes(list)

    return (
      <div className={className}>
        {this.renderRoutes(routes)}
      </div>
    )
  }
}

export default FrameworkContent
