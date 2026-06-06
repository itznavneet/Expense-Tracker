"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface Props {
  income: number;
  expense: number;
}
export default function ExpenseChart({income, expense}: Props) {

  const data = [
  {
    name: "Income",
    amount: income,
  },
  {
    name: "Expense",
    amount: expense,
  },
];
  return (
    <div className="h-[300px]">

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="amount" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}