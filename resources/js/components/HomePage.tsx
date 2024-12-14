import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/HomePage.css';

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <h1>Welcome to My Portfolio</h1>
            <div className="card-container">
                <Link to="/invest" className="card">
                    <img src="../images/investImage.jpg" alt="Investment Analysis" />
                    <div className="card-content">
                        <h3>Investment Analysis</h3>
                        <p>Explore international and domestic stock data, exchange rates, and cryptocurrency analysis. Utilize APIs to provide insightful investment suggestions.</p>
                        <div className="tech-icons">
                            <img src="/images/mysql-icon.png" alt="MySQL" title="MySQL" />
                            <img src="/images/react-icon.png" alt="React" title="React" />
                            <img src="/images/ts-icon.svg" alt="TypeScript" title="TypeScript" />
                            <img src="/images/laravel-icon.png" alt="Laravel" title="Laravel" />
                            <img src="/images/git.svg" alt="git" title="git" />
                        </div>
                    </div>
                </Link>
                <Link to="/products" className="card">
                    <img src="../images/shopping.jpg" alt="Shopping Analysis" />
                    <div className="card-content">
                        <h3>Product Management</h3>
                        <p>Register, update, and delete products in a shopping portfolio. Manage product details, pricing, and inventory through a user-friendly interface.</p>
                        <div className="tech-icons">
                            <img src="/images/mysql-icon.png" alt="MySQL" title="MySQL" />
                            <img src="/images/react-icon.png" alt="React" title="React" />
                            <img src="/images/ts-icon.svg" alt="TypeScript" title="TypeScript" />
                            <img src="/images/laravel-icon.png" alt="Laravel" title="Laravel" />
                            <img src="/images/git.svg" alt="git" title="git" />
                        </div>
                    </div>
                </Link>
                {/* 다른 카드들도 추가 가능합니다 */}
            </div>
        </div>
    );
}

export default HomePage;
