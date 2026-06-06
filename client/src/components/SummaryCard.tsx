import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface SummaryCardProps {
    title: string;
    amount: number;
}

export default function SummaryCard({title, amount}: SummaryCardProps) {
    return (
        <Card className="hover:shadow-md transition">

      <CardHeader>
        <CardTitle>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-4xl font-bold">
          ₹{amount}
        </p>
      </CardContent>

    </Card>
    );
}