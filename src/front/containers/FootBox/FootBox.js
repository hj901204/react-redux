import React from 'react'
import {connect} from 'react-redux'
import styles from './FootBox.css'

class FootBox extends React.Component {
  render() {
    return (
      <div className={'row'} className={styles.footer} style={{margin: '0'}}>
        <div className={'col-sm-12 col-md-12'} className={styles.footerBox}>
          <div className={styles.footerUl}>
            <div className={'col-xs-6 col-sm-4'}>
              <ul>
                <li>
                  <h4>联系我们</h4>
                </li>
                <li>
                  <span>咨询热线：400-889-0102</span>
                </li>
                <li>
                  <span>咨询邮箱：marketing@mainiway.com</span>
                </li>
              </ul>
            </div>
            <div className={'col-xs-6 col-sm-4'}>
              <ul>
                <li>
                  <h4>机构分布</h4>
                </li>
                <li>
                  <span>北京·上海·南昌·泸州·泰州</span>
                </li>
                <li>
                  <span>徐州·美国·英国·以色列</span>
                </li>
              </ul>
            </div>
            <div className={'clearfix visible-xs-block'}></div>
            <div className={'col-xs-6 col-sm-4'}>
              <ul className={styles.wechat}>
                <li>
                  <h4>微信订阅号</h4>
                </li>
                <li>
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
          <div className={'col-sm-12 col-md-12'} style={{textAlign: 'center', color: '#b8bebf'}}>Copyright @ 2018 MIW 版权所有</div>
          <div className={'col-sm-12 col-md-12'} style={{textAlign: 'center', color: '#b8bebf'}}>京ICP备 17004273号-4 京公网安备 11030102010176号</div>
        </div>
      </div>
    )
  }
}
export default FootBox
