'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Github, Twitter, Send, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const DEFAULT_FEEDBACK_URL = 'https://api.midwess.com/app-gateway/api/feedback';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !feedback) return;

    setStatus('loading');
    setErrorMessage('');

    const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL || DEFAULT_FEEDBACK_URL;

    try {
      const response = await fetch(feedbackUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, feedback }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setStatus('success');
      setEmail('');
      setFeedback('');
    } catch (error) {
      console.error('Feedback submission error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us directly.');
    }
  };

  return (
    <section className="relative w-full overflow-hidden py-12 lg:py-16">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-500">
                <MessageSquare className="h-3.5 w-3.5" />
                Contact Us
              </div>
              <h1 className="font-sans text-4xl font-extrabold tracking-tighter text-balance uppercase sm:text-5xl lg:text-6xl">
                Let&apos;s build <span className="text-orange-500">together</span>
              </h1>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                Have a question, feedback, or a project in mind? We&apos;re listening. 
                Our team is dedicated to building tools that empower modern engineering teams.
              </p>
            </div>

            <div className="space-y-6">
              <div className="group flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm transition-colors group-hover:border-orange-500/50">
                  <Send className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">Email</h3>
                  <Link 
                    href="mailto:team@midwess.com" 
                    className="text-lg font-medium transition-colors hover:text-orange-500"
                  >
                    team@midwess.com
                  </Link>
                </div>
              </div>

              <div className="flex gap-4">
                <Link 
                  href="https://x.com/midwess"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:border-orange-500/50 hover:text-orange-500"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link 
                  href="https://github.com/midwess"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card shadow-sm transition-all hover:border-orange-500/50 hover:text-orange-500"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-orange-500/5 blur-2xl" />
            <div className="relative rounded-2xl border border-border bg-card/50 p-8 shadow-2xl backdrop-blur-sm md:p-10">
              {status === 'success' ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center space-y-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Message Sent!</h2>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus('idle')}
                    className="mt-4"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                      Your Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="engineering@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 border-border bg-background/50 focus-visible:ring-orange-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
                      Your Message
                    </Label>
                    <Textarea
                      id="feedback"
                      placeholder="How can we help you?"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      required
                      className="min-h-[160px] resize-none border-border bg-background/50 focus-visible:ring-orange-500"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm font-medium text-red-500">
                      {errorMessage}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-12 w-full border-none bg-orange-500 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 disabled:opacity-70"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We typically respond within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
