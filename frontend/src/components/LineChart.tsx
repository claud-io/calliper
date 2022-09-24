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

interface CustomLabelProps {
  x: number;
  y: number;
  stroke?: string;
  value: any;
}

interface LineChartProps {
  data: { date: string; value: number }[];
}

const CustomLabel = React.memo(({ x, y, stroke, value }: CustomLabelProps) => (
  <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
    {value}
  </text>
));

const LineChart = ({ data }: LineChartProps) => (
  <ResponsiveContainer minHeight={400} minWidth={500}>
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
        type="monotone"
        dataKey="value"
        stroke="#8884d8"
        {...{ labe: CustomLabel }}
      />
    </RCLineChart>
  </ResponsiveContainer>
);

export default LineChart;
