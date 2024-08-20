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

@app.route("/update/<int:id>", methods=["PATCH"])
def update_worker(user_id):
    worker = Worker.query.filter_by(id=user_id).first()
    if not worker:
        return jsonify({"message": "Worker not found"}), 404

    data = request.json
    worker.first_name = data.get("firstName", worker.first_name)
    worker.last_name = data.get("lastName", worker.last_name)
    worker.email = data.get("email", worker.email)
    
    db.session.commit()

    return jsonify({"message": "Worker updated"}), 200

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_worker(user_id):
    worker = Worker.query.filter_by(user_id)
    
    if not worker:
        return jsonify({"message": "Worker not found"}), 404

    db.session.delete(worker)
    db.session.commit()

    return jsonify({"message": "Worker deleted"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)    