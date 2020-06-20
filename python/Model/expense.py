class Expense:
    def __init__(self, name, amount):
        self.amount = amount
        self.name = name

    def get_expense(self):
        return self.amount


    def get_name(self):
        return self.name