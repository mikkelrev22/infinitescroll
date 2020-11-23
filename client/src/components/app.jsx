import React from 'react'
import axios from 'axios'

class App extends React.Component {
  constructor () {
    super ()
    this.state = {
      value: '',
      return: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (e) => {
    this.setState({value: e.target.value})
  }
  handleSubmit = () => {
    alert('hello')
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Query:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  } 
}
export default App