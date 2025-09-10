import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [message, setMessage] = useState("");

  async function callApi() {
    const res = await fetch("/api/hello");
    const text = await res.text();
    setMessage(text);
  }

  return (
    <div style={{ padding: 24}}>
      <h1>Multi-Cloud Serverless App</h1>
      <button onClick={callApi}>Call Backend</button>
      <p>{message}</p>
    </div>
  );
}
