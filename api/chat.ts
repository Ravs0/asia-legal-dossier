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
    const contextStr = context ? JSON.stringify(context).slice(0, 3000) : '';
    const hasContext = contextStr && contextStr !== 'null' && contextStr.length > 10;
    
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
            content: `You are an expert legal market intelligence analyst specializing in global legal markets, with particular expertise in Asia-Pacific and Middle East jurisdictions. 

${hasContext ? `You have detailed dossier data for 13 jurisdictions in your knowledge base: ${contextStr}` : ''}

Answer questions using your comprehensive knowledge of:
- Global legal market trends and rankings
- Law firm strategies and competitive dynamics  
- Legal talent markets and compensation
- Regulatory developments and reforms
- Investment and M&A trends
- Regional market entry strategies
- Practice area growth and demand

When the question relates to specific dossier jurisdictions, reference that data. For broader legal intelligence questions, provide expert analysis based on general market knowledge. Be concise and actionable in your responses.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
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
