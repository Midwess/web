import { useParams, Navigate } from "react-router-dom";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Container } from "@/components/landing/Container";
import { Link } from "@/components/landing/_link";
import { getPost } from "@/content/blogs";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const proseClass =
  "mx-auto max-w-2xl " +
  "[&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-olive-50 " +
  "[&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-olive-300 " +
  "[&_strong]:font-medium [&_strong]:text-olive-100 [&_em]:text-olive-200 " +
  "[&_code]:rounded [&_code]:bg-olive-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-olive-200 " +
  "[&_a]:text-olive-100 [&_a]:underline [&_a]:underline-offset-2 " +
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:text-olive-300 " +
  "[&_pre]:mt-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-olive-800 [&_pre]:bg-olive-950 [&_pre]:p-4 " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm [&_pre_code]:leading-relaxed [&_pre_code]:text-olive-200";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) return <Navigate to="/#writing" replace />;

  return (
    <>
      <Navbar />
      <main>
        <DivideX />
        <Container className="border-x border-divide px-4 pt-12 pb-16 md:px-8 md:pt-20">
          <div className="mx-auto max-w-2xl">
            <Link
              href="/#writing"
              className="font-mono text-xs uppercase tracking-[0.15em] text-olive-400 transition-colors hover:text-olive-100"
            >
              ← All writing
            </Link>
            <h1 className="mt-6 font-display text-3xl font-medium tracking-tight text-olive-50 md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.15em] text-olive-500">
              <span>{formatDate(post.date)}</span>
              <span className="h-1 w-1 rounded-full bg-olive-600" />
              <span>{post.readTime}</span>
              <span className="h-1 w-1 rounded-full bg-olive-600" />
              <span className="text-olive-300">{post.author}</span>
            </div>
          </div>

          <img
            src={post.cover}
            alt={post.title}
            className="mx-auto mt-10 max-h-96 w-full max-w-3xl rounded-2xl object-cover shadow-aceternity"
          />

          <article className={`mt-12 ${proseClass}`}>{post.body}</article>
        </Container>
        <DivideX />
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;
