from database import get_cursor, fetchone, fetchall, execute
from flask import jsonify

def createProduct(data):
        cur = execute("""CALL SaveProduct(%s, %s, %s, %s, @product_id)""",
                (data["p_product_name"], data["p_price"], data["p_quantity"], data["p_category_id"]))
        # Fetch the product ID from the session variable
        cur.execute("SELECT @product_id as id")
        row = cur.fetchone()
        if row:
            data["id"] = row["id"]
        else:
            data["id"] = None
        return data

def getAllCategories():
    rv = fetchall("""SELECT * FROM categories""")
    return rv

def getAllProducts():
    rv = fetchall("""SELECT * FROM product_view""")
    return rv

def getProductSpecificById(id):
    rv = fetchone("""SELECT * FROM products WHERE product_id = %s""", (id,))
    return rv

def getProductById(id):
    rv = fetchone("""SELECT * FROM product_view WHERE product_id = %s""", (id,))
    return rv

def updateProduct(id, data):
    # Fetch the product with the specified ID
    product = getProductById(id)
    
    if product:
        # Call the stored procedure to update the product
        cur = execute(
            """CALL UpdateProduct(%s, %s, %s, %s, %s, @updated_product_id)""",
            (
                int(id),
                data["p_product_name"],
                data["p_price"],
                data["p_quantity"],
                data["p_category_id"]
            )
        )

        # Fetch the updated product ID from the session variable
        cur.execute("SELECT @updated_product_id as updated_product_id")
        row = cur.fetchone()

        if row:
            updated_product_id = row["updated_product_id"]
        else:
            updated_product_id = None

        # Close the cursor
        cur.close()

        return {"updated_product_id": updated_product_id}
    else:
        return {"error": "Product not found"}

    for product in products:
        if product["id"] == int(id):
            # SaveProduct(p_product_name, p_price, p_quantity, p_category_id)
            cur = execute(
                """CALL UpdateProduct(%s, %s, %s, %s, %s, @updated_product_id)""",
                (
                    int(id),
                    data["p_product_name"],
                    data["p_price"],
                    data["p_quantity"],
                    data["p_category_id"]
                )
            )
            # Fetch the updated product ID from the session variable
            cur.execute("SELECT @updated_product_id as updated_product_id")
            row = cur.fetchone()
            if row:
                updated_product_id = row["updated_product_id"]
            else:
                updated_product_id = None
            # Close the cursor
            cur.close()
            return row
    return None  # If the product with the specified ID is not found



def deleteProduct(product_id):
    cur = execute("""CALL DeleteProduct(%s)""", (int(product_id),))
    return "True"



