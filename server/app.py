from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify(status='healthy'), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
