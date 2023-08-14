import axios from "axios";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Alert from "../../components/Alert/Alert";
const ComeIn = ({ onclose, data }) => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertResult, setAlertResult] = useState({
    success: true,
    message: ""
  })
  const [formDataIn, setFormDataIn] = useState({
    licensePlates: "",
    vehicle: data.vehicle,
    posCode: data.posCode,
    posIndex: data.posIndex
  });
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  async function putRequestParking(e) {
    e.preventDefault()
    // console.log(data)
    // kiểm tra người dùng nhập đủ thông tin
    for(let key in formDataIn){
      if(formDataIn[key] === ""){
        setAlertResult({
          success: false, 
          message: "Bạn chưa nhập đủ thông tin"
        })
        // setShowAlert(true)
        return;
      }
    }

    if((formDataIn.vehicle === "Xe đạp" && formDataIn.licensePlates !== "Không") || (formDataIn.vehicle !== "Xe đạp" && formDataIn.licensePlates === "Không")){
      setAlertResult({
        success: false,
        message: "Bạn chưa nhập đúng thông tin biển số xe và loại xe"
      })
      setShowAlert(true)
      return;
    }
    const request = await axios.post(
      "http://localhost:5000/park/in",
      formDataIn,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    if(request.data.success === true){
      setAlertResult({success: true, message: "Bạn đã đưa xe vào chỗ thành công!"})
      setShowAlert(true)
  }
}
  function closeAlertReload(){
    window.location.reload()
  }

  function closeAlert(){
    setShowAlert(false)
  }
  return (
    <div>
      <div className="comein-container flex-center">
        <div className="rg-form-container">
          <div className="form-box form-comein">
            <div className="close-comein-box">
              <AiFillCloseCircle onClick={onclose} />
            </div>
            <form action="">
              <h1 className="login-head">Đưa xe vào bãi</h1>

              <div className="rg-input-box">
                <label htmlFor="">Nhập biển số xe</label>
                <input
                  required
                  type="text"
                  placeholder="Nhập Không nếu bạn đi xe đạp"
                  name="licensePlates"
                  value={formDataIn.licensePlates}
                  onChange={(e) =>
                    setFormDataIn({
                      ...formDataIn,
                      licensePlates: e.target.value,
                    })
                  }
                />
              </div>
              <div className="rg-input-box">
                <label htmlFor="">Loại phương tiện</label>
                <select
                disabled={true}
                  id=""
                  value={formDataIn.vehicle}
                  onChange={(e) =>
                    setFormDataIn({ ...formDataIn, vehicle: e.target.value })
                  }
                >
                  <option value="">Chọn loại phương tiện</option>
                  <option value="Xe đạp">Xe đạp</option>
                  <option value="Xe máy">Xe máy</option>
                  <option value="Ô tô">Ô tô</option>
                </select>
              </div>

              <div className="rg-button flex-center">
                <button
                  className="login-button btn-hover"
                  onClick={(e) => putRequestParking(e)}
                >
                  Đưa xe vào bãi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {
        showAlert && <Alert result={alertResult} onclose={alertResult.success ?  closeAlertReload : closeAlert}/>
      }
    </div>
  );
};

export default ComeIn;
