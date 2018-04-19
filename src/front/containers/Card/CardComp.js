import React from 'react'
import {connect} from 'react-redux'
import Layer from '../../bootstrap/Layer'
import styles from './CardComp.css'
import sm01Img from '../../images/sm01.jpg'
import sm02Img from '../../images/sm02.jpg'
import sm03Img from '../../images/sm03.jpg'
import big01Img from '../../images/pic01.jpg'
import big02Img from '../../images/pic03.jpg'
import big03Img from '../../images/pic05.jpg'
class CardComp extends React.Component {
  state = {
    imgRadio: 'A',
    inputValue: 'Mainiway',
    abcRadio: 'A区',
    numberValue: 1,
    inputReg: false,
    click: true,
    inValues: ''
  }
  falseClick = () => {}
  orderClick = (value) => {
    if (!this.state.imgRadio) {
      this.setState({imgReg: true})
    }
    if (!this.state.abcRadio) {
      this.setState({abcReg: true})
    }
    if (this.state.imgRadio && this.state.abcRadio) {
      this.props.orderClick(value)
    }
  }
  inputChange = (e) => {
    if (e.target.value) {
      this.setState({inputValue: e.target.value})
    } else {
      this.setState({inputValue: 'Mainiway'})
    }
  }
  onpropertychange = (e) => {
    let inValues = e.target.value
    let reg = /^[0-9A-Z]{0,10}$/
    if (!reg.test(inValues)) {
      this.setState({inputReg: true, click: false})
    } else {
      this.setState({inputReg: false, click: true})
    }
    this.setState({inValues: inValues})
  }
  AradioClick = (e) => {
    this.setState({abcRadio: e.target.value})
  }
  BradioClick = (e) => {
    this.setState({abcRadio: e.target.value})
  }
  CradioClick = (e) => {
    this.setState({abcRadio: e.target.value})
  }
  imgAradioClick = (e) => {
    this.setState({imgRadio: e.target.value})
  }
  imgBradioClick = (e) => {
    this.setState({imgRadio: e.target.value})
  }
  imgCradioClick = (e) => {
    this.setState({imgRadio: e.target.value})
  }
  preview = () => {
    Layer.open({
      children: (
        <div className={styles.previewImg}>
          {
            this.state.imgRadio === 'A' ? (
              <img src={big01Img} />
            ) : this.state.imgRadio === 'B' ? (
              <img src={big02Img} />
            ) : <img src={big03Img}/>
          }
          {
            this.state.imgRadio === 'C' ? (
              <input value={this.state.inValues} disabled='disabled' style={{position: 'absolute', right: '13px'}}/>
            ) : <input value={this.state.inValues} disabled='disabled'/>
          }
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        <div className={styles.orderTop}><div className={styles.orderTop_title}>定制个性名片台</div></div>
        <div className={styles.marginCommon}>
          <div className={styles.title_div}>
            <div className={styles.step_one}><span style={{border: '2px solid #2f93e1', color: ' #2f93e1'}}>1</span><div></div></div>
            <div className={styles.step_two}>
              <span className={styles.span_one}>2</span>
              <div></div>
              <span className={styles.span_two}>3</span>
            </div>
          </div>
          <div className={styles.my_order}>
            <div style={{color: '#2f93e1'}}>我的定制</div>
            <div style={{textIndent: '-40px', color: '#9ea6ad'}}>填写核对定制信息<span>成功提交定制</span></div>
          </div>
          <div className={styles.con}>
            <div className={styles.info}>
              <ul>
                <li>
                  <i>自定义图案：</i>
                  <div className={styles.imgRadio}><div className={styles.imgStyle}><img src={sm01Img} /></div><input type="radio" name="img" value="A" onClick={this.imgAradioClick} defaultChecked = 'checked'/></div>
                  <div className={styles.imgRadio}><div className={styles.imgStyle} ><img src={sm02Img} /></div><input type="radio" name="img" value='B' onClick={this.imgBradioClick}/></div>
                  <div className={styles.imgRadio}><div className={styles.imgStyle}><img src={sm03Img} /></div><input type="radio" name="img" value='C' onClick={this.imgCradioClick}/></div>
                </li>
                <li>
                  {
                    this.state.imgReg ? (
                      <div style={{color: 'red', textAlign: 'left'}}><i></i>请选择图案！</div>
                    ) : null
                  }
                </li>
                <li className={styles.inputColor}>
                  <i>印字信息：</i>
                  {
                    this.state.inputReg ? (
                      <input type="text" className={styles.inputReg} onBlur={this.inputChange} onInput={this.onpropertychange} maxLength="10"/>
                    ) : <input type="text" placeholder="MAINIWAY" onBlur={this.inputChange} onInput={this.onpropertychange} maxLength="10"/>
                  }
                  {
                    this.state.inputReg ? (
                      <div style={{color: 'red', textAlign: 'left'}}><i></i>限10个大写英文或数字字符</div>
                    ) : null
                  }
                </li>
                <li>
                  <i>出货地点：</i>
                  <input type="radio" name="abc" value="A区" onClick={this.AradioClick} style={{marginLeft: '0px'}} defaultChecked='checked'/> <span> A区</span>
                  <input type="radio" name="abc" value='B区' onClick={this.BradioClick}/> <span> B区</span>
                  <input type="radio" name="abc" value='C区' onClick={this.CradioClick}/> <span> C区</span>
                </li>
                <li>
                  <span>数量：</span>
                  <div className={styles.numbers}>
                    <div>-</div>
                    <div>{this.state.numberValue}</div>
                    <div>+</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.infoa}>
              <div className={styles.infoa_div} >
                <span>效果预览：</span>
                <div>
                  <div className={styles.bigImg} onClick={this.preview}>
                    {
                      this.state.imgRadio === 'A' ? (
                        <img src={big01Img} />
                      ) : this.state.imgRadio === 'B' ? (
                        <img src={big02Img} />
                      ) : <img src={big03Img} />
                    }
                    {
                      this.state.imgRadio === 'C' ? (
                        <input value={this.state.inValues} disabled='disabled' style={{position: 'absolute', right: '-11px', transform: 'scale(0.5) rotate(-14deg)'}}/>
                      ) : <input value={this.state.inValues} disabled='disabled'/>
                    }
                  </div>
                </div>
              </div>
              <div className={styles.orderButton}>
                <i onClick={() => this.state.click ? this.orderClick(this.state) : this.falseClick}>定制下单</i>
              </div>
              <div className={styles.instruction}>订单提交成功后供应商会根据定制要求进行报价！</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CardComp
