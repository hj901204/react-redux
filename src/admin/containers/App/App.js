import React, {Component} from 'react'
import {Layout} from 'antd'
import {message} from '../../lib/helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames'
import {Container, Tabs} from '../../components/Framework'
import CustomScrollbars from './CustomScrollbars'
import HeaderContainer from './HeaderContainer'
import SiderContainer from './SiderContainer'

import styles from './App.css'

const {Sider, Header, Content} = Layout

/* App */
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsed: false
    }

    this.onToggle = this.onToggle.bind(this)
  }
  onToggle() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  render() {
    return (
      <Layout className={styles.layout}>
        <Header className={classnames(styles.header, {[styles.collapsed]: this.state.collapsed})}>
          <HeaderContainer collapsed={this.state.collapsed}/>
        </Header>
        <Layout>
          <Sider
            trigger={null}
            className={classnames(styles.sider, {[styles.open]: !this.state.collapsed})}
            collapsible
            collapsed={this.state.collapsed}
          >
            <CustomScrollbars invisible={this.state.collapsed}>
              <SiderContainer />
            </CustomScrollbars>
          </Sider>
          <Layout className={styles.content}>
            <Header className={styles.tabs}>
              <Tabs/>
            </Header>
            <Content className={styles.container}>
              <Container/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default App
