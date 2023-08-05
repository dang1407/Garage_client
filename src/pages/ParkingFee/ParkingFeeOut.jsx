import React, { useState } from "react";
import "./ParkingFee.css";

import axios from "axios";
import ParkingFeeAlert from "./ParkingFeeAlert";
import Alert from "../../components/Alert/Alert";
const ParkingFeeOut = () => {
  const [formData, setFormData] = useState({
    licensePlates: "",
    timeout: "",
    vehicle: "",
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [formResult, setFormResult] = useState({

  })
  const [showAlert, setShowAlert] = useState(false)
  const [alertResult, setAlertResult] = useState({
      success: true,
      message: "Thành công"
  })
  const [showFormResult, setShowFormResult] = useState(false)
  function showFormData(e) {
    e.preventDefault();
    console.log(formData);
  }

  async function calculateParkingFee(e) {
    e.preventDefault();
    console.log(formData);
     for(let key in formData){
      if(formData[key] === ''){
            setAlertResult({
                  success: false,
                  message: "Bạn chưa nhập đủ thông tin!"
            })
            setShowAlert(true);
            return;
      } 
     }
     if(formData.vehicle === "Xe đạp" && formData.licensePlates !== "Không"){
      setAlertResult({
            success: false,
            message: "Bạn hãy nhập Không vào mục biển số xe khi bạn đi xe đạp hoặc chọn đúng loại phương tiện ứng với biển số xe!"
      })
      setShowAlert(true);
      return
     }
    const respone = await axios.post("http://localhost:5000/park/in", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    if (respone.data.success === true) {
      console.log(respone);
      setFormResult(respone.data)
      setShowFormResult(true);
    }
  }
  function closeAlert(){
      setShowFormResult(false);
  }
  return (
    <div className="register-container">
      <div className="rg-form-container">
        <div className="form-box">
          <form action="">
            <h1 className="login-head">Tính giá vé xe</h1>

            <div className="rg-input-box">
              <label htmlFor="">Nhập biển số xe</label>
              <input
                required
                type="text"
                placeholder="Nhập không nếu bạn đi xe đạp"
                name="licensePlates"
                value={formData.licensePlates}
                onChange={(e) =>
                  setFormData({ ...formData, licensePlates: e.target.value })
                }
              />
            </div>
            <div className="rg-input-box">
              <label htmlFor="">Loại phương tiện</label>
              <select
                id=""
                value={formData.vehicle}
                onChange={(e) =>
                  setFormData({ ...formData, vehicle: e.target.value })
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
                onClick={calculateParkingFee}
              >
                Đưa xe vào bãi
              </button>
            </div>
          </form>
        </div>
      </div>
      {
            showFormResult && <ParkingFeeAlert parkingFeeForm={formResult} close={() => closeAlert()}/>
      }
      {
            showAlert && <Alert result={alertResult} onclose={() => setShowAlert(false)} />
      }
    </div>
  );
};

export default ParkingFeeOut;
