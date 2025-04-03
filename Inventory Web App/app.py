from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for React frontend

# Absolute path configuration for the database file
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///inventory.db'
db = SQLAlchemy(app)

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    quantity = db.Column(db.Integer)

# Create tables explicitly
def create_tables():
    with app.app_context():
        db.create_all()

@app.route('/api/inventory', methods=['GET'])
def get_inventory():
    items = Inventory.query.all()
    inventory = [{"id": item.id, "name": item.name, "quantity": item.quantity} for item in items]
    return jsonify(inventory)

@app.route('/api/inventory', methods=['POST'])
def add_inventory():
    data = request.json
    name = data.get('name')
    quantity = data.get('quantity')

    item = Inventory(name=name, quantity=quantity)
    db.session.add(item)
    db.session.commit()
    return jsonify({"message": "Item added successfully"}), 201

@app.route('/api/inventory/<int:id>', methods=['DELETE'])
def delete_inventory(id):
    item = Inventory.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({"message": "Item deleted successfully"}), 204

if __name__ == '__main__':
    create_tables()
    app.run(host='0.0.0.0', port=5000, debug=True)
