# import google.generativeai as genai
# import nltk
# import re
# import textwrap

# nltk.download('punkt')

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = []
#     for msg in message_history:
#         role = 'user' if msg['user'] else 'assistant'
#         conversation.append({'role': role, 'content': msg['text']})

#     conversation.append({'role': 'user', 'content': prompt})

#     response = chat.send_message(prompt, stream=True)
#     response_text = ""
#     for chunk in response:
#         tokens = nltk.word_tokenize(chunk.text)
#         if len(tokens) > 150:
#             truncated_text = " ".join(tokens[:145]) + "..."
#         else:
#             response_text += chunk.text

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     # This is a very basic symptom extraction logic, you might need to improve it
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# def main():
#     print("Welcome to HealthAssist, your personal AI Health Assistant!")
#     state = {"step": 0, "message_history": [], "symptoms": [], "age": "", "gender": ""}

#     while True:
#         user_message = input("\nYou: ")
#         if user_message.lower() in ['exit', 'quit','bye','okay thanks']:
#             print("\nExiting the chat. Goodbye!")
#             if state["symptoms"]:
#                 print("\nSummary of your symptoms:")
#                 print(", ".join(set(state["symptoms"])))
#             break

#         if state["step"] == 0:
#             bot_response = "Before we begin, could you please share your age with me?"
#             state["step"] = 1
#         elif state["step"] == 1:
#             state["age"] = user_message
#             bot_response = "Great! Now, could you please tell me your gender? (e.g., male, female, other)"
#             state["step"] = 2
#         elif state["step"] == 2:
#             state["gender"] = user_message
#             bot_response = "Thank you! Now, could you please describe how you're feeling or any specific symptoms you're experiencing?"
#             state["step"] = 3
#         elif state["step"] == 3:
#             state["message_history"].append({'user': True, 'text': user_message})
#             state["symptoms"].extend(extract_symptoms(user_message))
#             bot_response = "Thank you for the details. Based on your symptoms, let me analyze the possible conditions..."
#             state["step"] = 4
#         elif state["step"] == 4:
#             symptoms_list = ", ".join(set(state["symptoms"]))
#             prompt = f"Based on the symptoms: {symptoms_list}, what are the possible conditions?"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             # Extract the first four predicted diseases
#             diseases = re.findall(r'(?<=1. )(.*?)(?=2\. |$)', bot_response, re.DOTALL)
#             bot_response = "\n".join(diseases[:4])  # Limit to four predictions
#             bot_response += "\n\nPlease note that this is an AI-generated prediction. Consult with a specialist doctor for a professional diagnosis."
#             state["step"] = 5
#         else:
#             state["message_history"].append({'user': True, 'text': user_message})
#             prompt = f"User continued conversation: {user_message}\nHealthcare Assistant:"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#                 bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#             else:
#                 state["symptoms"].extend(extract_symptoms(bot_response))
        
#         # Beautify the bot response
#         print("\nHealth Assistant:")
#         wrapped_response = textwrap.fill(bot_response, width=80)
#         print(wrapped_response)

# if __name__ == "__main__":
#     main()


















# import os
# import google.generativeai as genai
# import pathlib
# import textwrap
# import markdown
# from IPython.display import display
# from IPython.display import Markdown
# import nltk
# nltk.download('punkt')

# # # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
# # GOOGLE_API_KEY=userdata.get('GOOGLE_API_KEY')
# import google.generativeai as genai
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')
# # # Configure the API key for Google Generative AI
# # genai.configure(api_key=os.getenv("AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs"))
# model = genai.GenerativeModel('gemini-pro')
# # # Function to load Gemini Pro model and get responses
# # model = genai.GenerativeModel("gemini-pro")
# chat = model.start_chat(history=[])

# import nltk  # Import nltk for tokenization

# def get_gemini_response(question):
#   response = chat.send_message(question, stream=True)
#   for chunk in response:
#     # Tokenize the text (using nltk)
#     tokens = nltk.word_tokenize(chunk.text)

#     # Check if token count exceeds limit
#     if len(tokens) > 150:
#       # Truncate the text to 200 tokens (adjust slightly if needed)
#       truncated_text = " ".join(tokens[:145]) + "..."
#     else:
#       truncated_text = chunk.text

#     yield truncated_text  # Yield the truncated text

# def main():
#     print("Welcome to the HealthAssist. Your AI Health Assistant!")
#     chat_history = []

