"use client"

import AddTransactionModal from "@/components/AddTransactionModal";
import TransactionCard from "@/components/TransactionCard";
import { Button } from "@/components/ui/button";
import React from "react";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types/transaction";
import { toast } from "sonner";
import TransactionSkeleton from "@/components/TransactionSkeleton";

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

const handleDelete= async(id:string) => {
    try {
      const token= localStorage.getItem("token");
      await api.delete(`/transactions/${id}`, {headers: {Authorization: `Bearer ${token}`}});

      toast.success(
      "Transaction deleted"
    );
    fetchTransactions();
    } catch (error) {
       console.error(error);

    toast.error(
      "Failed to delete transaction"
    );

    }
  }

useEffect(() => {
  fetchTransactions();
}, []);
  
 if (loading) {
  return (
    <div>
      <TransactionSkeleton/>
    </div>
  );
}

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
      
        <div className="flex flex-col md:flex-row  space-y-2 md:space-x-2">
          <AddTransactionModal type="INCOME" onSuccess={fetchTransactions} />

          <AddTransactionModal type="EXPENSE" onSuccess={fetchTransactions} />
        </div>
      </div>
     
     {transactions.length==0 ? (
        <div className="flex flex-col items-center justify-center py-20">

    <h2 className="text-2xl font-semibold">
      No transactions yet
    </h2>

    <p className="text-muted-foreground mt-2">
      Add your first income or expense
      to start tracking finances.
    </p>

  </div>):(
           <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
  key={transaction.id}
  id={transaction.id}
  title={transaction.title}
  amount={transaction.amount}
  category={transaction.category}
  description={transaction.description}
  date={transaction.date}
  type={transaction.type}
  onDelete={handleDelete}
/>
        ))}
      </div>
        )}
    </div>
  );
}
