# app/controllers/main_controller.py
from flask import Blueprint, jsonify
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
    data = requests.post(url, headers=headers, json=query).json()
    
    error = data.get("message", "")
    if error:
        raise Exception(f"STAC-Server failed and returned: {error}")

    context = data.get("context", {})
    if not context.get("matched"):
        return []

    print(context)

    features = data["features"]
    
    # Comprobar si hay más páginas y hacer la paginación recursiva
    if "links" in data and data["links"]:
        query["page"] += 1
        query["limit"] = context["limit"]
        features = list(itertools.chain(features, fetch_stac_server(query)))

    return features



@main_bp.route('/')
def main():
    return MainService.get_greeting() 

@main_bp.route('/lansat')
def nuevo():
    query = {"bbox":[-67.5,-19.311143355064647,-64.6875,-16.63619187839765],"collections":["landsat-c2l2-sr","landsat-c2l2-st"],"query":{"eo:cloud_cover":{"lte":50},"platform":{"in":["LANDSAT_9"]},"landsat:collection_category":{"in":["T1","T2","RT"]}},"datetime":"2021-10-31T00:00:00.000Z/2024-09-28T23:59:59.999Z","page":1,"limit":100}
    try:
        features = fetch_stac_server(query)
        return jsonify(features)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    