"use client";
import SummaryCard from "@/components/SummaryCard";
import ExpenseChart from "@/components/ExpenseChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardPage() {

  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });
  const[loading, setLoading]= useState(true);

  const fetchSummary = async() => {
    try {
      setLoading(true);
      const token =
      localStorage.getItem("token");
      const response = await api.get("dashboard/summary",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSummary(response.data.summary);
  }catch(error){
    console.error(error);
  }finally{
    setLoading(false);
  }
}

useEffect(() => {
  fetchSummary();
},[]);

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground">
          Track your finances
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <SummaryCard
          title="Income"
          amount={summary.income}
        />

        <SummaryCard
          title="Expense"
          amount={summary.expense}
        />

        <SummaryCard
          title="Balance"
          amount={summary.balance}
        />

      </div>

      <Card>
  <CardHeader>
    <CardTitle>
      Income vs Expense
    </CardTitle>
  </CardHeader>

  <CardContent>
    <ExpenseChart income={summary.income}
  expense={summary.expense}/>
  </CardContent>
</Card>
    </div>
  );
}