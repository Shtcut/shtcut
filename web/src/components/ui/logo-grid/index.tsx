import Image from 'next/image';

const logos = [
    {
        src: './unsplash.svg',
        alt: 'unsplash'
    },
    {
        src: './intercom.svg',
        alt: 'unsplash'
    },
    {
        src: './notion.svg',
        alt: 'unsplash'
    },
    {
        src: './grammerly.svg',
        alt: 'unsplash'
    }
];

type LogoGridProps = {
    text?: string;
    logos?: { src: string; alt: string }[];
};
const LogoGrid = (props?: LogoGridProps) => {
    const gridLogos = props?.logos ?? logos;
    return (
        <div>
            <div className="custom-screen">
                <h2 className="font-semibold text-sm text-gray-50 text-center">
                    {props?.text ? props.text : 'More than 25,000 Brands use SHTCUT'}
                </h2>
            </div>
            <div className="mt-6">
                <ul className="flex gap-x-10 gap-y-6 flex-wrap items-center justify-center md:gap-x-16">
                    {gridLogos.map((item, idx) => (
                        <li key={`${item.src}-${idx}`}>
                            <Image src={item.src} alt={item.src} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LogoGrid;
