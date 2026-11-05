"""Generate a PDF417 barcode using the pdf417.pro API.

Set PDF417_API_TOKEN in your environment before running this script.
Never commit real API credentials to the repository.
"""
import os
from pathlib import Path

import requests

API_BASE_URL = "https://pdf417.pro"
API_TOKEN = os.getenv("PDF417_API_TOKEN")

if not API_TOKEN:
    raise SystemExit(
        "Missing PDF417_API_TOKEN. Set it in your environment before running this script."
    )

headers = {"AUTH-TOKEN": API_TOKEN}
params = {"state": "CA"}

try:
    fields_response = requests.get(
        f"{API_BASE_URL}/api/get_barcode_fields_brief_info/",
        params=params,
        headers=headers,
        timeout=30,
    )
    fields_response.raise_for_status()
    barcode_data = fields_response.json()

    barcode_response = requests.post(
        f"{API_BASE_URL}/api/generate_barcode/",
        headers=headers,
        json=barcode_data,
        timeout=30,
    )
    barcode_response.raise_for_status()
    barcode_result = barcode_response.json()

    image_path = barcode_result.get("file_png")
    if not image_path:
        raise RuntimeError("The API response did not include a barcode image path.")

    image_response = requests.get(
        f"{API_BASE_URL}{image_path}",
        allow_redirects=True,
        timeout=30,
    )
    image_response.raise_for_status()

    output_path = Path("barcode.png")
    output_path.write_bytes(image_response.content)
    print(f"Barcode saved to {output_path.resolve()}")

except requests.RequestException as error:
    raise SystemExit(f"Barcode API request failed: {error}") from error
except (ValueError, RuntimeError) as error:
    raise SystemExit(f"Could not generate barcode: {error}") from error
