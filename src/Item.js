import React, { Component } from 'react'

export default class Item extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onListChange(this.props.item);
  }
  render() {
    return (
      <div>
        <p>{this.props.item}</p>
        <button >ok</button>
        <button onClick={() => this.handleClick()}>Click me</button>
      </div>
    )
  }
}
