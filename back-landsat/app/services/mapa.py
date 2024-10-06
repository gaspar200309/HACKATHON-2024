from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

GOOGLE_GEOCODING_API_KEY = "TU_API_KEY"

# Endpoint para procesar la ubicación
@app.route('/api/location', methods=['POST'])
def process_location():
    data = request.json
    location_type = data.get('type')  # 'place' o 'coordinates'
    if location_type == 'place':
        place_name = data.get('place_name')
        coordinates = geocode_place(place_name)
    elif location_type == 'coordinates':
        coordinates = {
            "lat": data.get('latitude'),
            "lon": data.get('longitude')
        }
    else:
        return jsonify({"error": "Invalid location type"}), 400
    
    return jsonify({"coordinates": coordinates})

# Función para geocodificar el nombre del lugar a coordenadas (latitud/longitud)
def geocode_place(place_name):
    url = f"https://maps.googleapis.com/maps/api/geocode/json?address={place_name}&key={GOOGLE_GEOCODING_API_KEY}"
    response = requests.get(url)
    data = response.json()
    
    if response.status_code == 200 and data['results']:
        location = data['results'][0]['geometry']['location']
        return {"lat": location['lat'], "lon": location['lng']}
    else:
        return {"error": "Location not found"}

if __name__ == "__main__":
    app.run(debug=True)
