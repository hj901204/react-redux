import React from 'react'
import renderer from 'react-test-renderer'
import {StaticRouter} from 'react-router-dom'
import {mount} from 'enzyme'

import AsyncRoutes from '../AsyncRoutes'

const routes = [
  {
    path: '/',
    component: (props) => (<div>内容</div>)
  }
]

describe('<AsyncRoutes />', () => {
  test('renders', () => {
    const tree = renderer.create(
      <StaticRouter location={'/'} context={{}}>
        <AsyncRoutes routes={routes}/>
      </StaticRouter>
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('renders 2', () => {
    const dom = mount(
      <StaticRouter location={'/'} context={{}}>
        <AsyncRoutes routes={routes}/>
      </StaticRouter>
    )
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        expect(dom.text()).toEqual('内容')
        resolve()
      }, 0)
    })
  })
})
