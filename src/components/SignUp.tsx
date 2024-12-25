// src/components/SignUp.tsx
import { useState } from 'react';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await fetch('/signup', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            alert('Sign up successful');
        } else {
            alert('Sign up failed');
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
    );
}