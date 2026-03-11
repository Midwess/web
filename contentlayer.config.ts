// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import fs from 'fs';
import GithubSlugger from 'github-slugger';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const url = (post: unknown) => {
  return `/posts/${post.title.toLowerCase().replaceAll(' ', '-')}`;
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedDate: { type: 'date', required: false },
    description: { type: 'string', required: true },
    image: { type: 'image', required: true },
    isPublished: { type: 'boolean', default: false },
    authorDisplayName: { type: 'string', required: true },
    authorEmail: { type: 'string', required: true },
    authorFullName: { type: 'string', required: true },
    keywords: { type: 'list', of: { type: 'string' } },
    geometryCode: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post: unknown) => url(post),
    },
    slug: {
      type: 'string',
      required: true,
      resolve: (post: unknown) => post.title.toLowerCase().replaceAll(' ', '-'),
    },
    publicImage: {
      type: 'string',
      resolve: (post: unknown) => {
        return post.image.filePath.replace(
          '../public/',
          process.env.DEVLOG_DEVBLOG_PATH_PREFIX || '/',
        );
      },
    },
    readingTime: {
      type: 'json',
      resolve: (doc: unknown) => readingTime(doc.body.raw),
    },
    toc: {
      type: 'json',
      required: true,
      resolve: async (doc: unknown) => {
        const regulrExp = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regulrExp)).map(
          ({ groups }: unknown) => {
            const flag = groups?.flag;
            const content = groups?.content;

            return {
              level:
                flag?.length == 1 ? 'one' : flag?.length == 2 ? 'two' : 'three',
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          },
        );

        return headings;
      },
    },
  },
}));

const codeOptions = {
  theme: 'github-dark', // Or 'github-dark', 'dracula', etc.
  grid: true,
  keepBackground: false,
};

export default makeSource({
  contentDirPath: 'content',
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
      [rehypePrettyCode, codeOptions],
    ],
  },
  documentTypes: [Post],
})
