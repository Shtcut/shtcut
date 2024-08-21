import { Button, Card } from '@shtcut-ui/react';
import { Tag } from 'lucide-react';
import React from 'react';
import ActionsTag from './actions-tag';

const TagsScreen = () => {
    const tagsData = [
        { title: 'Dashboard', numberOfLinks: 2, color: '#0B7B69' },
        { title: 'Landing', numberOfLinks: 3, color: '#7F56D9' },
        { title: 'Links', numberOfLinks: 1, color: '#007AFF' },
        { title: 'QR Code', numberOfLinks: 3, color: '#FFCC00' }
    ];
    const hexToRgba = (hex, opacity) => {
        const rgb = parseInt(hex.slice(1), 16);
        const r = (rgb >> 16) & 255;
        const g = (rgb >> 8) & 255;
        const b = rgb & 255;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };
    return (
        <div>
            <section className="flex justify-between gap-8 items-center w-full">
                <section className="h-12 flex w-full items-center px-4 border border-[#e3e3e3] bg-[#f7f7f7] rounded-[4px]">
                    <h3 className="font-semibold text-sm">Profile</h3>
                </section>
                <Button className="text-xs h-8 rounded bg-primary-0">Add Tags</Button>
            </section>
            <section>
                <Card className="shadow-none mt-4 rounded-[4px]">
                    {tagsData.map((tag) => (
                        <section className="flex border-b p-4 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    style={{ backgroundColor: hexToRgba(tag.color, 0.05), borderColor: tag.color }}
                                    className={` border rounded  w-6 h-6 flex justify-center items-center`}
                                >
                                    <Tag size={14} color={tag.color} />
                                </div>
                                <p className="text-xs font-medium">{tag.title}</p>
                            </div>
                            <section className='flex items-center gap-2'>
                                <div
                                    className="
                                bg-[#F9FAFB] border border-[#E6E7EB] w-14 h-6 flex items-center justify-center rounded-[4px]"
                                >
                                    <p className="text-xs">{tag.numberOfLinks} Links</p>
                                </div>
                                <ActionsTag />
                            </section>
                        </section>
                    ))}
                </Card>
            </section>
        </div>
    );
};

export default TagsScreen;
