import axios from "axios";
import React, { useState, useCookies, useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Alert from "../../components/Alert/Alert";
import ComeOut from "./ComeOut";

const ParkingFeeAlertOut = ({ pos, close }) => {
  const [formData, setFormData] = useState({
    timein: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({});
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [requestData, setRequestData] = useState({});
  async function parkOut() {
    setShowAlert(true);
  }

  async function getSlotInf() {
    try {
      const respone = await axios.post(
        "http://localhost:5000/park/getslot",
        pos,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (respone.data.success === true) {
        setFormData(respone.data.slotInf);
        console.log(respone);
      } else {
        console.log(respone);
      }
    } catch (error) {}
  }

  useEffect(() => {
    getSlotInf();
  }, []);
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Thanh toán và lấy xe <AiFillCloseCircle onClick={close} />
        </h1>

        <hr />
        {/* <div className="flex-center"> */}
        <div className="enp-inf-thumb-container">
          <div className="emp-thumb-inf">
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Vị trí: </label>
              <p>{`${pos.posCode} - ${pos.posIndex}`}</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Loại xe: </label>
              <p>{pos.vehicle}</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Thời gian vào: </label>
              <p>{formData.timein.slice(0, 16)}</p>
            </div>
            <div className="emp-inf-buttons">
              <div
                className="emp-inf-button update"
                onClick={() => setShowAlert(true)}
              >
                Thanh toán và lấy xe
              </div>
              <div className="emp-inf-button delete" onClick={close}>
                Hủy
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </form>
      {showAlert && <ComeOut onclose={() => setShowAlert(false)} data={pos} />}
    </div>
  );
};
export default ParkingFeeAlertOut;
