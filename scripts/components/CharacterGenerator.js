import React, { useState } from 'react';
import { useWebsim } from '../contexts/WebsimContext.js';
import { generateCharacterDescription, generateImagePrompt, generateCharacterImage } from '../utils/characterUtils.js';

export const CharacterGenerator = ({ setActiveTab }) => {
    const { room, isConnected, username } = useWebsim();
    const [formData, setFormData] = useState({
        name: '',
        role: 'Fighter',
        origin: '',
        difficulty: 'Medium'
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState('');
    const [generationStep, setGenerationStep] = useState(0);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isConnected) {
            setError('Not connected to server. Please try again later.');
            return;
        }
        
        if (!formData.name || !formData.origin) {
            setError('Please fill in all required fields.');
            return;
        }
        
        setError('');
        setIsGenerating(true);
        setGenerationStep(1);
        
        try {
            // Step 1: Generate character description
            const description = await generateCharacterDescription(formData);
            setGenerationStep(2);
            
            // Step 2: Generate image prompt from description
            const imagePrompt = await generateImagePrompt(description, formData);
            setGenerationStep(3);
            
            // Step 3: Generate character image
            const imageUrl = await generateCharacterImage(imagePrompt);
            setGenerationStep(4);
            
            // Step 4: Save to database
            await room.collection('mobaCharacters').create({
                name: formData.name,
                role: formData.role,
                origin: formData.origin,
                difficulty: formData.difficulty,
                description,
                imageUrl,
                imagePrompt
            });
            
            // Reset form and show gallery
            setFormData({
                name: '',
                role: 'Fighter',
                origin: '',
                difficulty: 'Medium'
            });
            
            setActiveTab('gallery');
        } catch (err) {
            console.error("Generation error:", err);
            setError(err.message || 'An error occurred during generation.');
        } finally {
            setIsGenerating(false);
            setGenerationStep(0);
        }
    };
    
    const getStepLabel = () => {
        switch (generationStep) {
            case 1: return "Generating character description...";
            case 2: return "Creating image prompt...";
            case 3: return "Generating character artwork...";
            case 4: return "Saving character...";
            default: return "Generate";
        }
    };
    
    return (
        <div>
            <h2>Create Your MOBA Character</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="generate-form">
                <div className="form-group">
                    <label htmlFor="name">Character Name*</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isGenerating}
                        placeholder="e.g. Azura, Kronos, Vex"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        disabled={isGenerating}
                    >
                        <option value="Fighter">Fighter</option>
                        <option value="Mage">Mage</option>
                        <option value="Assassin">Assassin</option>
                        <option value="Support">Support</option>
                        <option value="Tank">Tank</option>
                        <option value="Marksman">Marksman</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="origin">Origin/Background*</label>
                    <input
                        type="text"
                        id="origin"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        disabled={isGenerating}
                        placeholder="e.g. Ancient Forest, Celestial Realm, Urban Dystopia"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        disabled={isGenerating}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
                
                <button type="submit" disabled={isGenerating}>
                    {isGenerating ? (
                        <>
                            {getStepLabel()}
                            <span className="loading-indicator"></span>
                        </>
                    ) : (
                        "Generate Character"
                    )}
                </button>
            </form>
        </div>
    );
};

