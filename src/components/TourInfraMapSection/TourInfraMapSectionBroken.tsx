import { useEffect, useRef, useState } from "react";
import { MAP_CENTER, MAP_MARKERS, DAONSTAY_LOCATION, GOOGLE_MAPS_API_KEY } from "./constant";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const TourInfraMapSection = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [, setSelectedMarker] = useState<(typeof MAP_MARKERS)[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const loadGoogleMaps = () => {
      if (!mounted) return;
      
      if (window.google) {
        initializeMap();
        return;
      }

      window.initMap = () => {
        if (mounted) {
          initializeMap();
        }
      };
      
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        if (mounted) {
          console.error('Google Maps failed to load');
          setMapLoaded(false);
        }
      };
      
      // 중복 스크립트 방지
      if (!document.getElementById('google-maps-script')) {
        document.head.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (!mounted || !mapRef.current || !window.google || !window.google.maps) {
        return;
      }

      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 10,
        center: MAP_CENTER,
        mapTypeId: "satellite",
        zoomControl: true,
        mapTypeControl: true,
        mapTypeControlOptions: {
          mapTypeIds: ["satellite", "hybrid"],
        },
      });

      const infoWindow = new window.google.maps.InfoWindow();

      // 다온스테이 마커
      const daonstayMarker = new window.google.maps.Marker({
        position: { lat: DAONSTAY_LOCATION.lat, lng: DAONSTAY_LOCATION.lng },
        map: map,
        title: DAONSTAY_LOCATION.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: '#FFD700',
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 2,
          scale: 15,
        }
      });

      daonstayMarker.addListener('click', () => {
        infoWindow.setContent(`
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px 0; color: #1E2A4A;">${DAONSTAY_LOCATION.name}</h3>
            <p style="margin: 0; color: #666;">${DAONSTAY_LOCATION.description}</p>
          </div>
        `);
        infoWindow.open(map, daonstayMarker);
      });

      // 관광지 마커들
      MAP_MARKERS.forEach((marker, index) => {
        const mapMarker = new window.google.maps.Marker({
          position: { lat: marker.lat, lng: marker.lng },
          map: map,
          title: marker.name,
          label: {
            text: (index + 1).toString(),
            color: '#fff',
            fontWeight: 'bold',
          },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: '#4A90E2',
            fillOpacity: 1,
            strokeColor: '#fff',
            strokeWeight: 2,
            scale: 12,
          }
        });

        mapMarker.addListener('click', () => {
          infoWindow.setContent(`
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px 0; color: #1E2A4A;">${marker.name}</h3>
              <p style="margin: 0; color: #666;">${marker.description}</p>
            </div>
          `);
          infoWindow.open(map, mapMarker);
          setSelectedMarker(marker);
        });
      });

      // 지도 범위 설정
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: DAONSTAY_LOCATION.lat, lng: DAONSTAY_LOCATION.lng });
      MAP_MARKERS.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
      map.fitBounds(bounds);

      if (mounted) {
        setMapLoaded(true);
      }
    };

    loadGoogleMaps();
    
    return () => {
      mounted = false;
    };
  }, []);

  const handleTouristSpotClick = (marker: typeof MAP_MARKERS[0]) => {
    setSelectedMarker(marker);
    // 실제 지도에서 해당 마커 클릭하는 것은 복잡하므로 여기서는 상태만 업데이트
  };

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
            <div ref={mapRef} className="w-full h-full">
              {!mapLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">지도 로딩 중...</h3>
                    <p className="text-gray-500">잠시만 기다려주세요.</p>
                  </div>
                </div>
              )}
            </div>
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
                  onClick={() => handleTouristSpotClick(marker)}
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