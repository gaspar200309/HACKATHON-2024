from flask import Flask, jsonify, request
from skyfield.api import Topos, load
from datetime import datetime, timedelta
import requests

app = Flask(__name__)

# Función para obtener los TLE de Landsat desde Celestrak
def get_landsat_tle():
    url = 'https://celestrak.com/NORAD/elements/landsat.txt'
    response = requests.get(url)
    tle_lines = response.text.splitlines()
    return tle_lines[:2]  # Obtiene el primer TLE (Landsat 8, por ejemplo)

# Función para calcular las próximas pasadas de Landsat sobre una ubicación
def calculate_passes(lat, lon):
    ts = load.timescale()
    satellite = load.tle(*get_landsat_tle())
    location = Topos(latitude_degrees=lat, longitude_degrees=lon)
    
    now = ts.now()
    time_step = timedelta(minutes=1)
    passes = []

    # Busca las próximas 5 pasadas en las próximas 48 horas
    for i in range(48 * 60):  # 48 horas
        t = now + (i * time_step.total_seconds()) / 86400.0  # Incremento en minutos
        difference = satellite - location
        topocentric = difference.at(t)
        alt, az, distance = topocentric.altaz()
        
        if alt.degrees > 0:  # Si el satélite está por encima del horizonte
            passes.append({
                'time': t.utc_iso(),
                'altitude': alt.degrees,
                'azimuth': az.degrees
            })
        
        if len(passes) >= 5:  # Limita a las próximas 5 pasadas
            break

    return passes

# Ruta de la API para consultar las próximas pasadas de Landsat sobre una ubicación
@app.route('/api/landsat_passes', methods=['POST'])
def landsat_passes():
    data = request.json
    lat = data['lat']
    lon = data['lon']
    
    passes = calculate_passes(lat, lon)
    return jsonify(passes)

if __name__ == '__main__':
    app.run(debug=True)
