module.exports = async function (req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  const { orderNumber, studentLastName } = req.query;

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.VERCEL_OIDC_TOKEN}`,
      'x-secret-token': process.env.MY_SECRET_TOKEN
    };
    const apiUrl = `${process.env.SUPABASE_URL}/functions/v1/get-layout`;

    const response = await fetch(
      apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          order_number: orderNumber,
          family_name: studentLastName
        })
    });

    if (response.status !== 200) {
      const errData = await response.text();
      console.error("Supabase Error:", errData);
      res.status(response.status).json({error: response.statusText, details: errData});
    } else {
      const data = await response.json();
      return res.status(response.status).json(data);
    }

  } catch (error) {
    console.error("ОШИБКА В GET-LAYOUT.JS:", error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
}
