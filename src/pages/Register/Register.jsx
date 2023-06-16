import React, { useState } from 'react'
import './Register.scoped.css'
import { Navigate } from 'react-router-dom';
import $ from 'jquery';
const Register = () => {
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [name, setName] = useState();
      const [regSuccess, setRegSucces] = useState();
      async function registerUser(event){
            event.preventDefault();
            
            const respone = await fetch('http://localhost:5000/api/register', {
                  method: "POST",
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                        name,
                        email,
                        password
                  })
            })

            const data = await respone.json();
            if(data.status === "OK"){
                setRegSucces(true);
            } else {
                  alert("Email đã tồn tại");
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
                                    requiredtype="text" required placeholder='Họ và tên đệm' name='hoDem'/>
                              <input 
                                    required
                                    type="text" 
                                    placeholder='Tên' 
                                    name='ten' 
                                    value={name}
                                    onChange = {(e) => setName(e.target.value)}
                                    />
                        </div>
                        <div className="rg-input-box">
                              {/* <label htmlFor="">Phone Number</label> */}
                              <input 
                                    type="text" required placeholder='Số điện thoại' name='phone'/>
                        </div>

                        <div className="rg-input-box">
                              {/* <label htmlFor="workPart">Bộ phận làm việc</label> */}
                              <select name="workPart" id="" style={{color: '#888'}}>
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
                                    requiredtype="text" required placeholder='Mã nhân viên' name='maNV'/>
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