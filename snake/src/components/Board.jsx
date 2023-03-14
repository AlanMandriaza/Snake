import React from 'react';
import Snake from './Snake';
import './Board.css';

const Board = ({ snake, food }) => {
    const renderCells = () => {
        const cells = [];
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const cellClass = getCellClass(i, j);
                cells.push(<div key={`${i}-${j}`} className={`${cellClass} border`}></div>);
            }
        }
        return cells;
    };

    const getCellClass = (row, col) => {
        let cellClass = 'cell';
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === col && snake[i].y === row) {
                cellClass += ' snake';
                break;
            }
        }
        if (food.x === col && food.y === row) {
            cellClass += ' food';
        }
        return cellClass;
    };

    return <div className="board">{renderCells()}</div>;
};

export default Board;
