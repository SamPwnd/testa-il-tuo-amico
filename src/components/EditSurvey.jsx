import React, { useState, useEffect } from "react";
import { QUESTIONS } from "../utils/constants";
import Share from "./Share";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const EditSurvey = ({ onDataUpdate, onSurveyComplete, surveyLink }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestionNum, setCurrentQuestionNum] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const questionLimit = 10;

    const handleOptionSelect = (option) => {
        if (option) {
            onDataUpdate(shuffledQuestions[currentQuestionIndex].questionID, option.text);
            setCurrentQuestionNum((prevNum) => prevNum + 1);
        } else {
            // Gestisce lo skip della domanda, spostando la domanda saltata alla fine dell'array
            setShuffledQuestions((prevQuestions) => {
                const updatedQuestions = [...prevQuestions];
                const [question] = updatedQuestions.splice(currentQuestionIndex, 1);
                updatedQuestions.push(question);
                return updatedQuestions;
            });
        }

        // Passa alla domanda successiva quando l'utente seleziona una risposta
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    useEffect(() => {
        const firstQuestion = QUESTIONS.find((q) => q.questionID === 1);
        const otherQuestions = QUESTIONS.filter((q) => q.questionID !== 1);
        const shuffledOtherQuestions = shuffleArray(otherQuestions);
        const combinedQuestions = [firstQuestion, ...shuffledOtherQuestions];

        setShuffledQuestions(combinedQuestions);
    }, []);

    useEffect(() => {
        if (currentQuestionNum === questionLimit) {
            onSurveyComplete();
        }
    }, [currentQuestionNum, onSurveyComplete]);

    if (shuffledQuestions.length === 0 || currentQuestionIndex >= shuffledQuestions.length) {
        return <div>Caricamento...</div>;
    }

    return (
        <>
            {currentQuestionNum < questionLimit ? (
                <div key={shuffledQuestions[currentQuestionIndex].questionID}>
                    <p className="h2">{shuffledQuestions[currentQuestionIndex].question}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-5 items-stretch justify-center mt-8">
                        {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className="answer-option w-[90%] xs:w-[47%] lg:w-[31%]"
                            >
                                <img
                                    loading="lazy"
                                    src={option.imageUrl}
                                    alt={option.text}
                                    className="answer-option__img mb-2"
                                />
                                <p>{option.text}</p>
                            </button>
                        ))}
                    </div>
                    <button className="btn btn--skip mt-2" onClick={() => handleOptionSelect(null)}>
                        SALTA
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="h2 text-primary-light">✔</h2>
                    {surveyLink && (
                        <Share url={surveyLink} />
                    )}
                </>
            )}
        </>
    );
};

export default EditSurvey;
