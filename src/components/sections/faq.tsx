import Link from 'next/link';

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

// const categories = [
//   {
//     title: 'Support',
//     questions: [
//       {
//         question: 'How do I update my account without breaking my laptop?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//       {
//         question: 'Is support free, or do I need to Google everything?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//       {
//         question: 'Are you going to be subsumed by AI?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//     ],
//   },
//   {
//     title: 'Your account',
//     questions: [
//       {
//         question: 'Is support free, or do I need to Google everything?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//       {
//         question: 'Are you going to be subsumed by AI?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//     ],
//   },
//   {
//     title: 'Other questions',
//     questions: [
//       {
//         question: 'Is support free, or do I need to Google everything?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//       {
//         question: 'Are you going to be subsumed by AI?',
//         answer:
//           'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus voluptates deserunt officia temporibus dignissimos.',
//       },
//     ],
//   },
// ];

export const FAQ = ({
  headerTag = 'h2',
  className,
  className2,
}: {
  headerTag?: 'h1' | 'h2';
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn('py-28 lg:py-32', className)}>
      <div className="container max-w-5xl">
        <div className={cn('mx-auto grid gap-16 lg:grid-cols-2', className2)}>
          <div className="space-y-4">
            {headerTag === 'h1' ? (
              <h1 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Let's get in touch 👋
              </h1>
            ) : (
              <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                Let's get in touch 👋
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug font-medium lg:mx-auto">
              Let me know your thoughts about my product, or anything we could
              improve to make it even better.,{' '}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
