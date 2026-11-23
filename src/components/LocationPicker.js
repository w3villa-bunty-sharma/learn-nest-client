
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MapLibreLocationMap = dynamic(
  () => import("./MapLibreLocationMap"),
  { ssr: false }
);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const INITIAL_POSITION = [28.6139, 77.2090];

export default function LocationPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(INITIAL_POSITION);
  const positionRef = useRef(INITIAL_POSITION);
  const [selectedMapPosition, setSelectedMapPosition] = useState(null);
  const [address, setAddress] = useState(null);
  const [search, setSearch] = useState("");
  const [searchRequestId, setSearchRequestId] = useState(0);
  const searchImmediatelyRef = useRef(false);
  const [locations, setLocations] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [error, setError] = useState("");
  const [addressNotice, setAddressNotice] = useState("");

  // Get address from map coordinates
  useEffect(() => {
    const controller = new AbortController();

    const fetchAddress = async () => {
      try {
        setLoading(true);
        setError("");
        setAddressNotice("");

        const [latitude, longitude] = position;

        const response = await fetch(
          `${API_URL}/api/location/reverse?latitude=${latitude}&longitude=${longitude}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch address"
          );
        }

        setAddress(
          data?.address || {
            fullAddress: "",
            area: "",
            city: "",
            district: "",
            state: "",
            postalCode: "",
            country: "",
          }
        );
        if (!data?.address?.fullAddress) {
          setAddressNotice(
            "Address details are unavailable; you can still confirm these coordinates."
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setAddress({
            fullAddress: "",
            area: "",
            city: "",
            district: "",
            state: "",
            postalCode: "",
            country: "",
          });
          setAddressNotice(
            "Address lookup is unavailable; you can still confirm these coordinates."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAddress();

    return () => controller.abort();
  }, [position]);

  // Search locations
  useEffect(() => {
    const query = search.trim();

    if (query.length < 2 || !suggestionsOpen) {
      return;
    }

    const controller = new AbortController();

    const delay = searchImmediatelyRef.current ? 0 : 600;
    searchImmediatelyRef.current = false;
    const timeout = setTimeout(async () => {
      try {
        setSearching(true);
        setSearchError("");

        const [latitude, longitude] = positionRef.current;
        const params = new URLSearchParams({
          q: query,
          latitude: String(latitude),
          longitude: String(longitude),
        });
        const response = await fetch(
          `${API_URL}/api/location/search?${params}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Search failed");
        }

        setLocations(
          Array.isArray(data.locations) ? data.locations : []
        );
        setSearchError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Location search error:", err);
          setLocations([]);
          setSearchError(err.message || "Location search is unavailable");
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearching(false);
        }
      }
    }, delay);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search, suggestionsOpen, searchRequestId]);

  // Select a location from search results
  const handleLocationSelect = (location) => {
    setError("");
    setLocations([]);
    setSuggestionsOpen(false);

    const latitude = Number(location?.latitude);
    const longitude = Number(location?.longitude);

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      setError("This search result does not include valid coordinates.");
      return;
    }

    const newPosition = [latitude, longitude];
    positionRef.current = newPosition;
    setPosition(newPosition);
    setSelectedMapPosition(newPosition);
    setSearch(location.name || "");
    setAddress({
      fullAddress: location.fullAddress || "",
      area: location.area || "",
      city: location.city || "",
      district: location.district || "",
      state: location.state || "",
      postalCode: location.postalCode || "",
      country: location.country || "",
    });
  };

  // Update coordinates when map moves
  const handlePositionChange = (coordinates) => {
    if (
      !Array.isArray(coordinates) ||
      coordinates.length !== 2
    ) {
      return;
    }

    const [latitude, longitude] = coordinates;

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      return;
    }

    positionRef.current = [latitude, longitude];
    setPosition([latitude, longitude]);
    setAddress(null);
    setAddressNotice("");
  };

  // Confirm selected location
  const handleConfirm = () => {
    if (!address || loading) {
      return;
    }

    const [latitude, longitude] = position;

    if (
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      setError("Please select a valid location");
      return;
    }

    const selectedLocation = {
      latitude,
      longitude,
      ...address,
    };

    onLocationSelect?.(selectedLocation);
  };

  return (
    <div className="space-y-4">

      {/* Location Search */}
      <div className="relative">
        <input
          type="text"
          value={search}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (search.trim().length >= 2 && suggestionsOpen) {
                searchImmediatelyRef.current = true;
                setSearchRequestId((requestId) => requestId + 1);
              }
            }
          }}
          onChange={(e) => {
            setSearch(e.target.value);
            setSuggestionsOpen(true);
            setSearchError("");
            setError("");
            if (e.target.value.trim().length < 2) setLocations([]);
          }}
          placeholder="Search city, area or location..."
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        {search.trim() && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSuggestionsOpen(false);
              setLocations([]);
              setSearching(false);
              setSearchError("");
            }}
            aria-label="Close location suggestions"
            title="Close suggestions"
            className="absolute right-3 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-lg leading-none text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            ×
          </button>
        )}

        {searching && (
          <span className="absolute right-12 top-3 text-xs text-slate-500">
            Searching...
          </span>
        )}

        <p className="mt-1 text-xs text-slate-400">
          Search powered by Photon · © OpenStreetMap contributors
        </p>

        {suggestionsOpen && locations.length > 0 && (
          <div className="absolute z-30 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg">
            {locations.map((location, index) => (
              <button
                key={`${location.id || "location"}-${index}`}
                type="button"
                onClick={() => handleLocationSelect(location)}
                className="w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-violet-50"
              >
                <p className="text-sm font-medium text-slate-800">
                  {location.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {location.fullAddress}
                </p>
              </button>
            ))}
          </div>
        )}

        {suggestionsOpen && searchError && (
          <p className="mt-2 text-sm text-red-600" role="status">
            {searchError}
          </p>
        )}

        {suggestionsOpen &&
          search.trim().length >= 2 &&
          !searching &&
          !searchError &&
          locations.length === 0 && (
            <p className="mt-2 text-sm text-slate-500" role="status">
              No matching places found. Try another name or a nearby landmark.
            </p>
          )}
      </div>

      {/* Map */}
      <MapLibreLocationMap
        initialPosition={INITIAL_POSITION}
        selectedPosition={selectedMapPosition}
        onPositionChange={handlePositionChange}
      />

      {/* Selected Address */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center gap-2">
          <span>📍</span>

          <h3 className="text-sm font-semibold text-slate-800">
            Selected Location
          </h3>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">
            Fetching address...
          </p>
        ) : (
          <p className="text-sm leading-6 text-slate-600">
            {address?.fullAddress ||
              addressNotice ||
              "Select a location on the map"}
          </p>
        )}

        <p className="mt-2 text-xs text-slate-400">
          Latitude: {position[0].toFixed(6)}
          {" | "}
          Longitude: {position[1].toFixed(6)}
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Confirm */}
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading || !address}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Fetching Location..." : "Confirm Location"}
      </button>

    </div>
  );
}
