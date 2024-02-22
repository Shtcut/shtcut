import { NavLink } from '@shtcut/components';
import Image from 'next/image';

export const Hero = () => (
    <section>
        <div className="custom-screen py-10 text-gray-600">
            <div className="space-y-5 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl text-gray-800 font-poppins font-extrabold mx-auto sm:text-5xl">
                    URL Shorten-er, Survey Creation, Email Marketing and{' '}
                    <span className="text-[#2F64E9]">Social media management</span> - all in one place!
                </h1>
                <p className="max-w-xl mx-auto">Elevate your digital strategy starting today!</p>
                <div className="py-10 flex items-center justify-center gap-x-3 font-medium text-sm">
                    <NavLink href="#" className="items-center justify-end mt-6 space-y-6 md:flex md:mt-0">
                        Get Started
                    </NavLink>
                    <NavLink href="#">
                        <div className="float-left">
                            <Image src="play-button.svg" alt="play-button" width={60} height={60} />
                            <span>Watch Demo</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    </section>
);

export default Hero;
