from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

# Absolute path configuration for the database file
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////app/inventory.db'
db = SQLAlchemy(app)

class Inventory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    quantity = db.Column(db.Integer)

# Create tables explicitly
def create_tables():
    with app.app_context():
        db.create_all()

@app.route('/', methods=['GET', 'POST'])
def inventory():
    if request.method == 'POST':
        name = request.form['name']
        quantity = request.form['quantity']
        item = Inventory(name=name, quantity=quantity)
        db.session.add(item)
        db.session.commit()
        return redirect('/')

    items = Inventory.query.all()
    return render_template('index.html', items=items)

@app.route('/delete/<int:id>')
def delete(id):
    item = Inventory.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return redirect('/')

if __name__ == '__main__':
    create_tables()  # crucial step
    app.run(host='0.0.0.0', port=5000, debug=True)
