import { Card } from '@shtcut-ui/react';

const Stats = () => {
    const stats = [
        {
            data: '500K',
            title: 'Global paying customers'
        },
        {
            data: '200M',
            title: 'Links & QR Codes created monthly'
        },
        {
            data: '20B',
            title: 'Connections (clicks & scans) monthly'
        }
    ];
    return (
        <section className="py-14 mt-5">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="max-w-2xl mt-5 mx-auto text-center">
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Experience the impact yourself, let results speak louder than our claims.
                    </h3>
                    <p className="mt-3">
                        Experience the tangible outcomes firsthand, allowing the actual results to speak volumes beyond
                        mere statements or claims.
                    </p>
                </div>
                <Card className="mt-10 w-full mb-10 mx-auto px-4 text-gray-600 md:px-8 bg-transparent">
                    <div className="mt-12 mb-10">
                        <ul className="flex flex-col items-center justify-center gap-y-10 sm:flex-row sm:flex-wrap lg:divide-x">
                            {stats.map((item, idx) => (
                                <li key={idx} className="text-center px-12 md:px-16">
                                    <h4 className="text-4xl text-blue-600 font-semibold">{item.data}</h4>
                                    <p className="mt-3 font-medium">{item.title}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default Stats;
