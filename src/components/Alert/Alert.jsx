import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import "./Alert.css";
import DeleteImage from  '../../assets/images/DeleteImage.png'
import Success from '../../assets/images/success.png'
const Alert = ({ result = { message: "hello", success: true }, onclose }) => {
  return (
    <div className="alert-container">
      <div className="alert-box">
        <div className="close-box">
          <AiFillCloseCircle onClick={onclose} />
        </div>
        {
          result.success ? 
          <div className="alert-image-box">
            <img src={Success} alt="" />
          </div> : 
          <div className="alert-image-box">
            <img src={DeleteImage} alt="" />
          </div>
        }
        <div className="alert-message">{result.message}</div>

        <div className="button-alert">
          <button className="emp-inf-button" onClick={onclose}>Đồng ý</button>
          {/* <button className="emp-inf-button delete" onClick={onclose}>Bỏ qua</button> */}
        </div>
      </div>
    </div>
  );
};

export default Alert;
