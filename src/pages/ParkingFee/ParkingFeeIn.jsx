import React, { useState } from "react";
import "./ParkingFee.css";

import axios from "axios";
import ParkingFeeAlert from "./ParkingFeeAlert";
import Alert from "../../components/Alert/Alert";
import Header from "../../components/Header/Header";
const ParkingFeeIn = () => {
  const [formDataIn, setFormDataIn] = useState({
    licensePlates: "",
    vehicle: "",
  });
  const [formDataOut, setFormDataOut] = useState({
    licensePlates: "",
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
    // console.log(formData);
  }

  async function calculateParkingFee(e) {
    e.preventDefault();
    console.log(formDataOut);
     for(let key in formDataOut){
      if(formDataOut[key] === ''){
            setAlertResult({
                  success: false,
                  message: "Bạn chưa nhập đủ thông tin!"
            })
            setShowAlert(true);
            return;
      } 
     }
     if(formDataOut.vehicle === "Xe đạp" && formDataOut.licensePlates !== "Không"){
      setAlertResult({
            success: false,
            message: "Bạn hãy nhập Không vào mục biển số xe khi bạn đi xe đạp hoặc chọn đúng loại phương tiện ứng với biển số xe!"
      })
      setShowAlert(true);
      return
     }
    const respone = await axios.post("http://localhost:5000/park/out", formDataOut, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    console.log(respone)
    if (respone.data.success === true) {
      setAlertResult({
        success: true,
        message: "Bạn đã đưa xe ra khỏi bãi thành công!"
      })
      setShowAlert(true)
      // console.log(respone);
      // setFormResult(respone.data)
      // setShowFormResult(true);
    } else {
      // console.log(respone)
      setAlertResult({
        success: false,
        message: respone.data.mes
      })
      setShowAlert(true)
    }
  }
  async function parkIn(e){
    e.preventDefault();
    // console.log(formDataIn);
     for(let key in formDataIn){
      if(formDataIn[key] === ''){
            setAlertResult({
                  success: false,
                  message: "Bạn chưa nhập đủ thông tin!"
            })
            setShowAlert(true);
            return;
      } 
     }
     if(formDataIn.vehicle === "Xe đạp" && formDataIn.licensePlates !== "Không"){
      setAlertResult({
            success: false,
            message: "Bạn hãy nhập Không vào mục biển số xe khi bạn đi xe đạp hoặc chọn đúng loại phương tiện ứng với biển số xe!"
      })
      setShowAlert(true);
      return
     }
    const respone = await axios.post("http://localhost:5000/park/in", formDataIn, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    if (respone.data.success === true) {
      setAlertResult({
        success: true,
        message: "Bạn đã đưa xe vào bãi thành công!"
      })
      setShowAlert(true)
      // console.log(respone);
      // setFormResult(respone.data)
      // setShowFormResult(true);
    } else {
      setAlertResult({
        success: false,
        message: respone.data.mes
      })
      setShowAlert(true)
    }
  }
  function closeAlert(){
      setShowFormResult(false);
  }
  return (
    <div>
      <Header isLogined={true} role={"admin"}/>
      <div className="park-container flex-center">
      <div className="rg-form-container">
        <div className="form-box">
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
                  setFormDataIn({ ...formDataIn, licensePlates: e.target.value })
                }
              />
            </div>
            <div className="rg-input-box">
              <label htmlFor="">Loại phương tiện</label>
              <select
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
                onClick={parkIn}
              >
                Đưa xe vào bãi
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="rg-form-container">
        <div className="form-box">
          <form action="">
            <h1 className="login-head">Lấy xe ra khỏi bãi</h1>

            <div className="rg-input-box">
              <label htmlFor="">Nhập biển số xe</label>
              <input
                required
                type="text"
                placeholder="Nhập Không nếu bạn đi xe đạp"
                name="licensePlates"
                value={formDataOut.licensePlates}
                onChange={(e) =>
                  setFormDataOut({ ...formDataOut, licensePlates: e.target.value })
                }
              />
            </div>
            <div className="rg-input-box">
              <label htmlFor="">Loại phương tiện</label>
              <select
                id=""
                value={formDataOut.vehicle}
                onChange={(e) =>
                  setFormDataOut({ ...formDataOut, vehicle: e.target.value })
                }
              >
                <option value="">Chọn loại phương tiện</option>
                <option value="Xe đạp">Xe đạp</option>
                <option value="Xe máy">Xe máy</option>
                <option value="Ô tô">Ô tô</option>
              </select>
            </div>
            <div className="rg-input-box">
              <label htmlFor="">Thời gian ra</label>
              <input
                required
                type="date"
                placeholder="Nhập Không nếu bạn đi xe đạp"
                name="licensePlates"
                value={formDataOut.timeout}
                onChange={(e) =>
                  setFormDataOut({ ...formDataOut, timeout: e.target.value })
                }
              />
            </div>
            <div className="rg-button flex-center">
              <button
                className="login-button btn-hover"
                onClick={calculateParkingFee}
              >
                Lấy xe ra khỏi bãi
              </button>
            </div>
          </form>
        </div>
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

export default ParkingFeeIn;
