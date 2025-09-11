import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from "./supabaseClient";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  async function callApi() {
    const res = await fetch("/api/hello");
    const text = await res.text();
    setMessage(text);
  }

  async function saveMessage() {
    if (!message) return;
    const { error } = await supabase
      .from("messages")
      .insert([{ text: message }]); // insert a row into supabase table
    if (error) console.error(error);
    setMessage(""); // clear input box
    loadMessages(); // reload the list
  }

  async function loadMessages(params) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: false }); // newest first
    if (error) console.error(error);
    setMessages(data); // update state
  }

  // Auto load messages on start
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages"},
        (payload) => {
          console.log("New message:", payload.new);
          setMessages((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []); // empy [] means it runs once and not on every render

return (
    <div style={{ padding: 24 }}>
      <h1>Multi-Cloud Serverless App</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message"
      />
      <button onClick={saveMessage}>Save</button>
      <ul>
        {messages.map((m) => (
          <li key={m.id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}
