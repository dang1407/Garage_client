import axios from "axios";
import React, { useState, useCookies } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Alert from "../../components/Alert/Alert";
import ComeIn from "./ComeIn";

const ParkingInf = ({ pos, close }) => {
  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>
          Thông tin xe vào bến <AiFillCloseCircle onClick={close} />
        </h1>

        <hr />
        {/* <div className="flex-center"> */}
        <div className="enp-inf-thumb-container">
          {pos !== "Not found" ? (
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
              <div className="emp-thumb-inf-input-box">
                <label htmlFor="">Thời gian vào: </label>
                <p>{pos.timein.slice(0, pos.timein.length - 2)}</p>
              </div>
              <div className="emp-thumb-inf-input-box">
                <label htmlFor="">Biển số xe: </label>
                <p>{pos.licensePlates}</p>
              </div>
            </div>
          ) : (
            <div className="emp-thumb-inf">
              <div className="emp-thumb-inf-input-box">
                <label htmlFor="">
                  Không có xe đang gửi trong bãi có biển số mà bạn đang tìm{" "}
                </label>
                <p>{`${pos.posCode} - ${pos.posIndex}`}</p>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};
export default ParkingInf;
