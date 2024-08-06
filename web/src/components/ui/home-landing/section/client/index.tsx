import Brands from '@shtcut/components/brand';
import AnimatedContainer from '@shtcut/components/framer/animate-div';

export const Clients = () => {
    return (
        <section id="clients" className="max-w-screen-custom mx-auto px-4 mt-14">
            <AnimatedContainer>
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <h2 className=" w-full md:w-[340px] drop-shadow-xl dark:bg-gradient-to-br dark:from-neutral-200 dark:to-neutral-600 dark:bg-clip-text dark:text-transparent ">
                        <span className="text-primary-0">Trusted</span> by fast-growing companies around the world
                    </h2>
                </div>
                <Brands />
            </AnimatedContainer>
        </section>
    );
};
