"use client";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

interface TransactionCardProps {
  id:string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description?: string;
  date: string;
  onDelete?: (id: string) => void
}

export default function TransactionCard({
  id,
  title,
  amount,
  type,
  category,
  description,
  date,
  onDelete
}: TransactionCardProps) {

  
 
  return (
    <Card className="p-4">

  <div className="flex justify-between">

    <div>

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground">
        {category}
      </p>

      {description && (
        <p className="text-sm mt-2">
          {description}
        </p>
      )}

      <p className="text-xs text-muted-foreground mt-2">
        {new Date(date).toLocaleDateString()}
      </p>

    </div>

    <div className="text-right">

  <p
    className={`font-bold text-lg ${
      type === "INCOME"
        ? "text-green-600"
        : "text-red-600"
    }`}
  >
    ₹{amount}
  </p>

  <span className="text-xs">
    {type}
  </span>

</div>

<button
  onClick={() => onDelete?.(id)}
  className="text-red-500 hover:text-red-700"
>
  <Trash2 size={18} />
</button>

  </div>

</Card>
  );
}