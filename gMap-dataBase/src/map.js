import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import React, { useCallback, useRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./App.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "700px",
};
const center = {
  lat: 56.858723,
  lng: 35.917599,
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDQAwunekiqpnswOjjMTjf2eSTI80oVTBI",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);
  }, []);

  // Нахуя нужны проверки? —удалить
  if (loadError) return "Error load";
  if (!isLoaded) return "loading";

  return (
    <div className="App">
      <Search panTo={panTo}/>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((item) => (
          <Marker
            key={item?.time.toISOString()}
            position={{ lat: item?.lat, lng: item?.lng }}
            onClick={() => {
              setSelected(item);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div>
              <h2>Working</h2>
              <button onClick={() => setMarkers([null])}>DELITE</button>
              <p>time: {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;

// Для иконок добавить icon={{url:}} в маркер размер иконки — scaledSize: new window.ggogle.maps.Size(30,30)

// уже работает 23,10 —-->

export const Search = ({panTo}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 56.858723, lng: () => 35.917599 },
      radius: 200 * 1000,
    },
  });
  return (
    <Combobox
      onSelect={async (address) => {
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
					panTo({lat , lng})
					console.log(lat, lng);
        } catch (error) {
          console.log(error);
        }

        console.log(address);
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="HHHHHHHHHHH"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
};
