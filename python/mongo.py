import pymongo
CLIENT = pymongo.MongoClient("mongodb://localhost:27017/")

def create_db(db_name):
    if not check_db_exists(db_name):
        db_name = CLIENT[db_name]
        print('created database:'+str(db_name.name))
        return db_name
    return db_name

def drop_db(db_name):
    pass

def get_db_list():
    return CLIENT.list_database_names()

def check_db_exists(db_name):
    if db_name in get_db_list():
        return True
    return False

def create_collection(db_name,collection_name):
    if not check_collection_exists(db_name,collection_name):
        collection_name=db_name[collection_name]
        return collection_name
    return collection_name

def drop_collection(db_name,collection_name):
    pass

def get_collection_list(db_name):
    return db_name.list_collection_names()

def check_collection_exists(db_name,collection_name):
    if collection_name in get_collection_list(db_name):
        return True
    return False
if __name__ == "__main__":
    print('====DROP====')
    print(get_db_list())
    db = create_db('user')
    print(get_collection_list(db))
    collection = create_collection(db,'admin')
    print(get_collection_list(db))