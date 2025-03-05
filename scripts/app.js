import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { CharacterGenerator } from './components/CharacterGenerator.js';
import { CharacterGallery } from './components/CharacterGallery.js';
import { WebsimProvider } from './contexts/WebsimContext.js';

const App = () => {
    const [activeTab, setActiveTab] = useState('generate');

    return (
        <WebsimProvider>
            <div className="container">
                <header>
                    <h1>This MOBA Does Not Exist</h1>
                    <p className="tagline">Create fictional characters for a MOBA game that doesn't exist</p>
                </header>

                <div className="tabs">
                    <button 
                        className={`tab ${activeTab === 'generate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('generate')}
                    >
                        Generate
                    </button>
                    <button 
                        className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gallery')}
                    >
                        Gallery
                    </button>
                </div>

                {activeTab === 'generate' ? (
                    <CharacterGenerator setActiveTab={setActiveTab} />
                ) : (
                    <CharacterGallery />
                )}
            </div>
        </WebsimProvider>
    );
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);

