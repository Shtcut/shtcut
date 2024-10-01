import classNames from 'classnames';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import Image from 'next/image';
import './style.css';
type EventColors = Record<
    string,
    {
        bg: string;
        text: string;
        dot: string;
    }
>;

interface CalendarViewProps extends CalendarOptions {
    wrapperClass?: string;
    eventColors?: (colors: EventColors) => EventColors;
}

const defaultColorList: Record<
    string,
    {
        bg: string;
        text: string;
        dot: string;
    }
> = {
    lime: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    red: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    blue: {
        bg: 'w-full border border-[#FCB900] dark:bg-blue-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-blue-100',
        dot: 'bg-blue-500'
    },
    orange: {
        bg: 'w-full border border-[#FCB900] dark:bg-blue-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-blue-100',
        dot: 'bg-blue-500'
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-500/10',
        text: 'text-amber-500 dark:text-amber-100',
        dot: 'bg-amber-500'
    },
    yellow: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    green: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    cyan: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    teal: {
        bg: ' w-full border border-[#2F64E9]  dark:bg-red-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-red-100',
        dot: 'bg-red-500'
    },
    indigo: {
        bg: 'w-full border border-[#FCB900] dark:bg-blue-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-blue-100',
        dot: 'bg-blue-500'
    },
    purple: {
        bg: 'w-full border border-[#FCB900] dark:bg-blue-500/10',
        text: 'text-[#0A0A0B] text-xs break-word dark:text-blue-100',
        dot: 'bg-blue-500'
    },
    fuchsia: {
        bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10',
        text: 'text-fuchsia-500 dark:text-fuchsia-100',
        dot: 'bg-fuchsia-500'
    },
    pink: {
        bg: 'bg-pink-50 dark:bg-pink-500/10',
        text: 'text-pink-500 dark:text-pink-100',
        dot: 'bg-pink-500'
    },
    rose: {
        bg: 'bg-rose-50 dark:bg-rose-500/10',
        text: 'text-rose-500 dark:text-rose-100',
        dot: 'bg-rose-500'
    }
    // Add other color schemes as needed
};

const CalendarView = (props: CalendarViewProps) => {
    const { wrapperClass, eventColors = () => defaultColorList, ...rest } = props;

    return (
        <div className={classNames('calendar', wrapperClass)}>
            <FullCalendar
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'title,prev,next',
                    center: '',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                eventContent={(arg) => {
                    const { extendedProps } = arg.event;
                    const { isEnd, isStart } = arg;
                    const eventColor = extendedProps.eventColor
                        ? (eventColors(defaultColorList) || defaultColorList)[extendedProps.eventColor]
                        : undefined;

                    return (
                        <div
                            className={classNames(
                                'custom-calendar-event text-xs p-1 rounded-md',
                                eventColor?.bg,
                                eventColor?.text,
                                isEnd && !isStart ? 'rounded-sm' : '',
                                !isEnd && isStart ? 'rounded-sm' : ''
                            )}
                        >
                            {!isEnd && (
                                <div
                                    className={classNames('inline-block w-2 h-2 rounded-full mr-2', eventColor?.dot)}
                                />
                            )}

                            {isEnd && (
                                <Image
                                    src={'/social/instagram.png'}
                                    width={14}
                                    height={14}
                                    alt=""
                                    className="float-left mr-1 mt-[0.8px]"
                                />
                            )}

                            <span className="font-semibold text-xs break-words">{arg.event.title}</span>
                        </div>
                    );
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                {...rest}
            />
        </div>
    );
};

export default CalendarView;
