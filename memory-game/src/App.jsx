import { useEffect, useState } from 'react';
import ScoreBoard from './components/Scoreboard';
import Card from './components/Card';
import './App.css';

export default function App() {
    const [characters, setCharacters] = useState([]);
    const [clickedCards, setClickedCards] = useState(new Set());
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    // Fetch characters from Pokémon API
    useEffect(() => {
        async function fetchCharacters() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
                const data = await response.json();
                const results = data.results;

                // Get image URLs for each charact
                const withImages = await Promise.all(results.map(async (pokemon, index) => {
                    const res = await fetch(pokemon.url);
                    const pokeData = await res.json();
                    return {
                        id: index.toString(),
                        name: pokemon.name,
                        imgUrl: pokeData.sprites.front_default,
                    };
                }));

                setCharacters(shuffleArray(withImages));
            } catch (err) {
                console.error("Error fetching characters:", err);
            }
        }

        fetchCharacters();
    }, []);

    // Shuffle function to randomize cards
    function shuffleArray(array) {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    // End the game when a duplicate card is clicked
    function endGame() {
        alert("Game Over! Try again.");
        setClickedCards(new Set());
        setCurrentScore(0);
    }

    // Handle correct card click
    function handleScore(id) {
        const newSet = new Set(clickedCards);
        newSet.add(id);
        setClickedCards(newSet);

        const newScore = currentScore + 1;
        setCurrentScore(newScore);
        if (newScore > bestScore) {
            setBestScore(newScore);
        }

        setCharacters(shuffleArray(characters));
    }

    return (
        <div className="App">
            <h1>Memory Card Game</h1>
            <ScoreBoard current={currentScore} highScore={bestScore} />
            <Card
                characters={characters}
                images={true}
                clickedCards={clickedCards}
                scores={handleScore}
                endGame={endGame}
            />
        </div>
    );
}