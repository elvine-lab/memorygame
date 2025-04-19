export default function ScoreBoard({ current, highScore }) {
    return (
      <div className="scoreboard">
        <p className="current-score">Your Score: {current}</p>
        <p className="high-score">High Score: {highScore}</p>
      </div>
    )
  }
  