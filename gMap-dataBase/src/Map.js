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
import React, { useCallback, useEffect, useRef, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "./Map.css";
import db from "./firebase";
import { Button } from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

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
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  }, []);

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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {posts.map((item) => {
          return (
            <Marker
              key={item.id}
              position={{ lat: item.coordinates[0], lng: item.coordinates[1] }}
              icon={
                item.type === "Поставщик"
                  ? {
                      url:
                        "https://image.flaticon.com/icons/png/512/129/129945.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                    }
                  : {
                      url:
                        "https://www.flaticon.com/svg/static/icons/svg/2919/2919600.svg",
                      scaledSize: new window.google.maps.Size(20, 20),
                    }
              }
              onClick={() => {
                 setSelected(item)
              }}
            />
          );
        })}
        {selected && (
          <div>
            <InfoWindow
              position={{
                lat: selected.coordinates[0],
                lng: selected.coordinates[1],
              }}
              onCloseClick={() => setSelected(null)}
            >
              <div className="info_window">
                <h1>{selected.street}</h1>
                <h2>{selected.name}</h2>
                <h3>{selected.type}</h3>
              </div>
            </InfoWindow>
            <div className="infoWindow_nav">
              <div className="infoWindow_title">
                <h1>
                  <a href={`#${selected.name}`}>{selected.name}</a>
                  </h1>
                <Button onClick={() => setSelected(null)}>
                  <ArrowBackIos />
                </Button>
              </div>
              <div className="IndoNav_body">
                <h2>{selected.street}</h2>
              </div>
            </div>
          </div>
        )}
      </GoogleMap>
      <Search panTo={panTo} />
    </div>
  );
};

export default Map;

// Для иконок добавить icon={{url:}} в маркер размер иконки — scaledSize: new window.ggogle.maps.Size(30,30)

// уже работает 23,10 —-->

export const add = {
  street: "",
  lat: "",
  lng: "",
};

export const Search = ({ panTo }) => {
  const onSelect = async (address) => {
    try {
      const result = await getGeocode({ address });
      const { lat, lng } = await getLatLng(result[0]);
      panTo({ lat, lng });
      // console.log(lat, lng , address)
      add.street = address;
      add.lat = lat;
      add.lng = lng;
      console.log(add);
    } catch (error) {
      console.log(error);
    }
  };

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
    <div className="search">
      <Combobox onSelect={onSelect}>
        <ComboboxInput
          className="search_input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Введи адресс организации, которую хочешь добавить"
        />
        <ComboboxPopover>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
