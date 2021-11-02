import React, { useState, PureComponent } from "react";
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

const MyChart: React.FC = (props) => {
  const { sensorData } = props;
  const [state, setState] = useState({
    opacity: { sensor1: 1, sensor2: 1, sensor3: 1, sensor4: 1, sensor5: 1 },
    color: {
      sensor1: "#000000",
      sensor2: "#0000ff",
      sensor3: "#ff0000",
      sensor4: "#800080",
      sensor5: "#008000",
    },
  });

  const sensorNameMap = {
    sensor1: "0%",
    sensor2: "0.5%",
    sensor3: "1.5%",
    sensor4: "2.5%",
    sensor5: "3.5%",
  };

  const handleClick = (o: { dataKey: any }) => {
    const { dataKey } = o;
    const { opacity, color } = state;
    if (state.opacity[dataKey] === 1) {
      setState({
        opacity: { ...opacity, [dataKey]: 0 },
        color: { ...color },
      });
    } else {
      setState({
        opacity: { ...opacity, [dataKey]: 1 },
        color: { ...color },
      });
    }
  };
  const renderColorfulLegendText = (value: string, entry: any) => {
    const { color, dataKey } = entry;
    const css = {
      color: color,
      opacity: state.opacity[dataKey] ? 1 : 0.3,
    };
    return <span style={css}>{value}</span>;
  };

  return (
    <div style={{ textAlign: "center", width: "95%", height: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sensorData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            onClick={handleClick}
            formatter={renderColorfulLegendText}
          />
          {Reflect.ownKeys(state.opacity).map((key) => {
            return state.opacity[key] ? (
              <Line
                type="monotone"
                key={key.toString()}
                name={sensorNameMap[key.toString()]}
                dataKey={key.toString()}
                stroke={state.color[key] || "#82ca9d"}
                dot={false}
              />
            ) : (
              <Line
                display="none"
                type="monotone"
                key={key.toString()}
                name={sensorNameMap[key.toString()]}
                dataKey={key.toString()}
                stroke={state.color[key] || "#82ca9d"}
                dot={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MyChart;
