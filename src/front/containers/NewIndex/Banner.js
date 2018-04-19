import React from 'react'
import {Carousel} from '../../bootstrap'
import styles from './Banner.css'
import banner01 from '../../images/banner_one.jpg'
import banner02 from '../../images/banner_two.jpg'
import banner03 from '../../images/banner_three.jpg'
class Banner extends React.Component {
  banner = {
    allIds: [1, 2, 3],
    byId: {
      1: {
        id: 1,
        url: banner01
      },
      2: {
        id: 2,
        url: banner02
      },
      3: {
        id: 3,
        url: banner03
      }
    }
  }
  state = {
    banner: this.banner,
    screenWidth: 0
  }
  componentWillMount = () => {
    console.log(11)
    let screenWidth = document.documentElement.clientWidth
    this.setState({screenWidth})
  }
  render() {
    let {screenWidth, screenHeight} = this.state
    return (
      <div className={styles.wrap}>
        <Carousel>
          {
            this.state.banner.allIds.map((id, index) => {
              const item = this.state.banner.byId[id]
              return (
                <Carousel.item
                  key={id}
                  className={styles.banners}
                  style={{backgroundRepeat: 'no-repeat', backgroundImage: `url(${item.url})`}}
                />
              )
            })
          }
        </Carousel>
      </div>
    )
  }
}
export default Banner
