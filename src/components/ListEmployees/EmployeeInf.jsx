import React, { useState } from "react";
import "./EmployeeInf.css";
import axios, { all } from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import DeleteQuestion from "./DeleteQuestion";
import Alert from "../Alert/Alert";
import UpdateQuestion from "./UpdateQuestion";
const EmployeeInf = ({ user, close }) => {
  const [showDeleteQuestion, setShowDeleteQuestion] = useState(false);
  const [result, setResult] = useState("");
  const [idDelete, setIdDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({});
  const [showUpdateQuestion, setShowUpdateQuestion] = useState(false);
  const [message, setMessage] = useState(
    "Bạn có chắc chắn muốn xóa thông tin của nhân viên này không?"
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [formData, setFormData] = useState({
    email: user.email,
    name: user.name,
    birthDay: user.birthDay,
    mobile: user.mobile,
    address: user.address,
    gender: user.gender,
    work: user.work,
    workPart: user.workPart,
    vehicle: user.vehicle,
    licensePlates: user.licensePlates,
    employeeCode: user.employeeCode,
  });
  const [avatar, setAvatar] = useState("");
  function deleteEmp(id) {
    setIdDelete(id);
    setShowDeleteQuestion(true);
  }

  function closeAlert() {
    setShowAlert(false);
    window.location.reload();
  }
  function sendUpdateEmp() {
    // console.log("Call");
    if (
      (formData.vehicle === "Xe đạp" && formData.licensePlates !== "Không") ||
      (formData.vehicle !== "Xe đạp" &&
        formData.licensePlates === "Chưa đăng ký")
    ) {
      setAlertResult({
        success: false,
        message: "Bạn nhập sai thông tin biển số xe và loại xe",
      });
      setShowAlert(true);
      return;
    }
    setMessage("Bạn có chắc chắn muốn thay đổi thông tin nhân viên này không?");
    setShowUpdateQuestion(true);
  }

  function updateEmployeeButton() {
    // console.log('called')
    const updateButton = document.getElementsByClassName("update")[0];
    const cancelButton = document.getElementById("cancelButton");
    const deleteButton = document.getElementsByClassName("delete")[0];
    const sendButton = document.getElementsByClassName("update")[1];
    const inputAvatar = document.getElementById("avatar");
    inputAvatar.style.display = "block";
    deleteButton.style.display = "none";
    cancelButton.style.display = "block";
    updateButton.style.display = "none";
    sendButton.style.display = "block";
    // updateButton.textContent = "Gửi"
    // updateButton.onClick = "sendUpdateEmp";
    var allPTag = document.querySelectorAll("p.emp-inf-name");
    var allInputTag = document.querySelectorAll(".input-data-emp-inf");
    console.log(allPTag);
    for (let i = 0; i < allPTag.length; i++) {
      allInputTag[i].value = allPTag[i].textContent;
      allPTag[i].style.display = "none";
      allInputTag[i].style.display = "block";
    }
  }

  function cancelUpdateEmployee() {
    // console.log('called')
    const updateButton = document.getElementsByClassName("update")[0];
    const cancelButton = document.getElementById("cancelButton");
    const deleteButton = document.getElementsByClassName("delete")[0];
    const sendButton = document.getElementsByClassName("update")[1];
    const inputAvatar = document.getElementById("avatar");
    inputAvatar.style.display = "none";
    deleteButton.style.display = "block";
    cancelButton.style.display = "none";
    // updateButton.textContent = "Chỉnh sửa"
    updateButton.style.display = "block";
    sendButton.style.display = "none";
    // updateButton.onClick = "updateEmployeeButton";
    var allPTag = document.querySelectorAll("p.emp-inf-name");
    var allInputTag = document.querySelectorAll(".input-data-emp-inf");
    // console.log(allPTag);
    for (let i = 0; i < allPTag.length; i++) {
      allPTag[i].style.display = "block";
      allPTag[i].textContent = allInputTag[i].value;
      allInputTag[i].style.display = "none";
    }
  }

  function closeDeleteAlert() {
    setShowDeleteQuestion(false);
  }
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Thông tin chi tiết nhân viên <AiFillCloseCircle onClick={close} />
        </h1>

        <hr />
        <div className="enp-inf-thumb-container">
          <div className="emp-image-thumb">
            <img src={user.avatar} alt="" />
            <input
              type="file"
              id="avatar"
              style={{ display: "none" }}
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>

          <div className="emp-thumb-inf">
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Họ và tên: </label>
              <p className="emp-inf-name">{formData.name}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Email: </label>
              <p>{formData.email}</p>
              {/* <input type="text" style={{display: "none"}}className="einput-data-emp-inf value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/> */}
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Ngày sinh: </label>
              <p className="emp-inf-name">{formData.birthDay}</p>
              <input
                type="date"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.birthDay}
                onChange={(e) =>
                  setFormData({ ...formData, birthDay: e.target.value })
                }
              />
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Số điện thoại: </label>
              <p className="emp-inf-name">{formData.mobile}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Giới tính: </label>
              <p className="emp-inf-name">{formData.gender}</p>
              {/* <input type="text" style={{display: "none"}} className="input-data-emp-inf" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}/> */}
              <select
                className="input-data-emp-inf"
                style={{ display: "none" }}
                value={formData.gender}
                name="gender"
                id=""
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Vị trí làm việc: </label>
              <p className="emp-inf-name">{formData.work}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.work}
                onChange={(e) =>
                  setFormData({ ...formData, work: e.target.value })
                }
              />
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Phòng ban: </label>
              <p className="emp-inf-name">{formData.workPart}</p>
              {/* <input type="text" style={{display: "none"}} className="input-data-emp-inf" value={formData.workPart} onChange={(e) => setFormData({...formData, workPart: e.target.value})}/> */}
              <select
                className="input-data-emp-inf"
                value={formData.workPart}
                name="workPart"
                id=""
                style={{ display: "none" }}
                onChange={(e) =>
                  setFormData({ ...formData, workPart: e.target.value })
                }
              >
                {/* <option value="" >--- Bộ phận làm việc ---</option> */}
                <option value="Hành chính">Hành chính</option>
                <option value="Kỹ thuật">Kỹ thuật</option>
                <option value="Tài chính">Tài chính</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Loại xe đăng ký: </label>
              <p className="emp-inf-name">{formData.vehicle}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
                }
              />
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Biển số xe: </label>
              <p className="emp-inf-name">{formData.licensePlates}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.licensePlates}
                onChange={(e) =>
                  setFormData({ ...formData, licensePlates: e.target.value })
                }
              />
            </div>
            <div className="emp-thumb-inf-input-box hkhjk">
              <label htmlFor="">Mã nhân viên: </label>
              <p className="emp-inf-name">{formData.employeeCode}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.employeeCode}
                onChange={(e) =>
                  setFormData({ ...formData, employeeCode: e.target.value })
                }
              />
            </div>
            <div className="my-profile-address-box">
              <label htmlFor="">Địa chỉ: </label>
              <p className="emp-inf-name">{user.address}</p>
              <input
                type="text"
                style={{ display: "none" }}
                className="input-data-emp-inf"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="emp-inf-buttons">
          <div className="emp-inf-button update" onClick={updateEmployeeButton}>
            Chỉnh sửa thông tin
          </div>
          <div
            className="emp-inf-button update"
            style={{ display: "none" }}
            onClick={sendUpdateEmp}
          >
            Gửi
          </div>
          <div
            className="emp-inf-button update"
            id="cancelButton"
            style={{ display: "none" }}
            onClick={cancelUpdateEmployee}
          >
            Cancel
          </div>
          <div
            className="emp-inf-button delete"
            onClick={() => deleteEmp(user._id)}
          >
            Xóa nhân viên
          </div>
        </div>
        {/* <div className="emp-inf-body">
                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Vị trí làm việc: </label>
                        <p>Lập trình viên</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Phòng ban: </label>
                        <p>Kỹ thuật</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Loại xe đăng ký: </label>
                        <p>Chưa có</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Biển số xe: </label>
                        <p>Chưa có</p>
                  </div>
                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Mã nhân viên: </label>
                        <p>NV01</p>
                  </div>
            </div> */}
      </form>

      {showDeleteQuestion && (
        <DeleteQuestion id={idDelete} close={closeDeleteAlert} />
      )}
      {showAlert && (
        <Alert result={alertResult} onclose={() => setShowAlert(false)} />
      )}
      {showUpdateQuestion && (
        <UpdateQuestion
          formData={formData}
          avatar={avatar}
          close={() => setShowUpdateQuestion(false)}
          message={message}
        />
      )}
    </div>
  );
};

export default EmployeeInf;
