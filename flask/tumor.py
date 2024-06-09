# from flask import Flask, request, jsonify
# from PIL import Image
# import numpy as np
# from tensorflow.keras.preprocessing import image
# import tensorflow as tf
# from flask import Flask
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# app = Flask(__name__)

# # Load the model and class labels
# model_path = 'my_model.h5'
# model = tf.keras.models.load_model(model_path)
# class_labels = ['Glioma', 'Meningioma', 'No tumor', 'Pituitary']

# # Function to predict tumor type
# def predict_tumor_type(image_path, model, class_labels):
#     img = Image.open(image_path)
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array /= 255.0  # Rescale pixel values to [0, 1]
#     prediction = model.predict(img_array)
#     predicted_class_index = np.argmax(prediction)
#     predicted_class = class_labels[predicted_class_index]
#     return predicted_class

# # Route for predicting tumor type
# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'}), 400

#     image_file = request.files['image']
#     image_path = 'temp_image.jpg'  # Save the image temporarily
#     image_file.save(image_path)

#     predicted_class = predict_tumor_type(image_path, model, class_labels)

#     return jsonify({'prediction': predicted_class}), 200

# # Route for serving the React frontend
# @app.route('/')
# def index():
#     return app.send_static_file('index.html')

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your pre-trained Keras model
model = load_model("my_model.h5")

# Assuming your model expects images of a certain size
img_size = (224, 224)

# Replace these labels with your actual class labels
classes = ['Glioma', 'Meningioma', 'No tumor', 'Pituitary']

@app.route('/predict', methods=['POST'])
def classify_waste():
    try:
        # Receive the image from the request
        img_file = request.files['image']
        img = Image.open(io.BytesIO(img_file.read()))
        img = img.convert('RGB')  # Ensure the image has RGB channels
        img = img.resize(img_size)
        img_array = np.asarray(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array.astype('float32') / 255.0  # Normalize the image data

        # Perform prediction using the loaded model
        result = model.predict(img_array)

        # Calculate individual probabilities for each class
        probabilities = {label: round(prob * 100, 2) for label, prob in zip(classes, result[0])}

        # Convert the prediction result to a human-readable class
        predicted_class = classes[np.argmax(result)]

        # Get the maximum probability
        max_probability = np.max(result)

        return jsonify({
            'prediction': predicted_class,
            'max_probability': float(max_probability),
            'individual_probabilities': probabilities,
            'classes': classes,
            'probabilities': probabilities,

        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000)

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# from PIL import Image
# import numpy as np
# import io

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# # Assuming your models and their classes are defined as follows
# models = {
#     'model1': {
#         'model': load_model("lungs_disease_model.h5"),
#          'classes': ['Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion', 'Emphysema',
#         'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'Nodule',
#                     'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']
#     },
#     'model2': {
#         'model': load_model("my_model.h5"),
#         'classes': ['Glioma', 'Meningioma', 'No tumor', 'Pituitary']
#     }
# }

# # Assuming your model expects images of a certain size
# img_size = (224, 224)

# @app.route('/predict/<model_name>', methods=['POST'])
# def predict(model_name):
#     try:
#         # Receive the image from the request
#         img_file = request.files['image']
#         img = Image.open(io.BytesIO(img_file.read()))
#         img = img.convert('RGB')  # Ensure the image has RGB channels
#         img = img.resize(img_size)
#         img_array = np.asarray(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = img_array.astype('float32') / 255.0  # Normalize the image data

#         # Perform prediction using the loaded model
#         model = models[model_name]['model']
#         classes = models[model_name]['classes']
#         result = model.predict(img_array)

#         # Check if the result array has the expected shape
#         if result.shape[1] != len(classes):
#             return jsonify({'error': 'Result shape does not match number of classes'}), 500

#         # Calculate individual probabilities for each class
#         probabilities = {label: round(prob * 100, 2) for label, prob in zip(classes, result[0])}

#         # Convert the prediction result to a human-readable class
#         predicted_class = classes[np.argmax(result)]

#         # Get the maximum probability
#         max_probability = np.max(result)

#         return jsonify({
#             'model': model_name,
#             'prediction': predicted_class,
#             'max_probability': float(max_probability),
#             'individual_probabilities': probabilities,
#             'classes': classes
#         })
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# if __name__ == '__main__':
#     app.run(port=8000)
