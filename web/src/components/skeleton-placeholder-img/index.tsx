/** @format */

const Skeleton = ({
  count = 1,
  width = "full",
  height = "4",
  className = "",
  circle = false,
}) => {
  const skeletons = Array(count).fill(0);

  return (
    <div className="w-full overflow-hidden">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gray-200 ${
            circle ? "rounded-full" : "rounded"
          } ${className} w-${width} h-${height}`}
          style={{ height: height }}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
