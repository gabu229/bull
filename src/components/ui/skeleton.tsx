import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function PageSkeleton() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 p-4">
      <Skeleton className="h-14 w-9/12" />
      <Skeleton className="h-32 w-full" />
      <div className="w-full flex gap-4">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
      <div className="w-full flex gap-4">
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
}

function TableSkeleton({
  rows = 3,
  cols = 1,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-4">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="rounded-none h-10 w-full" />
        ))}
      </div>
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex gap-4">
          {[...Array(cols)].map((_, i) => (
            <Skeleton key={i} className="rounded-none h-20 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="w-full p-4 space-y-4 border rounded-lg">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

function SectionSkeleton() {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="h-8 w-1/3" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function GraphSkeleton() {
  return (
    <div className="w-full h-64 p-4 space-y-4 border rounded-lg">
      <Skeleton className="h-6 w-1/3" />
      <Skeleton className="h-40 w-full" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/5" />
        <Skeleton className="h-4 w-1/5" />
      </div>
    </div>
  );
}

function ListSkeleton() {
  return (
    <div className="w-full space-y-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="w-full space-y-8">
      <Skeleton className="h-10 w-1/4" />

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div> */}

      <GraphSkeleton />

      <TableSkeleton />
    </div>
  );
}

export {
  Skeleton,
  PageSkeleton,
  TableSkeleton,
  CardSkeleton,
  SectionSkeleton,
  GraphSkeleton,
  ListSkeleton,
  DashboardSkeleton,
};
