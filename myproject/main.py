from flask import Flask, request, jsonify
from users import getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductSpecificById, getAllCategories
from database import set_database
from flask_cors import CORS
from flask_mysqldb import MySQL
from database import fetchone, execute

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Database Information
app.config["MYSQL_HOST"]= "localhost"
app.config["MYSQL_USER"]= "root"
app.config["MYSQL_PASSWORD"]= "root"
app.config["MYSQL_DB"]= "store_inventory"
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
app.config["MYSQL_AUTOCOMMIT"] = True

# Placed for the Initialization of MYSQL 
mysql = MySQL(app)
# USE THE FUNCTION IN DATABASE.PY TO ESTABLISH THE CONNECTION
set_database(mysql)

# Your routes go here
@app.route("/")
def hello_world():
    return "<p>Hello, shit!</p>"

@app.route("/products", methods=["GET", "POST"])
def products():
    if request.method == "POST":
        data = request.get_json()
        result = createProduct(data)
    else:
        result = getAllProducts()
    return jsonify(result)

@app.route("/products/<id>", methods=["GET", "PUT", "DELETE"])
def product_by_id(id):
    if request.method == "GET":
        result = getProductById(id)
    elif request.method == "PUT":
        data = request.get_json()
        result = updateProduct(id, data)
    else:
        result = deleteProduct(id)
    return jsonify(result)

@app.route("/specProduct/<id>", methods=["GET"])
def spec_product_by_id(id):
    result = getProductSpecificById(id)
    return jsonify(result)

# 
@app.route("/tableCategories/", methods=["GET"])
def get_all_categories():
    result = getAllCategories()
    return jsonify(result)


@app.route("/specProduct/<int:product_id>", methods=["PUT"])
def update_spec_product(product_id):
    # Fetch the product with the specified ID
    product = fetchone("SELECT * FROM products WHERE product_id = %s", (product_id,))

    if product:
        # Get the data from the request
        data = request.get_json()

        # Update the product attributes
        updated_product = {
            "product_name": data.get("product_name", product["product_name"]),
            "price": data.get("price", product["price"]),
            "quantity": data.get("quantity", product["quantity"]),
            "category_id": data.get("category_id", product["category_id"])
        }

        # Execute the update query
        execute(
            """UPDATE products 
               SET product_name = %s, price = %s, quantity = %s, category_id = %s
               WHERE product_id = %s""",
            (updated_product["product_name"], updated_product["price"],
             updated_product["quantity"], updated_product["category_id"], product_id)
        )

        # Fetch the updated product entity
        updated_product = fetchone("SELECT * FROM products WHERE product_id = %s", (product_id,))

        return jsonify(updated_product)
    else:
        return jsonify({"error": "Product not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
