// ============================================================
// PROXY PARA EVITAR CORS - Vercel Serverless Function
// ============================================================

const API_URL_ORIGINAL = 'https://script.google.com/macros/s/AKfycbyNSKoxSwtNVxOZ0T6af8_hi8nOtsfg2ArvWlI6wkbOfhlxQAjqe4NnW7GcFdkziJk/exec';

export default async function handler(req, res) {
  // Habilitar CORS para todas las peticiones
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Método no permitido. Usa POST.' 
    });
  }

  try {
    const body = req.body;
    console.log('📤 Proxy recibiendo petición');

    const response = await fetch(API_URL_ORIGINAL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log('📥 Proxy recibiendo respuesta');

    res.status(200).json(data);

  } catch (error) {
    console.error('❌ Error en proxy:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error en el proxy: ' + error.message 
    });
  }
}