import React from 'react'
import {Link} from 'react-router-dom'

const hosts = (typeof window !== 'undefined' && window.__HOSTS__) || {}
const appId = (typeof window !== 'undefined' && window.__APPID__) || ''

const HostLink = props => {
  const {to: href, app, ...linkProps} = props
  if (app && hosts[app] && (app !== appId)) {
    const link = hosts[app] + href
    return <a {...linkProps} href={link}/>
  }

  return <Link {...linkProps} to={href}/>
}

export default HostLink
