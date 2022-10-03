import React from "react";
import axios from "axios";
import randomColor from "randomcolor";

import "./App.css";
class App extends React.Component {
  state = {
    quote: "",
    image: "",
  };

  componentDidMount() {
    this.fetchQuote();
    this.fetchImage();
  }

  fetchQuote = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const quote = response.data.slip.advice;
        this.setState({ quote });
      })
      .catch((error) => {});
  };
  fetchImage = () => {
    axios
      .get(
        "https://api.unsplash.com/photos/random?orientation=landscape&client_id=niqL_Tv7-W7erB4HHO1jibDwsOH76J91To4QRGwOvvc"
      )
      .then((response) => {
        const image = response.data.urls.regular;
        this.setState({ ...this.state, image });
      })
      .catch((error) => {});
  };
  random = () => {
    this.fetchImage();
    this.fetchQuote();
  };

  render() {
    const quote = this.state.quote;
    var color = randomColor();
    const style = {
      image: {
        backgroundImage: `url(${this.state.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      },
      text: {
        color,
        border:`3px groove ${color}`
      },
      button:{
        backgroundColor:color,
        border:"none",
        width:"10%",
        padding:"10px"
      }
    };
    return (
      <div className="main" style={style.image}>
        {" "}
        <h1 className="text" style={style.text}>{quote}</h1>
        <button className="btn btn-primary" onClick={this.random} style={style.button}>
          Next
        </button>
      </div>
    );
  }
}
export default App;
