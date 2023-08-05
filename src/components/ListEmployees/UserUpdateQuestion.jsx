import React, { useState } from "react";
import "./DeleteQuestion.css";
import axios from "axios";
import Update from "../../assets/images/update.png";
import Alert from "../Alert/Alert";
import IsLoading from "../IsLoading/IsLoading";
const UserUpdateQuestion = ({ close, formData, avatar, message}) => {
  const [showAlert, setShowAlert] = useState(false)
  const [result, setResult] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const accessToken = localStorage.getItem('accessToken')

  async function updateUser(){
    setIsLoading(true)
    console.log(formData)
    let checkImage = false;
    if(avatar !== ""){
      const newImageFormData = new FormData()
      newImageFormData.append('avatar', avatar)
      newImageFormData.append('email', formData.email)
      console.log(newImageFormData)
      const responeImage = await axios.post('http://localhost:5000/api/uploadavatar', newImageFormData)
      if(responeImage.data.success === true){
        checkImage = true
      } else {
            setResult({success: false, message: "Có lỗi xảy ra!"})
            setShowAlert(true)
            return;
      }
    }
    
      const respone = await axios.put('http://localhost:5000/api/userupdateacc', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setIsLoading(false)
      if(respone.data.success === true){
            setResult({success: true, message: "Chỉnh sửa thông tin thành công!"})
      } else {
            setResult({success: false, message: "Có lỗi xảy ra!"})
      }
      setShowAlert(true)
      // window.location.reload()
  } 
  function closeUserUpdateQuestion(){
//     setShowAlert(false)
    close();
    window.location.reload();
  }
  return (
    <div className="emp-inf-container">
      <figure>
        {/* <div  className='delete-ques-box'> */}
        <img src={Update} alt="" />
        {/* </div> */}
        <figcaption>{message}</figcaption>
        <div className="del-ques-button-box">
          <button className="emp-inf-button delete" onClick={() => updateUser()}>Có</button>
          <button className="emp-inf-button update" onClick={close}>Không</button>
        </div>
      </figure>

      {
        showAlert && <Alert result = {result} onclose={() => closeUserUpdateQuestion()} />
      }
      {
        isLoading && <IsLoading />
      }
    </div>
  );
};

export default UserUpdateQuestion;
