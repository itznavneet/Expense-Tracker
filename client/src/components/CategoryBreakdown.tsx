import { Progress } from "./ui/progress"


interface Props{
    data:{
        category: string;
        _sum: {
            amount: number | null;
        }
    }[];
}
export default function CategoryBreakdown({data}: Props) {

    const maxAmount= Math.max(...data.map((item) => item._sum.amount || 0),1);

    const sortedData = [...data].sort(
  (a, b) =>
    (b._sum.amount || 0) -
    (a._sum.amount || 0)
);

  return (
     <div className="space-y-6">

      {sortedData.map((item) => {

        const amount =
          item._sum.amount || 0;

        const percentage =
          (amount / maxAmount) * 100;

        return (
          <div
            key={item.category}
            className="space-y-2"
          >

            <div className="flex justify-between">

              <span className="font-medium">
                {item.category}
              </span>

              <span>
                ₹{amount.toLocaleString("en-IN")}
              </span>

            </div>

            <Progress
              value={percentage}
            />

          </div>
        );
      })}

    </div>
  )
}
