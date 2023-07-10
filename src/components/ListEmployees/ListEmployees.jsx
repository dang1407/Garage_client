import React, { useContext, useEffect, useState } from "react";
import styles from "./ListEmp.module.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AccessTokenContext from "../../Token/AccessTokenContext";
import Login from "../../pages/Login/Login";
const ListEmployees = () => {
  const [allUsers, setAllUsers] = useState([{name: "Minh Đăng", _id: "123456"}]);
  // const [currentUser, setCurrentUser] = useState({});
  // const [accessToken, setAccessToken] = useState(
  //   localStorage.getItem("accessToken")
  // );

  // // console.log(accessToken)
  // async function getAllUsers() {
  //   // console.log(accessToken);
  //   let respone = await axios.get("http://localhost:5000/api/getusers", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   // console.log(respone);
  //   if (respone.data.success === true) {
  //     setAllUsers(respone.data.users);
  //   } else {
  //     setAllUsers(null);
  //   }
  // }

  async function getUserById(id){
    const respone = await axios.post('http://localhost:5000/api/getuserbyid', {
      id
    })

    if(respone.data.success === true){
      // setCurrentUser(respone.data.user)
    }
  }

  // useEffect(() => {
  //   getAllUsers();
  //   //  console.log(allUsers)
  // }, []);

  return (
    <div className={`${styles.listEmpContainer} text-flex-center`}>
      <div className={`${styles.head}`}>
        <h1>Danh sách nhân viên trong công ty</h1>
      </div>
      <table className={`${styles.tableContainer}`}>
        <tbody>
          {allUsers ? (
            allUsers.map((user, index) => (
              <tr className={`${styles.tableRow}`} key={index} onClick={() => getUserById(user._id)}>
                <td className={`${styles.tableData}`}>
                  <div className={`${styles.listItemBox} flex justify-between`}>
                    <div className={`${styles.imagePersonBox}`}>
                      <img src={logo} alt="" className="image-thumb" />
                    </div>

                    <div className={`${styles.infoBox} `}>
                      <h1 className="">{user.name}</h1>
                      <h2 className="">Nhân viên Kỹ thuật</h2>
                    </div>

                    <div className={`${styles.work} ${styles.infoBox}`}>
                      <h2>Bộ phận 01</h2>
                    </div>

                    <div className={`${styles.buttonBox} text-flex-center`}>
                      <Link
                        className={`${styles.updateButton} text-flex-center`}
                        onClick={() => getUserById(user._id)}
                      >

                        Update
                      </Link>
                      <Link
                        className={`${styles.deleteButton} text-flex-center`}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div>Bạn không có quyền truy cập vào nội dung này</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployees;
