import axios from "axios";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Alert from "../../components/Alert/Alert";
import ParkingFeeAlert from "./ParkingFeeAlert";
const ComeOut = ({ onclose, data }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertResult, setAlertResult] = useState({
    success: true,
    message: "",
  });
  const [formDataOut, setFormDataOut] = useState({
    licensePlates: "",
    vehicle: data.vehicle,
    posCode: data.posCode,
    posIndex: data.posIndex,
    timeout: "",
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [showParkingFeeAlert, setShowParkingFeeAlert] = useState(false);
  const [parkingFeeForm, setParkingFeeForm] = useState({});
  async function putRequestParking(e) {
    e.preventDefault();
    // console.log(data)
    // kiểm tra người dùng nhập đủ thông tin
    for (let key in formDataOut) {
      if (formDataOut[key] === "") {
        setAlertResult({
          success: false,
          message: "Bạn chưa nhập đủ thông tin",
        });
        // setShowAlert(true)
        return;
      }
    }

    if (
      formDataOut.vehicle === "Xe đạp" &&
      formDataOut.licensePlates !== "Không"
    ) {
      setAlertResult({
        success: false,
        message: "Bạn chưa nhập đúng thông tin biển số xe và loại xe",
      });
      // setShowAlert(true)
      return;
    }
    try {
      const request = await axios.post(
        "http://localhost:5000/park/in",
        formDataOut,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (request.data.success === true) {
        setAlertResult({
          success: true,
          message: "Bạn đã đưa xe vào chỗ thành công!",
        });
        setShowAlert(true);
      }
    } catch (error) {
      setAlertResult({
        success: false,
        message:
          "Không tìm thấy thông tin vào bến của bạn, vui lòng kiểm tra lại thông tin!",
      });
      setShowAlert(true);
    }
  }
  async function parkOut(e) {
    e.preventDefault();
    try {
      console.log(formDataOut);
      const respone = await axios.put(
        "http://localhost:5000/park/parkout",
        formDataOut,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(respone);
      if (respone.data.success === true) {
        setParkingFeeForm(respone.data);
        setShowParkingFeeAlert(true);
      }
    } catch (error) {
      setAlertResult({
        success: false,
        message:
          "Không tìm thấy thông tin vào bến của bạn, vui lòng kiểm tra lại thông tin!",
      });
      setShowAlert(true);
    }
  }
  function closeAlert() {
    window.location.reload();
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
              <h1 className="login-head">Lấy xe</h1>

              <div className="rg-input-box">
                <label htmlFor="">Nhập biển số xe</label>
                <input
                  required
                  type="text"
                  placeholder="Nhập Không nếu bạn đi xe đạp"
                  name="licensePlates"
                  value={formDataOut.licensePlates}
                  onChange={(e) =>
                    setFormDataOut({
                      ...formDataOut,
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
                <label htmlFor="">Thời gian rời bến</label>
                <input
                  required
                  type="datetime-local"
                  name="licensePlates"
                  value={formDataOut.timeout}
                  onChange={(e) =>
                    setFormDataOut({
                      ...formDataOut,
                      timeout: e.target.value,
                    })
                  }
                />
              </div>
              {/* <div className="rg-input-box">
                <label htmlFor="">Thời gian rời bến</label>
                <input
                  required
                  type="text"
                  
                  name="licensePlates"
                  value={data.posCode + data.posIndex}
                  onChange={(e) =>
                    setFormDataOut({
                      ...formDataOut,
                      timeout: e.target.value,
                    })
                  }
                />
              </div> */}
              <div className="rg-button flex-center">
                <button
                  className="login-button btn-hover"
                  onClick={(e) => parkOut(e)}
                >
                  Lấy xe ra khỏi bãi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showAlert && <Alert result={alertResult} onclose={closeAlert} />}

      {showParkingFeeAlert && (
        <ParkingFeeAlert
          parkingFeeForm={parkingFeeForm}
          close={() => setShowParkingFeeAlert(false)}
        />
      )}
    </div>
  );
};

export default ComeOut;
