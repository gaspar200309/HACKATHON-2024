from flask import Blueprint, jsonify, request
from app.services.main_service import MainService
import requests
import itertools  


main_bp = Blueprint('main', __name__)

def fetch_stac_server(query):
    headers = {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip",
        "Accept": "application/geo+json",
    }

    url = "https://landsatlook.usgs.gov/stac-server/search"
    response = requests.post(url, headers=headers, json=query)
    
    if response.status_code != 200:
        raise Exception(f"STAC-Server returned a non-200 status code: {response.status_code}")

    data = response.json()
    
    error = data.get("message", "")
    if error:
        raise Exception(f"STAC-Server failed and returned: {error}")

    context = data.get("context", {})
    if not context.get("matched"):
        return []

    features = data.get("features", [])
    
    if "links" in data and data["links"]:
        query["page"] += 1
        query["limit"] = context.get("limit", query["limit"])
        features = list(itertools.chain(features, fetch_stac_server(query)))

    return features


@main_bp.route('/')
def main():
    return MainService.get_greeting() 


@main_bp.route('/lansat', methods=['POST']) 
def nuevo():
    if request.is_json:
        datos = request.get_json()
        latitud = datos.get('latitud')
        longitud = datos.get('longitud')
        fecha = datos.get('fecha')

        if not latitud or not longitud:
            return jsonify({'error': 'Latitud y longitud son requeridos'}), 400

        bbox = [float(longitud) - 2.0, float(latitud) - 2.0, float(longitud) + 2.0, float(latitud) + 2.0]
        query = {
            "bbox": bbox,
            "collections": ["landsat-c2l2-sr", "landsat-c2l2-st"],
            "query": {
                "eo:cloud_cover": {"lte": 50},
                "platform": {"in": ["LANDSAT_9"]},
                "landsat:collection_category": {"in": ["T1", "T2", "RT"]}
            },
            # "datetime": "2021-10-31T00:00:00.000Z/2024-09-28T23:59:59.999Z",
            'fecha': fecha,
            "page": 1,
            "limit": 100
        }

        try:
            features = fetch_stac_server(query)
            return jsonify(features)
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'La solicitud debe tener datos JSON'}), 400
