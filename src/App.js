import React from "react";
import Toggle from 'react-toggle'
import "./style.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

export default class App extends React.Component {
  state = {
    loggedIn: true,
    name: 'Utpal',
    date: new Date(),
    dark: false,
    incomes: [],
    expenses: [],
    success: null,
    failure: null,
  };

  componentDidMount(){
    document.body.style.background = "#e9ecef";
    let date = new Date()
    let y = date.getFullYear();
    let m = String(date.getMonth()+1)
    m = m.length===1 ? '0'+m : m;
    let day = String(date.getDate());
    day = day.length===1 ? '0'+day : day;
    date = y+'-'+m+'-'+day;
    fetch('http://127.0.0.1:5000/' + date).then(res => res.json()).then(data => {
      this.setState({
        incomes: data.incomes,
        expenses: data.expenses,
      });
    });
  }

  handleIncomeName = i => e => {
    let incomes = [...this.state.incomes];
    let amount = Object.values(incomes[i])[0];
    let newObj = {};
    newObj[e.target.value] = typeof(amount)=='undefined'?0:Number(amount);
    incomes[i] = newObj;
    this.setState({
      incomes
    });
  };

  handleIncomeAmount = i => e => {
    let incomes = [...this.state.incomes];
    let key = Object.keys(incomes[i]);
    let newObj = {};
    key = typeof(key)=='undefined'?'':key;
    newObj[key] = Number(e.target.value);
    incomes[i] = newObj;
    this.setState({
      incomes
    });
  };

  handleExpenseName = i => e => {
    let expenses = [...this.state.expenses];
    let amount = Object.values(expenses[i])[0];
    let newObj = {};
    newObj[e.target.value] = typeof(amount)=='undefined'?0:Number(amount);
    expenses[i] = newObj;
    this.setState({
      expenses
    });
  };

  handleExpenseAmount = i => e => {
    let expenses = [...this.state.expenses];
    let key = Object.keys(expenses[i]);
    let newObj = {};
    key = typeof(key)=='undefined'?'':key;
    newObj[key] = Number(e.target.value);
    expenses[i] = newObj;
    this.setState({
      expenses
    });
  };

  handleIncomeDelete = i => e => {
    e.preventDefault();
    let incomes = [
      ...this.state.incomes.slice(0, i),
      ...this.state.incomes.slice(i + 1)
    ];
    this.setState({
      incomes
    });
  };

  handleExpenseDelete = i => e => {
    e.preventDefault();
    let expenses = [
      ...this.state.expenses.slice(0, i),
      ...this.state.expenses.slice(i + 1)
    ];
    this.setState({
      expenses
    });
  };

  addIncome = e => {
    e.preventDefault();
    let incomes = this.state.incomes.concat({});
    this.setState({
      incomes
    });
  };

  addExpense = e => {
    e.preventDefault();
    let expenses = this.state.expenses.concat({});
    this.setState({
      expenses
    });
  };

  calculate = c => {
    var total_income = 0;
    var total_expense = 0;
    this.state.incomes.forEach(income => {
      total_income += Number(income[Object.keys(income)]);
    });
    this.state.expenses.forEach(expense => {
      total_expense += Number(expense[Object.keys(expense)]);
    });
    if (total_income > total_expense) {
      var profit = total_income - total_expense;
      alert("Profit : Rs." + profit);
    } else {
      var loss = total_expense - total_income;
      alert("Loss : Rs." + loss);
    }
    //fetch api POST request
    fetch('http://127.0.0.1:5000/', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
      }).then(res=>res.json())
        .then(res => this.setState({
          incomes:res.incomes,
          expenses:res.expenses
        }));
  };

  switchTheme = s => {
    let dark = !this.state.dark;
    this.setState({
      dark
    });
    document.getElementsByTagName("html")[0].classList.toggle("dark");
  }
  onSuccess = s => {
    console.log(s);
    let loggedIn = true;
    let success = s;
    this.setState({
      loggedIn,
      success
    });
  }

  onFailure = s => {
    console.log(s);
    let loggedIn = false;
    this.setState({
      loggedIn
    });
  }

  changeDate = d => {
    let date = d;
    this.setState({
      date
    });
    let y = date.getFullYear();
    let m = String(date.getMonth()+1)
    m = m.length===1 ? '0'+m : m;
    let day = String(date.getDate());
    day = day.length===1 ? '0'+day : day;
    date = y+'-'+m+'-'+day;
    // fetch api GET request
    fetch('http://127.0.0.1:5000/'+date).then(res => res.json()).then(data => {
      this.setState({
        incomes: data.incomes,
        expenses: data.expenses,
      });
    });
  }

  render() {
    return (
      <div id='app'>
      {this.state.loggedIn &&
      <div>
              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle style={{width:'100%'}} as={Button} variant="outline-success" eventKey="0">
                      <h2>{String(this.state.date).slice(3,15)}</h2>
                    </Accordion.Toggle>
                  </Card.Header>
                <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Calendar
                onChange={this.changeDate}
                value={this.state.date}
              /></Card.Body>
              </Accordion.Collapse>
              </Card>
              </Accordion>
        
        <div>
        <Button
          size='lg'
          variant='outline-primary'
          onClick={this.addIncome}>
          Add Income
        </Button>
        &nbsp;
        <Button
          size='lg'
          variant='outline-danger'
          onClick={this.addExpense}>
          Add Expense
        </Button>
        <br />
        <br />
        <div>
          {this.state.incomes.map((income, index) => (
            <span key={index}>
              <input
              style={this.state.dark ? {backgroundColor:'#bb86fc'} : {backgroundColor:'#bcdb9d'}}
              id="income"
              type="text"
              value={Object.keys(income)}
              onChange={this.handleIncomeName(index)}
              placeholder="Enter Item" />
              &nbsp;
              <input
                style={this.state.dark ? {backgroundColor:'#bb86fc'} : {backgroundColor:'#bcdb9d'}}
                id="income"
                type="number"
                onChange={this.handleIncomeAmount(index)}
                value={income[Object.keys(income)]}
                placeholder="Enter Amount in Rs."
              />
              &nbsp;
              <Button
                variant='outline-dark'
                onClick={this.handleIncomeDelete(index)}>X</Button>
              &nbsp;
              <br />
              <br />
            </span>
          ))}
        </div>
        <div>
          {this.state.expenses.map((expense, index) => (
            <span key={index}>
              <input
                style={this.state.dark ? {backgroundColor:'#e1a0b0'} : {backgroundColor:'#eea189'}}
                id="expense"
                onChange={this.handleExpenseName(index)}
                value={Object.keys(expense)}
                type="text" placeholder="Enter Item" />
              &nbsp;
              <input
                style={this.state.dark ? {backgroundColor:'#e1a0b0'} : {backgroundColor:'#eea189'}}
                id="expense"
                type="number"
                onChange={this.handleExpenseAmount(index)}
                value={expense[Object.keys(expense)]}
                placeholder="Enter Amount in Rs."
              />
              &nbsp;
              <Button
                variant='outline-dark'
                onClick={this.handleExpenseDelete(index)}>X</Button>
              &nbsp;
              <br />
              <br />
            </span>
          ))}
        </div>
        &nbsp;
        {(this.state.incomes.length > 0 || this.state.expenses.length > 0) && (
          <Button
            variant='outline-dark'
            onClick={this.calculate}>
            CALCULATE
          </Button>)}
      </div>
      </div>}
      </div>
    );
  }
}
