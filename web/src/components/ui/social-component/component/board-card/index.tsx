import { Button } from '@shtcut-ui/react';
import { Task } from '@shtcut/types/types';
import { Flag, FolderOpen } from 'lucide-react';
import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { BsChatSquareDots } from 'react-icons/bs';
import { IoIosMore } from 'react-icons/io';

interface BoardCardProps {
    provided: DraggableProvided;
    snapshot: DraggableStateSnapshot;
    item: Task;
}

const BoardCard: React.FC<BoardCardProps> = ({ provided, snapshot, item }) => {
    const avatarCount = 3;
    return (
        <div
            className={`bg-white transition-transform duration-200 ease-in-out hover:scale-95  p-4 rounded shadow-sm `}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                userSelect: 'none',

                backgroundColor: snapshot.isDragging ? '#F2F2F2' : 'white',
                ...provided.draggableProps.style
            }}
        >
            <section className="flex flex-wrap gap-2 items-center">
                <div className="bg-[#EBFAE2] w-fit px-2 py-1 rounded-sm">
                    <p className="text-[11px] text-[#4F9C20]">Marketing</p>
                </div>
                <div className="bg-[#6759E6] w-fit px-2 py-1 rounded-sm">
                    <p className="text-[11px] text-white">Brand</p>
                </div>
            </section>
            <section className="flex  justify-between my-2">
                <h3 className="w-4/5 font-medium"> {item.content}</h3>
                <Button variant={'outline'} className=" w-7 flex justify-center h-6 items-center p-0 m-0">
                    <IoIosMore size={18} className="cursor-pointer" />
                </Button>
            </section>
            <p className="text-[11px] text-[#252C32]">{item.description}</p>
            <section className="flex  gap-x-2 mt-4">
                <Flag size={16} color="#2B2829" />
                <p className="text-[11px] text-[#6E7C87]">{item.time}</p>
            </section>
            <section className="flex mt-4 items-center justify-between  w-full">
                <section className="flex  items-center gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <BsChatSquareDots size={14} color="#6E7C87" />
                        <p className="text-xs text-[#6E7C87]"> {item.comments} comments</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <FolderOpen size={14} color="#6E7C87" />
                        <p className="text-[11px] text-[#6E7C87]"> 0 files </p>
                    </div>
                </section>

                <section className="relative flex items-center justify-end">
                    {Array.from({ length: avatarCount }).map((_, index) => (
                        <div
                            key={index}
                            className={`w-6 h-6 rounded-full border border-white bg-indigo-600 flex items-center justify-center text-white text-xs font-medium relative shadow-black/45 ${index === 0 ? 'z-10' : index === 1 ? 'z-20 -translate-x-1' : 'z-30 -translate-x-2'}`}
                        >
                            {index + 1}
                        </div>
                    ))}
                </section>
            </section>
        </div>
    );
};

export default BoardCard;
