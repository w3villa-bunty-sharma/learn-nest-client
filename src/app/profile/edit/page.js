
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/DashboardNavbar";
import { apiUrl } from "@/lib/api";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Save,
  UserRound,
} from "lucide-react";

const emptyForm = {
  name: "",
  address_line1: "",
  address_line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
};

const LocationPicker = dynamic(
  () => import("@/components/LocationPicker"),
  { ssr: false }
);

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100";

export default function EditProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState(emptyForm);
  const [photoPreview, setPhotoPreview] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoError, setPhotoError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to edit your profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          apiUrl("/api/profile"),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to load your profile."
          );
        }

        const profile = data.profile || {};

        setForm({
          ...emptyForm,
          name: profile.name || "",
          address_line1: profile.address_line1 || "",
          address_line2: profile.address_line2 || "",
          city: profile.city || "",
          state: profile.state || "",
          postal_code: profile.postal_code || "",
          country: profile.country || "",
        });

        if (
          profile.latitude != null &&
          profile.longitude != null &&
          Number.isFinite(Number(profile.latitude)) &&
          Number.isFinite(Number(profile.longitude))
        ) {
          setSelectedLocation({
            latitude: Number(profile.latitude),
            longitude: Number(profile.longitude),
            fullAddress: profile.address_line1 || "",
          });
        }

        setPhotoPreview(profile.profile_picture_url || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (!photoPreview.startsWith("blob:")) return;

    return () => URL.revokeObjectURL(photoPreview);
  }, [photoPreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLocationSelect = (location) => {
    if (
      !location ||
      !Number.isFinite(Number(location.latitude)) ||
      !Number.isFinite(Number(location.longitude))
    ) {
      setError("Please select a valid location.");
      return;
    }

    setSelectedLocation({
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      fullAddress: location.fullAddress || "",
    });

    setForm((current) => ({
      ...current,
      address_line1:
        location.area ||
        location.fullAddress ||
        "",
      address_line2: "",
      city: location.city || "",
      state: location.state || "",
      postal_code: location.postalCode || "",
      country: location.country || "",
    }));

    setError("");
  };

  const handlePhotoSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setPhotoError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setPhotoError("Image must be 2 MB or smaller.");
      event.target.value = "";
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setPhotoError("Please log in again.");
      return;
    }

    setRemovingPhoto(true);
    setPhotoError("");

    try {
      const response = await fetch(
        apiUrl("/api/profile/photo"),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not remove profile picture."
        );
      }

      setPhotoFile(null);
      setPhotoPreview("");
      router.push("/profile");
    } catch (err) {
      setPhotoError(err.message);
    } finally {
      setRemovingPhoto(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setPhotoError("");

    let uploadingPhoto = false;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again.");
      }

      const profileResponse = await fetch(
        apiUrl("/api/profile"),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            latitude: selectedLocation?.latitude ?? null,
            longitude: selectedLocation?.longitude ?? null,
          }),
        }
      );

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(
          profileData.message ||
            "Unable to save profile details."
        );
      }

      if (photoFile) {
        uploadingPhoto = true;

        const signatureResponse = await fetch(
          apiUrl("/api/profile/photo/signature"),
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const signatureData = await signatureResponse.json();

        if (!signatureResponse.ok) {
          throw new Error(
            signatureData.message ||
              "Unable to prepare photo upload."
          );
        }

        const uploadForm = new FormData();

        uploadForm.append("file", photoFile);
        uploadForm.append("api_key", signatureData.apiKey);
        uploadForm.append(
          "timestamp",
          String(signatureData.timestamp)
        );
        uploadForm.append(
          "signature",
          signatureData.signature
        );
        uploadForm.append("folder", signatureData.folder);
        uploadForm.append(
          "public_id",
          signatureData.publicId
        );
        uploadForm.append(
          "overwrite",
          String(signatureData.overwrite)
        );

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
          {
            method: "POST",
            body: uploadForm,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        if (
          !cloudinaryResponse.ok ||
          !cloudinaryData.secure_url
        ) {
          throw new Error(
            cloudinaryData.error?.message ||
              "Photo upload failed."
          );
        }

        const savePhotoResponse = await fetch(
          apiUrl("/api/profile/photo"),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              secureUrl: cloudinaryData.secure_url,
            }),
          }
        );

        const savePhotoData = await savePhotoResponse.json();

        if (!savePhotoResponse.ok) {
          throw new Error(
            savePhotoData.message ||
              "Photo uploaded, but its URL could not be saved."
          );
        }
      }

      router.push("/profile");
    } catch (err) {
      if (uploadingPhoto) {
        setPhotoError(err.message);
      } else {
        setError(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <DashboardNavbar />

      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-100 via-sky-50 to-fuchsia-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          <Link
            href="/profile"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back to profile
          </Link>

          <div className="mb-7 overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-lg shadow-violet-100/70">
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 px-6 py-7 text-white sm:px-8">
              <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[26px] border-white/10" />

              <div className="relative flex items-center gap-4">
                <div className="rounded-2xl bg-white/15 p-3 ring-1 ring-white/25">
                  <UserRound size={25} />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                    Account settings
                  </p>

                  <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    Edit your profile
                  </h1>

                  <p className="mt-1 text-sm text-white/80">
                    Update your photo, personal details, and address.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 px-6 py-4 text-sm text-slate-600 sm:px-8">
              <CheckCircle2
                size={17}
                className="text-emerald-600"
              />
              Changes appear on your profile after saving.
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/80 bg-white/90 p-8 text-sm text-slate-500 shadow-sm">
              Loading your profile...
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <section className="rounded-2xl border border-fuchsia-100 bg-white/95 p-6 shadow-lg shadow-fuchsia-100/50 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-fuchsia-100 to-violet-100 p-2.5 text-violet-700">
                    <ImagePlus size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Profile photo
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Choose a JPG, PNG, or WebP image up to 2 MB.
                    </p>
                  </div>
                </div>

                {photoError && (
                  <p
                    role="alert"
                    className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {photoError}
                  </p>
                )}

                <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg ring-2 ring-violet-100"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 text-white shadow-lg ring-2 ring-violet-100">
                      <UserRound size={32} />
                    </div>
                  )}

                  <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100">
                    Choose photo

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handlePhotoSelect}
                      className="sr-only"
                    />
                  </label>

                  {photoPreview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      disabled={removingPhoto || saving}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {removingPhoto
                        ? "Removing photo..."
                        : "Remove photo"}
                    </button>
                  )}
                </div>
              </section>

              <section className="rounded-2xl border border-violet-100 bg-white/95 p-6 shadow-lg shadow-violet-100/60 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 p-2.5 text-violet-700">
                    <UserRound size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Personal information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Your name is shown on your LearnNest profile.
                    </p>
                  </div>
                </div>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Full name
                  </span>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className={inputClass}
                  />
                </label>
              </section>

              <section className="rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-lg shadow-sky-100/60 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 p-2.5 text-sky-700">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-900">
                      Address
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Add or update your address details.
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Address line 1
                    </span>

                    <input
                      name="address_line1"
                      value={form.address_line1}
                      onChange={handleChange}
                      placeholder="House number and street"
                      className={inputClass}
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Address line 2 (optional)
                    </span>

                    <input
                      name="address_line2"
                      value={form.address_line2}
                      onChange={handleChange}
                      placeholder="Apartment, suite, building, etc."
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      City
                    </span>

                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      State / Province
                    </span>

                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Your state"
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Postal code
                    </span>

                    <input
                      name="postal_code"
                      value={form.postal_code}
                      onChange={handleChange}
                      placeholder="Postal code"
                      className={inputClass}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                      Country
                    </span>

                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className={inputClass}
                    />
                  </label>
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-100 bg-white/95 p-6 shadow-lg shadow-emerald-100/50 sm:p-8">
                <div className="mb-6">
                  <h2 className="font-bold text-slate-900">
                    Select Your Location
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Move the map and place your desired location under the center pin.
                  </p>
                </div>

                <LocationPicker
                  onLocationSelect={handleLocationSelect}
                />

                {selectedLocation && (
                  <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                    <p className="text-sm font-medium text-emerald-800">
                      Location selected successfully.
                    </p>

                    <p className="mt-1 text-xs text-emerald-700">
                      Latitude: {selectedLocation.latitude}
                      {" | "}
                      Longitude: {selectedLocation.longitude}
                    </p>
                  </div>
                )}
              </section>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving || loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-800 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={16} />

                  {saving
                    ? "Saving and uploading..."
                    : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </>
  );
}
