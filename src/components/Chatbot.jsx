import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X, Send, User, Bot, Sparkles } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Bonjour ! Je suis l'assistant de **Digitall Global**. Comment puis-je vous aider aujourd'hui ?",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            type: 'user',
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            let botResponse = "";
            const input = inputValue.toLowerCase();

            if (input.includes('prix') || input.includes('tarif') || input.includes('coûte')) {
                botResponse = "Nous proposons plusieurs formules adaptées à vos besoins, à partir de **49€/mois**. Vous pouvez consulter notre section 'Tarifs' pour plus de détails.";
            } else if (input.includes('contact') || input.includes('rdv') || input.includes('appel')) {
                botResponse = "Vous pouvez réserver un appel avec un conseiller en cliquant sur le bouton **'Réserver un appel'** en haut de la page.";
            } else if (input.includes('agence') || input.includes('prestataire')) {
                botResponse = "Nous travaillons avec les meilleures agences et prestataires pour vous garantir un service de haute qualité.";
            } else if (input.includes('avis') || input.includes('commentaire')) {
                botResponse = "La satisfaction de nos clients est notre priorité. Consultez la section **'Témoignages'** pour voir ce qu'ils disent de nous !";
            } else {
                botResponse = "C'est une excellente question ! Pour une réponse plus précise, je vous invite à contacter notre support VIP ou à réserver un appel stratégique.";
            }

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: botResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
            setIsTyping(false);
        }, 1500);
    };

    const chatbotContent = (
        <div className={`chatbot-wrapper ${isOpen ? 'active' : ''}`}>
            {/* FAB Button */}
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Ouvrir le chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && <span className="notification-dot"></span>}
            </button>

            {/* Chat Window */}
            <div className="chatbot-window">
                <div className="chatbot-header">
                    <div className="bot-info">
                        <div className="bot-avatar">
                            <Bot size={20} />
                            <span className="online-status"></span>
                        </div>
                        <div className="bot-details">
                            <h4>Assistant Digitall</h4>
                            <p>En ligne</p>
                        </div>
                    </div>
                    <button className="close-chat" onClick={() => setIsOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-bubble ${msg.type}`}>
                            <div className="message-content">
                                <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                                <span className="message-time">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="message-bubble bot typing">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chatbot-input" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" disabled={!inputValue.trim()}>
                        <Send size={18} />
                    </button>
                </form>

                <div className="chatbot-footer">
                    <p><Sparkles size={10} /> Propulsé par Digitall Global AI</p>
                </div>
            </div>
        </div>
    );

    // Render directly into body to avoid any parent CSS constraints
    return createPortal(chatbotContent, document.body);
};

export default Chatbot;
