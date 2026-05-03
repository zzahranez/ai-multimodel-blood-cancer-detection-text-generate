import { useState } from "react";
import { DetectionPanel } from "./ui/detection-panel";
import { AiAssistant } from "./ui/ai-assistant";

interface ChatMessage {
  type: "user" | "bot";
  text: string;
}

const CoreContent = () => {
  const [detectionResult, setDetectionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { type: "bot", text: "Halo! Upload gambar sel darah untuk deteksi dan saya akan menjelaskannya." }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/detect", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      console.log("API Response:", result);
      setDetectionResult(result);
      
      if (result.classes && result.classes.length > 0) {
        const counts: Record<string, number> = {};
        result.classes.forEach((cls: string) => {
          counts[cls] = (counts[cls] || 0) + 1;
        });
        
        const summary = Object.entries(counts)
          .map(([name, count]) => `${name}: ${count}`)
          .join(", ");
        
        setChatMessages(prev => [...prev, {
          type: "bot",
          text: `Hasil deteksi:\n${summary}\n\nTotal: ${result.classes.length} sel terdeteksi.`
        }]);

        if (result.explanations) {
          let textPenjelasan = "Berikut adalah penjelasan medis untuk sel yang terdeteksi:\n\n";
          
          Object.entries(result.explanations).forEach(([sel, deskripsi]: [string, any]) => {
            const namaSelRapi = sel.replace('_', ' ').toUpperCase();
            textPenjelasan += `${namaSelRapi}:\n${deskripsi}\n\n`;
          });

          setTimeout(() => {
            setChatMessages(prev => [...prev, {
              type: "bot",
              text: textPenjelasan
            }]);
          }, 1500); 
        }
      }
      
    } catch (error) {
      console.error("Error:", error);
      setChatMessages(prev => [...prev, {
        type: "bot",
        text: "Gagal terhubung ke server. Pastikan backend running di port 8000"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendChatMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg = inputMessage;
    setChatMessages((prev) => [...prev, { type: "user", text: userMsg }]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:8000/text-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          text: userMsg
        }),
      });

      const data = await response.json();

      if (data.response) {
        setChatMessages((prev) => [
          ...prev,
          { type: "bot", text: data.response },
        ]);
      }
      setIsTyping(false);
    } catch (error) {
      console.error("Error AI:", error);
      setChatMessages((prev) => [
        ...prev,
        { type: "bot", text: "Maaf, AI sedang tidak bisa merespon." },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1a1512] p-6">
      
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-[#7c2d12]/5 blur-[120px] ambient-pulse" />
        <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#92400e]/4 blur-[100px] ambient-pulse-delayed" />
        <div className="absolute bottom-[15%] left-[40%] w-[350px] h-[350px] rounded-full bg-[#78350f]/4 blur-[90px]" />
        <div className="absolute top-[25%] left-[60%] w-1 h-1 rounded-full bg-[#d97706]/20 glow-dot" />
        <div className="absolute top-[55%] left-[25%] w-1.5 h-1.5 rounded-full bg-[#b45309]/18 glow-dot glow-dot-delayed" />
        <div className="absolute top-[70%] right-[20%] w-1 h-1 rounded-full bg-[#92400e]/18 glow-dot glow-dot-delayed-2" />
        <div className="absolute top-[20%] right-[35%] w-2 h-2 rounded-full bg-[#d97706]/10 glow-dot glow-dot-delayed" />
        <div className="absolute top-[50%] left-[10%] w-1 h-1 rounded-full bg-[#b45309]/15 glow-dot" />
        <div className="absolute bottom-[30%] right-[45%] w-1.5 h-1.5 rounded-full bg-[#92400e]/12 glow-dot glow-dot-delayed-2" />
      </div>

      <div className="relative z-10 grid grid-cols-[55%_45%] gap-6 max-w-[1400px] mx-auto items-stretch">
        
        <DetectionPanel 
          detectionResult={detectionResult}
          isLoading={isLoading}
          onImageUpload={handleImageUpload}
        />

        <AiAssistant 
          chatMessages={chatMessages}
          isTyping={isTyping}
          inputMessage={inputMessage}
          onInputChange={setInputMessage}
          onSendMessage={sendChatMessage}
        />
        
      </div>
    </div>
  );
};

export default CoreContent;
