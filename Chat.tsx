import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ me?: boolean; text: string }>>([
    { text: "Hello! I'm interested in your loan request." },
    { me: true, text: "Hi! Sure, happy to provide details." },
  ]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((m) => [...m, { me: true, text: input.trim() }]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-220px)] flex-col rounded-2xl border brand-card shadow-sm">
      <div className="border-b p-3 font-semibold">Chat</div>
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.me ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary/90"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2 border-t p-3">
        <input
          className="flex-1 rounded-xl border px-3 py-2 focus:ring-2 focus:ring-primary outline-none"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="rounded-xl bg-primary px-4 py-2 text-primary-foreground font-medium shadow">Send</button>
      </form>
    </div>
  );
}
