import React, { useContext, useEffect, useState } from "react";
// import styles from "./ListEmp.module.css";
import "./ListEmp.css";
import logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AccessTokenContext from "../../Token/AccessTokenContext";
import Login from "../../pages/Login/Login";
import EmployeeInf from "./EmployeeInf";
import { MdDelete } from "react-icons/md";
import { AiTwotoneTool } from "react-icons/ai";
import Header from "../Header/Header";
import DeleteQuestion from "./DeleteQuestion";
import { GoTriangleRight, GoTriangleLeft } from "react-icons/go";
const ListEmployees = () => {
  const [allUsers, setAllUsers] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const itemsPerPage = 2;
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false);
  const [usersPage, setUsersPage] = useState([
    { name: "Minh Đăng", _id: "123456" },
  ]);
  const [showEmployeeInf, setShowEmployeeInf] = useState(false);
  const [user, setUser] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  // console.log(accessToken)
  async function getusersPage() {
    // console.log(accessToken);
    let respone = await axios.get("http://localhost:5000/api/getusers", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // let respone = await axios.get("http://localhost:5000/api/getusers")
    // console.log(respone);
    if (respone.data.success === true) {
      setTotalPages(Math.ceil(respone.data.users.length / itemsPerPage));
      setAllUsers(respone.data.users);
      const startIndex = (currentPage - 1) * itemsPerPage; // Vị trí bắt đầu của trang hiện tại
      const endIndex = startIndex + itemsPerPage; // Vị trí kết thúc của trang hiện tại
      setUsersPage(respone.data.users.slice(startIndex, endIndex));
      createPageNumber(Math.ceil(respone.data.users.length / itemsPerPage));
      // console.log(respone.data.users);
    } else {
      setUsersPage(null);
    }
  }

  async function getUserById(id) {
    const respone = await axios.post("http://localhost:5000/api/getuserbyid", {
      id,
    });

    if (respone.data.success === true) {
      // setCurrentUser(respone.data.user)
    }
  }

  useEffect(() => {
    getusersPage();
    //  console.log(usersPage)
  }, []);
  function getUserByIndex(index) {
    const user = usersPage[index];
    setUser(user);
    setShowEmployeeInf(true);
  }

  function deleteUser(index) {
    setUser(usersPage[index]);
    setShowDeleteQuestion(true);
  }
  function closeShowEmployeeInf() {
    setShowEmployeeInf(false);
  }

  function closeDeleteQuestion() {
    setShowDeleteQuestion(false);
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setUsersPage(
        allUsers.slice(
          (currentPage - 2) * itemsPerPage,
          (currentPage - 2) * itemsPerPage + itemsPerPage
        )
      );
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setUsersPage(
        allUsers.slice(
          currentPage * itemsPerPage,
          currentPage * itemsPerPage + itemsPerPage
        )
      );
    }
  }

  function createPageNumber(totalPages) {
    let result = [];
    for (let i = 1; i <= totalPages; i++) {
      result.push(i);
    }
    setPageNumbers(result);
  }

  function getCurrentPage(index) {
    setCurrentPage(index);
    setUsersPage(
      allUsers.slice(index * itemsPerPage, index * itemsPerPage + itemsPerPage)
    );
  }
  return (
    // <div className={`${styles.listEmpContainer} text-flex-center`}>
    //   <div className={`${styles.head}`}>
    //     <h1>Danh sách nhân viên trong công ty</h1>
    //   </div>
    //   <table className={`${styles.tableContainer}`}>
    //     <tbody>
    //       {usersPage ? (
    //         usersPage.map((user, index) => (
    //           <tr className={`${styles.tableRow}`} key={index} >
    //             <td className={`${styles.tableData}`}>
    //               <div className={`${styles.listItemBox}`}>
    //                 <div className={`${styles.imagePersonBox}`}>
    //                   <img src={logo} alt="" className="image-thumb" />
    //                 </div>

    //                 <div className={`${styles.infoBox} `}>
    //                   <h1 className="">{user.name}</h1>
    //                   <h2 className="">{user.work}</h2>
    //                 </div>

    //                 <div className={`${styles.work} ${styles.infoBox}`}>
    //                   <h2>{user.workPart}</h2>
    //                 </div>

    //                 <div className={`${styles.buttonBox} text-flex-center`}>
    //                   <Link
    //                     className={`${styles.updateButton} text-flex-center`}
    //                     onClick={() => getUserByIndex(index)}
    //                   >

    //                     Update
    //                   </Link>
    //                   <Link
    //                     className={`${styles.deleteButton} text-flex-center`}
    //                   >
    //                     Delete
    //                   </Link>
    //                 </div>
    //               </div>
    //             </td>
    //           </tr>
    //         ))
    //       ) : (
    //         <div>Bạn không có quyền truy cập vào nội dung này</div>
    //       )}
    //     </tbody>
    //   </table>

    //   {
    //     showEmployeeInf && <EmployeeInf user={user} close={closeShowEmployeeInf}/>
    //   }
    // </div>

    <div>
      {usersPage ? (
        <div>
          <Header isLogined={true} role={"admin"} />
          <h1>Danh sách nhân viên trong công ty</h1>
          <table border={1}>
            <thead>
              <tr>
                <th className="col-1">
                  <input type="checkbox" id="all" />
                </th>
                <th className="col-2">Mã nhân viên</th>
                <th className="col-3">Họ và tên</th>
                <th className="col-4">Ảnh thẻ</th>
                <th className="col-5">Ngày sinh</th>
                <th className="col-6">Giới tính</th>
                <th className="col-7">SĐT</th>
                <th className="col-8">Chức vụ</th>
                <th className="col-9">Phòng ban</th>
                <th className="col-10">Tính năng</th>
              </tr>
            </thead>
            <tbody>
              {usersPage.map((user, index) => (
                <tr key={index}>
                  <td className="col-1">
                    <input type="checkbox" name="check1" value="1" />
                  </td>
                  <td className="col-2">{user.employeeCode}</td>
                  <td className="col-3">{user.name}</td>
                  <td className="col-4">
                    <img />
                  </td>
                  <td className="col-5">{user.birthDay}</td>
                  <td className="col-6">{user.gender}</td>
                  <td className="col-7">{user.mobile}</td>
                  <td className="col-8">{user.work}</td>
                  <td className="col-9">{user.workPart}</td>
                  <td className="col-10">
                    <button
                      onClick={() => getUserByIndex(index)}
                      className="emp-update"
                    >
                      <AiTwotoneTool />
                    </button>
                    <button
                      className="emp-delete"
                      onClick={() => deleteUser(index)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="list-emp-page-box flex justify-end align-middle">
            <div className="icons-box">Trang</div>
            <div className="icons-box" onClick={prevPage}>
              <GoTriangleLeft />
            </div>
            {pageNumbers.map((page, index) => (
              // console.log(page)
              <div
                className="page-number"
                key={index}
                onClick={() => getCurrentPage(index)}
              >
                <p> {page} </p>
              </div>
            ))}
            <div className="icons-box" onClick={nextPage}>
              <GoTriangleRight />
            </div>
          </div>
          {showEmployeeInf && (
            <EmployeeInf user={user} close={closeShowEmployeeInf} />
          )}

          {showDeleteQuestion && (
            <DeleteQuestion id={user._id} close={closeDeleteQuestion} />
          )}
        </div>
      ) : (
        <div>Trang này không tồn tại</div>
      )}
    </div>
  );
};

export default ListEmployees;
