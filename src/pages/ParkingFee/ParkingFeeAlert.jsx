import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ParkingFeeAlert = ({ parkingFeeForm, close }) => {
  function pay() {
    window.location.reload();
  }
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Thông tin chi tiết hóa đơn <AiFillCloseCircle onClick={close} />
        </h1>

        <hr />
        <div className="emp-inf-thumb-container flex">
          <div className="emp-thumb-inf">
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Loại xe: </label>
              <p>{parkingFeeForm.vehicle}</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Thời gian gửi: </label>
              <p>
                {parkingFeeForm.vehicle === "Ô tô"
                  ? `${parkingFeeForm.numHours}h`
                  : parkingFeeForm.typeTime}
              </p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Chi phí: </label>
              <p>{parkingFeeForm.price}đ</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Khách hàng: </label>
              <p>{parkingFeeForm.typeCustomer}</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Biển số xe: </label>
              <p>{parkingFeeForm.licensePlates}</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <div className="emp-inf-button update" onClick={() => pay()}>
                Thanh toán
              </div>
              {/* <p>{parkingFeeForm.licensePlates}</p> */}
            </div>
          </div>
          <div className="">
            <label
              style={{
                textAlign: "center",
                fontWeight: "bold",
                display: "inline-block",
                width: "100%",
              }}
              htmlFor=""
            >
              Mã QR thanh toán:{" "}
            </label>
            <img
              style={{ width: "300px" }}
              src={`https://api.vietqr.io/image/970407-19036744400010-jsBXndE.jpg?accountName=NGUYEN%20KHANH%20MINH%20DANG&amount=${
                parkingFeeForm.price
              }&addInfo=Chuyen%20khoan%20gui%20${parkingFeeForm.vehicle}`}
              alt=""
            />
          </div>
        </div>
        {/* <div className="emp-inf-buttons">
              <div className="emp-inf-button update" >Thanh toán</div>   
          </div> */}
      </form>
    </div>
  );
};
export default ParkingFeeAlert;
