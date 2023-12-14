from flask import jsonify

mysql = None

# FOR THE SET DATABASE DINHI IPASA TONG GI INITIALIZE NIMO SA MAIN.PY
def set_database(mysql_instance):
    global mysql
    mysql = mysql_instance
    
    
# THESE TWO BELOW GETS A CURSOR WHICH ALLOWS YOU TO USE QUERIES
def get_connection():
    return mysql.connection

def get_cursor():
    return get_connection().cursor()

# para di redundant ang cursor
# NOTE: Gi initialize daan ang params para pwede ra siya mahimog optional
def execute(query, params=()):
  cur = get_cursor()
  cur.execute(query, params)
  return cur

def fetchone(query, params=()):
  cur = execute(query, params)
  return cur.fetchone()

def fetchall(query, params=()):
  cur = execute(query, params)
  return cur.fetchall()