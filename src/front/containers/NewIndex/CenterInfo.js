import React from 'react'
import styles from './CenterInfo.css'
import {Link} from 'react-router-dom'
class CenterInfo extends React.Component {
  state = {
    screen: 0,
    isDisplay: false
  }
  componentDidMount = () => {
    let screenHeight = screen.height
    console.log(screenHeight)
    this.setState({screen: screenHeight})
  }
  mwmouseIn = () => {
    let _i = document.getElementById('mwInfo_i')
    _i.style.display = 'block'
  }
  mwmouseOut = () => {
    let _i = document.getElementById('mwInfo_i')
    _i.style.display = 'none'
  }
  gymouseIn = () => {
    let _i = document.getElementById('gyInfo_i')
    _i.style.display = 'block'
  }
  gymouseOut = () => {
    let _i = document.getElementById('gyInfo_i')
    _i.style.display = 'none'
  }
  gjmouseIn = () => {
    let _i = document.getElementById('gjInfo_i')
    _i.style.display = 'block'
  }
  gjmouseOut = () => {
    let _i = document.getElementById('gjInfo_i')
    _i.style.display = 'none'
  }
  zzmouseIn = () => {
    let _i = document.getElementById('zzInfo_i')
    _i.style.display = 'block'
  }
  zzmouseOut = () => {
    let _i = document.getElementById('zzInfo_i')
    _i.style.display = 'none'
  }
  znmouseIn = () => {
    let _i = document.getElementById('znInfo_i')
    _i.style.display = 'block'
  }
  znmouseOut = () => {
    let _i = document.getElementById('znInfo_i')
    _i.style.display = 'none'
  }
  jrmouseIn = () => {
    let _i = document.getElementById('jrInfo_i')
    _i.style.display = 'block'
  }
  jrmouseOut = () => {
    let _i = document.getElementById('jrInfo_i')
    _i.style.display = 'none'
  }
  render() {
    console.log(this.props.scrollTop)
    return (
      <div className={styles.CenterBox}>
        <div className={styles.fastBox}>
          <p>在线加工入口</p>
          <div className={styles.fastCon}><span>FAST ENTRY</span></div>
        </div>
        <div className={styles.working}>
          <ul>
            <li>
              <a></a>
              <div>
                <span>机械加工</span>
                <i>钢板切割共享平台</i>
                <a href="http://www.yuncut.com" target="_blank"></a>
              </div>
            </li>
            <li>
              <a></a>
              <div>
                <span>箱包</span>
                <i>定制拉杆箱</i>
                <a href="http://www.idinbao.com/" target="_blank"></a>
              </div>
            </li>
            <li>
              <a></a>
              <div>
                <span>包装包材</span>
                <i>爱生活，爱包装</i>
                <a href="http://ibz.idinbao.com/" target="_blank"></a>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.order}>
          <h5>欢迎现场定制礼品</h5>
          <div><Link to="/card">去下单</Link></div>
        </div>
        <div className={styles.fastBox}>
          <p>曼威C2M</p>
          <div className={styles.fastCon}><span>MAINIWAY C2M</span></div>
        </div>
        <div className={styles.mainiway}>
          {
            this.props.scrollTop >= 700 ? (
              <ul>
                <li>
                  <div className={styles.mwInfo} onMouseOver={this.mwmouseIn} onMouseOut={this.mwmouseOut}>曼威个性化<br/>定制平台<i id="mwInfo_i">曼威个性化<br/>定制平台</i></div>
                  <ol className={styles.mwOl}>
                    <li><span></span></li>
                    <li><span></span>工业搜索</li>
                    <li><span></span>前台导购</li>
                    <li><span></span>个性配置</li>
                    <li><span></span>订单管理</li>
                    <li><span></span>产能匹配</li>
                    <li><span></span>售后服务</li>
                  </ol>
                </li>
                <li>
                  <div className={styles.gyInfo} onMouseOver={this.gymouseIn} onMouseOut={this.gymouseOut}>供应链<br/>协同平台<i id="gyInfo_i">供应链<br/>协同平台</i></div>
                  <ol className={styles.gyOl}>
                    <li><span></span>结算协同</li>
                    <li><span></span>库存协同</li>
                    <li><span></span>交货协同</li>
                    <li><span></span>生产协同</li>
                    <li><span></span>订单协同</li>
                    <li><span></span>报价管理</li>
                    <li><span></span>寻源管理</li>
                    <li><span></span></li>
                  </ol>
                </li>
                <li>
                  <div className={styles.gjInfo} onMouseOver={this.gjmouseIn} onMouseOut={this.gjmouseOut}>高级计划<br/>管理平台<i id="gjInfo_i">高级计划<br/>管理平台</i></div>
                  <ol className={styles.gjOl}>
                    <li><span></span></li>
                    <li><span></span>持续改善</li>
                    <li><span></span>灵活调整</li>
                    <li><span></span>预警</li>
                    <li><span></span>全过程管控</li>
                    <li><span></span>部门协调</li>
                    <li><span></span>模拟分析</li>
                    <li><span></span>精细计划</li>
                  </ol>
                </li>
                <li>
                  <div className={styles.zzInfo} onMouseOver={this.zzmouseIn} onMouseOut={this.zzmouseOut}>制造执行<br/>管理平台<i id="zzInfo_i">制造执行<br/>管理平台</i></div>
                  <ol className={styles.zzOl}>
                    <li><span></span></li>
                    <li><span></span>设备管理</li>
                    <li><span></span>物料管理</li>
                    <li><span></span>生产管理</li>
                    <li><span></span>生产监控管理</li>
                    <li><span></span>质量管理</li>
                  </ol>
                </li>
                <li>
                  <div className={styles.znInfo} onMouseOver={this.znmouseIn} onMouseOut={this.znmouseOut}>智能仓储<br/>管理平台<i id="znInfo_i">智能仓储<br/>管理平台</i></div>
                  <ol className={styles.znOl}>
                    <li><span></span>出入库管理</li>
                    <li><span></span>越库配送</li>
                    <li><span></span>智能拣配</li>
                    <li><span></span>智能补货</li>
                    <li><span></span>库存优化</li>
                    <li><span></span></li>
                  </ol>
                </li>
                <li>
                  <div className={styles.jrInfo} onMouseOver={this.jrmouseIn} onMouseOut={this.jrmouseOut}>供应链金<br/>融管理<br/>平台<i id="jrInfo_i">供应链金<br/>融管理<br/>平台</i></div>
                  <ol className={styles.jrOl}>
                    <li><span></span>资金闭环</li>
                    <li><span></span>风控分析</li>
                    <li><span></span>融资管理</li>
                    <li><span></span>应收/付管理</li>
                    <li><span></span>额度管理</li>
                    <li><span></span>账户管理</li>
                    <li><span></span></li>
                  </ol>
                </li>
              </ul>
            ) : null
          }
        </div>
        <div className={styles.brain}>
          <div className={styles.brainImg}></div>
          {
            ((this.state.screen >= 1366 || this.state.screen === 1024) && this.props.scrollTop >= 1340) || (this.state.screen === 1080 && this.props.scrollTop >= 1550) || (this.props.scrollTop >= 1600) ? (
              <ul>
                <li>
                  <div className={styles.mwInfo_two}>曼威个性化<br/>定制平台</div>
                </li>
                <li>
                  <div className={styles.gyInfo_two}>供应链<br/>协同平台</div>
                </li>
                <li>
                  <div className={styles.gjInfo_two}>高级计划<br/>管理平台</div>
                </li>
                <li>
                  <div className={styles.zzInfo_two}>制造执行<br/>管理平台</div>
                </li>
                <li>
                  <div className={styles.znInfo_two}>智能仓储<br/>管理平台</div>
                </li>
                <li>
                  <div className={styles.jrInfo_two}>供应链金<br/>融管理<br/>平台</div>
                </li>
              </ul>
            ) : null
          }
        </div>
        <div className={styles.sight}></div>
        <div className={styles.fastBox}>
          <p>合作伙伴</p>
          <div className={styles.fastCon}><span>PARTNERS</span></div>
        </div>
        <div className={styles.partners}>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    )
  }
}
export default CenterInfo
