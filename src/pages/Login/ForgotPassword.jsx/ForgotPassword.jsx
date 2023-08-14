import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiFillCloseCircle } from "react-icons/ai";
import "./ForgotPassword.css";
import axios from "axios";
import Alert from "../../../components/Alert/Alert";
import IsLoading from "../../../components/IsLoading/IsLoading";
const ForgotPassword = ({ onClose }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({
    success: true,
    message: "",
  });
  async function recvPasswordChangeCode(e) {
    e.preventDefault();
    if (!forgotEmail) {
      setAlertResult({ success: false, message: "Bạn chưa nhập email!" });
      setShowAlert(true);
      return;
    }
    try {
      setIsLoading(true);
      const respone = await axios.post(
        "http://localhost:5000/api/forgotpassword",
        {
          email: forgotEmail,
        }
      );
      setIsLoading(false);
      if (respone.data.success === true) {
        setAlertResult({
          success: true,
          message: "Bạn vui lòng kiểm tra email để cập nhật mật khẩu",
        });
        setShowAlert(true);
      }
      // console.log(respone);
    } catch (error) {}
  }

  function closeForgotAlert() {
    window.location.reload();
  }
  return (
    <div className="fgpw-container flex-center">
      <div className="fg-password flex-center">
        <div className="fg-box" />

        <form className="fg-form">
          <div className="fg-close-btn">
            <span onClick={onClose}>
              <AiFillCloseCircle />
            </span>
          </div>

          <h1 className="login-head">Forgot Password</h1>
          <div className="fg-img" />
          <label htmlFor="fg-email">
            Nhập email của bạn để khôi phục tài khoản:
          </label>
          <div className="fg-input-box flex-center">
            <span>
              <AiOutlineMail />
            </span>
            <input
              type="email"
              required
              id="fg-email"
              placeholder="Email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
          </div>
          <div className="fgpw-button">
            <button className="login-button" onClick={recvPasswordChangeCode}>
              Gửi yêu cầu
            </button>
          </div>
        </form>
      </div>
      {showAlert && <Alert result={alertResult} onclose={closeForgotAlert} />}
      {isLoading && <IsLoading />}
    </div>
  );
};

export default ForgotPassword;
