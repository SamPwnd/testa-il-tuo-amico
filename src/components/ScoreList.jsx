const ScoreList = ({ scores = [] }) => {
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    return (
        sortedScores.length > 0 && (
            <div className="my-5 w-full">
                <h5 className="h5">Punteggi degli altri:</h5>
                <div className="scores mt-3">
                    <ul>
                        {sortedScores.map((s, index) => (
                            <li className="scores__score" key={index}><span className="text-primary-dark">{s.name}</span> : <span className="text-primary-light">{s.score}</span></li>
                        ))}
                    </ul>    
                </div>
            </div>
        )
    );
};

export default ScoreList;
