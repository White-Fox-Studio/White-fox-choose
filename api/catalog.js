module.exports = async function (req, res) {
  if (req.method !== 'GET') return res.status(405).json({error: 'Method Not Allowed'});
  console.log('start');
  console.log('apikey', process.env.SUPABASE_PUBLISHABLE_KEY);

  try {
    const headers = {
      'Content-Type': 'application/json',
      'apikey': process.env.SUPABASE_PUBLISHABLE_KEY,
      'x-secret-token': process.env.MY_SECRET_TOKEN
    };

    // Добавили packRes (запрос пакетов)
    const [catRes, prodRes, packRes] = await Promise.all([
      fetch(`${process.env.SUPABASE_URL}/rest/v1/categories?select=*&order=sort_order.asc`, {headers}),
      fetch(`${process.env.SUPABASE_URL}/rest/v1/product_cards?select=*`, {headers}),
      fetch(`${process.env.SUPABASE_URL}/rest/v1/packages_with_price?select=*&order=sort_order.asc`, {headers})
    ]);

    const categories = await catRes.json();
    const products = await prodRes.json();
    const packages = await packRes.json(); // Парсим пакеты

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

    // Отдаем все 3 массива
    return res.status(200).json({categories, products, packages});
  } catch (error) {
    console.error("ОШИБКА В CATALOG.JS:", error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message,
    });
  }
}
