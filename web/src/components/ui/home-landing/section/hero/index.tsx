import { Badge, buttonVariants, cn } from '@shtcut-ui/react';

import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
    return (
        <section id="hero" className="flex w-full flex-col items-center justify-center gap-4 text-center pt-20">
            <header className="mt-10 flex flex-col items-center gap-4">
                <Badge className="shadow duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
                    ✨ Your Workspace, Perfected
                </Badge>

                <h1 className="mt-4 font-heading text-4xl font-bold duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2 [text-shadow:_0_4px_0_#e1e1e1] dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent dark:[text-shadow:none] md:text-7xl">
                    URL Shorten-er, Survey Creation, Email Marketing and{' '}
                    <span className="text-blue-600">Social media management </span>- all in one place!
                </h1>
                <h2 className="max-w-xl text-lg text-muted-foreground duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
                    Elevate your digital strategy starting today!
                </h2>
            </header>

            <div className="flex items-center gap-2 py-2 duration-500 ease-out animate-in fade-in-0 zoom-in-50 slide-in-from-bottom-1/2">
                <Link
                    href="/auth/sign-in"
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        ' bg-blue-600 font-semibold rounded-full shadow-lg transition-all duration-200 hover:ring-2 hover:ring-foreground hover:ring-offset-2 hover:ring-offset-background'
                    )}
                >
                    Get Started
                </Link>

                <div className="mt-5">
                    <Image src="/play-button.svg" alt="place button" width={70} height={70} />
                </div>
                <span className="text-blue-600 font-semibold">Watch Demo</span>
            </div>
        </section>
    );
};
