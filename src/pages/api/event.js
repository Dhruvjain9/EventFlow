export default async function handler(req, res) {
  const { min_price, max_price, city, date } = req.query;

  const params = new URLSearchParams(req.query).toString();
  const url = `https://event-flow.ct.ws/api/getEvents.php?${params}`;

  try {
    const response = await fetch(url);
    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: "Proxy fetch failed" });
  }
}
