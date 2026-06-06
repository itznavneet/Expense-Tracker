import { Card } from "@/components/ui/card";

interface TransactionCardProps {
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  description?: string;
  date: string;
}

export default function TransactionCard({
  title,
  amount,
  type,
  category,
  description,
  date
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

  </div>

</Card>
  );
}