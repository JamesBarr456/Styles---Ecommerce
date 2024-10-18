import { Skeleton } from "../ui/skeleton";

export const GridProductsSkeleton = () => {
  return (
    <section className="flex flex-col px-3 gap-6 w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </section>
  );
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-md" />
        </div>
        <Skeleton className="h-48 w-full rounded-md" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between space-x-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}
