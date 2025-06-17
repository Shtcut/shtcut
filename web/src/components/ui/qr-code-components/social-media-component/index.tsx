import React, { useEffect, useState } from 'react';
import { Card, Input, Label } from '@shtcut-ui/react';
import { Minus, Plus, X } from 'lucide-react';
import SocialMediaCard from '../multi-link-components/social-network-card';
import { setSocialLinks } from '@shtcut/redux/slices/selects';
import { useAppDispatch } from '@shtcut/redux/store';

type SocialNetwork = {
    id: string;
    name: string;
    logoUrl: string;
};

type SocialNetworksCardProps = {
    logos: SocialNetwork[];
    showSection: boolean;
    toggleSection: () => void;
    defaultLinks: Record<string, string>;
};

const SocialNetworksCard: React.FC<SocialNetworksCardProps> = ({ logos, showSection, toggleSection, defaultLinks }) => {
    const [socialMedia, setSocialMedia] = useState<Record<string, string>>(() => {
        const formatted = Object.entries(defaultLinks || {})
            .filter(([, value]) => value)
            .reduce(
                (acc, [name, value]) => {
                    const network = logos.find((logo) => logo.name.toLowerCase() === name.toLowerCase());
                    if (network) {
                        acc[network.id] = value;
                    }
                    return acc;
                },
                {} as Record<string, string>
            );

        return formatted;
    });

    const [joinedLink, setJoinedLink] = useState<Record<string, string>>({});
    const dispatch = useAppDispatch();

    const handleSelect = (id: string) => {
        setSocialMedia((prev) => ({
            ...prev,
            [id]: prev[id] ? '' : ''
        }));
    };

    const handleInputChange = (id: string, value: string) => {
        setSocialMedia((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    useEffect(() => {
        const formatted = Object.entries(socialMedia)
            .filter(([, value]) => value)
            .reduce(
                (acc, [id, value]) => {
                    const networkName = logos.find((logo) => logo.id === id)?.name.toLowerCase();
                    if (networkName) {
                        acc[networkName] = value;
                    }
                    return acc;
                },
                {} as Record<string, string>
            );

        setJoinedLink(formatted);
    }, [socialMedia, logos]);

    const handleRemove = (id: string) => {
        setSocialMedia((prev) => {
            const updated = { ...prev };
            delete updated[id];
            return updated;
        });
    };

    useEffect(() => {
        dispatch(setSocialLinks(joinedLink));
    }, [joinedLink]);

    return (
        <Card className="shadow-sm mt-4 py-4 px-6 border border-gray-100">
            <section className="flex justify-between items-center">
                <Label>Social Networks</Label>
                {showSection ? (
                    <Minus onClick={toggleSection} className="cursor-pointer" />
                ) : (
                    <Plus onClick={toggleSection} className="cursor-pointer" />
                )}
            </section>
            {showSection && (
                <section>
                    <section className={`flex flex-wrap gap-2 mt-4  pb-4 ${socialMedia ? 'border-b' : ''} `}>
                        {logos.map((data) => (
                            <div key={data.id}>
                                <SocialMediaCard
                                    logoUrl={data.logoUrl}
                                    title={data.name}
                                    isActive={socialMedia[data?.id] !== undefined}
                                    onClick={() => handleSelect(data?.id)}
                                />
                            </div>
                        ))}
                    </section>
                    <section className="mt-4">
                        {Object.entries(socialMedia).map(([id, value]) => {
                            const network = logos.find((logo) => logo.id === id);
                            if (!network) return null;
                            return (
                                <div key={id} className="mb-4 flex items-center  gap-2">
                                    <Label className="">{network.name}</Label>:
                                    <Input
                                        placeholder={`${network.name} link`}
                                        type="url"
                                        value={value || ''}
                                        onChange={(e) => handleInputChange(id, e.target.value)}
                                        className="w-full"
                                    />
                                    <X
                                        className="cursor-pointer text-gray-500 "
                                        onClick={() => handleRemove(id)}
                                        size={16}
                                    />
                                </div>
                            );
                        })}
                    </section>
                </section>
            )}
        </Card>
    );
};

export default SocialNetworksCard;
