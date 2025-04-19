export default function Card({ characters, images, clickedCards, scores, endGame }) {
    function handleClick(e) {
      const btnID = e.currentTarget.id
      if (clickedCards.has(btnID)) {
        endGame()
        return
      }
      scores(btnID)
    }
  
    if (!images || characters.length === 0) {
      return (
        <div>
          Card images loading...
        </div>
      )
    }
  
    return (
      <div className="cards">
        {characters.map((character) => (
          <button
            className="character-btn"
            id={character.id}
            key={character.id}
            onClick={handleClick}
          >
            <div className="image-container">
              <img src={character.imgUrl} alt={character.name} />
              <p>{character.name}</p>
            </div>
          </button>
        ))}
      </div>
    )
  }
  