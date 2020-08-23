import React, {useState} from "react";
import Toggle from 'react-toggle'
import "./style.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class App extends React.Component {
  state = {
    date: new Date(),
    dark: false,
    incomes: [],
    expenses: [],
  };

  handleIncome = i => e => {
    let incomes = [...this.state.incomes];
    incomes[i] = e.target.value;
    this.setState({
      incomes
    });
  };

  handleExpense = i => e => {
    let expenses = [...this.state.expenses];
    expenses[i] = e.target.value;
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
    let incomes = this.state.incomes.concat([""]);
    this.setState({
      incomes
    });
  };

  addExpense = e => {
    e.preventDefault();
    let expenses = this.state.expenses.concat([""]);
    this.setState({
      expenses
    });
  };

  calculate = c => {
    var total_income = 0;
    var total_expense = 0;
    this.state.incomes.forEach(income => {
      total_income += Number(income);
    });
    this.state.expenses.forEach(expense => {
      total_expense += Number(expense);
    });
    if (total_income > total_expense) {
      var profit = total_income - total_expense;
      alert("Profit : Rs." + profit);
    } else {
      var loss = total_expense - total_income;
      alert("Loss : Rs." + loss);
    }
  };

  switchTheme = s => {
    let dark = !this.state.dark;
    this.setState({
      dark
    });
    document.getElementsByTagName("html")[0].classList.toggle("dark");
  }

  changeDate = d => {
    let date = d;
    this.setState({
      date
    });
  }

  render() {
    return (
      <div id='app'>
        <h1> <span style={{color:'#1DCDFE'}}>Money</span>U
        <span style={{position: 'absolute', right: '0'}} >
        <Toggle
          icons={{
            checked: <span style={{fontSize:'16px',color:'black'}}>&#9728;&#65039;</span>,
            unchecked: <span style={{fontSize:'18px',color:'white'}}>&#9790;</span>,
          }}
          defaultChecked={false}
          onChange={this.switchTheme} />
        </span>
        </h1>
        <h3>A simple income expense app</h3>
        <div className="grow" style={
          {backgroundColor: '#80CFD5'}}>
          <h2 style={{color: '#FFFFFF'}}>{String(this.state.date).slice(3,15)}</h2>
          <Calendar
            onChange={this.changeDate}
            value={this.state.date}
          />
        </div>
        
        <div>
        <button
          style={this.state.dark ? {backgroundColor:'#6200EE'} : {backgroundColor:'#1c85db'}}
          id="ai"
          onClick={this.addIncome}>
          Add Income
        </button>
        &nbsp;
        <button
          style={this.state.dark ? {backgroundColor:'#CF6680'} : {backgroundColor:'#B00020'}}
          id="ae"
          onClick={this.addExpense}>
          Add Expense
        </button>
        <br />
        <br />
        <div>
          {this.state.incomes.map((income, index) => (
            <span key={index}>
              <input
              style={this.state.dark ? {backgroundColor:'#bb86fc'} : {backgroundColor:'#bcdb9d'}}
              id="income"
              type="text"
              placeholder="Enter Item" />
              &nbsp;
              <input
                style={this.state.dark ? {backgroundColor:'#bb86fc'} : {backgroundColor:'#bcdb9d'}}
                id="income"
                type="number"
                onChange={this.handleIncome(index)}
                value={income}
                placeholder="Enter Amount in Rs."
              />
              &nbsp;
              <button
                style={this.state.dark ? {backgroundColor:'white',color:'black'} : {backgroundColor:'black',color:'white'}}
                onClick={this.handleIncomeDelete(index)}>X</button>
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
                type="text" placeholder="Enter Item" />
              &nbsp;
              <input
                style={this.state.dark ? {backgroundColor:'#e1a0b0'} : {backgroundColor:'#eea189'}}
                id="expense"
                type="number"
                onChange={this.handleExpense(index)}
                value={expense}
                placeholder="Enter Amount in Rs."
              />
              &nbsp;
              <button
                style={this.state.dark ? {backgroundColor:'white',color:'black'} : {backgroundColor:'black',color:'white'}}
                onClick={this.handleExpenseDelete(index)}>X</button>
              &nbsp;
              <br />
              <br />
            </span>
          ))}
        </div>
        &nbsp;
        {(this.state.incomes.length > 0 || this.state.expenses.length > 0) && (
          <button
            style={this.state.dark ? {backgroundColor:'white',color:'black'} : {backgroundColor:'black',color:'white'}}
            id="calculate"
            onClick={this.calculate}>
            CALCULATE
          </button>)}
      </div>
      </div>
    );
  }
}
