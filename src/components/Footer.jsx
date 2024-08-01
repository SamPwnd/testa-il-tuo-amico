import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <a href="https://dev-samfolio.netlify.app/" target="_blank">
                <p className="bg-primary-dark w-full text-center text-white tracking-wide h6 py-2">
                    Sviluppato da <span className="text-primary-light font-mono h6">Samuele Minissale</span>
                </p>
            </a>
        </footer>
    )
}

export default Footer;