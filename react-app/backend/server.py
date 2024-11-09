from flask import Flask, request, send_file, render_template_string
import qrcode
import io
import os

app = Flask(__name__)

# Create a downloads directory if it doesn't exist
UPLOAD_FOLDER = 'downloads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# HTML template with a simple form
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>QR Code Generator</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 40px auto; 
            padding: 20px;
        }
        form { 
            margin: 20px 0; 
        }
        input[type="text"] { 
            padding: 8px; 
            width: 300px; 
            margin-right: 10px;
        }
        button { 
            padding: 8px 15px; 
            background-color: #4CAF50; 
            color: white; 
            border: none; 
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <h1>QR Code Generator</h1>
    <form action="/generate-qr" method="get">
        <input type="text" name="data" placeholder="Enter text or URL" required>
        <button type="submit">Generate QR</button>
    </form>
    <form action="/download-qr" method="get">
        <input type="text" name="data" placeholder="Enter text or URL" required>
        <button type="submit">Generate & Download QR</button>
    </form>
</body>
</html>
'''

@app.route('/')
def home():
    return render_template_string(HTML_TEMPLATE)

@app.route('/generate-qr')
def generate_qr():
    data = request.args.get('data', 'https://example.com')
    
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="blue", back_color="white")
    
    img_buffer = io.BytesIO()
    img.save(img_buffer, 'PNG')
    img_buffer.seek(0)
    
    return send_file(img_buffer, mimetype='image/png')

@app.route('/download-qr')
def download_qr():
    data = request.args.get('data', 'https://example.com')
    
    # Create a filename based on the data
    filename = f"qr_{data[:30].replace(' ', '_')}.png"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    # Generate QR code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="blue", back_color="white")
    img.save(filepath)
    
    # Send the file as an attachment
    return send_file(
        filepath,
        as_attachment=True,
        download_name=filename,
        mimetype='image/png'
    )

if __name__ == '__main__':
    app.run(port=8000)