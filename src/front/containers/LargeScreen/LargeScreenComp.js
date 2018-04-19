import React from 'react'
import {connect} from 'react-redux'
import styles from './LargeScreen.css'
import {formateNumberDateTime} from '../../lib/utils'
import {getOrderStatusName, getOrderProgress} from '../../lib/dataUtils'
class LargeScreenComp extends React.Component {
  render() {
    let {root} = this.props.orderList
    let pro = root ? Number(root[0].orderStatus) : 0
    let total = this.props.totalData.root ? this.props.totalData.root : 0
    if (root) {
      for (let v of root) {
        if (v.orderStatus === 13) {
          delete root.v
        }
      }
      console.log(root)
    }
    return (
      <div className={styles.LargeScreen}>
        <div className={'col-sm-12 col-md-12'}>
          <div className={styles.LargeTop}>
            <ul>
              <li></li>
              <li></li>
              <li><div>曼威C2M平台-订单交易与生产情况</div></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className={styles.orderStatus}>
            <div className={styles.threeBigs}>
              <div className={styles.orderBox}>
                <ol>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                </ol>
                <div className={styles.order}>
                  <div className={styles.order_one}>
                    <div className={styles.order_two}><span>订单交易量<br/>{total.totalCount}<br/>(单)</span></div>
                  </div>
                  <div className={styles.radialProgressBar} style={{backgroundImage: 'linear-gradient(90deg, #48A8F3 50%, transparent 30%), linear-gradient(45deg, #48A8F3 50%, #28292c 50%)'}}>
                    <div className={styles.overlay}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.threeBigs}>
              <div className={styles.orderBox}>
                <ol>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                </ol>
                <div className={styles.order} style={{borderColor: '#714409', boxShadow: '#714409 0px 0px 20px 3px'}}>
                  <div className={styles.order_one} style={{borderColor: '#FF9900'}}>
                    <div className={styles.order_two} style={{border: '10px solid #714409'}}><span>交易金额<br/>{total.totalPrice}<br/>(元)</span></div>
                  </div>
                  <div className={styles.radialProgressBar} style={{backgroundImage: 'linear-gradient(90deg, #D18010 50%, transparent 30%), linear-gradient(45deg, #D18010 50%, #28292c 50%)'}}>
                    <div className={styles.overlay}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.threeBigs}>
              <div className={styles.orderBox}>
                <ol>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                  <li><div className={styles.smicon}><span></span></div></li>
                </ol>
                <div className={styles.order} style={{borderColor: '#258161', boxShadow: '#258161 0px 0px 20px 3px'}}>
                  <div className={styles.order_one} style={{borderColor: '#33FF00'}}>
                    <div className={styles.order_two} style={{border: '10px solid #258161'}} id={styles.orderSucess}><span>生产状态<br/>完工 {total.okCount}<br/>在制 {total.noCount}</span></div>
                  </div>
                  <div className={styles.radialProgressBar} style={{backgroundImage: 'linear-gradient(90deg, #40C898 50%, transparent 50%), linear-gradient(45deg, #40C898 50%, #28292c 50%)'}}>
                    <div className={styles.overlay}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.tablesCont}>
            <ol>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
            </ol>
            <div className={styles.tabsBorder}>
              <table className="table" style={{textAlign: 'center', marginBottom: '0'}}>
                <thead>
                  <tr>
                    <th>订单号</th>
                    <th>客户</th>
                    <th>订单状态</th>
                    <th>完成时间</th>
                    <th>进度</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    root ? root.map((items, index) => {
                      return (
                        <tr key={index}>
                          <td>{items.orderCode}</td>
                          <td>{items.address.split(',')[1]}</td>
                          <td>{getOrderStatusName(items.orderStatus)}</td>
                          <td>{formateNumberDateTime(items.submitTime)}</td>
                          <td>{getOrderProgress(items.orderStatus)}</td>
                        </tr>
                      )
                    }) : null
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.proBox}>
            <ol>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
              <li><div className={styles.smicon}><span></span></div></li>
            </ol>
            <div className={styles.schedule}>
              <div className={styles.fiveBox}>
                <ul>
                  <li>
                    <div>
                      <div className={styles.outBox}>
                        <div className={styles.inBox}><span>定制<br/>询价下单</span></div>
                      </div>
                    </div>
                    <div className={styles.lineBox}></div>
                    {
                      (pro >= 1 && pro <= 2) || pro === 13 ? (
                        <div className={styles.dian} id={styles.dianAnimation}></div>
                      ) : <div className={styles.dian}></div>
                    }
                    <div className={styles.dian}></div>
                    <div className={styles.info}>定制平台C2M</div>
                    {
                      (pro >= 1 && pro <= 2) || pro === 13 ? (
                        <div className={styles.pro_li} id={styles.proLi}></div>
                      ) : <div className={styles.pro_li}></div>
                    }
                    <div className={styles.step}>
                      <ol>
                        {
                          pro >= 1 ? <li style={{color: '#fff'}}><span style={{background: '#188eef'}}></span>提交订单</li> : <li><span></span>提交订单</li>
                        }
                        {
                          pro >= 2 ? <li style={{color: '#fff'}}><span style={{background: '#188eef'}}></span>订单确认</li> : <li><span></span>订单确认</li>
                        }
                        {
                          pro >= 3 ? <li style={{color: '#fff'}}><span style={{background: '#188eef'}}></span>支付预付款</li> : <li><span></span>支付预付款</li>
                        }
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className={styles.outBox} style={{border: '1px solid #F1A743'}}>
                        <div className={styles.inBox} style={{border: '5px solid #D18010', background: '#E79253'}}><span>订单<br/>管理分派</span></div>
                      </div>
                    </div>
                    <div className={styles.lineBox} style={{background: '#d18010'}}></div>
                    {
                      pro === 3 ? (
                        <div className={styles.dian} id={styles.jhAnimation}></div>
                      ) : <div className={styles.dian}></div>
                    }
                    {
                      pro === 3 ? (
                        <div className={styles.dian_two} id={styles.jhtwoAnimation}></div>
                      ) : <div className={styles.dian_two}></div>
                    }
                    <div className={styles.info} style={{color: '#f1a743', position: 'absoulte', left: '6px'}}>供应链SCM</div>
                    <div className={styles.ascp}>高级排产ASCP</div>
                    {
                      pro === 3 ? (
                        <div className={styles.pro_ascp} id={styles.proASCP}></div>
                      ) : <div className={styles.pro_ascp}></div>
                    }
                    <div className={styles.step}>
                      <ol>
                        <li><span style={{width: '0px'}}></span></li>
                        {
                          pro >= '3' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#f1a743'}}></span>已计划</li> : <li><span></span>已计划</li>
                        }
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className={styles.outBox} style={{border: '1px solid #EF88A0'}}>
                        <div className={styles.inBox} style={{border: '5px solid #E85375', background: '#EB6D8A'}}><span>智能生产<br/>与监控</span></div>
                      </div>
                    </div>
                    <div className={styles.lineBox} style={{background: '#e85375'}}></div>
                    {
                      pro >= 4 && pro <= 8 ? (
                        <div className={styles.dian_mes} id={styles.dianMesAnimation}></div>
                      ) : <div className={styles.dian_mes}></div>
                    }
                    {
                      pro >= 4 && pro <= 8 ? (
                        <div className={styles.dian_ai} id={styles.dianAiAnimation}></div>
                      ) : <div className={styles.dian_ai}></div>
                    }
                    <div className={styles.mes} style={{color: '#eb6d8a'}}>制造执行MES</div>
                    <div className={styles.ai} style={{color: '#eb6d8a'}}>人工智能AI</div>
                    {
                      pro >= 4 && pro <= 8 ? (
                        <div className={styles.pro_ai} id={styles.proAi}></div>
                      ) : <div className={styles.pro_ai}></div>
                    }
                    <div className={styles.step}>
                      <ol>
                        {
                          pro >= '4' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#eb6d8a'}}></span>开始生产</li> : <li><span></span>开始生产</li>
                        }
                        {
                          pro >= '5' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#eb6d8a'}}></span>打磨</li> : <li><span></span>打磨</li>
                        }
                        {
                          pro >= '6' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#eb6d8a'}}></span>压印</li> : <li><span></span>压印</li>
                        }
                        {
                          pro >= '7' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#eb6d8a'}}></span>气动压印</li> : <li><span></span>气动压印</li>
                        }
                        {
                          pro >= '8' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#eb6d8a'}}></span>校验</li> : <li><span></span>校验</li>
                        }
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className={styles.outBox} style={{border: '1px solid #6CD5B1'}}>
                        <div className={styles.inBox} style={{border: '5px solid #40C898', background: '#2C9872'}}><span>智能仓储<br/>与物流</span></div>
                      </div>
                    </div>
                    <div className={styles.lineBox} style={{background: '#40c898'}}></div>
                    {
                      pro === 9 ? (
                        <div className={styles.dian_mes} id={styles.dianMESAnimation}></div>
                      ) : <div className={styles.dian_mes}></div>
                    }
                    {
                      pro === 9 ? (
                        <div className={styles.dian_ai} id={styles.dianAIAnimation}></div>
                      ) : <div className={styles.dian_ai}></div>
                    }
                    <div className={styles.mes} style={{color: '#40C898', position: 'absoulte', left: '16px'}}>智能仓储WMS</div>
                    <div className={styles.ai} style={{color: '#40C898'}}>供应链SCM</div>
                    {
                      pro === 9 ? (
                        <div className={styles.pro_wms} id={styles.proWMS}></div>
                      ) : <div className={styles.pro_wms}></div>
                    }
                    <div className={styles.step}>
                      <ol>
                        <li><span style={{width: '0px'}}></span></li>
                        {
                          pro >= '9' ? <li style={{color: '#fff'}}><span style={{background: '#40c898'}}></span>生产完工</li> : <li><span></span>生产完工</li>
                        }
                        <li></li>
                      </ol>
                    </div>
                  </li>
                  <li>
                    <div>
                      <div className={styles.outBox} style={{border: '1px solid #6691F2'}}>
                        <div className={styles.inBox} style={{border: '5px solid #6691F2', background: '#4F6AA7'}}><span>商品收货</span></div>
                      </div>
                    </div>
                    <div className={styles.lineBox} style={{background: '#6691f2'}}></div>
                    {
                      (pro >= 10 && pro <= 11) || pro === 14 ? (
                        <div className={styles.dian_ai} id={styles.AIAnimation}></div>
                      ) : <div className={styles.dian_ai}></div>
                    }
                    <div className={styles.dian_ai}></div>
                    <div className={styles.cm}>定制平台C2M</div>
                    {
                      (pro >= 10 && pro <= 11) || pro === 14 ? (
                        <div className={styles.pro_cm} id={styles.proCM}></div>
                      ) : <div className={styles.pro_cm}></div>
                    }
                    <div className={styles.step}>
                      <ol>
                        {
                          pro >= '10' && pro !== '13' ? <li style={{color: '#fff'}}><span style={{background: '#6691F2'}}></span>支付尾款</li> : <li><span></span>支付尾款</li>
                        }
                        {
                          pro >= '10' && pro !== '13' && pro !== '14' ? <li style={{color: '#fff'}}><span style={{background: '#6691F2'}}></span>待收货</li> : <li><span></span>待收货</li>
                        }
                        {
                          pro >= '11' && pro !== '13' && pro !== '14' ? <li style={{color: '#fff'}}><span style={{background: '#6691F2'}}></span>收货确认</li> : <li><span></span>收货确认</li>
                        }
                      </ol>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={styles.progress}>
                <ul>
                  <li><span></span></li>
                  <li><span></span></li>
                </ul>
                <div className={styles.progress_img}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default LargeScreenComp
