const baseUrl = import.meta.env.VITE_API_URL;

export const getProfile = async () => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(`${baseUrl}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengambil data profil");
    }

    return data;
  } catch (error) {
    throw error;
  }
};
export default baseUrl;