"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import api from "@/lib/api";
import axios from "axios";

interface Props {
  type: "INCOME" | "EXPENSE";
  onSuccess?: () => void;
}

export default function AddTransactionModal({ type, onSuccess }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const incomeCategories = [
    "Salary",
    "Freelance",
    "Business",
    "Investment",
    "Other",
  ];

  const expenseCategories = [
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  const categories = type === "INCOME" ? incomeCategories : expenseCategories;

 const handleSave = async () => {
  try {

    const token =
      localStorage.getItem("token");

    const response =
      await api.post(
        "/transactions",
        {
          title,
          amount: Number(amount),
          category,
          description,
          date,
          type,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
      onSuccess?.();

    console.log(
      "Created",
      response.data
    );

  } catch (error) {
    console.error(error);
  }

  setTitle("");
setAmount("");
setCategory("");
setDescription("");
setDate("");
  
};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={type === "INCOME" ? "default" : "outline"}>
          Add {type}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Button className="w-full" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
