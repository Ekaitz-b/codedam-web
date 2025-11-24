// ========================================
// CONFIGURACIÓN DE API KEY DE ANTHROPIC
// ========================================
// 
// IMPORTANTE: Para proyectos web estáticos (HTML/JS), hay dos formas de usar la API key:
//
// OPCIÓN 1: Usar un backend (Node.js, Python, etc.)
//   - La API key se mantiene segura en el servidor
//   - El frontend hace peticiones al backend, que usa la API key
//
// OPCIÓN 2: Variables de entorno del sistema (solo para desarrollo local)
//   - NO recomendado para producción
//   - La API key podría ser visible en el código del navegador
//
// Para este proyecto, si quieres integrar la API de Anthropic, necesitarás:
// 1. Un servidor backend (Node.js con Express, Python con Flask, etc.)
// 2. O usar un servicio serverless (Vercel, Netlify Functions, etc.)

// Configuración de la API (solo para referencia - NO poner la key aquí)
const API_CONFIG = {
    // Base URL de la API de Anthropic
    baseURL: 'https://api.anthropic.com/v1',
    
    // Modelo por defecto
    defaultModel: 'claude-3-5-sonnet-20241022',
    
    // Versión de la API
    apiVersion: '2023-06-01'
};

// Función para obtener la API key desde el backend
// Esta función debe llamar a tu servidor backend, no usar la key directamente
async function getApiKeyFromBackend() {
    try {
        // Ejemplo: llamar a tu endpoint backend que devuelve la key
        // const response = await fetch('/api/get-anthropic-key');
        // const data = await response.json();
        // return data.apiKey;
        
        console.warn('⚠️ Para usar la API de Anthropic, necesitas configurar un backend.');
        return null;
    } catch (error) {
        console.error('Error obteniendo API key:', error);
        return null;
    }
}

// Función para hacer una petición a la API de Anthropic (ejemplo)
async function callAnthropicAPI(message, systemPrompt = '') {
    const apiKey = await getApiKeyFromBackend();
    
    if (!apiKey) {
        throw new Error('API key no disponible. Configura un backend primero.');
    }
    
    const response = await fetch(`${API_CONFIG.baseURL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': API_CONFIG.apiVersion
        },
        body: JSON.stringify({
            model: API_CONFIG.defaultModel,
            max_tokens: 1024,
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ],
            ...(systemPrompt && { system: systemPrompt })
        })
    });
    
    if (!response.ok) {
        throw new Error(`Error en la API: ${response.statusText}`);
    }
    
    return await response.json();
}

// Exportar funciones si usas módulos ES6
// export { callAnthropicAPI, API_CONFIG };



