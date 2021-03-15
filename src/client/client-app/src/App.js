import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import Demands from './components/demands';

    class App extends Component {

      state = {
        demands: []
      }

      componentDidMount() {
        fetch('http://localhost:8000/api/v1/demand/')
        .then(res => res.json())
        .then((data) => {
          this.setState({ demands: data })
        })
        .catch(console.log)
      }

      render () {
        return (
          <Demands demands={this.state.demands} />
        );
      }
    }



export default App;
