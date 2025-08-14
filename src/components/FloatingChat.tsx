import { MessageCircle, X, Send } from "lucide-react";
import { useState } from "react";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Format nomor WhatsApp dengan kode negara +62 (Indonesia)
      const phoneNumber = "6285242766676"; // Menghapus angka 0 di depan dan menambahkan 62
      const userMessage = message.trim();
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(userMessage)}`;
      window.open(whatsappUrl, '_blank');
      setMessage("");
      setIsOpen(false);
    }
  };

  const handleChatButtonClick = () => {
    setIsOpen(true);
    // Add ripple effect
    const button = document.querySelector('.floating-chat-btn');
    if (button) {
      button.classList.add('animate-ping');
      setTimeout(() => {
        button.classList.remove('animate-ping');
      }, 600);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={handleChatButtonClick}
          className="floating-chat-btn bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 transform hover:rotate-12 active:rotate-0"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-80 h-96 flex flex-col animate-in slide-in-from-bottom-4 duration-300 ease-out">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Chat dengan Kami</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-600 p-1 rounded transition-colors hover:scale-110 active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {/* Welcome Message */}
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">CS</span>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                  <p className="text-sm text-gray-700">
                    Halo! 👋 Ada yang bisa kami bantu? Silakan tanyakan tentang jasa pembuatan website kami.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ketik pesan..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm transition-all duration-200 focus:scale-[1.02]"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-all duration-300 aspect-square w-8 h-8 flex items-center justify-center hover:scale-110 active:scale-95 hover:rotate-12 active:rotate-0 shadow-lg hover:shadow-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChat;
