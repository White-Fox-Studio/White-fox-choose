module.exports = async function (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
    const clientUserAgent = req.headers['user-agent'] || 'unknown';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VERCEL_OIDC_TOKEN}`,
      'x-secret-token': process.env.MY_SECRET_TOKEN,
      'x-forwarded-for': clientIp,
      'user-agent': clientUserAgent
    };
    const apiUrl = `${process.env.SUPABASE_URL}/functions/v1/submit-order`;

    const response = await fetch(
      apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(req.body),
      });

    const data = await response.json();

    if (response.status !== 200) {
      console.error("Supabase Error:", data);
      res.status(response.status).json({error: response.statusText, details: data});
    } else {
      return res.status(response.status).json(data);
    }

  } catch (error) {
    console.error("ОШИБКА В submit-order.JS:", error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
}
