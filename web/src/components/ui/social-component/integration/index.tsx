import React from 'react';
import { Button, Card } from '@shtcut-ui/react';
import Image from 'next/image';
const IntergrationComponent = () => {
    const data = [
        {
            image: '/sales-force.png',
            title: 'Salesforce'
        },
        {
            image: '/hubspot.png',
            title: 'Hubspot'
        },
        {
            image: '/zoho.png',
            title: 'Zoho'
        }
    ];
    return (
        <div>
            <div>
                <h1 className="font-semibold text-[#2B2829] text-xl">Customer relation management</h1>
                <p className="text-[#433E3F]">Manage your workflow and provide seamless customer experience</p>
            </div>
            <section className="flex flex-col gap-4 h-full mt-6">
                {data.map((item) => (
                    <Card className="flex items-center h-full p-4 gap-10">
                        <div className="w-52 h-40 p-2 bg-[#FAFAFA] flex flex-col justify-center rounded-md">
                            <Image
                                src={`/images${item.image}`}
                                width={0}
                                height={0}
                                unoptimized
                                priority
                                alt={item.title}
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <div className="w-4/5 h-full flex flex-col gap-2">
                            <h1 className="font-semibold  text-lg">{item.title}</h1>
                            <p className="text-sm p-0 m-0 ">
                                Lorem ipsum dolor sit amet consectetur. At convallis non gravida dignissim. Id a sit
                                pellentesq amet enim. Odio facilisi pellentesque amet nam sed sed scelerisque quis. In
                                justo luctus susp augue. At convallis non gravida dignissim. Id a sit Lorem ipsum dolor
                                sit amet consectetur.{' '}
                            </p>
                            <section className="flex mt-2 items-center gap-3">
                                <Button
                                    className={`w-44 bg-primary-0 ${item.image === '/sales-force.png' ? 'bg-[#0B7B69]' : ''}`}
                                >
                                    Connected
                                </Button>
                                <Button className="" variant={'outline'}>
                                    Learn More
                                </Button>
                            </section>
                        </div>
                    </Card>
                ))}
            </section>
        </div>
    );
};

export default IntergrationComponent;
