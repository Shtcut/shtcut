import { postData_3 } from '@shtcut/_shared/data';
import AnimatedContainer from '@shtcut/components/framer/animate-div';
import Image from 'next/image';
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@shtcut-ui/react';
import { useRouter } from 'next/navigation';

const BlogIdComponent = ({ paramsId }: { paramsId: string | undefined }) => {
    const router = useRouter();
    const post = postData_3.find((post) => post.id === paramsId);

    if (!post) {
        return <p className="pt-24">Post not found.</p>;
    }

    return (
        <div className="py-24">
            <div className="max-w-screen-custom mx-auto px-4">
                <Button variant={'unstyled'} className="flex p-0 items-center gap-3" onClick={() => router.back()}>
                    <div className="rounded-full w-10 h-10 flex justify-center bg-primary-0 items-center">
                        <ArrowLeft color="white" size={18} />
                    </div>
                    Back
                </Button>
                <AnimatedContainer className="flex flex-col gap-y-4 mt-6">
                    <h1 className="text-primary-0 font-semibold">Blog</h1>
                    <div className="lg:w-2/3 w-full flex flex-col gap-4">
                        <h1 className="font-semibold text-2xl md:text-4xl ">{post.title}</h1>
                        <p className="text-[#726C6C]">{post.text}</p>
                    </div>
                </AnimatedContainer>
                <AnimatedContainer className="my-[34px]">
                    <Image
                        width={0}
                        height={362}
                        src={post.images}
                        alt={post.title}
                        className="w-full object-cover h-[362px]"
                        sizes="100vw"
                        loading="eager"
                    />
                    <div className="flex md:flex-row flex-col gap-7 md:gap-0 mt-11 md:justify-between w-full">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-2xl">Eu ridiculus fringilla aenean</h2>
                            <p className="text-sm mt-6">
                                Eget aenean tellus venenatis. Donec odio tempus. Felis arcu pretium metus nullam quam
                                aenean sociis quis sem neque vici libero. Venenatis nullam fringilla pretium magnis
                                aliquam nunc vulputate integer augue ultricies cras. Eget viverra feugiat cras ut. Sit
                                natoque montes tempus ligula eget vitae pede rhoncus maecenas consectetuer commodo
                                condimentum aenean.
                            </p>
                            <Image
                                width={0}
                                height={240}
                                src={post.images}
                                alt={post.title}
                                className="w-full md:w-2/3 object-fill mt-2 h-[240px]"
                                sizes="100vw"
                                loading="eager"
                            />
                            <p className="mt-4 text-sm">
                                Amet tempus viverra ut libero nascetur id veni ridiculus rhoncus. Dis donec cras
                                ultricies. Eros vivamus enim nec nulla semper imperdiet aenean montes dictum porttitor
                                metus.
                            </p>
                            <Image
                                width={0}
                                height={240}
                                src={post.images}
                                alt={post.title}
                                className="w-full md:w-2/3 object-fill mt-7 h-[240px]"
                                sizes="100vw"
                                loading="eager"
                            />
                            <p className="pt-4 text-sm">
                                Ut eu sem aenean imperdiet. Hendrerit penatibus sem adipiscing aliquet consequat nec
                                orci nascetur.
                            </p>
                            <p className="text-sm">
                                Etiam massa quam dolor aenean maecenas sociis tellus consectetuer. In sit donec massa
                                integer nisi mus viverra odio ultricies ridiculus. Sapien sem lorem. Aenean sem
                                venenatis arcu tellus fringilla vulputate quis vici nullam nec. Cum quam veni lorem elit
                                aliquet pede in enim. Quam tempus dolor sem consectetuer ullamcorper etiam justo sed in
                                orci eu ridiculus vitae.
                            </p>
                            <div className="px-4 mt-6">
                                {[1, 2, 3, 4, 5].map((data) => (
                                    <ul key={data} className="list-disc text-sm ">
                                        <li>Mollis lorem vitae varius.</li>
                                    </ul>
                                ))}
                            </div>
                            <p className="text-sm mt-3">
                                Enim dapibus ante sapien eleifend dis vulputate quis viverra ultricies vitae eros. Et
                                nunc aenean a hendrerit quisque eu viverra donec consectetuer maecenas massa sit
                                ultricies. Tellus ante quis vici elementum etiam.
                            </p>
                        </div>
                        <div className=" md:mx-auto ">
                            <h1 className="font-bold text-2xl">Quick nav</h1>
                            <div className="mt-6">
                                <div className="flex flex-col gap-4">
                                    <h3 className="text-sm text-[#60646c]">Introduction</h3>
                                    <div>
                                        <ul className="text-sm list-decimal pl-10 flex flex-col gap-3 text-[#60646c]">
                                            <li>What is Shtcut</li>
                                            <li>Shorten Links</li>
                                            <li>Export QR Code</li>
                                            <li>Start building</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-[#60646c]">Customizing your theme</h3>
                                        <div className="mt-4 flex flex-col gap-3 pl-6">
                                            <p className="text-sm text-[#60646c]">Basic configuration</p>
                                            <p className="text-sm text-[#60646c]">Using the theme panel</p>
                                            <p className="text-sm text-[#60646c]">Take it further</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedContainer>
            </div>
        </div>
    );
};

export default BlogIdComponent;
