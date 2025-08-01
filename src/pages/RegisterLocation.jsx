import React, { useState } from 'react';
import baseUrl from '../utils/api';
function RegisterLocation() {
  const [formData, setFormData] = useState({
    name: '',
    code: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };
  const token = localStorage.getItem("access_token");
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
          const res = await fetch(`${baseUrl}/location/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(formData),
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Response is not JSON: ${text.substring(0, 100)}...`);
    }

    const data = await res.json();
    console.log('Response Data:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Gagal mendaftarkan lokasi.');
      }

      setMessage('Lokasi berhasil didaftarkan!');
      setFormData({ name: '', code: '' });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftarkan Lokasi Baru</h2>

        {message && (
          <div className="mb-4 text-sm text-center text-blue-600 font-semibold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
              Nama Lokasi
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-gray-700 font-medium mb-1">
              Kode Lokasi
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Lokasi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterLocation;
