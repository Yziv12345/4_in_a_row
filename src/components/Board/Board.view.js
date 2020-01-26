import "./Board.css";
import { Col, Container, Nav } from "react-bootstrap";
import React, { Component } from "react";
import GameStatusBoard from "../GameStatusBoard/GameStatusBoard.view";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: "",
      player1Wins: 0,
      player2Wins: 0
    };

    this.play = this.play.bind(this);
  }

  // Starts new game
  initBoard() {
    // Create a blank 6x7 matrix
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) {
        row.push(null);
      }
      board.push(row);
    }

    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      message: ""
    });
  }

  togglePlayer() {
    return this.state.currentPlayer === this.state.player1
      ? this.state.player2
      : this.state.player1;
  }

  play(c) {
    if (!this.state.gameOver) {
      // Place piece on board
      let board = this.state.board;
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = this.state.currentPlayer;
          break;
        }
      }

      // Check status of board
      let result = this.checkAll(board);
      if (result === this.state.player1) {
        let numOfwins1 = this.state.player1Wins + 1;
        this.setState({
          board,
          gameOver: true,
          message: `Player 1 - ${this.props.player1Name} (red) wins!`,
          player1Wins: numOfwins1
        });
      } else if (result === this.state.player2) {
        let numOfwins2 = this.state.player2Wins + 1;
        this.setState({
          board,
          gameOver: true,
          message: `Player 2 - ${this.props.player2Name} (yellow) wins!`,
          player2Wins: numOfwins2
        });
      } else if (result === "draw") {
        this.setState({ board, gameOver: true, message: "Draw game." });
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() });
      }
    } else {
      this.setState({ message: "Game over. Please start a new game." });
    }
  }

  checkVertical(board) {
    // Check only if row is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c] &&
            board[r][c] === board[r - 2][c] &&
            board[r][c] === board[r - 3][c]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }
  checkHorizontal(board) {
    // Check only if column is 3 or less
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r][c + 1] &&
            board[r][c] === board[r][c + 2] &&
            board[r][c] === board[r][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }
  checkDiagonalRight(board) {
    // Check only if row is 3 or greater AND column is 3 or less
    for (let r = 3; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c + 1] &&
            board[r][c] === board[r - 2][c + 2] &&
            board[r][c] === board[r - 3][c + 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }
  checkDiagonalLeft(board) {
    // Check only if row is 3 or greater AND column is 3 or greater
    for (let r = 3; r < 6; r++) {
      for (let c = 3; c < 7; c++) {
        if (board[r][c]) {
          if (
            board[r][c] === board[r - 1][c - 1] &&
            board[r][c] === board[r - 2][c - 2] &&
            board[r][c] === board[r - 3][c - 3]
          ) {
            return board[r][c];
          }
        }
      }
    }
  }
  checkDraw(board) {
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 7; c++) {
        if (board[r][c] === null) {
          return null;
        }
      }
    }
    return "draw";
  }
  checkAll(board) {
    return (
      this.checkVertical(board) ||
      this.checkDiagonalRight(board) ||
      this.checkDiagonalLeft(board) ||
      this.checkHorizontal(board) ||
      this.checkDraw(board)
    );
  }

  componentWillMount() {
    this.initBoard();
  }

  componentDidUpdate() {
    if (this.state.gameOver) {
      alert(`${this.state.message}`);
      setTimeout(this.initBoard(), 4000);
    }
  }

  render() {
    return (
      <Container>
        <Col>
          <Nav variant="tabs" defaultActiveKey="link-1">
            <Nav.Item>
              <Nav.Link eventKey="link-1">Active</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/home">home</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <div>
            <table>
              <thead></thead>
              <tbody>
                {this.state.board.map((row, i) => (
                  <Row key={i} row={row} play={this.play} />
                ))}
              </tbody>
            </table>
            <p className="message">{this.state.message}</p>
          </div>
          <GameStatusBoard
            player1Name={this.props.player1Name}
            player2Name={this.props.player2Name}
            currentPlayer={this.state.currentPlayer}
            player1Wins={this.state.player1Wins}
            player2Wins={this.state.player2Wins}
          />
        </Col>
      </Container>
    );
  }
}

const Row = ({ row, play }) => {
  return (
    <tr>
      {row.map((cell, i) => (
        <Cell key={i} value={cell} columnIndex={i} play={play} />
      ))}
    </tr>
  );
};

const Cell = ({ value, columnIndex, play }) => {
  let color = "white";
  if (value === 1) {
    color = "red";
  } else if (value === 2) {
    color = "yellow";
  }

  return (
    <td>
      <div
        className="cell"
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div className={color}></div>
      </div>
    </td>
  );
};
export default Board;
