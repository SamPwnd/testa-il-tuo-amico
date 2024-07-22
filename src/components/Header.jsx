import React from "react";

const Header = () => {

    return (
        <header className="header section-container fixed top-0 z-10 py-4 w-full bg-white">
            <div className="flex items-center justify-between">
                <div className="header__logo">
                    <img loading="lazy" src="../src/assets/images/logo-transparent.svg" alt="TestaIlTuoAmico" />
                </div>
                <nav className="flex gap-3">
                    <p>UNO</p>
                    <p>DUE</p>
                    <p>TRE</p>
                </nav>
            </div>
            
        </header>
    )
}

export default Header;