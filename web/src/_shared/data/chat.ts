import { ChatItem } from '@shtcut/types/types';
import { faker } from '@faker-js/faker';
export const chatData: ChatItem[] = [
    {
        id: '1',
        image: faker.image.avatar(),
        sender: 'Alice',
        receiver: 'You',
        messages: [
            { id: '1-1', content: 'Hi there!', sender: 'Alice', type: 'text' },
            { id: '1-2', content: 'How are you?', sender: 'Alice', type: 'text' },
            { id: '1-3', content: "I'm good, thanks!", sender: 'You', type: 'text' },
            {
                id: '1-4',
                content: 'What are you up to?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '2',
        image: faker.image.avatar(),
        sender: 'Bob',
        receiver: 'You',
        messages: [
            { id: '2-1', content: 'Hey!', sender: 'Bob', type: 'text' },

            {
                id: '2-3',
                content: 'Sure, where do you want to meet?',
                sender: 'You',
                type: 'text'
            },
            { id: '2-2', content: 'https://via.placeholder.com/150', sender: 'Bob', type: 'image' },
            { id: '2-1', content: 'Hey!', sender: 'Bob', type: 'text' },

            {
                id: '2-3',
                content: 'Sure, where do you want to meet?',
                sender: 'You',
                type: 'text'
            },
            { id: '2-2', content: 'https://via.placeholder.com/150', sender: 'Bob', type: 'image' },
            { id: '2-1', content: 'Hey!', sender: 'Bob', type: 'text' },

            {
                id: '2-3',
                content: 'Sure, where do you want to meet?',
                sender: 'You',
                type: 'text'
            },
            { id: '2-2', content: 'https://via.placeholder.com/150', sender: 'Bob', type: 'image' }
        ],
        status: 'End',
        day: 'Yesterday'
    },
    {
        id: '3',
        image: '/user.png',
        sender: 'Charlie',
        receiver: 'You',
        messages: [
            { id: '3-1', content: 'Good morning!', sender: 'Charlie', type: 'text' },
            {
                id: '3-2',
                content: 'Have a great day!',
                sender: 'Charlie',
                type: 'text'
            },
            { id: '3-3', content: 'Thanks! You too.', sender: 'You', type: 'text' }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '4',
        image: '/user.png',
        sender: 'You',
        receiver: 'David',
        messages: [
            { id: '4-1', content: "What's up?", sender: 'You', type: 'text' },
            {
                id: '4-2',
                content: 'Are you coming to the party?',
                sender: 'You',
                type: 'text'
            },
            {
                id: '4-3',
                content: "I'm not sure yet. Are you?",
                sender: 'David',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '5',
        image: faker.image.avatar(),
        sender: 'Eve',
        receiver: 'You',
        messages: [
            { id: '5-1', content: 'See you soon!', sender: 'Eve', type: 'text' },
            { id: '5-2', content: 'Take care!', sender: 'Eve', type: 'text' },
            {
                id: '5-3',
                content:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, architecto mollitia. Cum voluptas consectetur corrupti, labore, modi sed architecto itaque harum, accusamus nihil cumque esse delectus unde facere obcaecati nisi consequuntur. Similique ipsam minima odit neque facilis eos distinctio eveniet numquam ratione itaque tenetur, molestias debitis laborum suscipit, mollitia asperiores.',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'End',
        day: 'Today'
    },
    {
        id: '6',
        image: faker.image.avatar(),
        sender: 'You',
        receiver: 'Frank',
        messages: [
            { id: '6-1', content: 'Happy Birthday!', sender: 'You', type: 'text' },
            {
                id: '6-2',
                content: 'Wishing you all the best!',
                sender: 'You',
                type: 'text'
            },
            { id: '6-3', content: 'Thanks a lot!', sender: 'Frank', type: 'text' }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '7',
        image: '/user.png',
        sender: 'Grace',
        receiver: 'You',
        messages: [
            { id: '7-1', content: 'Can we talk?', sender: 'Grace', type: 'text' },
            { id: '7-2', content: "It's urgent.", sender: 'Grace', type: 'text' },
            { id: '7-3', content: "Sure, what's up?", sender: 'You', type: 'text' }
        ],
        status: 'End',
        day: 'Yesterday'
    },
    {
        id: '8',
        image: faker.image.avatar(),
        sender: 'Heidi',
        receiver: 'You',
        messages: [
            {
                id: '8-1',
                content: 'Long time no see!',
                sender: 'Heidi',
                type: 'text'
            },
            {
                id: '8-2',
                content: "How's everything?",
                sender: 'Heidi',
                type: 'text'
            },
            {
                id: '8-3',
                content: "Everything's great! How about you?",
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '9',
        image: '/user.png',
        sender: 'You',
        receiver: 'Ivan',
        messages: [
            { id: '9-1', content: 'Good night!', sender: 'You', type: 'text' },
            {
                id: '9-2',
                content: 'Talk to you tomorrow.',
                sender: 'You',
                type: 'text'
            },
            {
                id: '9-3',
                content: 'Sure, have a good night!',
                sender: 'Ivan',
                type: 'text'
            }
        ],
        status: 'End',
        day: 'Today'
    },
    {
        id: '10',
        image: '/user.png',
        sender: 'Judy',
        receiver: 'You',
        messages: [
            { id: '10-1', content: 'Miss you!', sender: 'Judy', type: 'text' },
            {
                id: '10-2',
                content: "Let's catch up soon.",
                sender: 'Judy',
                type: 'text'
            },
            {
                id: '10-3',
                content: 'Definitely! When are you free?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '11',
        image: faker.image.avatar(),
        sender: 'Judy',
        receiver: 'You',
        messages: [
            { id: '10-1', content: 'Miss you!', sender: 'Judy', type: 'text' },
            {
                id: '10-2',
                content: "Let's catch up soon.",
                sender: 'Judy',
                type: 'text'
            },
            {
                id: '10-3',
                content: 'Definitely! When are you free?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '12',
        image: faker.image.avatar(),
        sender: 'Judy',
        receiver: 'You',
        messages: [
            { id: '10-1', content: 'Miss you!', sender: 'Judy', type: 'text' },
            {
                id: '10-2',
                content: "Let's catch up soon.",
                sender: 'Judy',
                type: 'text'
            },
            {
                id: '10-3',
                content: 'Definitely! When are you free?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '14',
        image: faker.image.avatar(),
        sender: 'Judy',
        receiver: 'You',
        messages: [
            { id: '10-1', content: 'Miss you!', sender: 'Judy', type: 'text' },
            {
                id: '10-2',
                content: "Let's catch up soon.",
                sender: 'Judy',
                type: 'text'
            },
            {
                id: '10-3',
                content: 'Definitely! When are you free?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    },
    {
        id: '15',
        image: faker.image.avatar(),
        sender: 'Judy',
        receiver: 'You',
        messages: [
            { id: '10-1', content: 'Miss you!', sender: 'Judy', type: 'text' },
            {
                id: '10-2',
                content: "Let's catch up soon.",
                sender: 'Judy',
                type: 'text'
            },
            {
                id: '10-3',
                content: 'Definitely! When are you free?',
                sender: 'You',
                type: 'text'
            }
        ],
        status: 'Active',
        day: 'Today'
    }
];