#     while True:
#         user_input = input("You: ")
#         if user_input.lower() in ['exit', 'quit']:
#             print("Exiting the chat. Goodbye!")
#             break
#         prompt = f"Provide medically reviewed information related to the user's query and try to keep the response to the minimum: {user_input}"
#         response = get_gemini_response(prompt)
#         # Add user query and response to chat history
#         chat_history.append(("You", user_input))
#         print("Health Assistant:")
#         for truncated_text in response:
#             replaced_text = truncated_text.replace('*','')
#             print(replaced_text)
#             chat_history.append(("Health Assistant", truncated_text))

# if __name__ == "__main__":
#     main()






# import google.generativeai as genai
# import nltk
# import re
# import textwrap

# nltk.download('punkt')

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = []
#     for msg in message_history:
#         role = 'user' if msg['user'] else 'assistant'
#         conversation.append({'role': role, 'content': msg['text']})

#     conversation.append({'role': 'user', 'content': prompt})

#     response = chat.send_message(prompt, stream=True)
#     response_text = ""
#     for chunk in response:
#         tokens = nltk.word_tokenize(chunk.text)
#         if len(tokens) > 150:
#             truncated_text = " ".join(tokens[:145]) + "..."
#         else:
#             response_text += chunk.text

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     # This is a very basic symptom extraction logic, you might need to improve it
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# def main():
#     print("Welcome to HealthAssist, your AI Health Assistant!")
#     state = {"step": 0, "message_history": [], "symptoms": [], "name": ""}

#     while True:
#         user_message = input("\nYou: ")
#         if user_message.lower() in ['exit', 'quit']:
#             print("\nExiting the chat. Goodbye!")
#             if state["symptoms"]:
#                 print("\nSummary of your symptoms:")
#                 print(", ".join(set(state["symptoms"])))
#             break

#         if state["step"] == 0:
#             bot_response = "Hello! I am your healthcare assistant. May I know your name?"
#             state["step"] = 1
#         elif state["step"] == 1:
#             if user_message.lower() in ['no', 'prefer not to say']:
#                 state["name"] = "Patient"
#                 bot_response = "Alright, how can I assist you today?"
#             else:
#                 state["name"] = user_message
#                 bot_response = f"Nice to meet you, {state['name']}! How can I assist you today?"
#             state["step"] = 2
#         elif state["step"] == 2:
#             state["message_history"].append({'user': True, 'text': user_message})
#             bot_response = "Can you please describe your symptoms in detail?"
#             state["step"] = 3
#         elif state["step"] == 3:
#             state["message_history"].append({'user': True, 'text': user_message})
#             prompt = f"""
#             The user has described their initial problem and symptoms. Based on the following conversation, provide a comma-separated list of symptoms.
            
#             User initial message: "{state['message_history'][0]['text']}"
#             User detailed symptoms: "{user_message}"
            
#             Healthcare Assistant:
#             """
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#                 bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#             else:
#                 state["symptoms"].extend(extract_symptoms(bot_response))
#             state["step"] = 4
#         else:
#             state["message_history"].append({'user': True, 'text': user_message})
#             prompt = f"User continued conversation: {user_message}\nHealthcare Assistant:"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#                 bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#             else:
#                 state["symptoms"].extend(extract_symptoms(bot_response))
        
#         # Beautify the bot response
#         print("\nHealth Assistant:")
#         wrapped_response = textwrap.fill(bot_response, width=80)
#         print(wrapped_response)

# if __name__ == "__main__":
#     main()


# import google.generativeai as genai
# import nltk
# import re
# import textwrap

# nltk.download('punkt')

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = []
#     for msg in message_history:
#         role = 'user' if msg['user'] else 'assistant'
#         conversation.append({'role': role, 'content': msg['text']})

#     conversation.append({'role': 'user', 'content': prompt})

#     response = chat.send_message(prompt, stream=True)
#     response_text = ""
#     for chunk in response:
#         tokens = nltk.word_tokenize(chunk.text)
#         if len(tokens) > 150:
#             truncated_text = " ".join(tokens[:145]) + "..."
#         else:
#             response_text += chunk.text

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     # This is a very basic symptom extraction logic, you might need to improve it
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# def main():
#     print("Welcome to HealthAssist, your AI Health Assistant!")
#     state = {"step": 0, "message_history": [], "symptoms": [], "name": ""}

#     while True:
#         user_message = input("\nYou: ")
#         if user_message.lower() in ['exit', 'quit']:
#             print("\nExiting the chat. Goodbye!")
#             if state["symptoms"]:
#                 print("\nSummary of your symptoms:")
#                 print(", ".join(set(state["symptoms"])))
#             break

