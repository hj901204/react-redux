import React from 'react'
import renderer from 'react-test-renderer'
import {render, mount} from 'enzyme'

import Countdown from '../Countdown'

describe('<Countdown />', () => {
  test('renders', () => {
    const tree = renderer.create(
      <Countdown />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders disabled', () => {
    const tree = renderer.create(
      <Countdown disabled />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('renders text', () => {
    const tree = renderer.create(
      <Countdown text="验证码" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('click event', () => {
    const props = {
      count: 3,
      text: '获取短信验证码',
      onClick: jest.fn()
    }
    const countdown = mount(
      <Countdown {...props} />
    )

    expect(countdown.text()).toEqual(props.text)
    countdown.find('button').simulate('click')
    expect(props.onClick).toBeCalled()
    expect(countdown.text()).toEqual(`${props.count - 1}秒后重发`)
  })

  test('disabled click event', () => {
    const props = {
      count: 3,
      text: '获取短信验证码',
      disabled: true,
      onClick: jest.fn()
    }
    const countdown = mount(
      <Countdown {...props} />
    )

    expect(countdown.text()).toEqual(props.text)
    countdown.find('button').simulate('click')
    expect(props.onClick).not.toBeCalled()
    expect(countdown.text()).toEqual(props.text)
  })
})
