import React, { createContext, useContext, useEffect, useState } from 'react';

const WebsimContext = createContext();

export const WebsimProvider = ({ children }) => {
    const [room, setRoom] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [username, setUsername] = useState('');
    const [creatorUsername, setCreatorUsername] = useState('');

    useEffect(() => {
        const websimRoom = new WebsimSocket();
        
        websimRoom.onopen = () => {
            console.log('Connected to websim');
            setIsConnected(true);
            setUsername(websimRoom.party.client.username);
            
            // Get creator username
            window.websim.getCreatedBy().then(creator => {
                setCreatorUsername(creator.username);
            });
        };

        setRoom(websimRoom);

        return () => {
            if (websimRoom) {
                websimRoom.close();
            }
        };
    }, []);

    return (
        <WebsimContext.Provider value={{ 
            room, 
            isConnected, 
            username,
            creatorUsername
        }}>
            {children}
        </WebsimContext.Provider>
    );
};

export const useWebsim = () => useContext(WebsimContext);