#         if state["step"] == 0:
#             bot_response = "Hello! I am your healthcare assistant. May I know your name?"
#             state["step"] = 1
#         elif state["step"] == 1:
#             if user_message.lower() in ['no', 'prefer not to say']:
#                 state["name"] = "Patient"
#                 bot_response = "Alright, how can I assist you today?"
#             else:
#                 state["name"] = user_message
#                 bot_response = f"Nice to meet you, {state['name']}! How can I assist you today?"
#             state["step"] = 2
#         elif state["step"] == 2:
#             state["message_history"].append({'user': True, 'text': user_message})
#             bot_response = "Can you please describe your symptoms in detail?"
#             state["step"] = 3
#         elif state["step"] == 3:
#             state["message_history"].append({'user': True, 'text': user_message})
#             state["symptoms"].extend(extract_symptoms(user_message))
#             bot_response = "Thank you for the details. Based on your symptoms, let me analyze the possible conditions..."
#             state["step"] = 4
#         elif state["step"] == 4:
#             symptoms_list = ", ".join(set(state["symptoms"]))
#             prompt = f"Based on the symptoms: {symptoms_list}, what are the possible conditions?"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             bot_response += "\n\nPlease note that this is an AI-generated prediction. Consult with a specialist doctor for a professional diagnosis."
#             state["step"] = 5
#         else:
#             state["message_history"].append({'user': True, 'text': user_message})
#             prompt = f"User continued conversation: {user_message}\nHealthcare Assistant:"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#                 bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#             else:
#                 state["symptoms"].extend(extract_symptoms(bot_response))
        
#         # Beautify the bot response
#         print("\nHealth Assistant:")
#         wrapped_response = textwrap.fill(bot_response, width=80)
#         print(wrapped_response)

# if __name__ == "__main__":
#     main()


# import google.generativeai as genai
# import nltk
# import re
# import textwrap

# nltk.download('punkt')

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = []
#     for msg in message_history:
#         role = 'user' if msg['user'] else 'assistant'
#         conversation.append({'role': role, 'content': msg['text']})

#     conversation.append({'role': 'user', 'content': prompt})

#     response = chat.send_message(prompt, stream=True)
#     response_text = ""
#     for chunk in response:
#         tokens = nltk.word_tokenize(chunk.text)
#         if len(tokens) > 150:
#             truncated_text = " ".join(tokens[:145]) + "..."
#         else:
#             response_text += chunk.text

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     # This is a very basic symptom extraction logic, you might need to improve it
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# def main():
#     print("Welcome to HealthAssist, your personal AI Health Assistant!")
#     state = {"step": 0, "message_history": [], "symptoms": [], "age": "", "gender": ""}

#     while True:
#         user_message = input("\nYou: ")
#         if user_message.lower() in ['exit', 'quit','bye','okay thanks']:
#             print("\nExiting the chat. Goodbye!")
#             if state["symptoms"]:
#                 print("\nSummary of your symptoms:")
#                 print(", ".join(set(state["symptoms"])))
#             break

#         if state["step"] == 0:
#             bot_response = "Before we begin, could you please share your age with me?"
#             state["step"] = 1
#         elif state["step"] == 1:
#             state["age"] = user_message
#             bot_response = "Great! Now, could you please tell me your gender? (e.g., male, female, other)"
#             state["step"] = 2
#         elif state["step"] == 2:
#             state["gender"] = user_message
#             bot_response = "Thank you! Now, could you please describe how you're feeling or any specific symptoms you're experiencing?"
#             state["step"] = 3
#         elif state["step"] == 3:
#             state["message_history"].append({'user': True, 'text': user_message})
#             state["symptoms"].extend(extract_symptoms(user_message))
#             bot_response = "Thank you for the details. Based on your symptoms, let me analyze the possible conditions..."
#             state["step"] = 4
#         elif state["step"] == 4:
#             symptoms_list = ", ".join(set(state["symptoms"]))
#             prompt = f"Based on the symptoms: {symptoms_list}, what are the possible conditions?"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             bot_response += "\n\nPlease note that this is an AI-generated prediction. Consult with a specialist doctor for a professional diagnosis."
#             state["step"] = 5
#         else:
#             state["message_history"].append({'user': True, 'text': user_message})
#             prompt = f"User continued conversation: {user_message}\nHealthcare Assistant:"
#             bot_response = get_gemini_response(prompt, state["message_history"])
#             if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#                 bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#             else:
#                 # state["symptoms"].extend(extract_symptoms(bot_response))
#                 pass
        
#         # Beautify the bot response
#         print("\nHealth Assistant:")
#         wrapped_response = textwrap.fill(bot_response, width=80)
#         print(wrapped_response)

