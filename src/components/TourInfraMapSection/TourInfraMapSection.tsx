import { useEffect, useRef } from "react";
import {
  DAONSTAY_LOCATION,
  GOOGLE_MAPS_API_KEY,
  MAP_MARKERS,
} from "./constant";
import useTypingEffect from "../../hooks/useTypingEffect.tsx";

// 타입스크립트를 위한 Window 객체 확장
declare global {
  interface Window {
    initMap: () => void;
  }
}

const TourInfraMapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  // React의 리렌더링에 영향을 받지 않도록 지도 관련 객체들을 ref에 저장
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const daonstayMarkerRef = useRef<google.maps.Marker | null>(null);
  const markersRef = useRef<(google.maps.Marker | null)[]>([]);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: DAONSTAY_LOCATION,
      zoom: 12,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeId: 'roadmap', // V4에서는 위성지도 대신 일반 로드맵 사용
      styles: [ // V4 테마에 맞는 지도 스타일
        { "featureType": "all", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
        { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
        { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
        { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
        { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
      ]
    });
    mapInstanceRef.current = map;
    infoWindowRef.current = new window.google.maps.InfoWindow({
      content: '<div></div>'
    });

    const daonstayMarker = new window.google.maps.Marker({
      position: DAONSTAY_LOCATION,
      map,
      icon: {
        url: DAONSTAY_LOCATION.image,
        scaledSize: new window.google.maps.Size(60, 60),
        anchor: new window.google.maps.Point(30, 60),
      },
      zIndex: 1001,
    });
    daonstayMarkerRef.current = daonstayMarker;

    daonstayMarker.addListener('click', () => {
      infoWindowRef.current?.setContent(`
        <div style="position: relative; width: 180px; height: 120px; border-radius: 8px; overflow: hidden;">
          <img src="${DAONSTAY_LOCATION.image}" alt="${DAONSTAY_LOCATION.name}" style="width: 100%; height: 100%; object-fit: cover;" />
          <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.6); color: white; padding: 8px; text-align: center; word-break: keep-all;">
            <h3 style="font-weight: bold; font-size: 1rem; margin: 0;">${DAONSTAY_LOCATION.name}</h3>
          </div>
        </div>
      `);
      infoWindowRef.current?.open(map, daonstayMarker);
    });

    markersRef.current = MAP_MARKERS.map((markerInfo, index) => {
      const marker = new window.google.maps.Marker({
        position: markerInfo,
        map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#c09a58", // v4-gold
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
          scale: 14,
        },
        label: {
          text: String(index + 1),
          color: "white",
          fontSize: "14px",
          fontWeight: "bold",
        },
      });

      marker.addListener('click', () => {
        infoWindowRef.current?.setContent(`
          <div style="position: relative; width: 180px; height: 120px; border-radius: 8px; overflow: hidden;">
            <img src="${markerInfo.image}" alt="${markerInfo.name}" style="width: 100%; height: 100%; object-fit: cover;" />
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0, 0, 0, 0.6); color: white; padding: 8px; text-align: center; word-break: keep-all;">
              <h3 style="font-weight: bold; font-size: 1rem; margin: 0;">${markerInfo.name}</h3>
            </div>
          </div>
        `);
        infoWindowRef.current?.open(map, marker);
      });
      return marker;
    });

    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(DAONSTAY_LOCATION);
    MAP_MARKERS.forEach(marker => bounds.extend(marker));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initializeMap();
    } else if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      window.initMap = initializeMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=marker&v=beta`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleListItemClick = (markerInstance: google.maps.Marker | null) => {
    const map = mapInstanceRef.current;
    if (markerInstance && map) {
      map.panTo(markerInstance.getPosition()!);
      new window.google.maps.event.trigger(markerInstance, 'click');
    }
  };

  return (
    <div className="max-w-container py-8 pc:py-12">
      <h2 className="text-5xl pc:text-7xl font-extrabold text-v4-text px-4 pc:px-12 mb-6 text-center animate-typing">
        <span className="text-v4-gold">{useTypingEffect("다온스테이 주변의", 50)}</span><br />
        <span className="text-black text-shadow-lg">{useTypingEffect("핵심 관광 인프라", 50)}</span>
      </h2>
      <div className="flex flex-col lg:flex-row gap-6 px-4 pc:px-12">
        <div className="w-full lg:w-3/5 aspect-[390/313] pc:aspect-auto lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="w-full lg:w-2/5 bg-v4-bg rounded-lg p-4 lg:max-h-[600px] overflow-y-auto shadow-lg custom-scrollbar">
          <h3 className="text-xl font-bold text-v4-text-muted mb-4 animate-typing">
            주변 관광지 ({MAP_MARKERS.length}곳)
          </h3>
          <ul className="space-y-3">
            <li
              onClick={() => handleListItemClick(daonstayMarkerRef.current)}
              className="flex items-center p-3 rounded-lg border border-v4-gold/50 cursor-pointer bg-v4-surface hover:bg-v4-gold/20 transition-all"
            >
              <div className="w-10 h-10 bg-v4-gold rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                ★
              </div>
              <img src={DAONSTAY_LOCATION.image} alt={DAONSTAY_LOCATION.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
              <div className="flex-grow">
                <h4 className="font-semibold text-v4-text-muted animate-typing">{DAONSTAY_LOCATION.name}</h4>
                <p className="text-sm text-v4-text-muted">{DAONSTAY_LOCATION.description}</p>
              </div>
            </li>
            {MAP_MARKERS.map((marker, index) => (
              <li
                key={marker.id}
                onClick={() => handleListItemClick(markersRef.current[index])}
                className="flex items-center p-3 rounded-lg border border-v4-gold/50 cursor-pointer bg-v4-surface hover:bg-v4-gold/20 transition-all"
              >
                <div className="w-10 h-10 bg-v4-blue rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <img src={marker.image} alt={marker.name} className="w-20 h-20 object-cover rounded-md mr-4"/>
                <div className="flex-grow">
                  <h4 className="font-semibold text-v4-text-muted animate-typing">{marker.name}</h4>
                  <p className="text-sm text-v4-text animate-typing">{marker.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TourInfraMapSection;