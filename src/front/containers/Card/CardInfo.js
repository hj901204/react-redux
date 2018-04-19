import React from 'react'
import {connect} from 'react-redux'
import styles from './CardComp.css'
import Layer from '../../bootstrap/Layer'
import next from '../../lib/request/next'
import {hosts} from '../../lib/utils'
import sm01Img from '../../images/sm01.jpg'
import sm02Img from '../../images/sm02.jpg'
import sm03Img from '../../images/sm03.jpg'
import big01Img from '../../images/pic01.jpg'
import big02Img from '../../images/pic03.jpg'
import big03Img from '../../images/pic05.jpg'
class CardInfo extends React.Component {
  state = {
    name: '',
    companyName: '',
    phone: '',
    phoneReg: false
  }
  onPhonechange = (e) => {
    let inValues = e.target.value
    let reg = /^1[34578]\d{9}$/
    if (!reg.test(inValues)) {
      this.setState({phoneReg: true})
    } else {
      this.setState({phoneReg: false})
    }
  }
  nameChange = (e) => {
    this.setState({name: e.target.value})
  }
  companyChange = (e) => {
    this.setState({companyName: e.target.value})
  }
  phoneChange = (e) => {
    this.setState({phone: e.target.value})
  }
  handleSubmit = () => {
    let {cardData} = this.props
    let arr = []
    arr.push(this.state.phone)
    if (this.state.name) {
      arr.push(this.state.name)
    }
    if (this.state.companyName) {
      arr.push(this.state.companyName)
    }
    let orderInfo = [{
      'address': arr.join(','),
      'receiveUnit': cardData.abcRadio,
      'totalPrice': '1020.23',
      'totalTransportFee': '1.23',
      'orderGoodsInfo': [{
        'deliveryWarehouse': cardData.imgRadio,
        'matchName': cardData.inputValue,
        'nums': Number(cardData.numberValue)
      }]
    }]
    if (this.state.phone) {
      this.props.handleSubmit({orderInfo: orderInfo}).then(() => {
        Layer.open({
          children: (
            <div className="text-center">
              <h4>定制成功！请等待供应商返回报价！</h4>
            </div>
          ),
          btns: [
            {text: '确认', handle: () => { window.location.href = hosts('admin') + '/buyerPendingOrder' }}
          ]
        })
      }).catch(next)
    } else {
      this.setState({phoneReg: true})
    }
  }
  componentDidMount = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  }
  render() {
    const {cardData, submitData, backOrder} = this.props
    return (
      <div>
        <div className={styles.orderTop}><div className={styles.orderTop_title}>定制个性名片台</div></div>
        <div className={styles.marginCommon}>
          <div className={styles.title_div}>
            <div className={styles.step_one}><span style={{border: '2px solid #2f93e1', color: ' #2f93e1'}}>1</span><div style={{background: '#2f93e1'}}></div></div>
            <div className={styles.step_two}>
              <span className={styles.span_one} style={{border: '2px solid #2f93e1', color: ' #2f93e1'}}>2</span>
              <div></div>
              <span className={styles.span_two}>3</span>
            </div>
          </div>
          <div className={styles.my_order}>
            <div style={{color: '#2f93e1'}}>我的定制</div>
            <div style={{textIndent: '-40px', color: '#2f93e1'}}>填写核对定制信息<span style={{color: '#9ea6ad'}}>成功提交定制</span></div>
          </div>
          <div className={styles.writeInfo}>
            <div className={'col-sm-12 col-md-12'}><h4>填写收货人信息</h4></div>
            <form className={'form-horizontal'}>
              <div className={'form-group'}>
                <div className={'col-sm-12 col-md-12'}>
                  <input type="text" placeholder="姓名" onBlur={this.nameChange}/>
                </div>
              </div>
              <div className={'form-group'}>
                <div className={'col-sm-12 col-md-12'}>
                  <input type="text" placeholder="公司名称" onBlur={this.companyChange}/>
                </div>
              </div>
              <div className={'form-group'}>
                <div className={'col-sm-12 col-md-12'}>
                  {
                    this.state.phoneReg ? (
                      <input className={styles.phoneReg} type="text" placeholder="手机号" onBlur={this.phoneChange} onInput={this.onPhonechange}/>
                    ) : <input type="text" placeholder="手机号" onBlur={this.phoneChange} onInput={this.onPhonechange}/>
                  }
                  {
                    this.state.phoneReg ? (
                      <div className={styles.phoneText}>请填写正确的手机号</div>
                    ) : null
                  }
                </div>
              </div>
            </form>
          </div>
          <div className={styles.NameOrderInfo}>
            <div className={'col-sm-12 col-md-12'}><h4>确认名片台订购信息</h4></div>
            <div className={styles.infoDetail}>
              <div className={'col-xs-6'}>
                <ul>
                  <li>
                    <span>行业图案：</span>
                    <b className={styles.industryImg}>
                      { cardData.imgRadio === 'A' ? <p className={styles.p1}></p> : cardData.imgRadio === 'B' ? <p className={styles.p2}></p> : <p className={styles.p3}></p> }
                    </b>
                  </li>
                  <li>
                    <span>印字信息：</span>
                    {cardData.inputValue}
                  </li>
                  <li>
                    <span>取货口：</span>
                    { cardData.abcRadio === 'A区' ? 'A' : cardData.abcRadio === 'B区' ? 'B' : 'C' }区
                  </li>
                  <li>
                    <span>订购数量：</span>
                    {cardData.numberValue}个
                  </li>
                </ul>
              </div>
              <div className={'col-xs-6'}>
                <div className={styles.industryBigImg}>
                  {
                    cardData.imgRadio === 'A' ? (
                      <img src={big01Img} />
                    ) : cardData.imgRadio === 'B' ? (
                      <img src={big02Img} />
                    ) : <img src={big03Img} />
                  }
                  <input value={cardData.inputValue} disabled='disabled'/>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.clickButton}>
              <span onClick={backOrder}>取消定制</span>
              <span onClick={this.handleSubmit}>提交定制</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CardInfo
