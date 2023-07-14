import React, { useState } from "react";
import "./DeleteQuestion.css";
import axios from "axios";
import DeleteImage from "../../assets/images/DeleteImage.png";
import Alert from "../Alert/Alert";
const DeleteQuestion = ({ id, close}) => {
  const [showAlert, setShowAlert] = useState(false)
  const [result, setResult] = useState({})
  const accessToken = localStorage.getItem('accessToken')
  async function deleteEmployee(id) {
    const respone = await axios.delete(
      `http://localhost:5000/api/deleteacc/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    console.log(respone)
    if (respone.data.success === true) {
      setResult({success: true, message: "Xóa thành công!"})
      setShowAlert(true);
    } else {
      setResult({success: false, message: "Có lỗi xảy ra!"})
      setShowAlert(true)
    }
    // close()
  }

  function closeDeleteQuestion(){
    setShowAlert(false)
    close();
    window.location.reload()
  }
  return (
    <div className="emp-inf-container">
      <figure>
        {/* <div  className='delete-ques-box'> */}
        <img src={DeleteImage} alt="" />
        {/* </div> */}
        <figcaption>Bạn có chắc chắn muốn xóa nhân viên này không</figcaption>
        <div className="del-ques-button-box">
          <button className="emp-inf-button delete" onClick={() => deleteEmployee((id))}>Có</button>
          <button className="emp-inf-button update" onClick={close}>Không</button>
        </div>
      </figure>

      {
        showAlert && <Alert result = {result} onclose={() => closeDeleteQuestion()} />
      }
    </div>
  );
};

export default DeleteQuestion;