# if __name__ == "__main__":
#     main()

# from flask import Flask, request, jsonify
# import google.generativeai as genai
# import nltk
# import re
# import textwrap
# from flask_cors import CORS

# # Ensure NLTK is downloaded
# nltk.download('punkt')

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')  # Replace 'YOUR_API_KEY_HERE' with your actual API key

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = []
#     for msg in message_history:
#         role = 'user' if msg['user'] else 'assistant'
#         conversation.append({'role': role, 'content': msg['content']})  # Change 'text' to 'content'

#     conversation.append({'role': 'user', 'content': prompt})

#     response = chat.send_message(prompt, stream=True)
#     response_text = ""
#     for chunk in response:
#         response_text += chunk.text

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# # Create Flask app
# app = Flask(__name__)
# CORS(app)

# @app.route('/message', methods=['POST'])
# def handle_message():
#     data = request.json
#     user_message = data['message']

#     # Define state dictionary to keep track of conversation
#     state = {"step": 0, "message_history": [], "symptoms": [], "age": "", "gender": ""}

#     # Handle incoming messages
#     if user_message.lower() in ['exit', 'quit', 'bye', 'okay thanks']:
#         bot_response = "\nExiting the chat. Goodbye!"
#         if state["symptoms"]:
#             bot_response += "\n\nSummary of your symptoms:\n" + ", ".join(set(state["symptoms"]))
#         print("Assistant:", bot_response)  # Print response to terminal
#         return jsonify({'response': bot_response})

#     if state["step"] == 0:
#         bot_response = "Before we begin, could you please share your age with me?"
#         state["step"] = 1
#     elif state["step"] == 1:
#         state["age"] = user_message
#         bot_response = "Great! Now, could you please tell me your gender? (e.g., male, female, other)"
#         state["step"] = 2
#     elif state["step"] == 2:
#         state["gender"] = user_message
#         bot_response = "Thank you! Now, could you please describe how you're feeling or any specific symptoms you're experiencing?"
#         state["step"] = 3
#     elif state["step"] == 3:
#         state["message_history"].append({'user': True, 'content': user_message})  # Change 'text' to 'content'
#         state["symptoms"].extend(extract_symptoms(user_message))
#         bot_response = "Thank you for the details. Based on your symptoms, let me analyze the possible conditions..."
#         state["step"] = 4
#     elif state["step"] == 4:
#         symptoms_list = ", ".join(set(state["symptoms"]))
#         prompt = f"Based on the symptoms: {symptoms_list}, what are the possible conditions?"
#         bot_response = get_gemini_response(prompt, state["message_history"])
#         bot_response += "\n\nPlease note that this is an AI-generated prediction. Consult with a specialist doctor for a professional diagnosis."
#         state["step"] = 5
#     else:
#         state["message_history"].append({'user': True, 'content': user_message})  # Change 'text' to 'content'
#         prompt = f"User continued conversation: {user_message}\nHealthcare Assistant:"
#         bot_response = get_gemini_response(prompt, state["message_history"])
#         if "Sorry" in bot_response or "I am in developing phase" in bot_response:
#             bot_response = "Sorry, but I am currently in a developing phase and unable to provide an answer to your request."
#         else:
#             pass

#     # Beautify the bot response
#     wrapped_response = textwrap.fill(bot_response, width=80)

#     # Print response to terminal
#     print("Assistant:", wrapped_response)

#     # Return bot response
#     return jsonify({'response': wrapped_response})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)


# from flask import Flask, request, jsonify
# import google.generativeai as genai
# import re
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)

# # Configure the API key for Google Generative AI
# genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')  # Replace 'YOUR_API_KEY_HERE' with your actual API key

# # Load Gemini Pro model and start a chat
# model = genai.GenerativeModel('gemini-pro')
# chat = model.start_chat(history=[])

# # Function to get response from Gemini model
# def get_gemini_response(prompt, message_history):
#     conversation = [{'role': 'user', 'content': msg['content']} for msg in message_history]
#     conversation.append({'role': 'user', 'content': prompt})
    
#     response = chat.send_message(prompt, stream=True)
#     response_text = "".join([chunk.text for chunk in response])

#     return response_text.strip()

# # Function to extract symptoms from the response
# def extract_symptoms(response_text):
#     symptoms = re.findall(r'\b(?:fever|cough|pain|nausea|headache|dizziness|fatigue|rash|sore throat)\b', response_text, re.IGNORECASE)
#     return symptoms

# @app.route('/message', methods=['POST'])
# def handle_message():
#     data = request.json
#     user_message = data['message']

