import sqlite3


connection = sqlite3.connect('profiles.db')
cursor = connection.cursor()


with open('/Users/myasin/Documents/thesis/app/backend/pytorch_pytorch.csv', 'r') as file:
    records = 0
    for row in file:
        cursor.executemany('INSERT INTO profiles VALUES (?,?,?,?,?,?,?,?)', row.split(","))
        connection.commit()
        records += 1

connection.close()
print("Imported {} records".format(records))