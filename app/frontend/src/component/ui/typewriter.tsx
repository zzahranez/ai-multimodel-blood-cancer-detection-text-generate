import { useState, useEffect } from "react";

export const TypewriterMessage = ({ text, speed = 12 }: { text: string, speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayedText(""); 
    
    const typingInterval = setInterval(() => {
      i = Math.min(i + 2, text.length); 
      setDisplayedText(text.slice(0, i));

      if (i >= text.length) {
        clearInterval(typingInterval);
      }
    }, speed); 

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return <p className="text-sm leading-relaxed whitespace-pre-line">{displayedText}</p>;
};
