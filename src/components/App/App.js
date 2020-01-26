import {
  Form,
  Alert,
  InputGroup,
  Navbar,
  Row,
  Col,
  Container,
  Button,
  FormControl
} from "react-bootstrap";
import React, { Component } from "react";
import "./App.css";
import Board from "../Board/Board.view";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1Name: "",
      player2Name: "",
      gameFlag: false
    };
    this.textInput1 = React.createRef();
    this.textInput2 = React.createRef();
  }

  handleChange1() {
    const v1 = this.textInput1.current.value;
    this.setState({ player1Name: v1 });
  }

  handleChange2() {
    const v2 = this.textInput2.current.value;
    this.setState({ player2Name: v2 });
  }

  newGame() {
    if (
      this.state.player1Name === "" ||
      this.state.player2Name === "" ||
      this.state.player1Name === this.state.player2Name
    ) {
      return (
        <Alert variant="danger">Error : player names are empty or equals</Alert>
      );
    } else {
      this.setState({ gameFlag: true });
    }
  }

  render() {
    return (
      <div className={"main"}>
        <Container>
          <Row>
            <div className={"header"}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94cjLNEBCSsX6dgTbhPy4NA5WAlq38PVVGmWhrhKkCD20bTe7&s" />
              <h1>4 In A Row</h1>
              <p>online game</p>
            </div>
          </Row>
          <Row>
            <div className={"startnewgame"}>
              {!this.state.gameFlag && (
                <Col>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Enter player1 name
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      ref={this.textInput1}
                      onChange={() => this.handleChange1()}
                    />
                  </InputGroup>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroup-sizing-sm">
                        Enter player2 name
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                      ref={this.textInput2}
                      onChange={() => this.handleChange2()}
                    />
                  </InputGroup>
                </Col>
              )}
              {this.state.gameFlag && <Col></Col>}
              <Col>
                <div className={"btn"}>
                  <Button
                    variant="primary"
                    size="lg"
                    block
                    disabled={this.state.gameFlag}
                    onClick={() => this.newGame()}
                  >
                    Start a new game
                  </Button>
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <Col>
              {this.state.gameFlag && (
                <div className={"board"}>
                  <Board
                    player1Name={this.state.player1Name}
                    player2Name={this.state.player2Name}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
