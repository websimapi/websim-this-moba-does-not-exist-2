import React, { useMemo } from 'react';
import { useWebsim } from '../contexts/WebsimContext.js';
import { CharacterCard } from './CharacterCard.js';

export const CharacterGallery = () => {
    const { room, isConnected } = useWebsim();
    
    // Use React's useSyncExternalStore through the subscription
    const characters = React.useSyncExternalStore(
        room?.collection('mobaCharacters').subscribe || (() => {}),
        () => room?.collection('mobaCharacters').getList() || []
    );
    
    // Sort characters by creation time (newest first)
    const sortedCharacters = useMemo(() => {
        return [...characters].sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        });
    }, [characters]);
    
    if (!isConnected) {
        return <div>Connecting to server...</div>;
    }
    
    if (sortedCharacters.length === 0) {
        return (
            <div>
                <h2>Character Gallery</h2>
                <p>No characters have been created yet. Be the first to create one!</p>
            </div>
        );
    }
    
    return (
        <div>
            <h2>Character Gallery</h2>
            <p>Explore characters created by the community. {sortedCharacters.length} character(s) found.</p>
            
            <div className="gallery">
                {sortedCharacters.map(character => (
                    <CharacterCard
                        key={character.id}
                        character={character}
                    />
                ))}
            </div>
        </div>
    );
};

