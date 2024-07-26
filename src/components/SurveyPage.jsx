import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import ScoreList from "./ScoreList";

const SurveyPage = () => {
    const { idCode } = useParams();
    const [survey, setSurvey] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [userName, setUserName] = useState("");
    const [isNameInputVisible, setIsNameInputVisible] = useState(true);
    const [scoreCalculated, setScoreCalculated] = useState(false);

    useEffect(() => {
        const fetchSurvey = async () => {
            const docRef = doc(db, "surveys", idCode);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setSurvey(docSnap.data());
            } else {
                console.log("No such document!");
            }
        };
        fetchSurvey();
    }, [idCode]);

    const handleOptionSelect = (option) => {
        const currentQuestion = survey.questions[currentQuestionIndex];
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [currentQuestion.questionID]: option.text
        }));

        if (currentQuestionIndex < survey.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

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
            console.log(`Question: ${question.question}, User Answer: ${userAnswer}, Correct Answer: ${correctOptionText}`);
            if (userAnswer && userAnswer === correctOptionText) {
                correctAnswers += 1;
            }
        }
    
        console.log(`Correct Answers: ${correctAnswers}`);
        setScore(correctAnswers);
        setScoreCalculated(true);

        const userScore = { name: userName, score: correctAnswers };
        const updatedScores = survey.scores ? [...survey.scores, userScore] : [userScore];

        const surveyRef = doc(db, "surveys", idCode);
        await updateDoc(surveyRef, { scores: updatedScores });

        setSurvey(prevSurvey => ({ ...prevSurvey, scores: updatedScores }));
        setIsCompleted(true);
    };

    if (!survey) {
        return (
            <div className="flex flex-col items-center justify-center">
                <p>Caricamento del sondaggio in corso...</p>
                <Link to="/">Torna alla pagina principale</Link>
            </div>
        );
    }

    if (isNameInputVisible) {
        return (
            <section className="section-container flex flex-col items-center">
                <div className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container">
                    <p className="h2 text-primary-dark">Inserisci il tuo nome per iniziare il sondaggio</p>
                    <input className="input-text w-full" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <button className="btn btn--primary w-full mt-2" onClick={() => setIsNameInputVisible(false)}>Inizia il Sondaggio</button>
                    <ScoreList scores={survey.scores} />
                </div>
            </section>
        );
    }

    const currentQuestion = survey.questions[currentQuestionIndex];

    return (
        <div>
            {score == null ? (
                <section>
                    <h1>Sondaggio creato da {survey.createdBy}</h1>
                    <div key={currentQuestion.questionID}>
                        <p>{currentQuestion.question}</p>
                        {currentQuestion.options.map((option, index) => (
                            <button key={index} onClick={() => handleOptionSelect(option)}>
                                <img src={option.imageUrl} alt={option.text} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                {option.text}
                            </button>
                        ))}
                    </div>
                </section>
            ) : (
                <section>
                    <h1>Complimenti! Hai completato il sondaggio.</h1>
                    <p>Il tuo punteggio: {score} / {survey.questions.length}</p>
                    <ScoreList scores={survey.scores} />
                    <Link to="/">Crea il tuo QUIZ!</Link>
                </section>
            )}
        </div>
    );
};


export default SurveyPage;
