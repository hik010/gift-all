import React, { useEffect } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Map, Marker } from './Maps';
import axios from 'axios';

const render = (status) => {
  return <h1>{status}</h1>;
};

const App = () => {
  const [KEY, setKey] = React.useState('');
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(3); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    const getKey = async () => {
      let {data} = await axios.get('/maps-api-key');
      setKey(data);
    };
    getKey();
  }, []);

  const onClick = (e) => {
    // avoid directly mutating state
    if (e.latLng) setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log('onIdle');
    if (m.getZoom()) setZoom(m.getZoom());
    if (m.getCenter()) setCenter(m.getCenter().toJSON());
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {KEY === '' ? (
        'Loading'
      ) : (
        <Wrapper apiKey={KEY} render={render}>
          <Map
            center={center}
            onClick={onClick}
            onIdle={onIdle}
            zoom={zoom}
            style={{ flexGrow: '1', height: '100%' }}
          >
            {clicks.map((latLng, i) => (
              <Marker key={i} position={latLng} />
            ))}
          </Map>
        </Wrapper>
      )}
    </div>
  );
};

export default App;
