import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

const ParkingFeeAlert = ({ parkingFeeForm, close }) => {
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Thông tin chi tiết hóa đơn <AiFillCloseCircle onClick={close} />
        </h1>

        <hr />
        <div className="enp-inf-thumb-container">
          <div className="emp-thumb-inf">
          <div className="emp-thumb-inf-input-box">
            <label htmlFor="">Loại xe: </label>
            <p>{parkingFeeForm.vehicle}</p>
          </div>
          <div className="emp-thumb-inf-input-box">
            <label htmlFor="">Thời gian gửi: </label>
            <p>{parkingFeeForm.typeTime}</p>
          </div>
          <div className="emp-thumb-inf-input-box">
            <label htmlFor="">Chi phí: </label>
            <p>{parkingFeeForm.price}</p>
          </div>
          <div className="emp-thumb-inf-input-box">
            <label htmlFor="">Khách hàng: </label>
            <p>{parkingFeeForm.typeCustomer}</p>
          </div>
          <div className="emp-thumb-inf-input-box">
            <label htmlFor="">Biển số xe: </label>
            <p>{parkingFeeForm.licensePlates}</p>
          </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ParkingFeeAlert;
