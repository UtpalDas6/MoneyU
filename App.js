import React from "react";
import "./style.css";
export default class App extends React.Component {
  state = {
    incomes: [],
    expenses: []
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
      alert("Profit : " + profit);
    } else {
      var loss = total_expense - total_income;
      alert("Loss : " + loss);
    }
  };

  render() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = mm + "/" + dd + "/" + yyyy;
    return (
      <div>
        <h1>MoneyU</h1>
        <h3>A simple income expense app</h3>
        <h4>DATE : {"" + date}</h4>
        <button id="ai" onClick={this.addIncome}>
          Add Income
        </button>
        &nbsp;
        <button id="ae" onClick={this.addExpense}>
          Add Expense
        </button>
        &nbsp;
        {(this.state.incomes.length > 0 || this.state.expenses.length > 0) && (
          <button id="calculate" onClick={this.calculate}>
            CALCULATE
          </button>
        )}
        <br />
        <br />
        <div>
          {this.state.incomes.map((income, index) => (
            <span key={index}>
              <input id="income" type="text" placeholder="Enter Item" />
              &nbsp;
              <input
                id="income"
                type="number"
                onChange={this.handleIncome(index)}
                value={income}
                placeholder="Enter Amount"
              />
              &nbsp;
              <button onClick={this.handleIncomeDelete(index)}>X</button>
              &nbsp;
              <br />
              <br />
            </span>
          ))}
        </div>
        <div>
          {this.state.expenses.map((expense, index) => (
            <span key={index}>
              <input id="expense" type="text" placeholder="Enter Item" />
              &nbsp;
              <input
                id="expense"
                type="number"
                onChange={this.handleExpense(index)}
                value={expense}
                placeholder="Enter Amount"
              />
              &nbsp;
              <button onClick={this.handleExpenseDelete(index)}>X</button>
              &nbsp;
              <br />
              <br />
            </span>
          ))}
        </div>
      </div>
    );
  }
}
