import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/Header'
import About from './components/pages/About'

import AddTodo from './components/AddTodo'
import {v4 as uuid} from "uuid"; 

import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  state = {
    /*todos : [
      {
        id : uuid(),
        title: 'Take out the trash',
        completed : false
      },
      {
        id :uuid(),
        title: 'dinner cock',
        completed : false
      },
      {
        id : uuid(),
        title: 'wifer cock',
        completed : false
      }
    ]*/
      todos:[]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({ todos: res.data}))
  }

  delete = (id) => {
    //this.setState({todos : this.state.todos.filter(todo=> todo.id !== id)})
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>  this.setState({todos : this.state.todos.filter(todo=> todo.id !== id)}))
    
  }
  markComplete = (id) => {
       
    this.setState({ todos : this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })})
  } 

  addTodo = (title) => {
   /* const newTodo = {
      id: uuid(),
      title: title,
      completed: false
      this.setState({ todos : [...this.state.todos, newTodo]})
    }*/
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false
    })
    .then(res => this.setState({ todos : [...this.state.todos, res.data]}))
    
  }

  render() {
    console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="container">
              <Header/>

              <Route exact path="/" render={props =>(
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos todos = {this.state.todos} markComplete={this.markComplete}
                  delete = {this.delete}/>
                </React.Fragment>

              )} />

              <Route path = "/about" component = {About}/>



             
            </div>
            
          </header>
        </div>
      </Router>
    );
  }
}
export default App;
