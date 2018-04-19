import React from 'react'
import {connect} from 'react-redux'
import styles from '../NewIndex/CenterInfo.css'
import Top from '../NewHeader/Top'
import FootBox from '../FootBox/FootBox'
import IndexHeader from '../NewHeader/IndexHeader'
class Copartner extends React.Component {
  render() {
    return (
      <div>
        <Top />
        <IndexHeader/>
        <div className={styles.fastBox}>
        </div>
        <div className={styles.partners} style={{marginBottom: '183px'}}>
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
        <FootBox />
      </div>
    )
  }
}
export default Copartner
