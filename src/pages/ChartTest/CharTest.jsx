import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     customer: 4000,
//     emp: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     customer: 3000,
//     emp: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     customer: 2000,
//     emp: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     customer: 2780,
//     emp: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     customer: 1890,
//     emp: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     customer: 2390,
//     emp: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     customer: 3490,
//     emp: 4300,
//     amt: 2100,
//   },
// ];

const data = [
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
    emp: 1000,
    customer: 500,
    amt: 12,
  },
];
const CharTest = ({ data }) => {
  return (
    <LineChart
      width={1000}
      height={300}
      data={data}
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
        dataKey="emp"
        stroke="#8884d8"
        activeDot={{ r: 12 }}
      />
      <Line type="monotone" dataKey="customer" stroke="#82ca9d" />
    </LineChart>
  );
};

export default CharTest;
