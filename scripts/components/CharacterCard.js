import React, { useState } from 'react';

export const CharacterCard = ({ character }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Format creation date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };
    
    return (
        <div className="character-card">
            <img 
                src={character.imageUrl} 
                alt={character.name} 
                className="card-image" 
                loading="lazy"
                onClick={() => setIsExpanded(!isExpanded)}
            />
            
            <div className="card-content">
                <h3 className="card-title">{character.name}</h3>
                
                <div>
                    <strong>Role:</strong> {character.role} | 
                    <strong> Difficulty:</strong> {character.difficulty}
                </div>
                
                {isExpanded && (
                    <div className="character-details">
                        <p className="character-description">
                            {character.description}
                        </p>
                    </div>
                )}
                
                <div className="card-author">
                    <img 
                        src={`https://images.websim.ai/avatar/${character.username}`} 
                        alt={character.username} 
                        className="author-avatar" 
                    />
                    Created by {character.username} on {formatDate(character.created_at)}
                </div>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    style={{ marginTop: '10px' }}
                >
                    {isExpanded ? 'Show Less' : 'Show Description'}
                </button>
            </div>
        </div>
    );
};

