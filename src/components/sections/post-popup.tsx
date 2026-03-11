'use client';

import React, { useEffect, useState } from 'react';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import { X } from 'lucide-react';
import { Post } from 'contentlayer/generated';
import Lottie from '@/components/lottie';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

interface PostPopupProps {
  post: Post | null;
  onClose: () => void;
}

export const PostPopup = ({ post, onClose }: PostPopupProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (post) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [post]);

  if (!post) return null;

  const Content = getMDXComponent(post.body.code);
  const date = new Date(post.publishedDate || '');

  return (
    <AnimatePresence>
      {post && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card relative flex h-full max-h-[90vh] w-full max-w-(--breakpoint-xl) flex-col overflow-hidden rounded-[2rem] border border-border shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 px-8 py-6">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">{post.title}</h2>
                <p className="text-muted-foreground text-sm">
                  {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • {Math.round(post.readingTime.minutes)} min read
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-muted"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-8 py-10 scrollbar-thin scrollbar-thumb-border md:px-12 lg:px-20">
              <article className="prose prose-neutral dark:prose-invert max-w-none 
                [&>p]:text-muted-foreground [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6
                [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-foreground
                [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:text-foreground
                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8
                [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8
                [&>li]:text-muted-foreground [&>li]:mb-3 [&>li]:pl-2
                [&>img]:rounded-[2rem] [&>img]:my-12 [&>img]:shadow-2xl
                [&>figure]:my-10 [&>figure]:w-full [&>figure]:overflow-x-auto [&>figure]:rounded-2xl
                [&>pre]:bg-black [&>pre]:p-6 [&>pre]:rounded-2xl [&>pre]:mb-8 [&>pre]:border [&>pre]:border-white/10
                [&>pre_code]:text-gray-100 [&>pre_code]:bg-transparent [&>pre_code]:p-0
                [&>blockquote]:border-l-4 [&>blockquote]:border-orange-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:my-10 [&>blockquote]:text-xl
                [&>a]:text-orange-500 [&>a]:underline [&>a]:font-medium hover:[&>a]:text-orange-600
              ">
                <Content components={{ Lottie }} />
              </article>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end border-t border-border/50 bg-muted/30 px-8 py-4">
              <Button onClick={onClose} className="rounded-full px-6">
                Done Reading
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
