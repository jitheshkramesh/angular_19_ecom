import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.scss',
})
export class TicTacToeComponent {
board: string[] = Array(9).fill('');
  currentPlayer: 'X' | 'O' = 'X';
  winner: string | null = null;
  isDraw: boolean = false;

  winPatterns: number[][] = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  onCellClick(index: number) {
    // Prevent overwrite or playing after game ends
    if (this.board[index] || this.winner) return;

    this.board[index] = this.currentPlayer;

    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else if (this.board.every(cell => cell)) {
      this.isDraw = true;
    } else {
      this.togglePlayer();
    }
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWinner(): boolean {
    return this.winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      );
    });
  }

  resetGame() {
    this.board = Array(9).fill('');
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }
}
