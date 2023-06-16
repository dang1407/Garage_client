import React from 'react';
import styles from './ListEmp.module.css';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
const ListEmployees = () => {
  return (
    <div className={`${styles.listEmpContainer} text-flex-center`}>
      <table className={`${styles.tableContainer}`}>
        <tr>
          <td>
            <div className={`${styles.listItemBox} flex justify-between`}>
              <div className={`${styles.imagePersonBox}`}>
                <img src={logo} alt="" className='image-thumb'/>
              </div>

              <div className={`${styles.infoBox} `}>
                <h1 className=''>Minh Đăng</h1>
                <h2 className=''>Nhân viên Kỹ thuật</h2>
                <h3>Nhân viên bộ phận 1</h3>
              </div>

              <div className={`${styles.work} ${styles.infoBox}`}>
                <h2>Bộ phận 01</h2>
              </div>

              <div className={`${styles.buttonBox} text-flex-center`}>
                <Link className={`${styles.updateButton} text-flex-center`}>Update</Link>
                <Link className={`${styles.deleteButton} text-flex-center`}>Delete</Link>
              </div>
            </div>
          </td>
        </tr>
      </table>

      
    </div>
  )
}

export default ListEmployees