import React, { useState, useEffect } from 'react';
import axios from '../../axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../../css/Product/LoginForm.css';
import { LoginFormProps } from '../../types/Product/LoginFrom.d';

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn, setIsAdmin, setWarning, isLoggedIn, isAdmin, navigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/login', { email, password });
            localStorage.setItem('token', response.data.token); // 토큰 저장
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            console.log('Login successful', response.data);
            // 사용자 상태 확인
            const checkAdminResponse = await axios.get('/check-admin', {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Check admin response:', checkAdminResponse.data);

            setIsLoggedIn(true);
            setIsAdmin(checkAdminResponse.data.is_admin);

            console.log('Navigating to /products');
            navigate('/products');
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    useEffect(() => {
        const checkAdmin = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/check-admin', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setIsLoggedIn(true);
                    setIsAdmin(response.data.is_admin);
                } catch (error: any) {
                    if (error.response && error.response.status === 401) {
                        console.warn('Unauthorized. Admin status check failed.');
                        setWarning('관리자 확인에 실패했습니다. 로그인해 주세요.');
                    } else {
                        console.error('Error checking admin status:', error);
                    }
                }
            } else {
                console.warn('No token found. Please log in.');
            }
        };

        checkAdmin();
    }, [setIsLoggedIn, setIsAdmin, setWarning]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const handleAdminUpdate = () => {
        navigate('/products/admin-update');
    };

    return (
        <div className="login-form">
            {isLoggedIn ? (
                <div>
                    <button className="logout-button" onClick={handleLogout}>로그아웃</button>
                    {!isAdmin && <button className="update-admin-button" onClick={handleAdminUpdate}>관리자 계정으로 업데이트</button>}
                </div>
            ) : (
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
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {!isLoggedIn && (
                <div className="signup-link">
                    <p>계정이 없으신가요? <Link to="/products/signup">회원가입</Link></p>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
