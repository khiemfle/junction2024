import qrcode # type: ignore
import sys
import requests
from io import BytesIO

def generate_qr(text: str):
    # Send request to your local server
    response = requests.get(f'http://localhost:8000/generate-qr?data={text}')
    
    if response.status_code == 200:
        # Save the image from the response
        with open('qrcode.png', 'wb') as f:
            f.write(response.content)
        print("QR code generated and saved as qrcode.png")
    else:
        print(f"Error: Server returned status code {response.status_code}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Get text from command line argument
        text = sys.argv[1]
        generate_qr(text)
    else:
        # If no command line argument, ask for input
        text = input("Enter the text for the QR code: ")
        generate_qr(text)