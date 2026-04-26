import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message required' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const contextStr = context ? JSON.stringify(context).slice(0, 3000) : 'No dossier context provided';
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are an expert legal market intelligence analyst specializing in Asia-Pacific and Middle East legal markets. You have access to detailed dossier data about 13 legal jurisdictions. Answer questions based on this context: ${contextStr}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error status:', response.status, 'body:', errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return res.status(200).json({ 
      response: data.choices[0]?.message?.content || 'No response'
    });
  } catch (error: any) {
    console.error('DeepSeek API error:', error.message || error);
    return res.status(500).json({ error: 'Failed to get AI response', details: error.message || String(error) });
  }
}
