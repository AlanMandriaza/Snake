import React, { useState, useEffect } from 'react';
import Board from './Board.jsx';
import './Game.css';

const Game = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState('right');
  const [food, setFood] = useState(generateFood());
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [gameOver, setGameOver] = useState(false);

  function generateFood() {
    // Genera un objeto aleatorio { x, y } en un rango de 0-19
    const food = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
    // Si la comida está en la misma posición que la serpiente, genera una nueva posición
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === food.x && snake[i].y === food.y) {
        return generateFood();
      }
    }
    return food;
  }

  function handleKeyPress(event) {
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
  }

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
    document.addEventListener('keydown', handleKeyPress);
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

