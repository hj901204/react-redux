import React from 'react'
import classnames from 'classnames'
import {Link} from 'react-router-dom'
import {reduxForm} from 'redux-form'

import {
  Form,
  FormGroup,
  FormGroupRdux,
  FormControl,
  InputGroup,
  Checkbox,
  Radio,
  HelpBlock
} from '../../bootstrap'
import ImageValidateCode from '../../components/ImageValidateCode'
import Countdown from '../../components/Countdown'
import Iconfont from '../../components/Iconfont'
import validator from '../../lib/validator'
import {checkPhoneUsed} from '../../lib/api'

import SubmitButton from './SubmitButton'
import LoginRadio from './LoginRadio'

import styles from './LoginForm.css'

const validate = (fields, props) => {
  let vali = {
    phone: {
      isRequired: '手机号不能为空',
      isMobilePhone: ['手机号格式不正确', 'zh-CN']
    },
    pwd: {
      isRequired: fields.loginFlag === '1' ? '密码不能为空' : ''
    },
    smsCode: {
      isRequired: fields.loginFlag === '2' ? '动态码不能为空' : ''
    },
    imgCode: {
      isRequired: props.failureTimes > 2 ? '图形验证码不能为空' : '',
      isLength: ['图形验证的长度不正确', {min: 4, max: 4}]
    }
  }
  if (fields.loginFlag === '1') {
    vali.phone = {
      isRequired: '手机号/账号不能为空'
    }
  }
  return validator(vali, fields)
}

// 手机号异步较验
const asyncValidate = (values) => {
  return checkPhoneUsed({phone: values.phone})
    .catch(() => {
      throw {phone: '手机号较验失败'}
    })
    .then(resp => {
      if (!resp.root.phoneIsUsed) {
        throw {phone: '该手机号码未注册'}
      }
    })
}

// loginForm
const LoginForm = props => {
  const {fieldsInvalid, fieldsValues} = props

  return (
    <div className={styles.form}>
      <Form role="form" onSubmit={props.handleSubmit}>
        <header className={styles.header}>
          <FormGroupRdux name="loginFlag" className={styles.group}>
            <Radio value="2" component={LoginRadio}>动态码登录</Radio>
            <Radio value="1" component={LoginRadio}>密码登录</Radio>
          </FormGroupRdux>
        </header>
        <div className={styles.body}>
          <FormGroupRdux name="phone" className={styles.group}>
            <InputGroup>
              <InputGroup.Addon className={styles.addon}>
                <Iconfont name="yonghuming" />
              </InputGroup.Addon>
              <FormControl
                className={styles.input}
                component="input"
                type="text"
                placeholder={`请使用已注册的手机号${fieldsValues.loginFlag === '1' ? '/账号' : ''}`}/>
            </InputGroup>
            <HelpBlock className={styles.help} />
          </FormGroupRdux>
          {
            fieldsValues.loginFlag === '1' ? (
              <FormGroupRdux name="pwd" className={styles.group}>
                <InputGroup>
                  <InputGroup.Addon className={styles.addon}>
                    <Iconfont name="mima" />
                  </InputGroup.Addon>
                  <FormControl
                    className={styles.input}
                    component="input"
                    type="password"
                    placeholder="请输入密码"/>
                </InputGroup>
                <HelpBlock className={styles.help} />
              </FormGroupRdux>
            ) : (
              <FormGroupRdux name="smsCode" className={styles.group}>
                <InputGroup separate>
                  <InputGroup.Addon className={styles.addon}>
                    <Iconfont name="mima" />
                  </InputGroup.Addon>
                  <FormControl
                    className={styles.input}
                    component="input"
                    type="text"
                    placeholder="请输入动态码"/>
                  <InputGroup.Btn>
                    <Countdown
                      className={styles.countdown}
                      disabled={fieldsInvalid.phone}
                      onClick={props.validateCodeSend} text="获取动态码" />
                  </InputGroup.Btn>
                </InputGroup>
                <HelpBlock className={styles.help} />
              </FormGroupRdux>
            )
          }

          {
            props.failureTimes > 2 ? (
              <FormGroupRdux name="imgCode" className={styles.group}>
                <InputGroup separate>
                  <FormControl
                    className={styles.input}
                    component="input"
                    type="text"
                    placeholder="请输入图片验证码"/>
                  <InputGroup.Btn>
                    <ImageValidateCode ref={props.validateCodeRef} onChange={props.validateCodeChange} />
                  </InputGroup.Btn>
                </InputGroup>
                <HelpBlock className={styles.help} />
              </FormGroupRdux>
            ) : null
          }

          <FormGroup>
            <SubmitButton type="submit" block size="large" disabled={props.invalid}>登录</SubmitButton>
          </FormGroup>
          {/* <FormGroup className="clearfix">
            <Link className="pull-right" to="/register">立即注册</Link>
          </FormGroup> */}
        </div>
      </Form>
    </div>
  )
}

export default reduxForm({
  form: 'LoginForm',
  validate
  // asyncValidate,
  // asyncBlurFields: ['phone']
})(LoginForm)
