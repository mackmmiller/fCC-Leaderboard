import React, { Component } from 'react';
import { Table } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state={
      sourceIsAlltime: undefined,
      users:[],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  fetchPast30() {
    return fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then(function(response) {
      return response.json();
    }).then(function(json) {
      return json;
    });
  }

  fetchAlltime() {
    return fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime').then(function(response) {
      return response.json();
    }).then(function(json) {
      return json;
    });
  }

  handleClick() {
    const sourceIsAlltime = this.state.sourceIsAlltime;
    sourceIsAlltime ?
      this.fetchPast30().then(
        result => this.setState({
         sourceIsAlltime: false, users: result
       })):
      this.fetchAlltime().then(
        result => this.setState({
         sourceIsAlltime: true, users: result
       }));
  }

  componentDidMount() {
    this.fetchAlltime().then(result => this.setState({ sourceIsAlltime: true, users: result}));
  }

  render() {
    const { users } = this.state;
    let i=1;

    return (
      <div className="App container-fluid">

        <nav className="navbar fixed-top">
          <a className="navbar-brand" href="https://www.freecodecamp.org">
            <img alt="Brand" src="https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg" />
          </a>
          <ul className="nav">
            <button className="nav-item btn btn-primary" onClick={this.handleClick}>{this.state.sourceIsAlltime ? 'Past 30' : 'All time'}</button>
          </ul>
        </nav>

        <div id="resultTable" className="col-10 mx-auto">
          <h1>{this.state.sourceIsAlltime ? 'Top Scores of All Time' : 'Top Scores From the Last 30 Days'}</h1>
          <Table className="table table-hover">
            <thead>
              <tr>
                <th>Position</th>
                <th></th>
                <th>Username</th>
                <th>All Time Points</th>
                <th>Past 30 Days</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.username}>
                  <td>{i++}</td>
                  <td><img alt={user.username + "'s profile picture"} className="userimage" src={user.img} /></td>
                  <td>{user.username}</td>
                  <td>{user.alltime}</td>
                  <td>{user.recent}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <footer className="row justify-content-center">
          <p id="signature">Developed by <a href="http://www.mackmmiller.com/">Mackenzie Miller</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
