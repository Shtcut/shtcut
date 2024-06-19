import { PieChart, Tooltip, Pie, Cell } from 'recharts';

export const DeviceStats = ({ analytics }) => {
    const COLORS = ['#0088FE', '#00C49F', ' #c84e89', '#FFBB28', '#FF8042'];
    
    return (
        <div className="w-full">
            <div className="rounded-xl border bg-white p-4">
                <div className={`flex flex-row gap-4 justify-center ${'lg:flex-row justify-center lg:gap-x-10'}`}>
                    {analytics?.map(({ device, visits }, index) => (
                        <div key={device} className="flex flex-col gap-2">
                            <div className="flex items-center gap-1">
                                <div
                                    style={{
                                        background: `${COLORS[index % COLORS.length]}`
                                    }}
                                    className="w-[8px] h-[8px] rounded-full"
                                />
                                <h3 className={`capitalize text-sm ${'lg:text-md'}`}>{device}</h3>
                            </div>
                            <h3 className={`font-semibold text-center `}>{visits}</h3>
                        </div>
                    ))}
                </div>
                <div className="mx-auto mt-6 w-full md:w-[300px] lg:w-[400px]">
                    {analytics?.length > 0 ? (
                        <PieChart width={400} height={250}>
                            <Tooltip cursor={{ stroke: 'red', strokeWidth: 2 }} />
                            <Pie dataKey="visits" data={analytics} cx="50%" cy="50%" innerRadius={40}>
                                {analytics?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    ) : (
                        <div className="my-6 flex justify-center">
                            <h3 className="text-center">No data available</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
