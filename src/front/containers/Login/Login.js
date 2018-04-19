import React from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cookies from 'js-cookie'

import SimpleHeader from '../../components/Header/SimpleHeader'
import FootBox from '../FootBox/FootBox'
import {Layer} from '../../bootstrap'
import LoginForm from './LoginForm'
import next from '../../lib/request/next'
import formInvalidSelector from '../../lib/form/formInvalidSelector'
import formValueSelector from '../../lib/form/formValueSelector'
import {login, validateCodeSend} from '../../redux/modules/sso'

import styles from './Login.css'

class Login extends React.Component {
  state = {
    // 图片验证码KEY
    imgKey: '',
    // 登录失败的次数
    failureTimes: 0
  };

  componentDidMount() {
    const failureTimes = Cookies.get('failureTimes')
    if (failureTimes) {
      this.setState({failureTimes: Number(failureTimes)})
    }
  }

  // 失败次数累加
  failureTimesAccumulation() {
    const failureTimes = this.state.failureTimes + 1
    this.setState({failureTimes})
    Cookies.set('failureTimes', failureTimes, {expires: 1})
  }

  // 失败次数清除
  failureTimesClear() {
    const failureTimes = 0
    this.setState({failureTimes})
    Cookies.remove('failureTimes')
  }

  // 表单提交
  onSubmit = (values) => {
    const body = {
      loginFlag: values.loginFlag,
      phone: values.phone,
      captcha: values.code,
      loginType: navigator.platform
    }
    const {imgKey} = this.state
    if (values.loginFlag === '1') {
      body.pwd = values.pwd
    } else {
      body.smsCode = values.smsCode
    }
    if (imgKey) {
      body.imgKey = imgKey
      body.imgCode = values.imgCode
    }

    this.props.login(body)
      .then(action => {
        this.failureTimesClear()
        Layer.msg('登录成功')
        window.location.href = action.data.redirect
      })
      .catch(err => {
        this.validateCode && this.validateCode.refresh()
        this.failureTimesAccumulation()
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

  // 获取动态码
  validateCodeSend = () => {
    const {fieldsValues} = this.props
    this.props.validateCodeSend({userCode: fieldsValues.phone, type: 5})
      .then(() => {
        Layer.msg('动态码发送成功')
      })
      .catch(() => {
        Layer.msg('动态码发送失败')
      })
  }

  render() {
    const {fieldsValues, fieldsInvalid} = this.props
    return (
      <div>
        <SimpleHeader title="欢迎登录" />
        <div className={styles.content}>
          <div className="container">
            <div className={classnames(styles.body, 'row')}>
              <div className={styles.logForm}>
                <LoginForm
                  onSubmit={this.onSubmit}
                  initialValues={{loginFlag: '2'}}
                  failureTimes={this.state.failureTimes}
                  fieldsValues={fieldsValues}
                  fieldsInvalid={fieldsInvalid}
                  validateCodeChange={this.validateCodeChange}
                  validateCodeRef={this.validateCodeRef}
                  validateCodeSend={this.validateCodeSend}
                />
              </div>
            </div>
          </div>
        </div>
        <FootBox />
      </div>
    )
  }
}

const invalidSelector = formInvalidSelector('LoginForm')
const valueSelector = formValueSelector('LoginForm')
const mapStateToProps = (state) => ({
  fieldsInvalid: invalidSelector(state, 'phone', 'smsCode'),
  fieldsValues: valueSelector(state, 'phone', 'loginFlag')
})
const mapDispatchToProps = dispath => ({
  login: bindActionCreators(login, dispath),
  validateCodeSend: bindActionCreators(validateCodeSend, dispath)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
