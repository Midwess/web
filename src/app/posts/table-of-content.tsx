import { Post } from 'contentlayer/generated';

export const TableOfContent = (props: { post: Post }) => {
  const { post } = props || {};
  return (
    <div className="sxl:gap-16 mt-8 w-full gap-y-8 rounded-xl font-sans text-sm font-medium backdrop-blur-3xl lg:gap-8 xl:max-w-full">
      <div className="col-span-full">
        <details className="sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto rounded-xl p-4">
          <summary className="hover:text-highlight text-foreground cursor-pointer text-sm font-bold capitalize">
            Table Of Contents
          </summary>
          <ul className="font-in mt-4 pl-3 text-sm">
            {(post.toc || [])
              .filter((it: { slug: string }) => it.slug)
              .map((heading: { slug: string; level: string; text: string }) => {
                return (
                  <li key={`#${heading.slug}`} className="py-1">
                    <a
                      href={`#${heading.slug}`}
                      data-level={heading.level}
                      className="border-foreground flex items-center justify-start border-solid data-[level=three]:pl-4 data-[level=two]:border-t data-[level=two]:pt-2 data-[level=two]:pl-0 sm:data-[level=three]:pl-6"
                    >
                      {heading.level === 'three' ? (
                        <span className="bg-dark mr-2 flex h-1 w-1 rounded-full">
                          &nbsp;
                        </span>
                      ) : null}

                      <span className="text-foreground hover:text-highlight hover:underline">
                        {heading.text.replaceAll('\\', '')}
                      </span>
                    </a>
                  </li>
                );
              })}
          </ul>
        </details>
      </div>
    </div>
  );
};
