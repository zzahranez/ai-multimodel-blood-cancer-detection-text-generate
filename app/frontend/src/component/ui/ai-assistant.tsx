import { useEffect, useRef } from "react";
import { AiIcon, AiIconSmall } from "./ai-icon";
import { TypewriterMessage } from "./typewriter";

interface ChatMessage {
  type: "user" | "bot";
  text: string;
}

interface AiAssistantProps {
  chatMessages: ChatMessage[];
  isTyping: boolean;
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

export const AiAssistant = ({ 
  chatMessages, 
  isTyping, 
  inputMessage, 
  onInputChange, 
  onSendMessage 
}: AiAssistantProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSendMessage();
    }
  };

  return (
    // ✅ Tambahkan h-[600px] di sini agar container punya tinggi fixed
    <div className="max-h-[850px] bg-[#161210]/80 backdrop-blur-xl rounded-2xl border border-[#92400e]/20 overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="p-5 border-b border-[#92400e]/15 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#92400e]/20 flex items-center justify-center">
            <AiIcon />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#f5f0eb]">AI Assistant</h2>
            <p className="text-xs text-[#8a8580]">Ask about your detection results</p>
          </div>
        </div>
      </div>
      
      {/* ✅ flex-1 + min-h-0 penting agar overflow-y-auto bekerja di dalam flexbox */}
      <div className="flex-1 min-h-0 flex flex-col">
        
        {/* Chat messages area */}
        <div className="flex-1 min-h-0 p-5 overflow-y-auto space-y-4 custom-scrollbar">
          {chatMessages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-2.5 ${msg.type === "user" ? "flex-row-reverse" : ""} animate-fadeIn`}
            >
              <div className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center ${
                msg.type === "user" 
                  ? "bg-[#2a2520]" 
                  : "bg-[#92400e]/25"
              }`}>
                {msg.type === "user" ? (
                  <svg className="w-3.5 h-3.5 text-[#8a8580]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ) : (
                  <AiIconSmall />
                )}
              </div>
              <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
                msg.type === "user" 
                  ? "bg-[#92400e]/30 text-[#f5f0eb]" 
                  : "bg-[#0f0d0a]/70 border border-[#92400e]/10 text-[#d4d0c9]"
              }`}>
                {msg.type === "bot" ? (
                  <TypewriterMessage text={msg.text} speed={12} />
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#92400e]/25 flex-shrink-0 flex items-center justify-center">
                <AiIconSmall />
              </div>
              <div className="bg-[#0f0d0a]/70 border border-[#92400e]/10 rounded-xl px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* ✅ Anchor scroll target */}
          <div ref={chatEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-5 border-t border-[#92400e]/15 bg-[#12100c]/50 flex-shrink-0">
          <div className="flex gap-2.5">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about the results..." 
              className="flex-1 bg-[#0f0d0a]/80 rounded-xl px-4 py-3 text-[#d4d0c9] placeholder-[#5a554d] border border-[#92400e]/15 outline-none focus:border-[#d97706]/40 transition-all text-sm"
            />
            <button 
              onClick={onSendMessage} 
              className="bg-[#92400e] hover:bg-[#b45309] px-4 py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4 text-[#f5f0eb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};