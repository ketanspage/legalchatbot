from flask import Flask, request, jsonify
from transformers import pipeline, AutoModelForQuestionAnswering, AutoTokenizer
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

model_name = "deepset/roberta-base-squad2"
model = AutoModelForQuestionAnswering.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer)

# Load the context from the file
file_path = "data.txt"
with open(file_path, "r", encoding="utf-8") as file:
    context = file.read()

@app.route("/api/receive", methods=["POST"])
def receive_question():
    data = request.get_json()
    question = data["question"]

    answer = qa_pipeline(question=question, context=context)

    confidence_threshold = 0.3
    if answer["score"] < confidence_threshold:
        response = "I am sorry but I am still learning..."
    else:
        response = answer["answer"]

    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
