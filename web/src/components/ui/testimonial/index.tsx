import { Card } from '@shtcut-ui/react';
import Image from 'next/image';

const Testimonial = () => {
    const testimonials = [
        {
            avatar: '/testmonial-1.svg',
            name: 'Martin escobar',
            title: 'Founder of meta',
            quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae.'
        },
        {
            avatar: '/testmonial-2.svg',
            name: 'Angela stian',
            title: 'Product designer',
            quote: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
        },
        {
            avatar: '/testmonial-3.svg',
            name: 'Karim ahmed',
            title: 'DevOp engineer',
            quote: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.'
        }
    ];

    return (
        <section className="relative py-14">
            <div className="relative z-10 max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-xl sm:text-center md:mx-auto">
                    <span className="text-blue-600 font-medium">TESTIMONIALS</span>
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">What our clients say about us.</h3>
                    <p className="mt-3 text-gray-800">
                        Over 50 million users us SHTCUT to understand their businesses, brands and customers better.
                    </p>
                </div>
                <div className="mt-12 mb-10">
                    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((item, idx) => (
                            <Card key={idx} className="bg-white p-4 w-full">
                                <li>
                                    <figure>
                                        <div className="flex items-center justify-center">
                                            <div className="text-center">
                                                <Image
                                                    src={item.avatar}
                                                    alt={item.name}
                                                    className="mx-auto mb-4 mt-10 items-center rounded-full"
                                                    width={150}
                                                    height={150}
                                                />
                                                <p className="text-lg font-poppins px-4 text-gray-600 font-normal">{item.quote}</p>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-2xl pt-5">⭐⭐⭐⭐⭐</span>
                                                </div>
                                                <div className="mt-5 mb-10">
                                                    <span className="block font-poppins text-blue-600 font-semibold">
                                                        {item.name}
                                                    </span>
                                                    <span className="block pt-5 text-black font-poppins font-bold text-sm mt-0.5">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </figure>
                                </li>
                            </Card>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Testimonial;
