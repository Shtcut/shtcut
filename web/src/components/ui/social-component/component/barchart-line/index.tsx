import { Card } from '@shtcut-ui/react';
import React from 'react';
import Chart from 'react-apexcharts';

const BasicLine = ({ headerTitle }: { headerTitle: string }) => {
    const data = [
        {
            name: 'Media',
            data: [2000, 3000, 4000, 3000, 4500, 3000] 
        }
    ];

    return (
        <Card className='shadow-sm'>
            <p className="p-4 text-sm font-semibold">{headerTitle}</p>
            <Chart
                options={{
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3
                    },
                    colors: ['#00BFFF'],
                    xaxis: {
                        categories: ['Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22', 'Dec 23']
                    },
                    yaxis: {
                        min: 2000, 
                        max: 6000, 
                        labels: {
                            formatter: (val: number) => `$${val.toLocaleString()}`
                        },
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: (val: number) => `$ ${val.toLocaleString()}`
                        }
                    }
                }}
                series={data}
                height={300}
            />
        </Card>
    );
};

export default BasicLine;
