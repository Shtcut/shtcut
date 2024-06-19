import React, { useEffect, useState } from 'react';


const TypingText = ({ text, speed }: TypingTextProps) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return <span className="typing-text">{displayedText}</span>;
};

export default TypingText;
