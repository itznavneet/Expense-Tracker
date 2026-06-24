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
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import {
  TransactionFormData,
  TransactionSchema,
} from "@/lib/validators/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";

interface Props {
  type: "INCOME" | "EXPENSE";
  onSuccess?: () => void;
}

export default function AddTransactionModal({ type, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

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

 const form = useForm({
  resolver: zodResolver(TransactionSchema),

  defaultValues: {
    title: "",
    amount: 0,
    category: "",
    description: "",
    date: "",
  },
});

  const handleSave = async (values: TransactionFormData) => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/transactions",
        {
          ...values,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Transaction added successfully");
      form.reset();
      setOpen(false);

      onSuccess?.();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={type === "INCOME" ? "default" : "outline"}>
          + Add {type}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add {type}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>

                  <Input placeholder="Title" {...field} />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

           <Controller
  name="amount"
  control={form.control}
  defaultValue={0}
  render={({ field, fieldState }) => (
    <Field>
      <FieldLabel>Amount</FieldLabel>

      <Input
        type="number"
        value={field.value}
        onChange={(e) =>
          field.onChange(
            Number(e.target.value)
          )
        }
      />

      {fieldState.error && (
        <FieldError
          errors={[fieldState.error]}
        />
      )}
    </Field>
  )}
/>
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
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
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>

                  <Input placeholder="Description" {...field} />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Date</FieldLabel>

                  <Input type="date" {...field} />

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
