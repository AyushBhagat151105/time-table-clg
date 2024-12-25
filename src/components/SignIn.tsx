// src/components/SignIn.tsx
import { useState } from 'react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await fetch('/signin', {
            method: 'POST',
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            alert('Sign in successful');
        } else {
            alert('Sign in failed');
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
    );
}