const twilio = require('twilio');

exports.handler = async (event, context) => {
  // Configurações Twilio (via variáveis de ambiente)
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioWhatsApp = 'whatsapp:+14155238886';
  
  // Permitir apenas POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }
  
  const client = twilio(accountSid, authToken);
  
  try {
    const data = JSON.parse(event.body);
    const { nome, whatsapp } = data;
    
    // Validação básica
    if (!nome || !whatsapp) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Nome e WhatsApp são obrigatórios' })
      };
    }
    
    // Formatar número brasileiro para WhatsApp
    const numeroLimpo = whatsapp.replace(/\D/g, '');
    const numeroFormatado = `whatsapp:+55${numeroLimpo}`;
    
    // Mensagem personalizada
    const mensagem = `🎉 *Olá ${nome}!*

Sua presença está confirmada para o aniversário da *Sayuri*! 🎊

📅 *Data:* 08/11/2025
🕐 *Horário:* 20:00 horas

📍 *Local:*
Av. Ville Roy, 1744 - Caçari
Boa Vista - RR, 69307-725

🗺️ *Ver no mapa:*
https://maps.google.com/?q=Av.+Ville+Roy,+1744,+Caçari,+Boa+Vista,+RR,69307-725

🎁 *Lista de presente Go Pink:*
[Link da lista - aguardando]

Aguardamos você com muito carinho! 💖

_Qualquer dúvida, é só responder esta mensagem._`;
    
    // Enviar mensagem via Twilio
    const message = await client.messages.create({
      from: twilioWhatsApp,
      to: numeroFormatado,
      body: mensagem
    });
    
    console.log('WhatsApp enviado com sucesso:', message.sid);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true, 
        messageSid: message.sid,
        message: 'WhatsApp enviado com sucesso!'
      })
    };
    
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message,
        details: 'Erro ao enviar mensagem via WhatsApp'
      })
    };
  }
};

