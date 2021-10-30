import {
  Box,
  Flex,
  Center,
  Square,
  Text,
  Image,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import axios from "axios";
// import fetch from "node-fetch";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const DataBox: React.FC = (props) => {
  const { ticker, sensorName, sensornum } = props;
  const asyncFetch = () => {
    // let nowTime = parseInt(new Date().valueOf() / 1000) - 5;
    let nowTime = 10000;
    fetch("http://47.110.147.58:55556/api/getdata", {
      method: "POST",
      mode: "cors",
      headers: {
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        starttime: 65530,
        endtime: 65560,
        interval: 2,
        source: "sensor1"
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.data.msg.map((e) => {
          e.time =
            8 +
            parseInt((e.time / 60 / 60) % 24) +
            ":" +
            parseInt((e.time / 60) % 60);
        });

        json.data.msg[0].value = Math.max(...json.data.msg.map((e) => e.value));
        for (let i = 1; i < json.data.msg.length; i++) {
          if (json.data.msg[i].value === 0) {
            json.data.msg[i].value = json.data.msg[i - 1].value;
          }
        }

      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  useEffect(() => {
    if (ticker === 1) {
      asyncFetch();
    }
  }, [ticker]);

  return (
    <Box maxW="m" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box>
        <Accordion width="100%" allowToggle fontSize="sm">
          <AccordionItem>
            <AccordionButton>
              <Box w="100%">
                <Flex align="mainbox">
                  <Box flex="2">
                    <Flex direction="column">
                      <Box borderBottomWidth="1px" flex="1">
                        <Text>{sensorName}</Text>
                      </Box>
                      <Box borderBottomWidth="1px" flex="1">
                        <Text>Box 2</Text>
                        <Text>Box 2</Text>
                        <Text>Box 2</Text>
                      </Box>
                      <Box flex="1">
                        <Text>Box 3</Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box flex="1" m="0 10px 0 10px">
                    <Text>Box 4</Text>
                  </Box>
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={1} w="100%" h="150px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 20,
                    left: -20,
                    bottom: 5
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Line
                    type="step"
                    dataKey="uv"
                    strokeWidth={3}
                    dot={false}
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Box>
  );
};

export default DataBox;
