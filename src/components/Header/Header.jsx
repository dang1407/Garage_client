import React from "react";
import logoHome from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaAngleDown } from "react-icons/fa";
import styles from "./Header.module.css";
import axios from "axios";
// import AccessTokenContext from '../../Token/AccessTokenContext';
const Header = ({ isLogined, role }) => {
  const navigate = useNavigate();
  async function logOut() {
    // const respone = await axios.get('http:localhost:5000/api/logout');
    localStorage.removeItem("accessToken");
    return navigate("/");
  }
  function handleGoToListEmployee() {
    navigate("/listemployees");
  }
  return (
    // <AccessTokenContext.Consumer>
    <header className="flex justify-between uppercase">
      {/* Begin nav - Flex item 1 */}
      <div className="flex">
        <div className={`${styles.homeLogoBox}`}>
          <img src={logoHome} alt="" className="" />
        </div>
        <ul className={`flex ${styles.nav}`}>
          <li>
            <Link
              to="/"
              className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              href="#"
              className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}
            >
              Sản phẩm
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}
            >
              Định giá
            </a>
          </li>
          <li id={`${styles.homeMore}`}>
            <a
              href="#"
              className={`inline-block h-16 p-2 ${styles.homeTextCenter}`}
            >
              Xem thêm
              <FaAngleDown />
            </a>
            <ul className={`${styles.homeSubnav}`}>
              <li className={`${styles.homeTextCenter}`}>
                <a href="#" className=" h-6 inline-block">
                  Liên hệ
                </a>
              </li>
              <li className={`${styles.homeTextCenter}`}>
                <a href="#" className=" h-6 inline-block">
                  Địa chỉ
                </a>
              </li>
              <li className={`${styles.homeTextCenter}`}>
                <a href="#" className=" h-6 inline-block">
                  Phương hướng phát triển
                </a>
              </li>
              {role === "admin" && (
                <li className={`${styles.homeTextCenter}`}>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={handleGoToListEmployee}
                    className=" h-6 inline-block"
                  >
                    Danh sách nhân viên
                  </a>
                </li>
              )}
              {role === "admin" && (
                <li className={`${styles.homeTextCenter}`}>
                  <Link
                    style={{ cursor: "pointer" }}
                    to="/chart"
                    className=" h-6 inline-block"
                  >
                    Thống kê doang thu năm
                  </Link>
                </li>
              )}
              {isLogined && (
                <li className={`${styles.homeTextCenter}`}>
                  <Link
                    style={{ cursor: "pointer" }}
                    to="/parkingfeein"
                    className=" h-6 inline-block"
                  >
                    Quản lý bãi gửi xe
                  </Link>
                </li>
              )}
              {/* { 
                isLogined &&
                <li className={`${styles.homeTextCenter}`}><Link style={{cursor: "pointer"}} to='/parkingfeeout' className=' h-6 inline-block'>Lấy xe ra khỏi bãi</Link></li>
              } */}
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
          {isLogined === true ? (
            <form className={`${styles.userBox}`}>
              <FaUserCircle className="user-icon" />
              <ul className={`${styles.userSubbox}`}>
                <li>
                  <Link to="/myprofile">My Profile</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </ul>
            </form>
          ) : (
            <Link
              className="inline-block p-2 home-text-center mx-3 loginButton"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      {/*  End  */}
    </header>
    // </AccessTokenContext.Consumer>
  );
};

export default Header;
