import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import IndexHeader from '../NewHeader/IndexHeader'
import Banner from './Banner'
import Requirements from './Requirements'
import Top from '../NewHeader/Top'
import Legend from './Legend'
import CenterInfo from './CenterInfo'
import FootBox from '../FootBox/FootBox'
class Index extends Component {
  state = {
    scrollTop: 0
  }
  componentDidMount = () => {
    window.addEventListener('scroll', this.scrollEvent)
    let scrollTop = document.scrollTop
    this.setState({scrollTop})
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.scrollEvent)
  }
  scrollEvent = (e) => {
    let dom = e.target.scrollingElement
    let scrollTop = 0
    if (dom && dom.scrollTop) {
      scrollTop = dom.scrollTop
    }
    this.setState({scrollTop})
  }
  render() {
    const {scrollTop} = this.state
    return (
      <div>
        <Helmet>
          <title>曼威C2M平台</title>
        </Helmet>
        <Top />
        <IndexHeader scrollTop={scrollTop}/>
        <Banner />
        <CenterInfo scrollTop={scrollTop}/>
        <FootBox />
      </div>
    )
  }
}

export default Index
