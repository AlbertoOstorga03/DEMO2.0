from flask import Flask, request, jsonify
from config import app,db
from models import Worker

@app.route('/workers', methods=['GET'])
def get_workers():
    workers = Worker.query.all()
    json_workers = list(map(lambda x: x.to_json(), workers))
    return jsonify({"workers": json_workers}), 200

@app.route('/create', methods=['POST'])
def create_worker():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "Missing data"}), 
            400,
        )
    
    new_worker = Worker(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_worker)
        db.session.commit()
    except:
        return jsonify({"message": str(e)}), 400	
    
    return 'A new worker has been added', 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)    