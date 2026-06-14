export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error('No API key found');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    // Gebruik het model uit de request body, maar val terug op claude-3-haiku
    const body = req.body;
    const requestBody = {
      ...body,
      model: 'claude-haiku-4-5-20251001',
    };

    console.log('Calling Anthropic with model:', requestBody.model);
    console.log('API key starts with:', apiKey.substring(0, 10));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Anthropic response status:', response.status);
    const data = await response.json();
    console.log('Anthropic response:', JSON.stringify(data).substring(0, 200));
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Anthropic API error:', error);
    return res.status(500).json({ error: 'API request failed', details: error.message });
  }
}
