import React from 'react';

import Link from 'next/link';

import { Linkedin, Twitter } from 'lucide-react';

import { DashedLine } from '../dashed-line';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    content: (
      <div className="mt-3">
        <div>
          <p className="">Direct email</p>
          <Link
            href="mailto:team@westrise.studio"
            className="text-muted-foreground hover:text-foreground"
          >
            team@westrise.studio
          </Link>
        </div>
      </div>
    ),
  },
  {
    title: 'Follow us',
    content: (
      <div className="mt-3 flex gap-6 lg:gap-10">
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Twitter className="size-5" />
        </Link>
        <Link href="#" className="text-muted-foreground hover:text-foreground">
          <Linkedin className="size-5" />
        </Link>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Contact us
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          We are listening to your feedback. If you have any questions, please do
          not hesitate to contact us. We will be happy to help you.
        </p>

        <div className="mt-10 flex justify-between gap-8 max-sm:flex-col md:mt-14 lg:mt-20 lg:gap-12">
          {contactInfo.map((info, index) => (
            <div key={index}>
              <h2 className="font-medium">{info.title}</h2>
              {info.content}
            </div>
          ))}
        </div>

        <DashedLine className="my-12" />

        {/* Inquiry Form */}
        <div className="mx-auto">
          <h2 className="text-lg font-semibold">Or submit your feedback</h2>
          <form className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label>Your email address</Label>
              <Input placeholder="me@company.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label>Your message</Label>
              <Textarea
                placeholder="Write your message"
                className="min-h-[120px] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button size="lg" type="submit" className="">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
