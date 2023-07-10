import React from "react";
import "./EmployeeInf.css";
const EmployeeInf = ({ user }) => {

  function updateEmployee(){
    // console.log('called')
    var allPTag = document.getElementsByTagName('p');
    console.log(allPTag)
    for(let i = 0; i < allPTag.length; i++ ){
      let newInput = document.createElement('input');
      // newInput.attributes = allPTag[i].attributes;
      newInput.value = allPTag[i].textContent;
      allPTag[i].replaceWith(newInput)
    }
  }

  return (
    <div className="emp-inf-container">
      <form action="" className="emp-inf-form">
        <h1>Thông tin chi tiết nhân viên</h1>
        <hr />
        <div className="enp-inf-thumb-container">
          <div className="emp-image-thumb">
            <img
              src="https://img2.thuthuatphanmem.vn/uploads/2019/05/06/hinh-anh-hot-boy-anh-the_100828857.jpg"
              alt=""
            />
          </div>

          <div className="emp-thumb-inf">
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Họ và tên: </label>
              <p className="emp-inf-name">name</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Ngày sinh: </label>
              <p>14/07/2002</p>
              {/* <input type="date" value="2002-08-07" /> */}
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Số điện thoại: </label>
              <p>0961037364</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Giới tính: </label>
              <p>Nam</p>
            </div>
            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Vị trí làm việc: </label>
              <p>Lập trình viên</p>
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Phòng ban: </label>
              <p>Kỹ thuật</p>
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Loại xe đăng ký: </label>
              <p>Chưa có</p>
            </div>

            <div className="emp-thumb-inf-input-box">
              <label htmlFor="">Biển số xe: </label>
              <p>Chưa có</p>
            </div>
            <div className="emp-thumb-inf-input-box hkhjk">
              <label htmlFor="">Mã nhân viên: </label>
              <p>NV01</p>
            </div>
            <div className="emp-thumb-inf-input-box" />
          </div>
        </div>
        <div className="emp-inf-buttons">
            <div className="emp-inf-button update" onClick={updateEmployee}>Update</div>
            <div className="emp-inf-button delete">Delete</div>
        </div>
        {/* <div className="emp-inf-body">
                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Vị trí làm việc: </label>
                        <p>Lập trình viên</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Phòng ban: </label>
                        <p>Kỹ thuật</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Loại xe đăng ký: </label>
                        <p>Chưa có</p>
                  </div>

                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Biển số xe: </label>
                        <p>Chưa có</p>
                  </div>
                  <div className="emp-inf-body-input-box">
                        <label htmlFor="">Mã nhân viên: </label>
                        <p>NV01</p>
                  </div>
            </div> */}
      </form>
    </div>
  );
};

export default EmployeeInf;
