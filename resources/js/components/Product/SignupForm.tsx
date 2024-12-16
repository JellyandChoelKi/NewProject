import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../css/Product/LoginForm.css';

const SignupForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

            const response = await axios.post('/register', {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                is_admin: isAdmin ? 1 : 0,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                },
            });

            if (isAdmin) {
                alert('이메일로 인증코드를 전송하였습니다. 이메일을 확인해 주세요.');
                setIsVerificationSent(true);
            } else {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                console.log('Signup successful', response.data);
                navigate('/products');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrorMessage('Validation failed: ' + Object.values(error.response.data.errors).flat().join(' '));
            } else {
                console.error('Error signing up:', error);
                setErrorMessage('An error occurred during registration. Please try again.');
            }
        }
    };

    const handleVerify = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfTokenMeta ? csrfTokenMeta.getAttribute('content') : '';

            const response = await axios.post('/verify', {
                name,
                email,
                password,
                is_admin: isAdmin ? 1 : 0,
                verification_code: verificationCode,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json',
                },
            });

            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            console.log('Signup and verification successful', response.data);
            navigate('/products');
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrorMessage('Verification failed: ' + Object.values(error.response.data.errors).flat().join(' '));
            } else {
                console.error('Error verifying:', error);
                setErrorMessage('An error occurred during verification. Please try again.');
            }
        }
    };

    return (
        <div className="signup-form">
            {isVerificationSent ? (
                <form onSubmit={handleVerify}>
                    <label>
                        인증 코드:
                        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    </label>
                    <button type="submit">확인</button>
                </form>
            ) : (
                <form onSubmit={handleRegister}>
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
                    <label>
                        관리자:
                        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                    </label>
                    <button type="submit">회원가입</button>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </form>
            )}
        </div>
    );
};

export default SignupForm;
