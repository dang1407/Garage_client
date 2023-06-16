import React, { useState } from "react";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import "./UpdatePassword.css";
import axios from "axios";
const UpdatePassword = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  async function updateUser(event) {
    event.preventDefault();
    if (password !== rePassword) {
      alert("Mật khẩu và nhập lại mật khẩu không khớp!");
      return;
    }
    
    const respone = await axios.put('http://localhost:5000/api/updateacc', {
      email,
      password
    })

    console.log(respone.data.status);
    if(respone.data.status === "OK"){
      alert("Cập nhật mật khẩu thành công!");
    } else {
      if(respone.data.error === "Bạn đã nhập mật khẩu cũ"){
        alert("Bạn đã nhập mật khẩu cũ");
      } else {
        alert("Email chưa đăng kí toàn khoản!");
      }
    }
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="up-ip-box">
              <label htmlFor="">Mật khẩu mới</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="up-ip-box">
              <label htmlFor="">Nhập lại mật khẩu</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setRePassword(e.target.value)}
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
    </div>
  );
};

export default UpdatePassword;
