import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";
import {
  GOOGLE_MAPS_API_KEY,
  MAP_CENTER,
  MAP_MARKERS,
  DAONSTAY_LOCATION,
} from "./constant";

const TourInfraMapSection = () => {
  const [_, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<
    (typeof MAP_MARKERS)[0] | null
  >(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: DAONSTAY_LOCATION.lat, lng: DAONSTAY_LOCATION.lng });
      MAP_MARKERS.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);
      setMap(map);
    } catch (error) {
      console.error('Map loading error:', error);
    }
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const isGoogleLoaded =
    typeof window !== "undefined" && window.google && window.google.maps;

  return (
    <section className="py-16 md:py-24 bg-secondary-gray-50">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-primary-blue-900 mb-4 animate-dance">
            <span className="text-accent-gold-500 text-stroke-primary">관광 인프라</span>
          </h2>
          <p className="text-lg md:text-xl text-secondary-gray-500 animate-dance animation-delay-200">
            다온스테이를 중심으로 주요 관광지까지의 거리를 확인하세요.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map Container */}
          <div className="flex-1 aspect-[390/313] md:aspect-[1104/609] relative rounded-xl overflow-hidden border-2 border-secondary-gray-200">
            <LoadScript 
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              preventGoogleFontsLoading={true}
            >
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                center={MAP_CENTER}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{
                  disableDefaultUI: true,
                  minZoom: 9,
                  mapTypeId: "satellite",
                  zoomControl: true,
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                    mapTypeIds: ["satellite", "hybrid"],
                  },
                }}
                onClick={() => setSelectedMarker(null)}
              >
                {/* 다온스테이 고정 마커 */}
                {isGoogleLoaded && (
                  <Marker
                    key={DAONSTAY_LOCATION.id}
                    position={{ lat: DAONSTAY_LOCATION.lat, lng: DAONSTAY_LOCATION.lng }}
                    onClick={(e) => {
                      e.domEvent.stopPropagation();
                      setSelectedMarker(DAONSTAY_LOCATION);
                    }}
                    options={{
                      icon: {
                        url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="80" viewBox="0 0 60 80">
                            <circle cx="30" cy="30" r="25" fill="#FFD700" stroke="#000" stroke-width="3"/>
                            <polygon points="30,55 20,30 40,30" fill="#FFD700" stroke="#000" stroke-width="2"/>
                            <text x="30" y="37" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#000">H</text>
                          </svg>
                        `),
                        scaledSize: new window.google.maps.Size(60, 80),
                        anchor: new window.google.maps.Point(30, 80),
                      },
                    }}
                  />
                )}

                {/* 관광지 마커들 */}
                {isGoogleLoaded &&
                  MAP_MARKERS.map((marker) => (
                    <Marker
                      key={marker.id}
                      position={{ lat: marker.lat, lng: marker.lng }}
                      onClick={(e) => {
                        e.domEvent.stopPropagation();
                        setSelectedMarker(marker);
                      }}
                      options={{
                        icon: {
                          url: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="65" viewBox="0 0 50 65">
                              <circle cx="25" cy="25" r="20" fill="#4A90E2" stroke="#fff" stroke-width="3"/>
                              <polygon points="25,45 18,25 32,25" fill="#4A90E2" stroke="#fff" stroke-width="2"/>
                              <text x="25" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#fff">${marker.id - 1}</text>
                            </svg>
                          `),
                          scaledSize: new window.google.maps.Size(50, 65),
                          anchor: new window.google.maps.Point(25, 65),
                        },
                      }}
                    />
                  ))}

              {isGoogleLoaded && selectedMarker && (
                <InfoWindow
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="flex p-1">
                    <img
                      src={selectedMarker.image}
                      alt={selectedMarker.name}
                      className="w-20 h-20 object-cover rounded mr-3"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="font-bold text-base text-primary-blue-900">{selectedMarker.name}</h3>
                      <p className="text-sm text-secondary-gray-800">{selectedMarker.description}</p>
                    </div>
                  </div>
                </InfoWindow>
              )}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* 관광지 목록 */}
          <div className="lg:w-80 bg-white rounded-xl border-2 border-secondary-gray-200 p-6 max-h-[600px] overflow-y-auto">
            <h3 className="text-xl font-bold text-primary-blue-900 mb-4">주변 관광지 ({MAP_MARKERS.length}곳)</h3>
            
            {/* 다온스테이 */}
            <div 
              className="p-4 mb-3 bg-accent-gold-50 border border-accent-gold-200 rounded-lg cursor-pointer hover:bg-accent-gold-100 transition-colors"
              onClick={() => setSelectedMarker(DAONSTAY_LOCATION)}
            >
              <div className="flex items-center gap-3">
                <img 
                  src={DAONSTAY_LOCATION.image} 
                  alt={DAONSTAY_LOCATION.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold text-primary-blue-900 text-base">{DAONSTAY_LOCATION.name}</h4>
                  <p className="text-sm text-secondary-gray-600">{DAONSTAY_LOCATION.description}</p>
                </div>
              </div>
            </div>

            {/* 관광지들 */}
            <div className="space-y-2">
              {MAP_MARKERS.map((marker) => (
                <div
                  key={marker.id}
                  className="p-3 bg-secondary-gray-50 rounded-lg cursor-pointer hover:bg-secondary-gray-100 transition-colors"
                  onClick={() => setSelectedMarker(marker)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={marker.image} 
                      alt={marker.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-primary-blue-900 text-sm">{marker.name}</h4>
                      <p className="text-xs text-secondary-gray-600 line-clamp-1">{marker.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourInfraMapSection;