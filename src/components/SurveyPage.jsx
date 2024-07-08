import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
            [currentQuestion.questionID]: option
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
        survey.questions.forEach(question => {
            const userAnswer = userAnswers[question.questionID];
            if (userAnswer && userAnswer === question.correctOption) {
                correctAnswers += 1;
            }
        });

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
            <div>
                <p>Caricamento del sondaggio in corso...</p>
                <Link to="/">Torna alla pagina principale</Link>
            </div>
        );
    }

    if (isNameInputVisible) {
        return (
            <section>
                <h1>Inserisci il tuo nome per iniziare il sondaggio</h1>
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <button onClick={() => setIsNameInputVisible(false)}>Inizia il Sondaggio</button>
                <ScoreList scores={survey.scores} />
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
                                {option}
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

const ScoreList = ({ scores = [] }) => {
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);

    return (
        <div>
            <h2>Punteggi degli altri utenti (ordinati dal più alto al più basso):</h2>
            <ul>
                {sortedScores.map((s, index) => (
                    <li key={index}>{s.name}: {s.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default SurveyPage;
