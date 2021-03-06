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
import { HashRouter as Router, BrowserRouter, Route, Link } from 'react-router-dom';
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
        ]
    });
    const [Rate, setRate] = useState({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        h:0,
        i:0,
        j:0
    })

    const asyncFetch = () => {
        let nowTime = Math.floor(new Date().valueOf() / 1000) - 5;
        const gasList = ["sensor1", "sensor2", "sensor3", "sensor4", "sensor5"];
        let tmpRes = new Map();
        gasList.forEach((e: String) => {
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
                    interval: 6,
                    source: e,
                }),
            })
                .then((response) => (response.json()))
                .then((json) => {
                    //???????????????????????????????????????
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
                            //?????????????????????????????????????????????
                            json.data.msg[i].value = json.data.msg[i - 1].value;
                        }
                    }
                    //   tmpRes[e]=json.data.msg;
                    tmpRes.set(e, json.data.msg)

                    if (tmpRes.size == 5) {
                        //   console.log(tmpRes);
                        let timeList = tmpRes.get("sensor1");
                        for (let i = 0; i < tmpRes.get("sensor1").length; i++) {
                            timeList[i].sensor1 = tmpRes.get("sensor1")[i].value;
                            timeList[i].sensor2 = tmpRes.get("sensor2")[i].value;
                            timeList[i].sensor3 = tmpRes.get("sensor3")[i].value;
                            timeList[i].sensor4 = tmpRes.get("sensor4")[i].value;
                            timeList[i].sensor5 = tmpRes.get("sensor5")[i].value;
                        }
                        console.log(timeList);
                        setState({ ...state, sensorData: timeList });
                    }
                })
                .catch((error) => {
                    console.log("fetch data failed", error);
                });
        });
    };

    const getrate = () => {
        fetch("http://47.110.147.58:55557/api/get", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => (response.json()))
            .then((rate) => {
                let tmp = JSON.parse(rate.shit);
                setRate({
                    a: tmp[0],
                    b: tmp[1],
                    c: tmp[2],
                    d: tmp[3],
                    e: tmp[4],
                    f: tmp[5],
                    h: tmp[6],
                    i: tmp[7],
                    j: tmp[8],
                })
            })
            .catch((error) => {
                console.log("getrate failed", error);
            })
    }

    useEffect(() => {
        if (tickcount === 1) {
            asyncFetch();
            getrate();
        }
    }, [tickcount]);


    const sensorToGas = () => {
        // console.log(state.rate);
        let res = [Rate.a, Rate.d, Rate.h];
        let curr = state.sensorData[state.sensorData.length - 1]["sensor1"];
        res[0] = res[0]+(curr - Rate.b) * Rate.c;
        res[1] = res[1]+(curr - Rate.e) * Rate.f;
        res[2] = res[2]+(curr - Rate.i) * Rate.j;
        return res;
    };

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
            {/* <Contral/> */}
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
        <Router>
            {/* <App /> */}
            <Route exact path="/" component={App} />
            <Route path="/back" component={Contral} />
        </Router>
    </ChakraProvider>,
    rootElement
);

