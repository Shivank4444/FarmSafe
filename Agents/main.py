import json
import requests

headers = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzVjMjk1MGMtODg3YS00NmY5LWI1MTUtMmQyYTg0OTM0ODRjIiwidHlwZSI6ImFwaV90b2tlbiJ9.9UIavo0fA3DkoxLuOzZcw50Xktyu914a8CsNzb7v4uE"
}

url = "https://api.edenai.run/v2/text/ai_detection"

def detect_ai_content(text):
    payload = {
        "providers": "originalityai",
        "text": text,
        "fallback_providers": ""
    }

    response = requests.post(url, json=payload, headers=headers)

    result = json.loads(response.text)
    ai_score = result['originalityai']['items'][0]['ai_score']
    return ai_score > 0.6

text_to_analyze = input("Enter the text: ")

print(detect_ai_content(text_to_analyze))