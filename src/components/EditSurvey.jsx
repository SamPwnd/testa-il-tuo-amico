import React, { useState, useEffect } from "react";
import { QUESTIONS } from "../utils/constants";
import Share from "./Share";

const EditSurvey = ({ onDataUpdate, onSurveyComplete, surveyLink }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleOptionSelect = (option) => {
        // Passa l'opzione selezionata alla funzione di callback per aggiornare i dati
        onDataUpdate(QUESTIONS[currentQuestionIndex].questionID, option);

        // Passa alla domanda successiva quando l'utente seleziona una risposta
        if (currentQuestionIndex < QUESTIONS.length ) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    useEffect(() => {
        // Controlla se abbiamo completato tutte le domande
        if (currentQuestionIndex === QUESTIONS.length) {
            onSurveyComplete();
        }
    }, [currentQuestionIndex, onSurveyComplete]);

    return (
        <div>
            {/* Visualizza solo la domanda corrente */}
            {currentQuestionIndex < QUESTIONS.length  ? (
                <div key={QUESTIONS[currentQuestionIndex].questionID}>
                    <p>{QUESTIONS[currentQuestionIndex].question}</p>
                    {/* Genera i pulsanti per le opzioni della domanda corrente */}
                    {QUESTIONS[currentQuestionIndex].options.map((option) => (
                        <button 
                            key={option} 
                            onClick={() => handleOptionSelect(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div>
                    <p>FINITO!</p>
                    {surveyLink && (
                        <div>
                            <p>Condividi questo link per permettere ad altri di rispondere al sondaggio:</p>
                            <a href={surveyLink}>{surveyLink}</a>
                            <Share url={surveyLink} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default EditSurvey;
