# from flask import Flask, request, jsonify
# from PIL import Image
# import numpy as np
# import tensorflow as tf
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# # Load the trained model
# model_path = 'my_keras_model_1.h5'  # Update the path to your model
# model = tf.keras.models.load_model(model_path)
# class_labels = {1: 'Not Fractured', 0: 'Fractured'}

# # Preprocess the input image
# def preprocess_image(image):
#     img = image.resize((224, 224))  # Resize the image to 224x224 pixels
#     img = img.convert('RGB')         # Ensure the image is in RGB format (remove alpha channel)
#     img = np.array(img) / 255.0      # Convert the image to a numpy array and normalize to [0, 1]
#     img = np.expand_dims(img, axis=0)  # Add a batch dimension
#     return img

# # Prediction endpoint
# @app.route('/bonepredict', methods=['POST'])
# def predict():
#     if 'file' not in request.files:
#         return jsonify({'error': 'No file part'})

#     file = request.files['file']

#     if file.filename == '':
#         return jsonify({'error': 'No selected file'})

#     if file:
#         img = Image.open(file)
#         preprocessed_image = preprocess_image(img)
#         prediction = model.predict(preprocessed_image)
#         predicted_class = np.argmax(prediction, axis=1)[0]
#         confidence = prediction[0][predicted_class]
#         predicted_label = class_labels[predicted_class]
#         return jsonify({'predicted_class': predicted_label, 'confidence': float(confidence)})

# if __name__ == '__main__':
#     app.run(port=8002)  # Change the port number as needed



from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model
model_path = 'my_keras_model_1.h5'  # Update the path to your model
model = tf.keras.models.load_model(model_path)
class_labels = {1: 'Not Fractured', 0: 'Fractured'}

# Preprocess the input image
def preprocess_image(image):
    img = image.resize((224, 224))  # Resize the image to 224x224 pixels
    img = img.convert('RGB')         # Ensure the image is in RGB format (remove alpha channel)
    img = np.array(img) / 255.0      # Convert the image to a numpy array and normalize to [0, 1]
    img = np.expand_dims(img, axis=0)  # Add a batch dimension
    return img

# Prediction endpoint
@app.route('/bonepredict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        img = Image.open(file)
        preprocessed_image = preprocess_image(img)
        prediction = model.predict(preprocessed_image)
        predicted_class = np.argmax(prediction, axis=1)[0]
        confidence = prediction[0][predicted_class]
        predicted_label = class_labels[predicted_class]
        
        # Print predicted class and confidence
        print("Predicted Class:", predicted_label)
        print("Confidence:", confidence)
        
        return jsonify({'predicted_class': predicted_label, 'confidence': float(confidence)})

if __name__ == '__main__':
    app.run(port=8002)  # Change the port number as needed
