
import React, { Component } from 'react'

import './App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { value: '', list: [] };
    this.count = 0; 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  

  handleDone(e, id) {
    this.setState({
      list: this.state.list.map(item =>{
        if(item.id === id){
          item.done = !item.done;
          return item;
        }else{
          return item;
        }
      })
    })
    console.log(this.state.list)
  }

  handleDelete(e, id) {
    this.setState({
      list: this.state.list.filter(item => item.id !== id)
    })
    console.log(id)
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    this.count++;
    this.setState({
      list: [...this.state.list, {text: this.state.value , id: this.count, done: false}]
    })
    event.preventDefault();
  }



  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        
        <ul>
          {this.state.list.map((item) => {
            const c = (item.done)?"done" : "notdone"
            return <li className={c}>
              <p>{item.text}</p>
              <button onClick={(e)=>this.handleDone(e,item.id)}>ok</button>
              <button onClick={(e)=>this.handleDelete(e,item.id)}>Click me</button>
           </li>
          })}

        </ul> 
      </div>
    );
  }
}