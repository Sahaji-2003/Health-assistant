from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load your pre-trained Keras model
model = load_model("lungs_disease_model.h5")

# Assuming your model expects images of a certain size
img_size = (150, 150)  # Adjust according to your model's input size

# Replace these labels with your actual class labels
disease_names = ['Atelectasis', 'Cardiomegaly', 'Consolidation', 'Edema', 'Effusion', 'Emphysema',
                 'Fibrosis', 'Hernia', 'Infiltration', 'Mass', 'No Finding', 'Nodule',
                 'Pleural_Thickening', 'Pneumonia', 'Pneumothorax']

def preprocess_image(img_path, target_size=(150, 150)):
    # Load the image
    img = image.load_img(img_path)
    # Convert the image to an array
    img_array = image.img_to_array(img)
    # Convert image dtype to float32
    img_array = tf.image.convert_image_dtype(img_array, tf.float32)
    # Resize with padding to target size
    img_array = tf.image.resize_with_pad(img_array, target_size[0], target_size[1])
    # Ensure the shape is set correctly
    img_array.set_shape([target_size[0], target_size[1], 3])
    # Normalize the image
    img_array = img_array / 255.0
    # Expand the dimensions to match the input format (batch size, height, width, channels)
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Receive the image from the request
        img_file = request.files['image']
        img_path = 'temp_image.jpg'
        img_file.save(img_path)

        # Preprocess the image
        preprocessed_img = preprocess_image(img_path)

        # Make predictions
        predictions = model.predict(preprocessed_img)

        # Get the predicted probabilities for each class
        predicted_probabilities = predictions[0]

        # Prepare the response
        response = {}
        for disease, probability in zip(disease_names, predicted_probabilities):
            response[disease] = float(probability)

        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8001)
