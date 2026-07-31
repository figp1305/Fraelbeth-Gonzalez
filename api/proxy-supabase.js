// ============================================================
// api/supabase-proxy.js - Proxy para Supabase
// ============================================================

export default async function handler(req, res) {
  // === LAS VARIABLES DE ENTORNO ESTÁN OCULTAS EN VERCEL ===
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Construir la URL de Supabase
    let url = `${SUPABASE_URL}/rest/v1/facturas`;
    
    // Si es GET, agregar parámetros
    if (req.method === 'GET') {
      url += '?select=*&order=created_at.desc';
    }

    // Reenviar la petición a Supabase
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': req.headers['prefer'] || 'return=minimal'
      },
      body: req.method !== 'GET' && req.method !== 'DELETE' ? JSON.stringify(req.body) : undefined
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (error) {
    console.error('❌ Error en proxy:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error en el proxy: ' + error.message 
    });
  }
}