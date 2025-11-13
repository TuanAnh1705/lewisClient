import { notFound } from "next/navigation"

async function getPostData(id: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL
    const res = await fetch(`${API_URL}/api/post/${id}`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.post
  } catch (error) {
    console.error("Error fetching post data:", error)
    return null
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPostData(id)

  if (!post) return notFound()

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {post.coverImage && (
        <div className="mb-6">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl shadow"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: post.contentHtml || "",
        }}
      />
    </article>
  )
}
