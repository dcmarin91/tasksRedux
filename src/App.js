import React, { Component } from 'react';
import "./App.css";
import store from './store'

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {

  constructor(){
    super();

    this.state = { tasks: [], newTask: ""};
    store.subscribe( () => {
      this.setState({
        tasks: store.getState().tasks
      })
    });  
    this.handleChange = this.handleChange.bind(this);
    this.trackInput = this.trackInput.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  } 

  render(){
    return (
      <div className="wrapper">
          <div className="list">
            <h3>Por hacer:</h3>
            <ul className="todo">
              {this.state.tasks.map((task,index) =>
                <li className={task.done ? 'done' : ""} onClick={this.toggleTask} key={index}>{task.name}</li>
              )}
            </ul>
            <form onSubmit={this.addTask.bind(this)}>
            <input  type="text" id="new-task" onChange={this.trackInput} value={this.state.newTask} placeholder="Ingresa una tarea y oprime Enter" />
            </form>
          </div>      
      </div>
    );
  }

  trackInput(e){
    this.setState({
      newTask : e.target.value,
      error : false
    });
  }
  handleChange(e) {
    this.setState({ value: e.target.value });
 }

  addTask(e){
    e.preventDefault();
    const task = { name : this.state.newTask, done : false };
    store.dispatch({
      type: "ADD_TASK",
      task,
    })
    this.setState({
      newTask: ''
    })    
  }

  toggleTask(e){
    const index = this.state.tasks.findIndex(task => 
      task.name === e.target.innerHTML
    );
    store.dispatch({
      type: 'TOGGLE_DONE',
      index
    });
  }  
}

export default App;
