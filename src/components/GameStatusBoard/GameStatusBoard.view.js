import "./GameStatusBoard.css";
import React, { Component } from "react";

import { Table } from "react-bootstrap";

class GameStatusBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatusFlag: false
    };
  }

  componentWillMount() {
    this.setState({ gameStatusFlag: true });
  }

  renderTable() {
    let curr1 = this.props.currentPlayer === 1 ? "Yes" : "No";
    let curr2 = curr1 === "Yes" ? "No" : "Yes";
    return (
      <div className={"boardtable"}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Players</th>
              <th>Curr Player</th>
              <th>Color</th>
              <th>Number Of Wins</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 - {this.props.player1Name}</td>
              <td>{curr1}</td>
              <td>Red</td>
              <td>{this.props.player1Wins}</td>
            </tr>
            <tr>
              <td>2 - {this.props.player2Name}</td>
              <td>{curr2}</td>
              <td>Yellow</td>
              <td>{this.props.player2Wins}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    return this.state.gameStatusFlag && this.renderTable();
  }
}

export default GameStatusBoard;
