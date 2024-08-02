import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import EditSurvey from "./EditSurvey";
import { QUESTIONS } from "../utils/questions";
import colorMapping from "../utils/colorMapping";
import Share from "./Share";

const InitSurvey = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState({
        createdBy: '',
        questions: QUESTIONS.map(question => ({
            ...question,
            correctOption: null // Inizialmente nessuna opzione selezionata
        })),
        scores: []
    });
    const [surveyComplete, setSurveyComplete] = useState(false); // Stato per tracciare il completamento del sondaggio
    const [surveyLink, setSurveyLink] = useState('');
    const [backgroundColor, setBackgroundColor] = useState(''); // Stato per il colore di sfondo

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDataUpdate = (questionID, correctOption) => {
        // Aggiorna l'opzione selezionata dall'utente nell'oggetto data
        const updatedQuestions = data.questions.map(question =>
            question.questionID === questionID
                ? { ...question, correctOption }
                : question
        );
        setData(prevData => ({ ...prevData, questions: updatedQuestions }));

        // Cambia il colore di sfondo se è la domanda del colore preferito (supponiamo che questionID 1 sia la domanda del colore preferito)
        if (questionID === 1) {
            setBackgroundColor(colorMapping[correctOption.toLowerCase()] || "");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData(prevData => ({
            ...prevData,
            createdBy: name
        }));
    }

    useEffect(() => {
        if (surveyComplete) {
            async function createNewSurvey() {
                // Filtra le domande per includere solo quelle con una correctOption non null
                const filteredQuestions = data.questions.filter(question => question.correctOption !== null);

                const newSurvey = {
                    ...data,
                    questions: filteredQuestions
                };

                try {
                    const docRef = await addDoc(collection(db, "quizes"), newSurvey);
                    const surveyLink = `${window.location.origin}/#/quizes/${docRef.id}`;
                    setSurveyLink(surveyLink);
                    console.log('Survey successfully added:', newSurvey);
                } catch (error) {
                    console.error('Error adding survey: ', error);
                }
            }
            createNewSurvey();
        }
    }, [surveyComplete, data]);

    const handleSurveyComplete = () => {
        setBackgroundColor("#FDF0D5");
        setSurveyComplete(true);
    };

    return (
        <div className="section-container flex flex-col items-center mb-20">
            <div className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container"
                style={{ backgroundColor: backgroundColor }}
            >
                {data.createdBy ?
                    <EditSurvey 
                        onDataUpdate={handleDataUpdate} 
                        onSurveyComplete={handleSurveyComplete}
                        surveyLink={surveyLink}
                    />
                    :
                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                        <h1 className="h1 text-primary-light">CREA IL TUO QUIZ!</h1>
                        <p className="h2 text-primary-dark">Inserisci il tuo nome</p>
                        <input className="input-text w-full" type="text" value={name} name="name" onChange={handleName} placeholder="Ad esempio (Marco)" required/>
                        <button type="submit" className="btn btn--primary w-full mt-3">AVANTI</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default InitSurvey;
