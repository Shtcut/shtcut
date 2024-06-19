export default function LinkSkeleton() {
    return (
      <li className="flex mb-4 items-center rounded-lg border-2 border-gray-50 bg-white p-3 shadow transition-all hover:shadow-md sm:p-4">
        <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-gray-200 lg:w-10 lg:h-10" />
        <div>
          <div className="mb-3 flex items-center space-x-2">
            <div className="h-5 w-28 animate-pulse rounded-md bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            <div className="h-5 w-20 animate-pulse rounded-md bg-gray-200" />
          </div>
          <div className="h-4 w-72 animate-pulse rounded-md bg-gray-200" />
        </div>
      </li>
    );
  }
  