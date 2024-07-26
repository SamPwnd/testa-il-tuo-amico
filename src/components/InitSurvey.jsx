import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, dataCollection } from "../firebase";
import EditSurvey from "./EditSurvey";
import { QUESTIONS } from "../utils/constants";
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

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDataUpdate = (questionID, correctOption) => {
        // Aggiorna l'opzione selezionata dall'utente nell'oggetto data
        const updatedQuestions = data.questions.map(question =>
            question.questionID === questionID
                ? { ...question, correctOption }
                : question
        );
        setData(prevData => ({ ...prevData, questions: updatedQuestions }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData( prevData => ({
            ...prevData,
            createdBy: name
        }))
    }

    useEffect(() => {
        if (surveyComplete) {
            async function createNewSurvey() {
                const newSurvey = { ...data };
                try {
                    const docRef = await addDoc(collection(db, "surveys"), newSurvey);
                    const surveyLink = `${window.location.origin}/surveys/${docRef.id}`;
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
        setSurveyComplete(true);
    };

    return (
        <div className="section-container flex flex-col items-center">
            <div className="init-survey w-full md:w-3/4 lg:w-1/2 text-center pt-9 pb-10 flex flex-col items-center section-container">
                {data.createdBy ?
                    <EditSurvey 
                        onDataUpdate={handleDataUpdate} 
                        onSurveyComplete={handleSurveyComplete}
                        surveyLink={surveyLink}
                    />
                    :
                    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                        <p className="h2 text-primary-dark">Inserisci il tuo nome</p>
                        <input className="input-text w-full" type="text" value={name} name="name" onChange={handleName} placeholder="Ad esempio (Marco)" required/>
                        <button type="submit">AVANTI</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default InitSurvey;