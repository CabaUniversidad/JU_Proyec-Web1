// Este archivo contiene la configuración del workflow de N8N
// Copia este JSON en tu instancia de N8N

export const n8nChatbotWorkflow = {
  name: "OfficeSupply Chatbot",
  nodes: [
    {
      parameters: {
        httpMethod: "POST",
        path: "chatbot",
        responseMode: "responseNode",
        options: {},
      },
      id: "webhook-trigger",
      name: "Webhook Trigger",
      type: "n8n-nodes-base.webhook",
      typeVersion: 1,
      position: [240, 300],
      webhookId: "chatbot-webhook",
    },
    {
      parameters: {
        conditions: {
          string: [
            {
              value1: "={{$json.message.toLowerCase()}}",
              operation: "contains",
              value2: "producto",
            },
          ],
        },
      },
      id: "intent-classifier",
      name: "Intent Classifier",
      type: "n8n-nodes-base.if",
      typeVersion: 1,
      position: [460, 300],
    },
    {
      parameters: {
        url: "https://lujjudeadillbjexpajo.supabase.co/rest/v1/Producto",
        authentication: "genericCredentialType",
        genericAuthType: "httpHeaderAuth",
        httpMethod: "GET",
        options: {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1amp1ZGVhZGlsbGJqZXhwYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzE2NjEsImV4cCI6MjA2NTIwNzY2MX0.F0lQ0910dUtbBkoywFEH5tDrDZLGSM2pYb7qpfLIi5c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1amp1ZGVhZGlsbGJqZXhwYWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzE2NjEsImV4cCI6MjA2NTIwNzY2MX0.F0lQ0910dUtbBkoywFEH5tDrDZLGSM2pYb7qpfLIi5c",
          },
          queryParameters: {
            Estado: "eq.true",
            limit: "5",
          },
        },
      },
      id: "get-products",
      name: "Get Products",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 3,
      position: [680, 200],
    },
    {
      parameters: {
        jsCode:
          '// Procesar la consulta del usuario y generar respuesta\nconst userMessage = $input.first().json.message.toLowerCase();\nconst products = $input.all()[1]?.json || [];\n\nlet response = {\n  success: true,\n  message: "",\n  suggestions: [],\n  products: null,\n  nextAction: null\n};\n\n// Detectar intención\nif (userMessage.includes(\'producto\') || userMessage.includes(\'catálogo\')) {\n  if (products.length > 0) {\n    response.message = `Encontré ${products.length} productos disponibles. Aquí tienes algunos:`;\n    response.products = products;\n    response.suggestions = [\n      "Ver más productos",\n      "Filtrar por categoría",\n      "Consultar precios",\n      "Hacer un pedido"\n    ];\n  } else {\n    response.message = "Lo siento, no encontré productos disponibles en este momento.";\n    response.suggestions = ["Contactar soporte", "Ver catálogo completo"];\n  }\n} else if (userMessage.includes(\'precio\')) {\n  response.message = "¿Sobre qué producto te gustaría conocer el precio? Puedes decirme el nombre o categoría.";\n  response.suggestions = [\n    "Bolígrafos",\n    "Cuadernos",\n    "Archivadores",\n    "Ver todos los precios"\n  ];\n} else if (userMessage.includes(\'pedido\') || userMessage.includes(\'comprar\')) {\n  response.message = "¡Perfecto! Te ayudo a hacer tu pedido. ¿Qué productos necesitas?";\n  response.suggestions = [\n    "Ver productos disponibles",\n    "Buscar producto específico",\n    "Ver mi carrito",\n    "Hablar con ventas"\n  ];\n} else if (userMessage.includes(\'estado\') || userMessage.includes(\'solicitud\')) {\n  response.message = "Para consultar el estado de tu solicitud, necesito algunos datos. ¿Podrías proporcionarme tu email o número de solicitud?";\n  response.suggestions = [\n    "Proporcionar email",\n    "Proporcionar número de solicitud",\n    "Contactar soporte"\n  ];\n} else if (userMessage.includes(\'humano\') || userMessage.includes(\'soporte\')) {\n  response.message = "Te conectaré con nuestro equipo de soporte. Mientras tanto, ¿podrías contarme brevemente en qué necesitas ayuda?";\n  response.suggestions = [\n    "Problema con pedido",\n    "Consulta técnica",\n    "Información de productos",\n    "Facturación"\n  ];\n} else if (userMessage.includes(\'hola\') || userMessage.includes(\'buenos\') || userMessage.includes(\'buenas\')) {\n  response.message = "¡Hola! Bienvenido a OfficeSupply. Soy tu asistente virtual y estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?";\n  response.suggestions = [\n    "Ver productos disponibles",\n    "Consultar precios",\n    "Hacer un pedido",\n    "Estado de mi solicitud",\n    "Hablar con un humano"\n  ];\n} else {\n  response.message = "Entiendo que necesitas ayuda, pero no estoy seguro de cómo asistirte con eso. ¿Podrías ser más específico o elegir una de estas opciones?";\n  response.suggestions = [\n    "Ver productos disponibles",\n    "Consultar precios",\n    "Hacer un pedido",\n    "Hablar con soporte"\n  ];\n}\n\nreturn response;',
      },
      id: "process-message",
      name: "Process Message",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [900, 300],
    },
    {
      parameters: {
        respondWith: "json",
        responseBody: "={{$json}}",
      },
      id: "response",
      name: "Response",
      type: "n8n-nodes-base.respondToWebhook",
      typeVersion: 1,
      position: [1120, 300],
    },
    {
      parameters: {
        jsCode:
          '// Respuesta por defecto para consultas generales\nreturn {\n  success: true,\n  message: "¿En qué más puedo ayudarte?",\n  suggestions: [\n    "Ver productos disponibles",\n    "Consultar precios",\n    "Hacer un pedido",\n    "Contactar soporte"\n  ]\n};',
      },
      id: "default-response",
      name: "Default Response",
      type: "n8n-nodes-base.code",
      typeVersion: 2,
      position: [680, 400],
    },
  ],
  connections: {
    "Webhook Trigger": {
      main: [
        [
          {
            node: "Intent Classifier",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Intent Classifier": {
      main: [
        [
          {
            node: "Get Products",
            type: "main",
            index: 0,
          },
        ],
        [
          {
            node: "Default Response",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Get Products": {
      main: [
        [
          {
            node: "Process Message",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Process Message": {
      main: [
        [
          {
            node: "Response",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
    "Default Response": {
      main: [
        [
          {
            node: "Response",
            type: "main",
            index: 0,
          },
        ],
      ],
    },
  },
}
