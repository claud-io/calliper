import React from "react";
import {
  LineChart as RCLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { item } from "../types";

interface CustomLabelProps {
  x: number;
  y: number;
  stroke?: string;
  index: number;
}

interface LineChartProps {
  data: item[];
}

const LineChart = ({ data }: LineChartProps) => {
  const CustomLabel = ({ x, y, stroke, index }: CustomLabelProps) => (
    <text x={x} y={y} dy={-7} fill={stroke} fontSize={10} textAnchor="middle">
      {data[index].commentsCount}
    </text>
  );

  return (
    <ResponsiveContainer minHeight={400} minWidth={400}>
      <RCLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          domain={["auto", "auto"]}
          name="Time"
          tickFormatter={(unixTime) => dayjs(unixTime).format("DD-MM-YY")}
          type="number"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          // @ts-ignore
          label={<CustomLabel />}
        />
      </RCLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
