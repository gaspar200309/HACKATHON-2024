import matplotlib as mpl
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from packaging import version

from sscws.sscws import SscWs
ssc = SscWs()

result = ssc.get_observatories()
for observatory in result['Observatory'][:5]:
    print('{:15s} {:20.20s} {:25s}'.format(observatory['Id'], observatory['Name'], observatory['StartTime'].isoformat()))
print('...')

result = ssc.get_ground_stations()
for ground_station in result['GroundStation'][:5]:
    location = ground_station['Location']
    print('{:5s} {:20.20s} {:7.2f} {:7.2f}'.format(ground_station['Id'], ground_station['Name'],location['Latitude'], location['Longitude']))
print('...')


result = ssc.get_locations(['iss'],
                            ['2020-01-01T00:00:00Z',
                            '2020-01-01T01:00:00Z'])
data = result['Data'][0]
coords = data['Coordinates'][0]
print(coords['X'][:5])