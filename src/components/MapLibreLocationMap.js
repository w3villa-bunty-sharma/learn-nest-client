
"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_CENTER = [77.2090, 28.6139];

export default function MapLibreLocationMap({
  initialPosition = [28.6139, 77.2090],
  onPositionChange,
  onMapReady,
  selectedPosition,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const selectedPositionRef = useRef(selectedPosition);

  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    selectedPositionRef.current = selectedPosition;
  }, [selectedPosition]);

  useEffect(() => {
    let map;
    let marker;
    let mounted = true;

    const initializeMap = async () => {
      try {
        const maplibre = await import("maplibre-gl");

        if (!mounted || !mapContainerRef.current) return;

        const { Map, Marker, NavigationControl, setWorkerUrl } =
          maplibre;

        // Explicitly configure MapLibre worker for Next.js
        setWorkerUrl(
          new URL(
            "maplibre-gl/dist/maplibre-gl-worker.mjs",
            import.meta.url
          ).toString()
        );

        const mapCenter = initialPosition
          ? [initialPosition[1], initialPosition[0]]
          : DEFAULT_CENTER;

        map = new Map({
          container: mapContainerRef.current,
          style: "https://tiles.openfreemap.org/styles/liberty",
          center: mapCenter,
          zoom: 15,
          minZoom: 3,
          maxZoom: 19,
          attributionControl: true,
        });

        mapRef.current = map;

        map.addControl(
          new NavigationControl({
            showCompass: false,
            showZoom: true,
          }),
          "top-right"
        );

        marker = new Marker({
          color: "#7c3aed",
          draggable: false,
        })
          .setLngLat(mapCenter)
          .addTo(map);

        markerRef.current = marker;

        map.on("load", () => {
          if (!mounted) return;

          setMapLoaded(true);
          onMapReady?.(map);

          const position = selectedPositionRef.current;
          if (Array.isArray(position) && position.length === 2) {
            map.flyTo({
              center: [position[1], position[0]],
              zoom: 17,
              duration: 0,
            });
          }
        });

        map.on("moveend", () => {
          if (!mounted || !map) return;

          const center = map.getCenter();

          onPositionChange?.([center.lat, center.lng]);
        });
      } catch (error) {
        console.error("MapLibre initialization error:", error);
      }
    };

    initializeMap();

    return () => {
      mounted = false;

      marker?.remove();
      map?.remove();

      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  // Move map when a search result is selected
  useEffect(() => {
    if (
      !selectedPosition ||
      !mapRef.current ||
      !Array.isArray(selectedPosition) ||
      selectedPosition.length !== 2
    ) {
      return;
    }

    const [latitude, longitude] = selectedPosition;

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return;
    }

    mapRef.current.flyTo({
      center: [longitude, latitude],
      zoom: 17,
      duration: 1500,
    });
  }, [selectedPosition]);

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
      {/* Map */}
      <div
        ref={mapContainerRef}
        className="h-full w-full"
      />

      {/* Fixed Center Pin */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-full">
        <div className="flex flex-col items-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-xl text-white shadow-lg">
            📍
          </div>

          <div className="h-3 w-1 rounded-full bg-violet-600" />
        </div>
      </div>

      {/* Loading */}
      {!mapLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-100">
          <p className="text-sm text-slate-500">
            Loading map...
          </p>
        </div>
      )}
    </div>
  );
}
