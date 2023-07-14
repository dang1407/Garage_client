import React, { useState } from 'react'
import './Register.scoped.css'
import { Navigate } from 'react-router-dom';
const Register = () => {
      // const [email, setEmail] = useState("");
      // const [password, setPassword] = useState("");
      // const [firstName, setFirstName] = useState("");
      // const [lastName, setLastName] = useState("");
      // const [mobile, setMobile] = useState("");
      // const [workPart, setWorkPart] = useState("");
      // const [work, setWork] = useState();
      // const [licensePlates, setLicensePlates] = useState("");
      // const [employeeCode, setEmployeeCode] = useState("");
      const [formData, setFormData] = useState({
            firstName: "",
            lastName: "",
            birthDay: "",
            mobile: "",
            gender: "",
            work: "",
            workPart: "",
            vehicle: "",
            licensePlates: "",
            employeeCode: ""
          })
      const [regSuccess, setRegSucces] = useState(false);
      async function registerUser(event){
            event.preventDefault();
            const {firstName, lastName, ...otherInf} = formData;
            const {vehicle, licensePlates, ...checkData} = formData
            const hasEmptyvalues = Object.values(checkData).some(value => value === "")
            if(hasEmptyvalues || !(vehicle === "" && licensePlates === "")){
                  console.log(formData)
                  console.log(hasEmptyvalues)
                  alert("Bạn chưa nhập đủ thông tin")
                  return;
            }
            const respone = await fetch('http://localhost:5000/api/register', {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({...otherInf, name: formData.firstName + formData.lastName})
            })

            const data = await respone.json();
            console.log(data)
            if(data.mes === "Register successfull! Please go to login"){
                setRegSucces(true);
            } else {
                  alert(data.message);
            }
      }

      if(regSuccess){
            return <Navigate to = '/login'></Navigate>
      }
  return (
    <div className='register-container'>
      <div className="rg-form-container">
            <div className="form-box">
                  <form action="" >
                        <h1 className='login-head'>Register</h1>

                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    required
                                    type="email" 
                                    placeholder='Email' 
                                    name='email' 
                                    value={formData.email}
                                    onChange = {(e) => setFormData({...formData, email: e.target.value})}
                              />
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    type="password" 
                                    required 
                                    placeholder='Password' 
                                    name='password' 
                                    value={formData.password}
                                    onChange = {(e) => setFormData({...formData, password: e.target.value})}/>
                        </div>

                        <div className="name-box">
                              <input 
                                    requiredtype="text" required placeholder='Họ và tên đệm: ' name='hoDem'
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                    />
                              <input 
                                    required
                                    type="text" 
                                    placeholder='Tên' 
                                    name='ten' 
                                    value={formData.lastName}
                                    onChange = {(e) => setFormData({...formData, lastName: e.target.value})}
                                    />
                        </div>
                        <div className="name-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    type="text" required value={formData.mobile} placeholder='Số điện thoại' name='phone'
                                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                    />
                              <select 
                                    name="gender" id="" style={{color: '#888'}}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    >
                                    <option value="" >--- Gender ---</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                              </select>
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="workPart">Bộ phận làm việc</label> */}
                              <select 
                                    name="workPart" id="" style={{color: '#888'}}
                                    onChange={(e) => setFormData({...formData, workPart: e.target.value})}
                                    >
                                    <option value="" >--- Bộ phận làm việc ---</option>
                                    <option value="Hành chính">Hành chính</option>
                                    <option value="Kỹ thuật">Kỹ thuật</option>
                                    <option value="Tài chính">Tài chính</option>
                                    <option value="Marketing">Marketing</option>
                              </select>
                        </div>
                        <div className="name-box">
                              <input 
                                    requiredtype="text" required placeholder='Vị trí làm việc' name='vitri'
                                    onChange={(e) => setFormData({...formData, work: e.target.value})}
                                    value={formData.work}
                                    />
                              <input 
                                    requiredtype="text" required placeholder='Mã nhân viên' name='maNV'
                                    value={formData.employeeCode}
                                    onChange={(e) => setFormData({...formData, employeeCode: e.target.value})}
                                    />
                        </div>
                        {/* <div className="rg-input-box">
                              <input 
                                    requiredtype="text" required placeholder='Vị trí làm việc' name='vitri'
                                    onChange={(e) => setFormData({...formData, work: e.target.value})}
                                    value={formData.work}
                                    />
                        </div>
                        <div className="rg-input-box">

                              <input 
                                    requiredtype="text" required placeholder='Mã nhân viên' name='maNV'
                                    value={formData.employeeCode}
                                    onChange={(e) => setFormData({...formData, employeeCode: e.target.value})}
                                    />
                        </div> */}

                        <div className="name-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    requiredtype="text" placeholder='Loại xe (nếu có)' name='biensoxe'
                                    value={formData.vehicle}
                                    onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                                    />
                              <input 
                                    requiredtype="text" placeholder='Biển số xe (nếu có)' name='biensoxe'
                                    value={formData.licensePlates}
                                    onChange={(e) => setFormData({...formData, licensePlates: e.target.value})}
                                    />
                        </div>
                        
                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input type="date" value={formData.birthDay} onChange={(e) => setFormData({...formData, birthDay: e.target.value})}/>
                        </div>

                        <div className="rg-button flex-center">
                              <button className='login-button btn-hover' onClick={registerUser}>Register</button>
                        </div>
                  </form>
            </div>
      </div>
    </div>
  )
}

export default Register