import { getOrigin } from "@/config/conf";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import io from "socket.io-client"

const myContext = createContext(null);

export const useMyContext = () => {
    return useContext(myContext);
};

const Provider = ({ children }) => {
    const [isServerStart, setisServerStart] = useState(false);
    const [messages, setMessages] = useState("");
    const [filesArr, setFilesArr] = useState([]);
    const [pin, setPin] = useState("0000");
    const [username, setUsername] = useState("host");
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (window.location.pathname === "/" || window.location.pathname === "/files") { /** working in host */
            if (isServerStart) {
                toast.success("Host Started!")
                /** generate 4 digin random pin */
                var random = Math.floor(1000 + Math.random() * 9000);
                setPin(random.toString())
            } else {
                if (pin !== "0000") {
                    toast.error("Host Stopped!")
                }
                /** reset the pin */
                setPin("0000");
                setMessages("")
            }
        } else {
            /** working for client */
            if (isServerStart) {
                toast.success("Client Connected!")
                /** pin will be generated by client: No need to handle code here */
            }else{
                if (pin !== "0000") {
                    toast.error("Client Disconnected!")
                }
            }
        }
    }, [isServerStart])

    useEffect(() => {
        if (!socket) {
            let url = getOrigin();
            const newSocket = io(url);
            
            // Handle connection errors
            newSocket.on('connect_error', (error) => {
                console.error('Connection error:', error);
                toast.error('Failed to connect to server');
            });

            // Handle server errors
            newSocket.on('error', (error) => {
                console.error('Server error:', error);
                toast.error(error.message || 'An error occurred');
            });

            // Handle room joining
            newSocket.on('roomJoined', ({ success, pin }) => {
                if (success) {
                    toast.success('Successfully joined room');
                    setPin(pin);
                    setisServerStart(true);
                }
            });

            // Handle disconnection
            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
                toast.error('Disconnected from server');
                setisServerStart(false);
            });

            setSocket(newSocket);
        }
        return () => {
            socket?.disconnect();
        };
    }, []);

    return (
        <myContext.Provider value={{
            isServerStart,
            setisServerStart,
            messages, setMessages,
            filesArr, setFilesArr,
            pin, setPin,
            username, setUsername,
            socket, setSocket,
        }}>
            {children}
            <Toaster/>
        </myContext.Provider>
    )
}

export default Provider