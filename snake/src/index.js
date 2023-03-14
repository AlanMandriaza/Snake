import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

const ROWS = 20;
const COLS = 20;

const Board = ({ snake, food }) => {
  const grid = [];

  // Crea la cuadrícula de juego
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isSnake = snake.some((cell) => cell.x === col && cell.y === row);
      const isFood = food.x === col && food.y === row;
      const cellClass = `cell${isSnake ? ' snake' : ''}${isFood ? ' food' : ''}`;
      grid.push(<div key={`${col}-${row}`} className={cellClass}></div>);
    }
  }

  return <div className="board">{grid}</div>;
};

const GameOver = ({ score, onRestart }) => {
  return (
    <div className="game-over">
      <h1>Game Over</h1>
      <p>Your score was {score}</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

const Game = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);

  // Genera comida aleatoria
  const generateFood = () => {
    const food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    return food;
  };

  // Maneja las teclas de dirección del usuario
  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 37: // Left arrow
        if (direction !== 'right') {
          setDirection('left');
        }
        break;
      case 38: // Up arrow
        if (direction !== 'down') {
          setDirection('up');
        }
        break;
      case 39: // Right arrow
        if (direction !== 'left') {
          setDirection('right');
        }
        break;
      case 40: // Down arrow
        if (direction !== 'up') {
          setDirection('down');
        }
        break;
      default:
        break;
    }
  };

  // Mueve la serpiente en la dirección actual
  function moveSnake() {
    const newHead = { ...snake[0] };
    switch (direction) {
      case 'left':
        newHead.x -= 1;
        break;
      case 'up':
        newHead.y -= 1;
        break;
      case 'right':
        newHead.x += 1;
        break;
      case 'down':
        newHead.y += 1;
        break;
      default:
        break;
    }
    const newSnake = [newHead, ...snake.slice(0, -1)];
    // Si la cabeza de la serpiente está en la misma posición que la comida, come la comida y genera una nueva
    if (newHead.x === food.x && newHead.y === food.y) {
      setSnake(newSnake);
      setFood(generateFood());
      setScore(score + 1);
      setSpeed(speed - 5);
    } else {
      // Si no, solo mueve la serpiente
      setSnake(newSnake);
    }
    // Si la cabeza de la serpiente toca el borde del tablero o a sí misma, termina el juego
    if (newHead.x < 0 || newHead.x > 19 || newHead.y < 0 || newHead.y > 19) {
      gameOver();
    } else {
      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === newHead.x && newSnake[i].y === newHead.y) {
          gameOver();
        }
      }
    }
  }

  function gameOver() {
    setGameOver(true);
  }

  function restartGame() {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('right');
    setFood(generateFood());
    setScore(0);
    setSpeed(200);
    setGameOver(false);
  }

  useEffect(() => {
    const timerId = setInterval(() => moveSnake(), speed);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      clearInterval(timerId);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [snake, direction, food, score, speed, gameOver]);

  return (
    <div className="game-container">
      <h1 className="title">Snake</h1>
      <p className="score">Score: {score}</p>
      <Board snake={snake} food={food} />
      {gameOver && (
        <div className="game-over">
          <h2>Game Over</h2>
          <p>Final score: {score}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;