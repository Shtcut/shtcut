import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Link from 'next/link';
import { FaGithub, FaMapMarkedAlt } from 'react-icons/fa';

export const OSS = () => {
    return (
        <AnimatedContainer className="w-full p-4 backdrop-blur">
            <div className="mx-auto max-w-md text-center sm:max-w-xl">
                <h2 className="text-3xl text-shade-gradient font-extrabold leading-tight text-transparent sm:text-4xl sm:leading-tight">
                    Proudly <span className="text-stratos-gradient">open-source</span>
                </h2>
                <p className="mt-5 text-shade-pencil-light sm:text-lg">
                    Explore, contribute, audit, or host our source code on GitHub. It`s all open for you!
                </p>
            </div>
            <div className="flex items-center justify-center py-10">
                <Link
                    href={'https://github.com/Shtcut/shtcut/issues'}
                    target="_blank"
                    rel="noreferrer"
                    className="mx-2"
                >
                    <div className="flex items-center">
                        <div className="flex h-10 items-center space-x-2 rounded-md border  bg-blue-600 p-4">
                            <FaMapMarkedAlt className="h-5 w-5 text-white" />
                            <p className="font-medium text-white">View our roadmap</p>
                        </div>
                    </div>
                </Link>
                <Link href="https://github.com/Shtcut/shtcut" target="_blank" rel="noreferrer" className="mx-2">
                    <div className="flex items-center">
                        <div className="flex h-10 items-center space-x-2 rounded-md border bg-black p-4">
                            <FaGithub className="h-5 w-5 text-white" />
                            <p className="font-medium text-white">Star on Github</p>
                        </div>
                    </div>
                </Link>
            </div>
        </AnimatedContainer>
    );
};
