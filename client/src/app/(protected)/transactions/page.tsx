"use client"

import AddTransactionModal from "@/components/AddTransactionModal";
import TransactionCard from "@/components/TransactionCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";

export default function page() {

  const [transactions, setTransactions] =
  useState<Transaction[]>([]);

const [loading, setLoading] =
  useState(true);

  const fetchTransactions = async () => {
  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/transactions",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setTransactions(
      response.data.transactions
    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  fetchTransactions();
}, []);
  
 if (loading) {
  return (
    <div>
      Loading...
    </div>
  );
}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>

        <div className="space-x-2">
          <AddTransactionModal type="INCOME" onSuccess={fetchTransactions} />

          <AddTransactionModal type="EXPENSE" onSuccess={fetchTransactions} />
        </div>
      </div>
     
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
  key={transaction.id}
  title={transaction.title}
  amount={transaction.amount}
  category={transaction.category}
  description={transaction.description}
  date={transaction.date}
  type={transaction.type}
/>
        ))}
      </div>
    </div>
  );
}
