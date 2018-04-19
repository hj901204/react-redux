import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'

import SimpleHeader from '../../components/Header/SimpleHeader'
import FootBox from '../FootBox/FootBox'
import {Layer} from '../../bootstrap'
import RegisterForm from './RegisterForm'
import next from '../../lib/request/next'
import formValueSelector from '../../lib/form/formValueSelector'
import formInvalidSelector from '../../lib/form/formInvalidSelector'

import {register, validateCodeSend} from '../../redux/modules/sso'

import styles from './Register.css'

class Register extends React.Component {
  state = {
    // 图形验证码 key
    imgKey: '',
    // 动态密码错误次数
    smsCodeCount: 0
  };

  componentDidMount() {
    const smsCodeCount = Cookies.get('smsCodeCount')
    if (smsCodeCount) {
      this.setState({smsCodeCount: Number(smsCodeCount)})
    }
  }

  // 失败次数累加
  smsCodeCountAccumulation() {
    const smsCodeCount = this.state.smsCodeCount + 1
    this.setState({smsCodeCount})
    Cookies.set('smsCodeCount', smsCodeCount, {expires: 1})
  }

  // 失败次数清除
  smsCodeCountClear() {
    const smsCodeCount = 0
    this.setState({smsCodeCount})
    Cookies.remove('smsCodeCount')
  }

  // 表单提交s
  onSubmit = values => {
    const {pwd, phone, smsCode, imgCode} = values
    const {imgKey} = this.state
    let body = {}
    if (imgKey) {
      body = {pwd, phone, smsCode, imgCode, imgKey}
    } else {
      body = {pwd, phone, smsCode}
    }
    this.props.register(body)
      .then(action => {
        this.smsCodeCountClear()
        this.props.history.replace('/')
      })
      .catch(err => {
        this.validateCode && this.validateCode.refresh()
        this.smsCodeCountAccumulation()
        next(err)
      })
  }

  // 图片验证码变更
  validateCodeChange = imgKey => {
    this.setState({imgKey})
  }

  // 图片验证码实例
  validateCodeRef = ref => {
    this.validateCode = ref
  }

  // 发送验证码
  validateCodeSend = () => {
    const {formValues} = this.props
    const data = {
      type: '2',
      userCode: formValues.phone
    }

    this.props.validateCodeSend(data)
      .then(resp => {
        Layer.msg('验证码发送成功')
      })
      .catch(next)
  }

  render() {
    const {formInvalid} = this.props
    return (
      <div>
        <SimpleHeader title="欢迎注册" />
        <div className={styles.content}>
          <div className="container">
            <RegisterForm
              ref={ref => (this.form = ref)}
              formInvalid={formInvalid}
              smsCodeCount={this.state.smsCodeCount}
              onSubmit={this.onSubmit}
              validateCodeRef={this.validateCodeRef}
              validateCodeChange={this.validateCodeChange}
              validateCodeSend={this.validateCodeSend}/>
          </div>
        </div>
        <FootBox />
      </div>
    )
  }
}

const valueSelector = formValueSelector('RegisterForm')
const invalidSelector = formInvalidSelector('RegisterForm')

const mapStateToProps = (state) => ({
  formInvalid: {
    phone: invalidSelector(state, 'phone')
  },
  formValues: {
    phone: valueSelector(state, 'phone')
  }
})

const mapDispatchToProps = dispath => ({
  register: bindActionCreators(register, dispath),
  validateCodeSend: bindActionCreators(validateCodeSend, dispath)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
