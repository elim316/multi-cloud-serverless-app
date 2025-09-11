import { useEffect, useState } from 'react';
import './App.css';
import { supabase } from "./supabaseClient";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  async function saveMessage() {
    if (!message) return;

    const { data, error } = await supabase
      .from("messages")
      .insert([{ text: message }]) // insert a row into supabase table
      .select();

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      console.log("Inserted row:", data);
    }
    setMessage(""); // clear input box
    loadMessages(); // reload the list
  }

  async function loadMessages(params) {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: false }); // newest first
    if (error) console.error(error);
    setMessages(data || []); // update state
  }

  async function deleteMessage(id) {
    const { data, error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Delete error:", error.message);
    } else {
      console.log("Message deleted:", id);
    }
  }

  function startEdit(msg) {
    setEditingId(msg.id);
    setEditText(msg.text);
  }

  async function updateMessage(id) {
    if (!editText) return;
    const { data, error } = await supabase
      .from("messages")
      .update({ text: editText })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Update error:", error.message);
    } else {
      console.log("Updated row:", data);
      // loadMessages(); // refresh state
      // Update React state directly
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: editText } : m))
      );
    }
    setEditingId(null);
    setEditText("");
  }



  // Auto load messages on start
  useEffect(() => {
    loadMessages();

    // Subscribe to insert
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
      .on(
        "postgre_changes",
        {event:"UPDATE", schema: "public", table: "messages"},
          (payload) => {
            console.log("Updated message:", payload.new);
            setMessages((prev) =>
              prev.map((m) => (m.id === payload.new.id ? payload.new : m))
            );
          }
      )
      .on(
        "postgre_changes",
        {event:"DELETE", schema: "public", table: "messages"},
          (payload) => {
            console.log("Deleted message:", payload.old);
            setMessages((prev) => prev.filter((m) => m.id !== payload.old.id));
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

      <ul style={{ listStyle: "none", padding: 0}}>
        {messages.map((m) => (
          <li key={m.id} style={{ 
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}>
            {editingId === m.id ? (
              <>
                <input
                  value ={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1, marginRight: "8px", padding: "4px" }}
                />
                <button onClick={() => updateMessage(m.id)} style={{ marginRight: "6px"}}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{m.text}</span>
                <div>
                  <button
                    onClick={() => startEdit(m)}
                    style={{ marginRight: "6px", padding: "4px 8px" }}>
                    Edit</button>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    style={{ padding: "4px 8px" }}>
                    Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
