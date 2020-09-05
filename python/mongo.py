'''
author: Utpal Das
'''
import pymongo
import json
from datetime import datetime, timedelta

class MongoDB:
    def __init__(self,url="mongodb://localhost:27017/", db_name='moneydb', col_name='moneypage'):
        self.myclient = pymongo.MongoClient(url)
        self.dblist = (self.myclient.list_database_names())
        self.db_name = self.create_db(db_name)
        self.col_name = self.create_collection(col_name)


    def create_db(self,db_name):
        if db_name not in self.dblist:
            self.db_name = self.myclient[db_name]
            print('Created DB : %s' % db_name)
            return self.db_name
        else:
            print('%s already exists' % db_name)
            return self.myclient[db_name]

    def create_collection(self,col_name):
        collist = self.db_name.list_collection_names()
        if col_name in collist:
            print("%s already exists." % col_name)
            return self.db_name[col_name]
        else:
            self.col_name = self.db_name[col_name]
            print('Create collection : %s',self.col_name)
            return self.col_name

    def read_transaction(self,data):
        pk = data
        try:
            data = self.col_name.find({'date':pk})[0]
        except:
            data = {}
        if (data):
            return json.dumps(data, default=str)
        else:
            data['date'] = pk
            data['incomes'] = []
            data['expenses'] = []
            return json.dumps(data, default=str)

    def insertorupdate_transaction(self,data):
        data = json.loads(data)
        pk = (datetime.strptime(data['date'][0:10],'%Y-%m-%d')+timedelta(1)).strftime('%Y-%m-%d')
        data['date'] = pk
        data['success'] = ''
        data['failure'] = ''
        self.col_name.update({ 'date': pk },data, upsert=True )
        data = (self.col_name.find({'date':pk})[0])
        return json.dumps(data, default=str)

    def delete_transaction(self):
        self.col_name.drop()


