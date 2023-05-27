import React from 'react'
import logoHome from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import {FaUserCircle, FaAngleDown} from 'react-icons/fa';
import styles from './Header.module.css';
const Header = () => {
  return (
      <header className='flex justify-between uppercase'>
      {/* Begin nav - Flex item 1 */}
      <div className='flex'>
        <div className= {`${styles.homeLogoBox}`}>
          <img src={logoHome} alt="" className='' />
        </div>
        <ul className={`flex ${styles.nav}`}>
          <li><a href="#" className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}>Home</a></li>
          <li><a href="#" className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}>Sản phẩm</a></li>
          <li><a href="#" className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}>Định giá</a></li>
          <li id={`${styles.homeMore}`}>
            <a href="#" className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}>
              Xem thêm
              < FaAngleDown />
            </a>
            <ul className={`${styles.homeSubnav}`}>
              <li className={`${styles.homeTextCenter}`}><a href="#"className=' h-6 inline-block'>Liên hệ</a></li>
              <li className={`${styles.homeTextCenter}`}><a href="#"className=' h-6 inline-block'>Địa chỉ</a></li>
              <li className={`${styles.homeTextCenter}`}><a href="#"className=' h-6 inline-block'>Phương hướng phát triển</a></li>
            </ul>
          </li>
        </ul>
      </div>
      {/* End nav - Flex item  1 */}

      {/*  Begin flex item 2 */}
      
      {/*  End flex item 2 */}

      {/*  Beign Account - Flex item */}
      <div className={`${styles.homeTextCenter} ${styles.homeAccount} h-16`}>
        <div className={`${styles.homeLoginBox} flex`}>
          <Link to='/login' className={`${styles.homeLoginUser} ${styles.homeTextCenter} mx-8 h-16`}>
            <FaUserCircle/>
            {/* <IoNotificationsCircle /> */}
          </Link>
          {/* <Link className='inline-block p-2 home-text-center mx-3'>Login</Link> */}
        </div>
      </div>
      {/*  End  */}
    </header>
  )
}

export default Header