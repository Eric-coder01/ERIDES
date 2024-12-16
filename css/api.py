import requests

# Set header for authentication
headers = { 'AUTH-TOKEN': '6c1a0f0f-ce4e-4c73-8f97-31484ce8551e' }

# Get Califonia fields info
params = { 'state': 'CA'}
response = requests.get('https://pdf417.pro/api/get_barcode_fields_brief_info/',
params=params, headers=headers)

# These are our fields with default values. You can change it
data = response.json()
print(data)

# Generate barcode
response = requests.post('https://pdf417.pro/api/generate_barcode/',
headers=headers, json=data)
print(response.json())

# Download barocde
response = requests.get('https://pdf417.pro' + response.json()['file_png'], allow_redirects=True)
open('barcode.png', 'wb').write(response.content)