import React, { useEffect, useCallback } from 'react';
import { ShineBorder } from '@/components/magicui/shine-border';
import { useMyContext } from '@/Provider/Context';

const AppShineBox = () => {
    const { messages, setMessages, socket, pin, isServerStart, setisServerStart } = useMyContext();

    const handleChange = (e) => {
        setMessages(e.target.value);
    };

    const emitMsg = useCallback(() => {
        if (!socket || !messages.trim()) return;
        
        socket.emit("sendMessage", {
            messages: messages + "\n",
            pin,
        });
    }, [socket, messages, pin]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            emitMsg();
        }
    };

    useEffect(() => {
        if (pin !== "0000" && !isServerStart && window.location.pathname !== "/" && window.location.pathname !== "/files") {
            setisServerStart(true);
        }
    }, [pin, isServerStart, setisServerStart]);

    return (
        <ShineBorder
            borderWidth={2}
            className="relative w-full h-[94vh] md:h-[80vh] rounded-lg bg-transparent text-white"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
            <textarea
                className='bg-transparent focus:outline-none w-full h-full text-start resize-none disabled:cursor-not-allowed'
                disabled={!isServerStart}
                type="text"
                id="myTextarea"
                placeholder='Write Something and press enter to send...'
                value={messages}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </ShineBorder>
    );
};

export default AppShineBox;