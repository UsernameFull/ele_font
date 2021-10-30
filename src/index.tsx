import {
  ChakraProvider,
  Heading,
  theme,
  useColorMode,
  Box,
  Image,
  Center,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import "./styles.css";

import DataBox from "./dataBox";
import TitleBar from "./titleBar";
import MyChart from "./myChart";
import GasInfo from "./gasInfo";
import SensorDataList from "./sensorDataList";
import Contral from "./Contral";

import imgURL from "./xiaohui.png";

const useTicker = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const intervalId = setInterval(() => {
      setTick(Math.floor(((Date.now() - start) / 1000) % 20));
    }, 100);
    return () => clearInterval(intervalId);
  }, []);
  return tick;
};

const App: React.FC = () => {
  const tickcount = useTicker();

  const [state, setState] = useState({
    sensorData: [
      {
        time: "12:00",
        sensor1: 100,
        sensor2: 100,
        sensor3: 100,
        sensor4: 100,
        sensor5: 100,
      },
    ],
    rate:[0,0,0,0,0,0]
  });

  const asyncFetch = () => {
    let nowTime = Math.floor(new Date().valueOf() / 1000) - 5;
    const gasList = ["sensor1", "sensor2", "sensor3", "sensor4", "sensor5"];
    let tmpRes = [];
    gasList.forEach((e) => {
      fetch("http://47.110.147.58:55556/api/getdata", {
        method: "POST",
        mode: "cors",
        headers: {
          "access-control-allow-credentials": "true",
          "access-control-allow-origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          starttime: nowTime - 240,
          endtime: nowTime,
          interval: 2,
          source: e,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          //时间戳转时分秒（北京时间）
          json.data.msg.map((e) => {
            e.time =
              8 +
              parseInt((e.time / 60 / 60) % 24) +
              ":" +
              parseInt((e.time / 60) % 60) +
              ":" +
              parseInt(e.time % 60);
          });
          json.data.msg[0].value = Math.max(
            ...json.data.msg.map((e) => e.value)
          );
          for (let i = 1; i < json.data.msg.length; i++) {
            if (json.data.msg[i].value === 0) {
              //避免有时候数据丢失，显示不连续
              json.data.msg[i].value = json.data.msg[i - 1].value;
            }
          }
          tmpRes.push(json.data.msg);
          if (tmpRes.length == 5) {
            let timeList = JSON.parse(JSON.stringify(tmpRes[0]));
            for (let i = 0; i < tmpRes[0].length; i++) {
              timeList[i].sensor1 = tmpRes[0][i].value;
              timeList[i].sensor2 = tmpRes[1][i].value;
              timeList[i].sensor3 = tmpRes[2][i].value;
              timeList[i].sensor4 = tmpRes[3][i].value;
              timeList[i].sensor5 = tmpRes[4][i].value;
            }
            setState({ ...state, sensorData: timeList });
          }
        })
        .catch((error) => {
          console.log("fetch data failed", error);
        });
    });
  };

  useEffect(() => {
    if (tickcount === 1) {
      asyncFetch();
    }
  }, [tickcount]);

  const getrate = ()=>{
    //
    fetch("http://47.110.147.58:55556/api/getrate",{
      method: "GET",
      mode: "cors",
      headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*",
        "Content-Type": "application/json",
      },
    })
    .then((response) => (response.json()))
    .then((rate) => (
      0//
    ))
    .catch()
    return 0
  }

  const sensorToGas = () => {
    let res = [0.62, 2, 1];
    const base = 18000;
    let curr = state.sensorData[state.sensorData.length - 1]["sensor1"];
    res[1] = (curr - base) * 0.002;
    res[2] = (curr - base) * 0.0001;
    return res;
  };

  const gasInfoData = [0.6, 200, 200];
  return (
    <Box justify="center" align="center">
      <TitleBar />
      <Center p={5}>
        <Image boxSize="75px" fit="contain" src={imgURL} alt="HUST.." />
        <Heading color="blue.500" size="2xl">Electronic Nose Sensor</Heading>
      </Center>
      <SensorDataList
        sensorData={state.sensorData[state.sensorData.length - 1]}
      />
      <MyChart sensorData={state.sensorData} />
      <GasInfo gasData={sensorToGas()} />
      <Contral/>
      {/* <DataBox sensorName="name1" ticker={tickcount} sensornum="sensor1" /> */}
      {/* <DataBox sensorName="name2" ticker={tickcount} sensornum="sensor2" /> */}
      {/* <DataBox sensorName="name3" ticker={tickcount} sensornum="sensor3" /> */}
      {/* <DataBox sensorName="name4" ticker={tickcount} sensornum="sensor3" /> */}
      {/* <DataBox sensorName="name5" ticker={tickcount} sensornum="sensor3" /> */}
      {/* <DataBox sensorName="name6" ticker={tickcount} sensornum="sensor3" /> */}
    </Box>
  );
};

const rootElement = document.getElementById("root");
render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  rootElement
);
