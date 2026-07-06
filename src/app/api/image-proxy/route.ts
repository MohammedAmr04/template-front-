// app/api/image-proxy/route.ts
export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get("url");

  if (!url) {
    return new Response("Missing url", { status: 400 });
  }

  const res = await fetch(url);
  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      "Content-Type": res.headers.get("content-type") || "image/jpeg",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

/* 


Usage
 <Image
		src={`/api/image-proxy?url=${encodeURIComponent(item.answer)}`}
						style={{ width: 140, height: 100 }}
					/>
*/
