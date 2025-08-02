import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/api"; // Base URL for your API requests

function EditReport() {
  const { id } = useParams(); // Extract the report ID from the URL
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    date: "",
    sender: "",
    image: null,  // This will hold the image file
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch the current report data when the component mounts
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${baseUrl}/laporan/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load data.");
        }

        const data = await res.json();
        setFormData({
          description: data.description,
          location: data.location,
          date: data.date,
          sender: data.sender,
          image: data.image_url || null,  // Add image URL if available
        });
      } catch (error) {
        setMessage("Failed to load report data.");
        console.error("Error:", error);
      }
    };

    fetchReportData();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],  // Store the selected image file
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("sender", formData.sender);

    // Append the image file if it exists
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${baseUrl}/laporan/edit/${id}`, {
        method: "PUT", // Update report data using PUT
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Response is not JSON: ${text.substring(0, 100)}...`);
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update report.");
      }

      setMessage("Report successfully updated!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Laporan</h2>

        {message && (
          <div className="mb-4 text-sm text-center text-blue-600 font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Deskripsi */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-1"
            >
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              rows="4"
            />
          </div>

          {/* Lokasi */}
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-1"
            >
              Lokasi
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Tanggal */}
          <div>
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-1"
            >
              Tanggal
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Pengirim */}
          <div>
            <label
              htmlFor="sender"
              className="block text-gray-700 font-medium mb-1"
            >
              Pengirim
            </label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-1"
            >
              Ganti Gambar
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {formData.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
              {isSubmitting ? "Menyimpan..." : "Perbarui Laporan"}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700"
              onClick={() => window.history.back()}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditReport;
