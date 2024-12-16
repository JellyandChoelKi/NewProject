import React, { useState } from 'react';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import '../../../css/Product/ProductList.css';

const AdminUpdateForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    // 이메일로 인증 코드 발송
    const handleSendCode = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/send-verification-code', { email });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error sending verification code:', error);
            setMessage('인증 코드를 보내는 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    const handleVerifyCode = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/verify-code', { email, verificationCode }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Verification response:', response.data);
            setMessage(response.data.message);
            if (response.data.success) {
                // 관리자로 업데이트
                const token = localStorage.getItem('token');
                console.log('Using token:', token); // 토큰 로그 추가
    
                await axios.post('/update-admin', {}, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                navigate('/products'); // 인증 후 제품 페이지로 이동
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setMessage('인증 코드 확인 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };
    
    return (
        <div className="admin-update-form-container">
            <form onSubmit={handleSendCode} className="admin-update-form">
                <label>
                    이메일:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
                <button type="submit" className="submit-button">인증 코드 보내기</button>
            </form>
            {message && <div className="message">{message}</div>}
            <form onSubmit={handleVerifyCode} className="admin-update-form">
                <label>
                    인증 코드:
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                </label>
                <button type="submit" className="submit-button">인증</button>
            </form>
        </div>
    );
};

export default AdminUpdateForm;
