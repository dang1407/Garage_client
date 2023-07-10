import React, { useState } from 'react'
import './Register.scoped.css'
import { Navigate } from 'react-router-dom';
const Register = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [regSuccess, setRegSucces] = useState(false);
      const [mobile, setMobile] = useState("");
      const [workPart, setWorkPart] = useState("");
      const [work, setWork] = useState();
      const [licensePlates, setLicensePlates] = useState("");
      const [employeeCode, setEmployeeCode] = useState("");
      async function registerUser(event){
            event.preventDefault();
            const name = firstName + lastName;
            const respone = await fetch('http://localhost:5000/api/register', {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        name,
                        email,
                        password,
                        mobile,
                        workPart,
                        licensePlates,
                        employeeCode, 
                        work   
                  })
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
                                    value={email}
                                    onChange = {(e) => setEmail(e.target.value)}
                              />
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    type="password" 
                                    required 
                                    placeholder='Password' 
                                    name='password' 
                                    value={password}
                                    onChange = {(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="name-box">
                              <input 
                                    requiredtype="text" required placeholder='Họ và tên đệm' name='hoDem'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                              <input 
                                    required
                                    type="text" 
                                    placeholder='Tên' 
                                    name='ten' 
                                    value={lastName}
                                    onChange = {(e) => setLastName(e.target.value)}
                                    />
                        </div>
                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    type="text" required value={mobile} placeholder='Số điện thoại' name='phone'
                                    onChange={(e) => setMobile(e.target.value)}
                                    />
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="workPart">Bộ phận làm việc</label> */}
                              <select 
                                    name="workPart" id="" style={{color: '#888'}}
                                    onChange={(e) => setWorkPart(e.target.value)}
                                    >
                                    <option value="" >--- Bộ phận làm việc ---</option>
                                    <option value="Hành chính">Hành chính</option>
                                    <option value="Kỹ thuật">Kỹ thuật</option>
                                    <option value="Tài chính">Tài chính</option>
                                    <option value="Marketing">Marketing</option>
                              </select>
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    requiredtype="text" required placeholder='Vị trí làm việc' name='vitri'
                                    onChange={(e) => setWork(e.target.value)}
                                    value={work}
                                    />
                        </div>
                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    requiredtype="text" required placeholder='Mã nhân viên' name='maNV'
                                    value={employeeCode}
                                    onChange={(e) => setEmployeeCode(e.target.value)}
                                    />
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    requiredtype="text" placeholder='Biển số xe (nếu có)' name='biensoxe'
                                    value={licensePlates}
                                    onChange={(e) => setLicensePlates(e.target.value)}
                                    />
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