import { Avatar, AvatarFallback, AvatarImage, CardContent, CardDescription, CardTitle, cn } from '@shtcut-ui/react';
import { USERS } from '@shtcut/_shared/constant';

export const Testimonial = () => {
    return (
        <section id="testimonials" className="container">
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
                <h2 className="font-heading text-3xl drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent sm:text-3xl md:text-6xl">
                    Trusted by all
                </h2>

                <p className="max-w-[85%] text-muted-foreground sm:text-lg">
                    Join thousands of satisfied users who rely on our platform for their personal and professional
                    productivity needs.
                </p>
            </div>

            <div
                className={cn(
                    'relative  flex flex-col overflow-hidden pb-10 md:mx-0',
                    'before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-background md:before:w-72',
                    'after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-background md:after:w-72'
                )}
            >
                {[...Array(2)].map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'mt-10 flex flex-nowrap gap-6 self-start',
                            {
                                'flex-row-reverse': i === 1,
                                'animate-[slide_250s_linear_infinite]': true,
                                'animate-[slide_250s_linear_infinite_reverse]': i === 1,
                                'ml-[100vw]': i === 1
                            },
                            'hover:paused'
                        )}
                    >
                        {USERS.map(({ name, message }, i) => (
                            <div
                                key={name}
                                className="w-[28rem] shrink-0 p-6 border rounded-xl duration-300 hover:shadow-md dark:bg-gradient-to-br dark:from-border/50 dark:to-background"
                            >
                                <div>
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={`/placeholders/avatar-${i + 1}.png`}
                                                alt={`Avatar of ${name}`}
                                                loading="lazy"
                                            />
                                            <AvatarFallback>{name.slice(0, 1).toUpperCase()}</AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <CardTitle className="drop-shadow-2xl">{name}</CardTitle>
                                            <CardDescription>@{name.toLocaleLowerCase()}</CardDescription>
                                        </div>
                                    </div>
                                </div>

                                <CardContent>
                                    <p className="text-[15px] leading-5">{message}</p>
                                </CardContent>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};
