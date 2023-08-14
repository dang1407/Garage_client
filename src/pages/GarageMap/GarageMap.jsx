import React, { useEffect, useState } from 'react'
import './GarageMap.css'
import axios from 'axios'
const GarageMap = () => {
  const [posVehicle, setPosVehicle] = useState([{}])

  // function generatePosVehicle(){
  //   let garageContainer = document.getElementById('garagemap-container');
  //   // // Lấy danh sách các thẻ input bên trong inputContainer
  //   // const inputElements = garageContainer.getElementsByTagName('input');

  //   // // Chuyển các thẻ input thành mảng để có thể sử dụng forEach
  //   // const inputArray = Array.from(inputElements);

  //   // // Xóa tất cả các thẻ input
  //   // inputArray.forEach(inputElement => {
  //   //   inputElement.remove();
  //   // });
  //   for(const pos of posVehicle){
  //     let newInput = document.createElement('input');
  //     newInput.style.left = pos.posX;
  //     newInput.style.top = pos.posY;
  //     newInput.type = "checkbox"
  //     if(pos.status === "Đã có xe"){
  //       newInput.checked = true;
  //       newInput.disabled =  true;
  //     }
  //     garageContainer.appendChild(newInput)
  //   }
  // }
  function sayHello(){
    alert("Hello")
  }
    async function getPosVehicle(){
     try {
      const respone = await axios.get('http://localhost:5000/park/posvehicle');
      // if(respone.data.success === true){
        setPosVehicle(respone.data.posVehicle)
        let garageContainer = document.getElementById('garagemap-container');
    // // Lấy danh sách các thẻ input bên trong inputContainer
    // const inputElements = garageContainer.getElementsByTagName('input');

    // // Chuyển các thẻ input thành mảng để có thể sử dụng forEach
    // const inputArray = Array.from(inputElements);

    // // Xóa tất cả các thẻ input
    // inputArray.forEach(inputElement => {
    //   inputElement.remove();
    // });
    for(const pos of respone.data.posVehicle){
      let newInput = document.createElement('input');
      newInput.style.left = pos.posX;
      newInput.style.top = pos.posY;
      newInput.type = "checkbox";
      if(pos.status === "Đã có xe"){
        newInput.checked = true;
        newInput.disabled =  true;
      } else {
        newInput.addEventListener('click', sayHello)
      }
      garageContainer.appendChild(newInput)
    }
      // }
     } catch (error) {
      alert("Some thing wrong")
     }
      
    }
    useEffect(() => {
      getPosVehicle();
    }, [])
  return (
    <div>
      <div id="garagemap-container">
            <img src="https://res.cloudinary.com/dmbzrlrot/image/upload/v1691194687/Garage/GargageMap/L%E1%BB%91i_v%C3%A0o_gde3a2.png" alt="" />
            {/* <input type="checkbox" /> */}
      </div>
    </div>
  )
}

export default GarageMap