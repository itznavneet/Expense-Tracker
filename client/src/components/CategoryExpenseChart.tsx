"use client"

import { Bar, XAxis, YAxis, BarChart, ResponsiveContainer } from "recharts"

interface Props{
    data:{
        category: string;
        _sum: {
            amount: number | null;
        }
    }[];
}

export default function CategoryExpenseChart({data}: Props) {

const chartData = data.map((item) => ({
    category: item.category,
    amount: item._sum.amount || 0,
}))

  return (
      <div className="h-[350px]">

      <ResponsiveContainer>

        <BarChart
          data={chartData}
          layout="vertical"
        >

          <XAxis type="number" />

          <YAxis
            type="category"
            dataKey="category"
          />

          <Bar dataKey="amount" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}
