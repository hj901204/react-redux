import React, {Component} from 'react'
import {reduxForm} from 'redux-form'
import classnames from 'classnames'
import {connect} from 'react-redux'

import {
  Form,
  FormGroup,
  FormGroupRdux,
  FormControl,
  ControlLabel,
  InputGroup,
  Checkbox,
  Radio,
  Col,
  HelpBlock,
  Layer
} from '../../bootstrap'
import ImageValidateCode from '../../components/ImageValidateCode'
import Countdown from '../../components/Countdown'
import SubmitButton from '../Login/SubmitButton'

import {checkPhoneUsed} from '../../lib/api'
import validator from '../../lib/validator'

import styles from './RegisterForm.css'

const shouldValidate = (params) => {
  const {
    values,
    props,
    nextProps,
    initialRender,
    lastFieldValidatorKeys,
    fieldValidatorKeys,
    structure
  } = params

  if (initialRender || (props.smsCodeCount !== nextProps.smsCodeCount)) {
    return true
  }

  return !structure.deepEqual(values, nextProps && nextProps.values) ||
    !structure.deepEqual(lastFieldValidatorKeys, fieldValidatorKeys)
}

// 表单较验
const validate = (fields, props) => {
  return validator({
    phone: {
      isRequired: '手机号不能为空',
      isMobilePhone: ['手机号格式不正确', 'zh-CN']
    },
    pwd: {
      isRequired: '密码不能为空',
      isLength: ['6-20个字符，建议使用字母，数字和符号两种及以上组合。', {min: 6, max: 20}],
      matches: ['6-20个字符，建议使用字母，数字和符号两种及以上组合。', /\S{6,20}/]
    },
    smsCode: {
      isRequired: '动态码不能为空'
    },
    imgCode: {
      isRequired: props.smsCodeCount > 2 ? '图形验证不能为空' : '',
      isLength: ['图形验证的长度不正确', {min: 4, max: 4}]
    }
  }, fields)
}

// 检查手机号是否是已注册
const asyncValidate = (values, dispatch, props, blurredField) => {
  return checkPhoneUsed(values)
    .catch(resp => resp)
    .then(resp => {
      if (resp.root.phoneIsUsed) {
        throw {phone: '该手机号已被注册'}
      }
    })
}

const RegisterForm = props => {
  const {
    handleSubmit,
    invalid,
    formInvalid,
    validateCodeRef,
    validateCodeChange,
    validateCodeSend
  } = props

  return (
    <Form horizontal className={styles.form} onSubmit={handleSubmit} role="form">
      <FormGroupRdux name="phone" className={styles.group}>
        <Col md={5} component={ControlLabel} className={styles.label}>手机号</Col>
        <Col md={3}>
          <InputGroup>
            <InputGroup.Addon className={styles.addon}>中国 +86</InputGroup.Addon>
            <FormControl
              className={styles.input}
              component="input"
              type="text"
              placeholder="手机号"/>
          </InputGroup>
        </Col>
        <Col md={4} className={styles.error} component={HelpBlock}/>
      </FormGroupRdux>

      <FormGroupRdux name="smsCode" className={styles.group}>
        <Col md={5} component={ControlLabel} className={styles.label}>动态码</Col>
        <Col md={3}>
          <InputGroup separate>
            <FormControl
              className={styles.input}
              component="input"
              type="text"
              placeholder="请输入动态码"/>
            <InputGroup.Btn>
              <Countdown
                className={styles.countdown}
                disabled={formInvalid.phone}
                onClick={validateCodeSend} text="获取动态码" />
            </InputGroup.Btn>
          </InputGroup>
        </Col>
        <Col md={4} className={styles.error} component={HelpBlock}/>
      </FormGroupRdux>

      <FormGroupRdux name="pwd" className={styles.group}>
        <Col md={5} component={ControlLabel} className={styles.label}>设置密码</Col>
        <Col md={3}>
          <FormControl
            className={styles.input}
            component="input"
            type="password"
            placeholder="6-20个字符，建议使用字母，数字和符号两种及以上组合。"/>
        </Col>
        <Col md={4} className={styles.error} component={HelpBlock}/>
      </FormGroupRdux>

      {
        props.smsCodeCount > 2 ? (
          <FormGroupRdux name="imgCode" className={styles.group}>
            <Col md={5} component={ControlLabel} className={styles.label}>验证码</Col>
            <Col md={3}>
              <InputGroup separate>
                <FormControl
                  className={styles.input}
                  component="input"
                  type="text"
                  placeholder="请输入验证码"/>
                <InputGroup.Btn>
                  <ImageValidateCode onChange={validateCodeChange} ref={validateCodeRef} />
                </InputGroup.Btn>
              </InputGroup>
            </Col>
            <Col md={4} className={styles.error} component={HelpBlock}/>
          </FormGroupRdux>
        ) : null
      }

      <FormGroup>
        <Col mdOffset={5} md={3}>
          <SubmitButton
            type="submit"
            block
            size="large"
            disabled={invalid}
          >立即注册</SubmitButton>
        </Col>
      </FormGroup>
    </Form>
  )
}

export default reduxForm({
  form: 'RegisterForm',
  validate,
  asyncValidate,
  asyncBlurFields: ['phone'],
  shouldValidate
})(RegisterForm)
