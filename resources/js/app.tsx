import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import FinancialAnalysis from './components/Invest/FinancialAnalysis';
import ProductList from './components/Product/ProductList';
import SignupForm from './components/Product/SignupForm'; // SignupForm 임포트
import LoginForm from './components/Product/LoginForm'; // LoginForm 임포트
import AdminUpdateForm from './components/Product/AdminUpdateForm'; // LoginForm 임포트
import '../css/app.css';

const App: React.FC = () => {
    // const isAuthenticated = !!localStorage.getItem('token'); // 로그인 상태 확인 (예시: 토큰 저장 여부)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/invest" element={<FinancialAnalysis />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/signup" element={<SignupForm />} /> {/* 회원가입 경로 추가 */}
                <Route path="/products/admin-update" element={<AdminUpdateForm />} /> {/* 로그인 경로 추가 */}
                <Route path="*" element={<Navigate to="/" />} /> {/* 모든 경로를 홈으로 리디렉션 */}
            </Routes>
        </Router>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
