import { buttonVariants, cn } from '@shtcut-ui/react';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import Link from 'next/link';

export const ShortenerSection = () => {
    const features = [
        {
            name: 'Publishing',
            desc: 'Effortlessly streamline your link strategy with our intuitive links Manager. Simplify publishing and enhance collaboration seamlessly.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                    />
                </svg>
            )
        },
        {
            name: 'Analytics',
            desc: 'Get valuable insights and performance metrics for optimizing strategies.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                </svg>
            )
        },
        {
            name: 'Engagement',
            desc: 'Boost interaction and track performance effortlessly. Elevate engagement with streamlined link strategies.',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                </svg>
            )
        }
    ];

    return (
        <AnimatedContainer className="relative max-w-screen-xl mx-auto md:px-2">
            <div className="relative z-10 gap-5 items-center lg:flex">
                <div className="flex-1 max-w-lg py-5 sm:mx-auto sm:text-center lg:max-w-max lg:text-left">
                    <span className="text-blue-600 font-heading font-medium">URL Shortener</span>
                    <p className="text-black w-96 font-heading font-bold leading-relaxed mt-3 md:text-3xl">
                        Generate short URLs with just a click
                    </p>
                    <div className="mt-10">
                        <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
                            {features.map((item, idx) => (
                                <li key={idx} className="flex gap-x-3">
                                    <div className="flex-none w-12 h-12 rounded-none bg-blue-50 text-blue-600 flex items-center justify-center">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-poppins text-gray-800 font-medium">{item.name}</h4>
                                        <p className="text-gray-600 font-poppins mt-2 md:text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex-1 mt-2 mx-auto sm:w-9/12 lg:mt-0 lg:w-auto">
                    {/* <Image src="/shortener-1.svg" className="w-full" alt="" width={500} height={500} /> */}
                    <Image src="/marketing-section.svg" className="w-full" alt="" width={500} height={500} />
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 duration-500" style={{ display: 'none' }}>
                <Link
                    href="/auth/login"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        ' bg-blue-600 font-semibold rounded-full shadow-lg transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                    )}
                >
                    Get Started
                </Link>
            </div>
        </AnimatedContainer>
    );
};
