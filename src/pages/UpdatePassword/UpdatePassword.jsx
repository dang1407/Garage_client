import React, { useContext, useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import "./UpdatePassword.css";
import axios from "axios";
import AccessTokenContext from "../../Token/AccessTokenContext";
import Alert from "../../components/Alert/Alert";
const UpdatePassword = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({
    success: true,
    message: "",
  });
  const [email, setEmail] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rePassword: "",
    authorCode: "",
  });
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  console.log(accessToken);
  async function updateUser(event) {
    event.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }

    try {
      const respone = await axios.put(
        "http://localhost:5000/api/updateacc",
        {
          formData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(respone.data.status);
      if (respone.data.status === "OK") {
        alert("Cập nhật mật khẩu thành công!");
      } else {
        if (respone.data.error === "Bạn đã nhập mật khẩu cũ") {
          alert("Bạn đã nhập mật khẩu cũ");
        } else {
          alert("Email chưa đăng kí toàn khoản!");
        }
      }
    } catch (error) {}
  }
  return (
    <div className="upd-form-box">
      <form action="" className="login-form">
        {/* Login box */}
        <div className="login-box">
          <h1 className="login-head">Update Acc</h1>
          <div className="update-container">
            <div className="up-ip-box">
              <label htmlFor="">Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="up-ip-box">
              <label htmlFor="">Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="up-ip-box">
              <label htmlFor="">Nhập lại mật khẩu</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, rePassword: e.target.value })
                }
              />
            </div>
            <div className="up-ip-box">
              <label htmlFor="">Nhập mã xác nhận</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, authorCode: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="login-button"
            style={{ marginLeft: "20px" }}
            onClick={updateUser}
          >
            Send Request
          </button>
        </div>
      </form>
      {showAlert && (
        <Alert result={alertResult} onclose={() => setShowAlert(false)} />
      )}
    </div>
  );
};

export default UpdatePassword;
