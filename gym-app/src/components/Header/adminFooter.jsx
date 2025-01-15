import React from 'react';
import './adminFooter.css';

const AdminFooter = () => {
    return (
        <div className="footer">
            <footer>
                <div className="link">
                    <a href="#">Home</a>
                    <a href="#">Notice</a>
                    <a href="#">Q&A</a>
                    <a href="#">About</a>
                </div>
                <div className="copyright">
                    <span>© 2024 Company, Inc</span>
                </div>
            </footer>
        </div>
    );
};

export default AdminFooter;
