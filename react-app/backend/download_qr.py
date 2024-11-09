import requests
import sys
import os

def download_qr(text: str):
    try:
        # Send request to download QR code
        response = requests.get(
            'http://127.0.0.1:8000/download-qr',
            params={'data': text},
            stream=True  # Important for downloading files
        )
        
        if response.status_code == 200:
            # Get filename from response headers or create default
            filename = response.headers.get('content-disposition')
            if filename and 'filename=' in filename:
                filename = filename.split('filename=')[1].strip('"')
            else:
                filename = 'qrcode.png'
            
            # Save the file
            with open(filename, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            print(f"QR code downloaded and saved as {filename}")
            print(f"File location: {os.path.abspath(filename)}")
        else:
            print(f"Error: Server returned status code {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to the server. Make sure it's running on http://127.0.0.1:8000")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        # Get text from command line argument
        text = sys.argv[1]
        download_qr(text)
    else:
        # If no command line argument, ask for input
        text = input("Enter the text for the QR code: ")
        download_qr(text)