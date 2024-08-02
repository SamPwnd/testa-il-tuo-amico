import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <header className="header section-container fixed top-0 z-10 py-5 w-full bg-white">
            <div className="flex items-center justify-between">
                <div className="header__logo max-w-64 md:max-w-80">
                    <Link to="/">
                        <img loading="lazy" src="./images/logo-transparent.svg" alt="TestaIlTuoAmico" />
                    </Link>
                </div>
                <nav className="flex">
                <a href="https://dev-samfolio.netlify.app/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0081a7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 13a3 3 0 1 0-6 0"/><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/><circle cx="12" cy="8" r="2"/></svg>
                </a>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;