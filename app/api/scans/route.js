export async function POST(request) {
  const API_URL = process.env.S4E_API_URL;
  const token = process.env.S4E_API_TOKEN;

  if (!API_URL || !token) {
    return Response.json(
      { error: "API configuration missing" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { page = 1, per_page = 10, query = "", category_id = "" } = body;

    const response = await fetch(`${API_URL}/scan/list`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        page,
        per_page,
        query: query ? query : undefined,
        scan_category_id: category_id ? category_id : undefined,
        token: token,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
