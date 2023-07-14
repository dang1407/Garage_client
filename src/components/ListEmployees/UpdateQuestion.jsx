import React, { useState } from "react";
import "./DeleteQuestion.css";
import axios from "axios";
import Update from "../../assets/images/update.png";
import Alert from "../Alert/Alert";
const UpdateQuestion = ({ close, formData}) => {
  const [showAlert, setShowAlert] = useState(false)
  const [result, setResult] = useState({})
  const accessToken = localStorage.getItem('accessToken')

  async function updateEmployee(){
    console.log(formData)
      const respone = await axios.put('http://localhost:5000/api/adminupdateacc', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if(respone.data.success === true){
            setResult({success: true, message: "Chỉnh sửa thông tin thành công!"})
      } else {
            setResult({success: false, message: "Có lỗi xảy ra!"})
      }
      setShowAlert(true)
      window.location.reload()
  } 
  function closeUpdateQuestion(){
//     setShowAlert(false)
    close();
  }
  return (
    <div className="emp-inf-container">
      <figure>
        {/* <div  className='delete-ques-box'> */}
        <img src={Update} alt="" />
        {/* </div> */}
        <figcaption>Bạn có chắc chắn muốn chỉnh sửa thông tin nhân viên này không?</figcaption>
        <div className="del-ques-button-box">
          <button className="emp-inf-button delete" onClick={() => updateEmployee()}>Có</button>
          <button className="emp-inf-button update" onClick={close}>Không</button>
        </div>
      </figure>

      {
        showAlert && <Alert result = {result} onclose={() => closeUpdateQuestion()} />
      }
    </div>
  );
};

export default UpdateQuestion;
