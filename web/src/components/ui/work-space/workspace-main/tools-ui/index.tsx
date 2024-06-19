import Image from 'next/image';
import React from 'react';

const ToolsUi = ({ handleSelectTools, toolsValues }: SolutionType) => {
    const tools = [
        {
            title: 'URL Shortner',
            others: [
                {
                    key: '',
                    img: '/workspace/bit.png',
                    name: 'Bitly'
                },
                {
                    key: '',
                    img: '/workspace/dub.png',
                    name: 'Dub'
                },
                {
                    key: '',
                    img: '/workspace/short.png',
                    name: 'Short.io'
                }
            ]
        },
        {
            title: 'Email Marketing',
            others: [
                {
                    key: '',
                    img: '/workspace/mailchimp.png',
                    name: 'Mailchimp'
                },
                {
                    key: '',
                    img: '/workspace/contact.png',
                    name: 'Constant Contact'
                }
            ]
        },
        {
            title: 'Social Media',
            others: [
                {
                    key: '',
                    img: '/workspace/insta.png',
                    name: 'Instagram'
                },
                {
                    key: '',
                    img: '/workspace/twitter.png',
                    name: 'Twitter'
                },
                {
                    key: '',
                    img: '/workspace/fb.png',
                    name: 'Facebook'
                },
                {
                    key: '',
                    img: '/workspace/tiktok.png',
                    name: 'Tiktok'
                }
            ]
        }
    ];
    return (
        <div>
            <section className="flex gap-y-4 flex-col cursor-pointer items-center">
                {tools.map((tool, index) => (
                    <div className="flex flex-col gap-y-2" key={index}>
                        <h1 className="text-[#433E3F] font-semibold text-sm text-center">{tool.title}</h1>
                        <div className="flex items-center flex-wrap justify-center gap-3">
                            {tool.others.map((tol, index) => (
                                <div
                                    className={`flex justify-center px-4 h-11 border-[#726C6C] rounded-md items-center gap-x-2 border`}
                                    key={index}
                                >
                                    <Image src={tol.img} width={24} height={24} alt={tol.name} />
                                    <p>{tol.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ToolsUi;
