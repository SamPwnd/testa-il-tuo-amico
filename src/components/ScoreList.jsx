const ScoreList = ({ scores = [] }) => {
    const sortedScores = scores.sort((a, b) => b.score - a.score).slice(0, 10);
    return (
        sortedScores.length > 0 && (
            <div className="mt-4">
                <h6 className="h6">Punteggi degli altri utenti (ordinati dal più alto al più basso):</h6>
                <ul>
                    {sortedScores.map((s, index) => (
                        <li key={index}>{s.name}: {s.score}</li>
                    ))}
                </ul>
            </div>
        )
    );
};

export default ScoreList;
