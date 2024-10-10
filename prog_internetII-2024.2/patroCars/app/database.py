import psycopg2

def get_db_connection():
    banco = psycopg2.connect(
        dbname='patrocars',
        user='postgres',
        password='123',
        host='localhost',
        port='5432'
    )
    return banco