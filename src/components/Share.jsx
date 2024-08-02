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
        <section className="flex flex-col max-w-full">
            <h3 className="h3 text-primary-dark mb-3"><span className="text-gradient">Condividi il link, fai rispondere i tuoi amici!</span></h3>
            <a className="text-primary-light whitespace-normal break-words h6 pb-2" href={url}>{url}</a>
            <a href={waStatusLink}>
                <button className="wa-btn">
                    <img loading="lazy" src="./images/whatsapp.png" height="28" alt="Condividi su WhatsApp" />
                </button>
            </a>
            <div className="mt-4 flex gap-3 justify-center">
                <FacebookShareButton url={link}>
                    <FacebookIcon size={42} round />
                </FacebookShareButton>
                <TwitterShareButton url={link}>
                    <XIcon size={42} round />
                </TwitterShareButton>
                <WhatsappShareButton url={link}>
                    <WhatsappIcon size={42} round />
                </WhatsappShareButton>
                <TelegramShareButton url={link}>
                    <TelegramIcon size={42} round />
                </TelegramShareButton>
            </div>
            
        </section>
    )
}

export default Share;