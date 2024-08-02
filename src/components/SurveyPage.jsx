import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ScoreList from "./ScoreList";

const SurveyPage = () => {
    const { idCode } = useParams();
    const navigate = useNavigate();
    const [survey, setSurvey] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [userName, setUserName] = useState("");
    const [isNameInputVisible, setIsNameInputVisible] = useState(true);
    const [scoreCalculated, setScoreCalculated] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOptionCorrect, setIsOptionCorrect] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(''); // Stato per il colore di sfondo

    const colorMapping = {
        blu: "#0095b6",
        rosso: "#FF3F3F",
        verde: "#3cb371",
        giallo: "#FFFF00",
        rosa: "#f0c4d5",
        ciano: "#afeeee",
        arancione: "#ffa500",
        viola: "#7973b9",
        bianco: "#e7e7e7"
    };

    useEffect(() => {
        const fetchSurvey = async () => {
            const docRef = doc(db, "quizes", idCode);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSurvey(docSnap.data());
            } else {
                console.log("No such document!");
                navigate('/');
            }
        };
        fetchSurvey();
    }, [idCode, navigate]);

    const handleOptionSelect = (option) => {
        const currentQuestion = survey.questions[currentQuestionIndex];
        const isCorrect = option.text === currentQuestion.correctOption;

        setSelectedOption(option);
        setIsOptionCorrect(isCorrect);

        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestion.questionID]: option.text
        }));

        // Cambia il colore di sfondo se è la domanda del colore preferito (supponiamo che questionID 1 sia la domanda del colore preferito)
        if (currentQuestion.questionID === 1) {
            const newColor = colorMapping[currentQuestion.correctOption.toLowerCase()] || "";
            console.log(`Changing background color to: ${newColor}`); // Debug log
            setBackgroundColor(newColor);
        }

        setTimeout(() => {
            setSelectedOption(null);

            if (currentQuestionIndex < survey.questions.length - 1) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                window.scrollTo(0, 0); // Scrolla all'inizio della pagina
            }
        }, 650); // Attende prima di passare alla domanda successiva
    };

    useEffect(() => {
        console.log(`Background color changed to: ${backgroundColor}`); // Debug log
    }, [backgroundColor]);

    useEffect(() => {
        if (Object.keys(userAnswers).length === survey?.questions.length && !scoreCalculated) {
            calculateScore();
        }
    }, [userAnswers]);

    const calculateScore = async () => {
        let correctAnswers = 0;
        for (let i = 0; i < survey.questions.length; i++) {
            const question = survey.questions[i];
            const userAnswer = userAnswers[question.questionID];
            const correctOptionText = question.correctOption; // Testo dell'opzione corretta
            if (userAnswer && userAnswer === correctOptionText) {
                correctAnswers += 1;
            }
        }
        setScore(correctAnswers);
        setScoreCalculated(true);

        const userScore = { name: userName, score: correctAnswers };
        const updatedScores = survey.scores ? [...survey.scores, userScore] : [userScore];

        const surveyRef = doc(db, "quizes", idCode);
        await updateDoc(surveyRef, { scores: updatedScores });

        setSurvey(prevSurvey => ({ ...prevSurvey, scores: updatedScores }));
        setIsCompleted(true);
    };

    if (!survey) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>Caricamento del quiz in corso...</p>
                <Link to="/">Torna alla pagina principale</Link>
            </div>
        );
    }

    if (isNameInputVisible) {
        return (
            <section className="section-container flex flex-col items-center mb-20">
                <div className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container"
                    style={{ backgroundColor: backgroundColor }}
                >
                    <h1 className="h5 text-primary-light">Quiz creato da {survey.createdBy}.</h1>
                    <p className="h2 text-primary-dark">Inserisci il tuo nome per iniziare il quiz!</p>
                    <input className="input-text w-full" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <button className="btn btn--primary w-full my-2" onClick={() => setIsNameInputVisible(false)}>Inizia il QUIZ</button>
                    <ScoreList scores={survey.scores} />
                </div>
            </section>
        );
    }

    const currentQuestion = survey.questions[currentQuestionIndex];

    return (
        <div>
            {score == null ? (
                <section className="section-container flex flex-col items-center mb-20">
                    <div 
                        className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container"
                        style={{ backgroundColor: backgroundColor }} // Applica dinamicamente il colore di sfondo
                    >
                        <p className="h6">Indovina come {survey.createdBy} ha risposto a queste domande</p>
                        <div key={currentQuestion.questionID} className="mt-2">
                            <h1 className="h2">{currentQuestion.question}</h1>
                            <div className="flex flex-wrap gap-x-4 gap-y-5 items-stretch justify-center mt-8">
                                {currentQuestion.options.map((option, index) => (
                                    <button 
                                        className={`answer-option w-[90%] xs:w-[47%] lg:w-[31%] ${selectedOption === option ? (isOptionCorrect ? '!bg-green-500' : '!bg-error') : ''}`}
                                        key={index} 
                                        onClick={() => handleOptionSelect(option)}
                                        disabled={selectedOption != null} // Disabilita i pulsanti quando un'opzione è selezionata
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
                        </div>
                    </div>
                </section>
            ) : (
                <section className="section-container flex flex-col items-center mb-20">
                    <div className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container">
                        <h1 className="h6">Complimenti! Hai completato il quiz.</h1>
                        <p className="h5">Il tuo punteggio: <span className="h4 text-primary-light">{score}</span> / {survey.questions.length}</p>
                        <div className="mt-5 w-full flex items-center">
                            <div className="flex-grow border-t border-primary-light"></div>
                        </div>
                        <ScoreList scores={survey.scores} />
                        <Link className="btn btn--primary" to="/">Crea il tuo QUIZ!</Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default SurveyPage;
