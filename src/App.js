import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Map, {GeolocateControl} from 'react-map-gl';
import GeocoderControl from './components/GeocoderControl';
import { Button, Box, Card, TabNav } from '@radix-ui/themes';
import { useSDK } from "@metamask/sdk-react";
import PropertySlider from './components/PropertySlider';
import CreateLandParcel from './components/CreateLandParcel';
import DrawControl from './components/DrawControls';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

function App() {
  const [account, setAccount] = useState(null);
  const [view, setView] = useState('buy');
  const {sdk, chainId} = useSDK();
  const [features, setFeatures] = useState({});

  const connectToWeb3 = async () => {
    try {
        const accounts = await sdk?.connect();
        console.log(accounts)
        setAccount(accounts?.[0]+'');
    } catch (err) {
        console.warn("failed to connect..", err);
    }
  };

  const disconnectFromWeb3 = async () => {
    sdk.terminate()
    setAccount(null);
  }


  const changeView = (e, value) => {
    e.preventDefault();
    setView(value);
  }

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  return (
    <div className="App">
      <div id="top-container">
        <Card className='menu-items'>
          <Box>
            <TabNav.Root>
              <TabNav.Link onClick={(e)=>changeView(e,'claim')} href="#" active={view==="claim"?true:false}>
                Claim
              </TabNav.Link>
              <TabNav.Link onClick={(e)=>changeView(e,'buy')} href="#" active={view==="buy"?true:false}>Buy</TabNav.Link>
              <TabNav.Link onClick={(e)=>changeView(e,'sell')} href="#" active={view==="sell"?true:false}>Sell</TabNav.Link>
            </TabNav.Root>
          </Box>
          <Box>
          {account ?
            <Button className="login" onClick={disconnectFromWeb3}>{chainId} | {`${account.slice(0,5)}...${account.slice(account.length-5,account.length)}`}</Button>
              :
            <Button className="login" onClick={connectToWeb3}>Connect</Button>
          }
          </Box>
        </Card>
      </div>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        initialViewState={{
          longitude: -96.808891,
          latitude: 32.779167,
          zoom: 14
        }}
        style={{width: '100%', height: "105vh"}}
        mapStyle="mapbox://styles/subaiyalshk/clu9dc7cw01l201qqdw27ep6d"
      >
        <GeolocateControl position='bottom-right'/>
        <GeocoderControl mapboxAccessToken={process.env.REACT_APP_MAPBOX_KEY} position="top-left" />
        <DrawControl
          position="top-right"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
      <Box className='data-display-container'>
        <Card className='data-display-card' >
          {view==="claim"?<CreateLandParcel/>:null}
          {view==="buy"?<PropertySlider/>:null}
          {view==="sell"?<PropertySlider/>:null}
        </Card>
      </Box>
    </div>
  );
}

export default App;
