import React from 'react'
import {connect} from 'react-redux'
import Top from '../NewHeader/Top'
import FootBox from '../FootBox/FootBox'
import {orderClick, backOrder, handleSubmit} from '../../redux/modules/card'
import IndexHeader from '../NewHeader/IndexHeader'
import {bindActionCreators} from 'redux'
import CardComp from './CardComp'
import CardInfo from './CardInfo'
class Card extends React.Component {
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
  backOrder = () => {
    this.props.backOrder()
  }
  render() {
    let {handleSubmit, orderClick} = this.props
    const {scrollTop} = this.state
    return (
      <div style={{overflow: 'hidden'}}>
        <Top />
        <IndexHeader scrollTop={scrollTop}/>
        {
          this.props.card.nextStep ? (
            <CardInfo
              {...this.props}
              handleSubmit={handleSubmit}
              backOrder={this.backOrder}
              {...this.props.card}/>
          ) : <CardComp orderClick = {orderClick} {...this.props.card}/>
        }
        <FootBox />
      </div>
    )
  }
}
const mapStateToProps = ({card}) => ({card})

const mapDispatchToProps = dispatch => {
  return {
    orderClick: bindActionCreators(orderClick, dispatch),
    backOrder: bindActionCreators(backOrder, dispatch),
    handleSubmit: bindActionCreators(handleSubmit, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Card)
