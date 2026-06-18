import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { DivideX } from "@/components/landing/Divide";
import { Container } from "@/components/landing/Container";
import { Heading, SubHeading, Badge } from "@/components/landing/Typography";
import { Link } from "@/components/landing/_link";
import { posts, type BlogPost } from "@/content/blogs";

const truncate = (str: string, n: number) =>
  str.length > n ? str.slice(0, n).trimEnd() + "…" : str;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const GridLayout = ({ blogs }: { blogs: BlogPost[] }) => (
  <div className="grid grid-cols-1 divide-y divide-divide lg:grid-cols-3 lg:divide-x lg:divide-y-0">
    {blogs.map((blog) => (
      <Link
        key={blog.slug}
        href={`/blog/${blog.slug}`}
        className="group p-4 transition-colors hover:bg-olive-900/40 md:p-8"
      >
        <img
          src={blog.cover}
          alt={blog.title}
          className="h-56 w-full rounded-lg object-cover shadow-aceternity"
        />
        <h2 className="mt-4 font-display text-lg font-medium tracking-tight text-olive-50">
          {blog.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-olive-400">
          {truncate(blog.description, 110)}
        </p>
        <span className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.15em] text-olive-500">
          {formatDate(blog.date)} · {blog.readTime}
        </span>
      </Link>
    ))}
  </div>
);

const RowLayout = ({ blog }: { blog: BlogPost }) => (
  <Link
    href={`/blog/${blog.slug}`}
    className="group flex flex-col justify-between gap-3 px-4 py-6 transition-colors hover:bg-olive-900/40 md:flex-row md:items-center md:px-8"
  >
    <div>
      <h2 className="font-display text-lg font-medium tracking-tight text-olive-50">
        {blog.title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-olive-400">
        {truncate(blog.description, 150)}
      </p>
    </div>
    <div className="shrink-0 text-left md:text-right">
      <div className="font-mono text-xs uppercase tracking-[0.15em] text-olive-500">
        {formatDate(blog.date)}
      </div>
      <div className="mt-1 text-sm text-olive-300">{blog.author}</div>
    </div>
  </Link>
);

const Blog = () => (
  <>
    <Navbar />
    <main>
      <DivideX />
      <Container className="flex flex-col items-center border-x border-divide px-4 pt-12 md:px-8 md:pt-20">
        <Badge text="Writing" />
        <Heading className="mt-4">Notes from the build</Heading>
        <SubHeading as="p" className="mx-auto mt-3 max-w-md">
          What we're learning while building durable, agentic infrastructure in
          Rust.
        </SubHeading>
        <div className="mt-12 flex w-full flex-col divide-y divide-divide border-y border-divide">
          <GridLayout blogs={posts.slice(0, 3)} />
          {posts.slice(3).map((blog) => (
            <RowLayout key={blog.slug} blog={blog} />
          ))}
        </div>
      </Container>
      <DivideX />
    </main>
    <Footer />
  </>
);

export default Blog;
