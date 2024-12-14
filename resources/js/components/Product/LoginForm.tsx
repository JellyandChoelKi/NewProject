import React, { useState } from 'react';
import axios from '../../axios'; // 설정된 axios 모듈 임포트
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/Product/LoginForm.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data.token); // 토큰 저장
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            console.log('Login successful', response.data);
            navigate('/products');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <label>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div className="login-buttons">
                    <button type="submit">로그인</button>
                </div>
            </form>
            <div className="signup-link">
                <p>계정이 없으신가요? <Link to="/products/signup">회원가입</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
