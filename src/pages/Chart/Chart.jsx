// import "./styles.css";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import Header from "../../components/Header/Header";
import IsLoading from "../../components/IsLoading/IsLoading";
import CharTest from "../ChartTest/CharTest";
import "./Chart.css";
import ChartVehicle from "./ChartVehicle";
const tempData = [
  {
    monthName: "Tháng 1",
    monthIndex: "1",
    emp: 0,
    customer: 0,
    amt: 1,
  },
  {
    monthName: "Tháng 2",
    monthIndex: "2",
    emp: 0,
    customer: 0,
    amt: 2,
  },
  {
    monthName: "Tháng 3",
    monthIndex: "3",
    emp: 0,
    customer: 0,
    amt: 3,
  },
  {
    monthName: "Tháng 4",
    monthIndex: "4",
    emp: 0,
    customer: 0,
    amt: 4,
  },
  {
    monthName: "Tháng 5",
    monthIndex: "5",
    emp: 0,
    customer: 0,
    amt: 5,
  },
  {
    monthName: "Tháng 6",
    monthIndex: "6",
    emp: 0,
    customer: 0,
    amt: 6,
  },
  {
    monthName: "Tháng 7",
    monthIndex: "7",
    emp: 0,
    customer: 0,
    amt: 7,
  },
  {
    monthName: "Tháng 8",
    monthIndex: "8",
    emp: 0,
    customer: 0,
    amt: 8,
  },
  {
    monthName: "Tháng 9",
    monthIndex: "9",
    emp: 0,
    customer: 0,
    amt: 9,
  },
  {
    monthName: "Tháng 10",
    monthIndex: "10",
    emp: 0,
    customer: 0,
    amt: 10,
  },
  {
    monthName: "Tháng 11",
    monthIndex: "11",
    emp: 0,
    customer: 0,
    amt: 11,
  },
  {
    monthName: "Tháng 12",
    monthIndex: "12",
    emp: 0,
    customer: 0,
    amt: 12,
  },
];
const Chart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataPark, setDataPark] = useState(null);
  const [showDataPark, setShowDataPark] = useState(true);
  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const [year] = useState(parseInt(parseInt(new Date().getFullYear())));
  // const [year, setYear] = useState(2023);
  async function getData() {
    try {
      const respone = await axios.get(
        `http://localhost:5000/park/getbyyear/${year}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(respone);
      if (respone.data.success === true) {
        setIsLoading(true);
        const currentData = tempData;
        for (let parkSlot of respone.data.data) {
          const monthIndex = new Date(
            parkSlot.timeout.slice(0, parkSlot.timeout.length - 2)
          ).getMonth();
          if (parkSlot.typeCustomer === "Nhân viên công ty") {
            currentData[monthIndex].emp =
              parseInt(currentData[monthIndex].emp, 10) +
              parseInt(parkSlot.price, 10);
          } else {
            currentData[monthIndex].customer =
              parseInt(currentData[monthIndex].customer, 10) +
              parseInt(parkSlot.price, 10);
          }
        }
        setDataPark(currentData);
        setIsLoading(false);
      } else {
        alert("Có lỗi");
      }
    } catch (error) {
      alert("Some thing wrong");
    }
  }
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      // Call getData again to update dataPark
      getData();
    }
  }, [isLoading]);
  console.log(dataPark);
  return (
    <div>
      <Header role={"admin"} isLogined={true} />
      <div className="chart-container">
        <h1 className="chart-head">Thống kê doanh thu năm {year}</h1>
        <div className="chart-box">
          {dataPark && showDataPark && <CharTest data={dataPark} />}
          {!showDataPark && <ChartVehicle />}
          <div className="chart-desc">
            <div className="title">Chú giải: &emsp;</div>
            {showDataPark && (
              <div className="chart-desc-box">
                <div className="emp" style={{ color: "#8884d8" }}>
                  emp: Nhân viên công ty
                </div>
                <div className="customer" style={{ color: "#82ca9d" }}>
                  customer: Khách vãng lai
                </div>
                <button
                  onClick={() => setShowDataPark(false)}
                  className="chart-btn"
                >
                  Thống kê theo phương tiện
                </button>
              </div>
            )}
            {!showDataPark && (
              <div className="chart-desc-box">
                <div className="emp" style={{ color: "#8884d8" }}>
                  car: Ô tô
                </div>
                <div className="customer" style={{ color: "#82ca9d" }}>
                  motor: Xe máy
                </div>
                <div className="customer" style={{ color: "#1394f0" }}>
                  bicycle: Xe đạp
                </div>
                <button
                  onClick={() => setShowDataPark(true)}
                  className="chart-btn"
                >
                  Thống kê theo nhóm khách hàng
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isLoading && <IsLoading />}
    </div>
  );
};

export default Chart;
