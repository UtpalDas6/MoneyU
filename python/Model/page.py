from income import Income
from expense import Expense

class Page:
    def __init__(self,date,income,expense):
        '''
        date here is date time python object
        income is a list of income objects eg - [i1(name,amount),i2....]
        expense is a list of expense objects eg - [e1(name,amount),e2....]
        '''
        self.date = date
        self.income = income
        self.expense = expense
    
    def get_page_details(self):
        return self.date,self.income,self.expense

    def get_total_income(self):
        total = 0
        for i in self.income:
            total += i.get_income()
        return total

    def get_total_expense(self):
        total = 0
        for e in self.expense:
            total += e.get_expense()
        return total

    def get_profit_loss(self):
        if self.get_total_income() > self.get_total_expense():
            return "Profit = Rs "+str(self.get_total_income() - self.get_total_expense())
        elif self.get_total_income() < self.get_total_expense():
            return "Loss = Rs "+str(self.get_total_expense() - self.get_total_income())
        else:
            return "No Profit No Loss"


if __name__ == "__main__":
    inclist = []
    explist = []
    i1 = Income('Box1',1200)
    i2 = Income('Box2',1400)
    e1 = Expense('Babloo',200)
    inclist.append(i1)
    inclist.append(i2)
    explist.append(e1)
    p = Page('1-1-2020',inclist,explist)
    print(p.get_profit_loss())