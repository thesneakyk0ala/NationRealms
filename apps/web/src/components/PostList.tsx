import type { NationPost } from "@statecraft/shared";
import { formatDate, postTypeLabel } from "../format";

export function PostList({ posts }: { posts: NationPost[] }) {
  if (posts.length === 0) {
    return <p className="muted">No public posts yet.</p>;
  }

  return (
    <div className="stack">
      {posts.map((post) => (
        <article className="panel panel--compact" key={post.id}>
          <div className="panel-kicker">
            {postTypeLabel(post.type)} / {formatDate(post.createdAt)}
          </div>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
