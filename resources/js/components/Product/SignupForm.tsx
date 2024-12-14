import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../css/Product/LoginForm.css';

const SignupForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

            const response = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            console.log('Signup successful', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <label>
                    이름:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    비밀번호 확인:
                    <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </label>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default SignupForm;
