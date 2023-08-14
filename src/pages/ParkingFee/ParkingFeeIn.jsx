import React, { useState, useEffect } from "react";
import "./ParkingFee.css";

import axios from "axios";
import ParkingFeeAlert from "./ParkingFeeAlert";
import ParkingFeeAlertIn from "./ParkingFeeAlertIn";
import ParkingFeeAlertOut from "./ParkingFeeAlertOut";
import Alert from "../../components/Alert/Alert";
import Header from "../../components/Header/Header";
import ParkingInf from "./ParkingInf";
const ParkingFeeIn = () => {
  const [showParkingInf, setShowParkingInf] = useState(false);
  const [searchLiecenplates, setSearchLicensePlates] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const [posVehicle, setPosVehicle] = useState([{}]);
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
  const [formResult, setFormResult] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({
    success: true,
    message: "Thành công",
  });
  const [showFormResult, setShowFormResult] = useState(false);
  const [confirmPosIn, setConfirmPosIn] = useState(false);
  const [confirmPosOut, setConfirmPosOut] = useState(false);
  const [posShowed, setPosShowed] = useState({});
  function showFormData(e) {
    e.preventDefault();
    // console.log(formData);
  }

  async function calculateParkingFee(e) {
    e.preventDefault();
    console.log(formDataOut);
    for (let key in formDataOut) {
      if (formDataOut[key] === "") {
        setAlertResult({
          success: false,
          message: "Bạn chưa nhập đủ thông tin!",
        });
        setShowAlert(true);
        return;
      }
    }
    if (
      formDataOut.vehicle === "Xe đạp" &&
      formDataOut.licensePlates !== "Không"
    ) {
      setAlertResult({
        success: false,
        message:
          "Bạn hãy nhập Không vào mục biển số xe khi bạn đi xe đạp hoặc chọn đúng loại phương tiện ứng với biển số xe!",
      });
      setShowAlert(true);
      return;
    }
    const respone = await axios.post(
      "http://localhost:5000/park/out",
      formDataOut,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(respone);
    if (respone.data.success === true) {
      setAlertResult({
        success: true,
        message: "Bạn đã đưa xe ra khỏi bãi thành công!",
      });
      setShowAlert(true);
      // console.log(respone);
      // setFormResult(respone.data)
      // setShowFormResult(true);
    } else {
      // console.log(respone)
      setAlertResult({
        success: false,
        message: respone.data.mes,
      });
      setShowAlert(true);
    }
  }
  async function parkIn(e) {
    e.preventDefault();
    // console.log(formDataIn);
    for (let key in formDataIn) {
      if (formDataIn[key] === "") {
        setAlertResult({
          success: false,
          message: "Bạn chưa nhập đủ thông tin!",
        });
        setShowAlert(true);
        return;
      }
    }
    if (
      formDataIn.vehicle === "Xe đạp" &&
      formDataIn.licensePlates !== "Không"
    ) {
      setAlertResult({
        success: false,
        message:
          "Bạn hãy nhập Không vào mục biển số xe khi bạn đi xe đạp hoặc chọn đúng loại phương tiện ứng với biển số xe!",
      });
      setShowAlert(true);
      return;
    }
    const respone = await axios.post(
      "http://localhost:5000/park/in",
      formDataIn,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (respone.data.success === true) {
      setAlertResult({
        success: true,
        message: "Bạn đã đưa xe vào bãi thành công!",
      });
      setShowAlert(true);
      // console.log(respone);
      // setFormResult(respone.data)
      // setShowFormResult(true);
    } else {
      setAlertResult({
        success: false,
        message: respone.data.mes,
      });
      setShowAlert(true);
    }
  }
  function closeAlert() {
    setShowFormResult(false);
  }
  async function getPosVehicle() {
    try {
      const respone = await axios.get("http://localhost:5000/park/posvehicle");
      // if(respone.data.success === true){
      setPosVehicle(respone.data.posVehicle);
    } catch (error) {
      alert("Some thing wrong");
    }
  }
  function confirmedPosIn(index) {
    let thisInput = document.getElementById(
      `${posVehicle[index].posCode}${posVehicle[index].posIndex}`
    );
    //  console.log(posVehicle[index].status)
    if (posVehicle[index].status === "Chưa có xe") {
      setPosShowed({ ...posVehicle[index], parked: false });
      setConfirmPosIn(true);
      thisInput.checked = false;
    } else {
      setPosShowed({ ...posVehicle[index], parked: true });
      setConfirmPosOut(true);
      thisInput.checked = false;
    }
  }

  async function sendSearch() {
    // try {
    const respone = await axios.get(
      `http://localhost:5000/park/searchbylicenseplates/${searchLiecenplates}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(respone);
    if (respone.data.success === true) {
      setSearchResult(respone.data.inf);
      setShowParkingInf(true);
    }
    // } catch (error) {}
  }
  useEffect(() => {
    getPosVehicle();
  }, []);
  return (
    <div>
      <Header isLogined={true} role={"admin"} />

      <div id="garagemap-container">
        <img
          src="https://res.cloudinary.com/dmbzrlrot/image/upload/v1691333724/L%E1%BB%91i_v%C3%A0o_1_jngxiq.png"
          alt=""
        />
        {/* <input type="checkbox" /> */}
        {posVehicle &&
          posVehicle.map((pos, index) => (
            <input
              id={`${pos.posCode}${pos.posIndex}`}
              key={index}
              checked={pos.status === "Chưa có xe" ? false : true}
              type="checkbox"
              style={{ left: `${pos.posX}`, top: `${pos.posY}` }}
              onChange={() => confirmedPosIn(index)}
            />
          ))}
        <div className="search-container ">
          <label htmlFor="">Tìm kiếm xe đã vào bãi</label>
          <input
            type="text"
            className="search-input"
            onChange={(e) => setSearchLicensePlates(e.target.value)}
          />
          <button className="chart-btn" onClick={sendSearch}>
            Tìm kiếm
          </button>
        </div>
      </div>

      {showFormResult && (
        <ParkingFeeAlert
          parkingFeeForm={formResult}
          close={() => closeAlert()}
        />
      )}
      {showAlert && (
        <Alert result={alertResult} onclose={() => setShowAlert(false)} />
      )}
      {showParkingInf && (
        <ParkingInf pos={searchResult} close={() => setShowParkingInf(false)} />
      )}
      {confirmPosIn && (
        <ParkingFeeAlertIn
          pos={posShowed}
          close={() => setConfirmPosIn(false)}
        />
      )}
      {confirmPosOut && (
        <ParkingFeeAlertOut
          pos={posShowed}
          close={() => setConfirmPosOut(false)}
        />
      )}
    </div>
  );
};

export default ParkingFeeIn;
