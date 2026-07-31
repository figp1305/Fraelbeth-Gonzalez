// api/proxy.js
const API_URL_ORIGINAL = 'https://script.google.com/macros/s/AKfycbyNSKoxSwtNVxOZ0T6af8_hi8nOtsfg2ArvWlI6wkbOfhlxQAjqe4NnW7GcFdkziJk/exec';

export default async function handler(req, res) {
  // Habilitar CORS para peticiones desde el frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder inmediatamente al Preflight de navegadores (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Permitir únicamente peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Método no permitido. Usa POST.' 
    });
  }

  try {
    const payload = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const response = await fetch(API_URL_ORIGINAL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: payload,
      redirect: 'follow'
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('❌ Error en proxy:', error);
    return res.status(500).json({ 
      status: 'error', 
      message: 'Error interno en proxy: ' + error.message 
    });
  }
}