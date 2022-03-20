import "./styles.css";
import { useState } from "react";

export default function App() {
  const [state, setState] = useState({
    tasks: [
      "complete assignment",
      "complete activity",
      "start week 3",
      "complete task"
    ]
  });

  const handleSubmit = (task) => {
    setState({ tasks: [...state.tasks, task] });
  };

  const handleDelete = (index) => {
    const newArr = [...state.tasks];
    newArr.splice(index, 1);
    setState({ tasks: newArr });
  };
  return (
    <div className="wrapper">
      <div className="card frame">
        <SubmitForm onFormSubmit={handleSubmit} />
        <TodoList tasks={state.tasks} onDelete={handleDelete} />
      </div>
    </div>
  );
}

function SubmitForm(props) {
  const [state, setState] = useState({ term: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.term === "") return;
    props.onFormSubmit(state.term);
    setState({ term: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        placeholder="Enter Item"
        value={state.term}
        onChange={(e) => setState({ term: e.target.value })}
      />
      <button className="button">Submit</button>
    </form>
  );
}
const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return (
      <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    );
  });
  return <div className="list-wrapper">{todos}</div>;
};

const Todo = (props) => {
  return (
    <div className="list-item">
      {props.content}
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
        type="button"
        class="close"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