#     # Define state dictionary to keep track of conversation
#     state = {"message_history": [], "symptoms": []}

#     # Handle incoming messages
#     state["message_history"].append({'user': True, 'content': user_message})
#     state["symptoms"].extend(extract_symptoms(user_message))

#     # Construct prompt based on symptoms
#     symptoms_list = ", ".join(set(state["symptoms"]))
#     prompt = f"Based on the symptoms: {symptoms_list}, what are the possible conditions?"

#     # Get response from Gemini model
#     bot_response = get_gemini_response(prompt, state["message_history"])
#     bot_response += "\n\nPlease note that this is an AI-generated prediction. Consult with a specialist doctor for a professional diagnosis."

#     return jsonify({'response': bot_response})

# if __name__ == '__main__':
#     app.run(debug=True, port=5001)

from flask import Flask, request, jsonify
import google.generativeai as genai
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the API key for Google Generative AI
genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')  # Replace 'YOUR_API_KEY_HERE' with your actual API key

# Load Gemini Pro model and start a chat
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

# Function to get response from Gemini model
def get_gemini_response(prompt, message_history):
    conversation = [{'role': 'user', 'content': msg['content']} for msg in message_history]
    conversation.append({'role': 'user', 'content': prompt})
    
    response = chat.send_message(prompt, stream=True)
    response_text = "".join([chunk.text for chunk in response])

    return response_text.strip()

@app.route('/message', methods=['POST'])
def handle_message():
    data = request.json
    user_message = data['message']

    # Define state dictionary to keep track of conversation
    state = {"message_history": []}

    # If it's the first message, set the initial prompt
    if not state["message_history"]:
        initial_prompt = "Hello! I'm your health assistant. Let's have a healthy conversation. How are you feeling today? If you're not feeling well, please describe any symptoms you're experiencing."
        state["message_history"].append({'role': 'assistant', 'content': initial_prompt})

    # Handle incoming messages
    state["message_history"].append({'role': 'user', 'content': user_message})

    # Get response from Gemini model
    bot_response = get_gemini_response(user_message, state["message_history"])

    # Check if the user mentioned symptoms
    if "symptoms" in bot_response.lower():
        follow_up_prompt = "Thank you for providing your symptoms. Can you also share your age, gender, and any relevant medical history?"
        state["message_history"].append({'role': 'assistant', 'content': follow_up_prompt})

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)


from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure the API key for Google Generative AI
genai.configure(api_key='AIzaSyB0zbbq3Ck9NTlsa27mRvz4z3xG8FjBuPs')  # Replace with your actual API key

# Load Gemini Pro model and start a chat
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

# System prompts
system_prompts = [
    """
    I am your AI Health Assistant. My purpose is to assist you in understanding and managing your health. 
    If you're feeling unwell or have any symptoms, feel free to describe them, and I'll provide you with guidance.
    Additionally, I can help you understand medical terms, provide information about diseases, and suggest remedies.
    
    Please remember that while I can provide information and support, it's always important to consult a healthcare professional 
    for personalized medical advice and treatment.
    """
]

# Safety settings
safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
]

# Function to get response from Gemini model
def get_gemini_response(prompt, message_history):
    conversation = [{'role': 'user', 'content': msg['content']} for msg in message_history]
    conversation.append({'role': 'user', 'content': prompt})
    
    response = chat.send_message(prompt, stream=True)
    response_text = "".join([chunk.text for chunk in response])

    return response_text.strip()

# Provide the system prompt initially
@app.route('/system_prompt', methods=['GET'])
def get_system_prompt():
    return jsonify({'prompt': system_prompts[0]})  # Assuming there's only one system prompt for now

@app.route('/message', methods=['POST'])
def handle_message():
    data = request.json
    user_message = data['message']

    # Define state dictionary to keep track of conversation
    state = {"message_history": []}

    # If it's the first message, set the initial prompt
    if not state["message_history"]:
        initial_prompt = "Hello! I am your AI Health Assistant. How can I assist you today? If you're experiencing any symptoms, please describe them."
        state["message_history"].append({'role': 'assistant', 'content': initial_prompt})

    # Handle incoming messages
    state["message_history"].append({'role': 'user', 'content': user_message})

    # Get response from Gemini model
    bot_response = get_gemini_response(user_message, state["message_history"])

    # Check if the user mentioned symptoms
    if "symptoms" in bot_response.lower():
        follow_up_prompt = "Thank you for providing your symptoms. Can you also share your age, gender, and any relevant medical history?"
        state["message_history"].append({'role': 'assistant', 'content': follow_up_prompt})

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
