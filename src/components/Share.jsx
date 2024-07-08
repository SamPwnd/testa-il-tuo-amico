import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    XIcon,
    WhatsappShareButton,
    WhatsappIcon
} from "react-share";

const Share = ({url}) => {
    const link = url;
    const waStatusLink = `https://api.whatsapp.com/send?text=Ciao%20amici!%20%F0%9F%8E%89%0A%0AHo%20appena%20creato%20un%20quiz%20super%20divertente%20e%20voglio%20vedere%20chi%20di%20voi%20otterr%C3%A0%20il%20punteggio%20pi%C3%B9%20alto!%20%F0%9F%92%AF%E2%9C%A8%0A%0AAccettate%20la%20sfida%20e%20dimostrate%20quanto%20mi%20conoscete%20bene.%20Cliccate%20sul%20link%20qui%20sotto%20per%20iniziare%20il%20quiz!%20%F0%9F%93%9D%0A%0A%F0%9F%94%97%20${url}%0A%0ABuon%20divertimento%20e%20che%20vinca%20il%20migliore!%20%F0%9F%8F%86%F0%9F%98%8A`;   
    return (
        <div>
            <h3>Condividi il link con i tuoi amici per pemettergli di rispondere</h3>
            <a href={waStatusLink}>
                <button>
                    <img loading="lazy" src="../src/assets/whatsapp.png" height="28" alt="Condividi su WhatsApp" />
                </button>
            </a>
            <div>
                <FacebookShareButton url={link}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={link}>
                    <XIcon size={32} round />
                </TwitterShareButton>
                <WhatsappShareButton url={link}>
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton url={link}>
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </div>
            
        </div>
    )
}

export default Share;