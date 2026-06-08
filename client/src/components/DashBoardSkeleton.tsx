import { Skeleton } from "@/components/ui/skeleton";

export default function DashBoardSkeleton() {
  return (
    <div className="space-y-6">

      <div className="grid md:grid-cols-3 gap-4">

        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />

      </div>

      <Skeleton className="h-[300px] w-full" />

      <Skeleton className="h-[250px] w-full" />

    </div>
  )
}
