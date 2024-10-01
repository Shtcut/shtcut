'use client';
import { useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import dayjs from 'dayjs';
import type { EventDropArg, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import CalendarView from '@shtcut/components/calendar-view';
import { EventParam, SelectedEvent } from '@shtcut/types/types';
import Container from '@shtcut/components/container';
import { eventsData } from '@shtcut/_shared/data';
import { Modal } from '@shtcut-ui/react';
import { InstagramPreview, TwitterPreviewCard } from '../component';
import { X } from 'lucide-react';
import LinkedinPreview from '../component/linkeldln-preview';

const CalendarsComponent = () => {
    const [events, setEvents] = useState<EventParam[]>(eventsData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<SelectedEvent | null>(null);

    // When a new empty event is selected
    const onCellSelect = (event: DateSelectArg) => {
        const { start, end } = event;
        setSelectedEvent({
            type: 'NEW',
            start: dayjs(start).format(),
            end: dayjs(end).format(),
            id: '',
            title: '',
            eventColor: ''
        });
        setIsModalOpen(true);
    };

    // When an existing event is clicked
    const onEventClick = (arg: EventClickArg) => {
        const { start, end, id, title, extendedProps } = arg.event;
        setSelectedEvent({
            type: 'EDIT',
            eventColor: extendedProps.eventColor,
            title,
            start: dayjs(start).format(),
            end: dayjs(end).format(),
            id
        });
        setIsModalOpen(true);
    };

    // Submitting an event
    const onSubmit = (data: EventParam, type: string) => {
        const newEvents = cloneDeep(events);

        if (type === 'NEW') {
            setEvents([...newEvents, data]);
        }

        if (type === 'EDIT') {
            const updatedEvents = newEvents.map((event) => (data.id === event.id ? data : event));
            setEvents(updatedEvents);
        }

        setIsModalOpen(false);
    };

    // Handling event drop (drag and drop)
    const onEventChange = (arg: EventDropArg) => {
        const updatedEvents = cloneDeep(events).map((event) => {
            if (arg.event.id === event.id) {
                const { id, extendedProps, start, end, title } = arg.event;
                event = {
                    id,
                    start: dayjs(start).format(),
                    end: dayjs(end).format(),
                    title,
                    eventColor: extendedProps.eventColor
                };
            }
            return event;
        });
        setEvents(updatedEvents);
    };

    return (
        <Container className="h-full">
            <div>
                <h1>Calendar</h1>
            </div>
            <CalendarView
                editable
                selectable
                events={events}
                eventClick={onEventClick}
                select={onCellSelect}
                eventDrop={onEventChange}
            />
            {selectedEvent && (
                <Modal onClose={() => setIsModalOpen(false)} showModel={isModalOpen} setShowModal={setIsModalOpen}>
                    <div className="">
                        <section className="flex items-center justify-between border-b p-4">
                            <p className="text-sm font-semibold">Preview</p>
                            <X size={18} onClick={() => setIsModalOpen(false)} />
                        </section>
                        {selectedEvent.type === 'EDIT' && (
                            <>
                                <section className="p-4 h-[500px] overflow-y-auto flex flex-col gap-4">
                                    <TwitterPreviewCard postText={''} />
                                    <InstagramPreview postText={''} />
                                    <LinkedinPreview postText={''} />
                                </section>
                            </>
                        )}
                    </div>
                </Modal>
            )}
        </Container>
    );
};

export default CalendarsComponent;
