import { useState } from 'react'

interface ClickCounterProps {
    title: string;
    on10ClickMessage?: string;
    onMouseOverMessage?: string;
}

const ClickCounter = ({ title, on10ClickMessage = "Master !", onMouseOverMessage = "Click !"}: ClickCounterProps) => {
    const [count, setCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='card'>
            <h4>{title}</h4>
            {isHovered ? <p>{onMouseOverMessage}</p> : null}
            <button onClick={() => setCount((count) => count + 1)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Clicked {count} times
            </button>
            {count >= 10 ? <p>{on10ClickMessage}</p> : null}
        </div>
    )
}

export default ClickCounter;

