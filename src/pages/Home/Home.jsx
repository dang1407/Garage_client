import React, { useContext, useEffect } from 'react';
import { useState, Link } from 'react';
import styles from './Home.module.css';
import '../../components/SlideShow/SlideShow.css'
import sliderImg1 from '../../assets/images/slideImage.png';
import sliderImg2 from '../../assets/images/slideImage (1).png';
import sliderImg3 from '../../assets/images/slideImage (2).png';
import Slideshow from '../../components/SlideShow/SlideShow';
import Production from '../../components/Production/Production';
import Header from '../../components/Header/Header';
import AccessTokenContext from '../../Token/AccessTokenContext'
import logoHome from '../../assets/images/logo.png';
import {FaUserCircle, FaAngleDown, FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import ListEmployees from '../../components/ListEmployees/ListEmployees';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Cookie } from 'react-cookie'
import Login from '../Login/Login';
const sliderImages = [sliderImg1, sliderImg2, sliderImg3];

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const { accessToken, role } = useContext(AccessTokenContext)
  const [accessToken, setAccessToken] = useState(null)
  const [isLogined, setIsLogined] = useState(false);
  const [role, setRole] = useState(null);
  // console.log(accessToken)
  async function loginAccessTokenCookies(){
    const respone = await axios.get('http://locahost:5000/api/login')
    console.log(respone)
    if(respone.status === true){
      // setLsAccessToken(Cookie.accessToken)
      setIsLogined(true)
    }
    // setRole(respone.role)
  } 

  async function checkLogin(){
    const localStorageAccessToken = localStorage.getItem('accessToken');
    console.log(localStorageAccessToken)
    if(localStorageAccessToken === null){
      return;
    }
    const respone = await axios.get('http://localhost:5000/api/logined', {
      headers: {
        Authorization: `Bearer ${localStorageAccessToken}`
      }
    })
    console.log(respone)
    if(respone.data.success === true){
      setIsLogined(true);
      setRole(respone.data.role);
    }
  }
  useEffect(() => {
    checkLogin();
    
    // if(location.state){
    //   setAccessToken(location.state.accessToken)
    //   setRole(location.state.role)
    //   setIsLogined(true)
    // }

    if(accessToken !== null){
      setIsLogined(true)
    }
  }, [])

  // useEffect(() => {
  //   if(localStorage.getItem('accessToken') !== null){
  //     accessToken = localStorage.getItem('accessToken')
  //   }
  // }, [])
  // const handleGoToListEmployee = () => {
  //   navigate('/listemployees', { state: { accessToken } });
  // };
  console.log(role)
  return (
    <div className='home-container'>
      <Header isLogined={isLogined} accessToken={accessToken} role={role} />
      {/* <Routes>
        <Route path='/' element={<Slideshow images={sliderImages} />}></Route>
        <Route exact path='/listemployees' element={< ListEmployees accessToken = {accessToken} />}></Route>
      </Routes> */}
    </div>
  )
}

export default Home