import { Card } from '@shtcut-ui/react';
import { ImageComponent } from '@shtcut/components/imageComponent';
import { Link } from 'lucide-react';
import React from 'react';

const TemplateCard = ({
    color,
    image,
    label,
    presetColor
}: {
    color: string;
    label: string;
    image: string;
    presetColor?: string | undefined;
}) => {
    return (
        <Card className="w-full flex items-center gap-4 h-16 px-4 shadow-sm " style={{ backgroundColor: color }}>
            {image ? (
                <section className="  ">
                    <ImageComponent
                        src={image}
                        alt={label}
                        width={0}
                        height={0}
                        className="rounded-md w-14 object-contain h-14"
                        unoptimized
                        priority
                    />
                </section>
            ) : (
                <Link size={15} color={presetColor} />
            )}
            <p className="text-sm ">{label}</p>
        </Card>
    );
};

export default TemplateCard;
