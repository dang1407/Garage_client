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
const tempData = [
  {
    monthName: "Tháng 1",
    monthIndex: "1",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 1,
  },
  {
    monthName: "Tháng 2",
    monthIndex: "2",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 2,
  },
  {
    monthName: "Tháng 3",
    monthIndex: "3",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 3,
  },
  {
    monthName: "Tháng 4",
    monthIndex: "4",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 4,
  },
  {
    monthName: "Tháng 5",
    monthIndex: "5",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 5,
  },
  {
    monthName: "Tháng 6",
    monthIndex: "6",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 6,
  },
  {
    monthName: "Tháng 7",
    monthIndex: "7",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 7,
  },
  {
    monthName: "Tháng 8",
    monthIndex: "8",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 8,
  },
  {
    monthName: "Tháng 9",
    monthIndex: "9",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 9,
  },
  {
    monthName: "Tháng 10",
    monthIndex: "10",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 10,
  },
  {
    monthName: "Tháng 11",
    monthIndex: "11",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 11,
  },
  {
    monthName: "Tháng 12",
    monthIndex: "12",
    car: 0,
    motor: 0,
    bicycle: 0,
    amt: 12,
  },
];
const ChartVehicle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataVehicle, setDataVehicle] = useState(null);

  const [accessToken] = useState(localStorage.getItem("accessToken"));
  const [year] = useState(parseInt(parseInt(new Date().getFullYear())));
  // const [year, setYear] = useState(2023);
  async function getDataVehicle() {
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
          if (parkSlot.vehicle === "Ô tô") {
            currentData[monthIndex].car =
              parseInt(currentData[monthIndex].car, 10) +
              parseInt(parkSlot.price, 10);
          } else if (parkSlot.vehicle === "Xe máy") {
            currentData[monthIndex].motor =
              parseInt(currentData[monthIndex].motor, 10) +
              parseInt(parkSlot.price, 10);
          } else if (parkSlot.vehicle === "Xe đạp") {
            currentData[monthIndex].bicycle =
              parseInt(currentData[monthIndex].bicycle, 10) +
              parseInt(parkSlot.price, 10);
          }
        }
        setDataVehicle(currentData);
        setIsLoading(false);
      } else {
        alert("Có lỗi");
      }
    } catch (error) {
      alert("Some thing wrong");
    }
  }
  useEffect(() => {
    getDataVehicle();
  }, []);
  useEffect(() => {
    if (!isLoading) {
      // Call getData again to update dataPark
      getDataVehicle();
    }
  }, [isLoading]);
  console.log(dataVehicle);
  return (
    <div>
      {dataVehicle && (
        <LineChart
          width={1000}
          height={300}
          data={dataVehicle}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="car"
            stroke="#8884d8"
            activeDot={{ r: 12 }}
          />
          <Line type="monotone" dataKey="motor" stroke="#82ca9d" />
          <Line type="monotone" dataKey="bicycle" stroke="#1394f0" />
        </LineChart>
      )}
      {isLoading && <IsLoading />}
    </div>
  );
};

export default ChartVehicle;
