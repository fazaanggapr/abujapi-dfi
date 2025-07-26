import { useState } from "react";
import baseUrl from "../utils/api";

const useAttendanceSubmission = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitAttendance = async (token, onSuccess) => {
    setIsLoading(true);
    setMessage("");
    setStatus("");

    const accessToken = localStorage.getItem("access_token");

    try {
      const response = await fetch(`${baseUrl}/submit-attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setStatus("success");

        // Auto restart scanner after 3 seconds
        setTimeout(() => {
          setMessage("");
          setStatus("");
          onSuccess();
        }, 3000);
      } else {
        setMessage(result.message);
        setStatus("error");

        // Auto restart scanner after 2 seconds
        setTimeout(() => {
          setMessage("");
          setStatus("");
          onSuccess();
        }, 2000);
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Gagal mengirim data. Periksa koneksi internet Anda.");
      setStatus("error");

      // Auto restart scanner after 2 seconds
      setTimeout(() => {
        setMessage("");
        setStatus("");
        onSuccess();
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStatus = () => {
    setMessage("");
    setStatus("");
  };

  return {
    message,
    status,
    isLoading,
    submitAttendance,
    clearStatus
  };
};

export default useAttendanceSubmission;
