interface SkeletonLoaderProps {
    width?: string;
    height?: string;
    count?: number;
}

const SkeletonPlaceholder = ({ width = '40px', height = '40px', count = 4 }: SkeletonLoaderProps) => {
    return (
        <div className="flex flex-col items-center gap-y-2">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    style={{ width: width, height: height }}
                    className={`relative  rounded-md overflow-hidden`}
                >
                    <div className="absolute inset-0 shadow-md bg-gray-200 "></div>
                    <div className="absolute inset-0 shadow-md  animate-blur bg-gray-200"></div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonPlaceholder;
