import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const DeleteAcc = () => {
      const [email, setEmail] = useState();
      async function deleteUser(event){
            event.preventDefault();
            console.log(email);
            const respone = await axios.delete(`http://localhost:5000/deleteacc/${email}`);
            console.log(respone.data.status);
            if(respone.data.status === "OK"){
                  alert("Xóa thành công");
            } else {
                  // alert("Tài khoản không tồn tại");
            }
      }
  return (
    <div className='del-container'>
      <form action="" className="login-form">
        {/* Login box */}
        <div className="login-box">
          <h1 className="login-head">Delete Acc</h1>
          <div className="update-container">
            <div className="up-ip-box">
              <label htmlFor="">Email</label>
              <input
              value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            
          </div>
          <button
            className="login-button"
            style={{ marginLeft: "20px" }}
            onClick={deleteUser}
          >
            Send Request
          </button>
        </div>
      </form>
    </div>
  )
}

export default DeleteAcc