import requests
from datetime import datetime, timedelta

def get_landsat_acquisition(lat, lon, days_ahead=7):
    start_date = datetime.now()
    end_date = start_date + timedelta(days=days_ahead)

    start_str = start_date.strftime('%Y-%m-%d')
    end_str = end_date.strftime('%Y-%m-%d')

    url = "https://api.nasa.gov/planetary/earth/assets"
    params = {
        'lat': lat,
        'lon': lon,
        'date': start_str,  
        'dim': 0.1,
        'api_key': 'bRpzbFFeYvSWMGqjrE7Hzc75bp2BADjpeBhyeNNu'
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        results = []
        for item in data.get('results', []):
            results.append({
                "date": item['date'],
                "satellite": item['satellite'],
                "url": item['url']
            })
        return results
    else:
        return {"error": f"Error al obtener datos: {response.status_code}, {response.text}"}
