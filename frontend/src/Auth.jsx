import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin() {
        const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("Login Error:", error.message);
        } else {
            console.log("Logged in:", data);
            if (onLogin) onLogin(data.session);
        }
    }

    async function handleSignup(params) {
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            console.error("Signup error:", error.message);
        } else {
            console.log("Signed up:", data);
            if (onLogin) onLogin(data.session);
        }        
    }

    return (
        <div style={{ padding: "1rem", border: "1px solid #ccc" }}>
            <h2>Login / Signup</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}