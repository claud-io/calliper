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
  DotProps,
} from "recharts";
import dayjs from "dayjs";
import { Item } from "../types";

interface CustomLabelProps {
  x: number;
  y: number;
  stroke?: string;
  index: number;
}

interface LineChartProps {
  data: Item[];
  onItemClick: (itemId?: number) => void;
}

const LineChart = ({ data, onItemClick }: LineChartProps) => {
  const CustomLabel = ({ x, y, stroke, index }: CustomLabelProps) => (
    <text x={x} y={y} dy={-7} fill={stroke} fontSize={10} textAnchor="middle">
      {data[index].commentsCount}
    </text>
  );

  const handleItemClick = (e: any, props: any) =>
    onItemClick(props?.payload?.id);

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
        <Tooltip
          labelFormatter={(value) => dayjs(value).format("DD-MM-YY HH:mm:ss")}
        />
        <Legend />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ onClick: handleItemClick }}
          // @ts-ignore
          label={<CustomLabel />}
        />
      </RCLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
