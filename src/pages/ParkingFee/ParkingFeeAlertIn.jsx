import axios from "axios";
import React, { useState, useCookies } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Alert from "../../components/Alert/Alert";
import ComeIn from "./ComeIn";

const ParkingFeeAlertIn = ({ pos, close }) => {
  const [formData, setFormData] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [alertResult, setAlertResult] = useState({})
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [data, setData] = useState({})
  async function parkIn(){
    // try {
    //   const {status, ...dataForm} = pos;
    // const request = await axios.put('http://localhost:5000/park/parkin', dataForm, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    // if(request.data.success === true){
      // setData(pos)
      setShowAlert(true)
      // setAlertResult({
      //   success: true,
      //   message: "Bạn đã đưa xe vào chỗ thành công!"
      // })
    // } else {
    //   setAlertResult({
    //     success: false,
    //     message: "Có lỗi xảy ra!"
    //   })
    // }
    // // console.log(request)
    // } catch (error) {
      
    // }
  }
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Xác nhận gửi xe vào bãi <AiFillCloseCircle onClick={close} />
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
            <label htmlFor="">Trạng thái: </label>
            <p>{pos.status}</p>
          </div>
          {
            pos.status === "Đã có xe" && 
            <div>
              <div className="emp-thumb-inf-input-box">
                <label htmlFor="">Biển số xe: </label>
                <p>{pos.licensePlates}</p>
              </div>
            </div>
          }
          {
            pos.vehicle === "Ô tô" && pos.status === "Chưa có xe" &&
            <div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor="">Khách vãng lai: </label>
                  <p>8.000đ/h</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor="">Nhân viên công ty:</label>
                  <p>5.000đ/h</p>
                  </div>
            </div>
          }

          {
            pos.vehicle === "Xe máy" && pos.status === "Chưa có xe" &&
            <div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor="">Khách vãng lai:</label>
                  <p>Trong ngày trước 18h30: 5.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Trong ngày sau 18h30: 8.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Qua ngày: 20.000đ/ngày</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor="">Nhân viên công ty:</label>
                  <p>Trong ngày trước 18h30: 3.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Trong ngày sau 18h30: 5.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Qua ngày: 15.000đ/ngày</p>
                  </div>
            </div>
          }
          {
            pos.vehicle === "Xe đạp" && pos.status === "Chưa có xe" &&
            <div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor="">Chi phí:</label>
                  <p>Trong ngày trước 18h30: 2.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Trong ngày sau 18h30: 3.000đ/lượt</p>
                  </div>
                  <div className="emp-thumb-inf-input-box">
                  <label htmlFor=""></label>
                  <p>Qua ngày: 10.000đ/ngày</p>
                  </div>
            </div>
          }
          {
            pos.status === "Chưa có xe" &&
            <div className="emp-inf-buttons">
              <div className="emp-inf-button update" onClick={() => parkIn()}>Đưa xe vào chỗ</div>
              <div className="emp-inf-button delete" onClick={close}>Hủy</div>
            </div>
          //   : 
          //   <div className="emp-inf-buttons">
          //     <div className="emp-inf-button update" onClick={() => parkIn()}>Thanh toán và lấy xe</div>
          //     <div className="emp-inf-button delete" onClick={close}>Kết thúc</div>
          // </div>
          }
          </div>
        </div>
        {/* </div> */}
      </form>
      {
        showAlert && <ComeIn onclose={() => setShowAlert(false)} data={pos}/>
      }
    </div>
  );
};
export default ParkingFeeAlertIn;
