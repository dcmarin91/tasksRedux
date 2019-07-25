import { createStore } from 'redux';

const reducer = (state, action) => {
  if(action.type === "ADD_TASK") {
    return { 
      ...state,
      tasks: state.tasks.concat(action.task)
    };
  } else if (action.type === "TOGGLE_DONE") {
    return {
      ...state,
      tasks: state.tasks.map((task, index) =>
      index === action.index ? {...task, done: !task.done}: task
      )
    }
  }

  return state;
}

export default createStore(reducer,  { tasks: [] 
});