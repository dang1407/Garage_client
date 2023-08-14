import React, { useState } from 'react'

const ParkingQuestion = () => {
  const [formDataIn, setFormDataIn] = useState()
  return (
    <div>
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
                // onClick={parkIn}
              >
                Đưa xe vào bãi
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="rg-form-container">
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
      </div> */}
      </div>
    </div>
  )
}

export default ParkingQuestion