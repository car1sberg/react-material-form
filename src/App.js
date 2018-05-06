
import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Table from './components/Table';

class App extends Component {
  state = {
    data: [],
    activeIndex: -1
  }

  handleDelete = (i) => {
    this.setState(state => ({
      data: state.data.filter((obj, j) => j !== i)
    }))
  }

  startEditing = (i) => {
    this.setState({ activeIndex: i })
  }

  stopEditing = () => this.setState({ activeIndex: -1 })

  handleChange = (e, name, i) => {
    const { value } = e.target;

    this.setState(state => ({
      data: state.data.map(
        (row, j) => j === i ? {...row, [name]: value} : row)
    }))
  }

  render() {
    const { data, activeIndex } = this.state;
    
    return (
      <MuiThemeProvider>
        <div className="App">
          <Form className="form" onSubmit={submit => this.setState({
            data: [...this.state.data, submit]
          })} />
          <Table 
            activeIndex={activeIndex}
            startEditing={this.startEditing}
            handleChange={this.handleChange}
            stopEditing={this.stopEditing}
            handleDelete={this.handleDelete}
            data={data} 
            header={[
              {
                name: 'First Name',
                prop: 'firstName'
              },
              {
                name: 'Last Name',
                prop: 'lastName'
              },
              {
                name: 'Email',
                prop: 'email'
              },
              {
                name: 'Password',
                prop: 'password'
              }
            ]} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;