'use client'
import Image from 'next/image';
import Link from 'next/link';

import { FcGoogle } from 'react-icons/fc';

import CreamContainer from '@/components/layout/cream-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import useService from '@/hooks/use-service';
import { getAppName } from '@/grpc_services/auth';
import { useEffect } from 'react';

export default function Signin({ slug }: any) {
  const backgroundImage = `/illusional-backgrounds/${slug}.jpg`;
  const signinService = useService().auth.signinWithGoogle;
  signinService.setApp(getAppName(slug))

  useEffect(() => {
    signinService.setCurrentUrl(window.location.href)
  }, [])

  useEffect(() => {
    console.log(signinService.data)
  }, [signinService.data]);

  return (
    <CreamContainer className={'flex h-screen flex-row'}>
      <section className="flex h-full flex-1 items-center justify-center">
        <div className="container">
          <div className="flex flex-col gap-4">
            <Card className="mx-auto flex w-full max-w-xl flex-row overflow-clip rounded-lg">
              <div className={'hidden flex-1 sm:flex'}>
                <Image
                  src={backgroundImage}
                  alt={'background'}
                  width={1000}
                  height={0}
                  className={'h-full w-full object-cover'}
                />
              </div>
              <div className={'flex flex-1 flex-col'}>
                <CardHeader className="flex flex-col items-center space-y-0">
                  <Image
                    src="/logo.svg"
                    alt="logo"
                    width={94}
                    height={18}
                    className="mb-7 dark:invert"
                  />
                  <p className="mb-2 text-2xl font-bold">Welcome back</p>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Button onClick={signinService.trigger} variant="outline" className="w-full">
                      <FcGoogle className="mr-2 size-5" />
                      Sign in with Google
                    </Button>
                  </div>
                  <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                    <p>Don&apos;t have an account?</p>
                    <Link href="./signup" className="text-primary font-medium">
                      Sign up
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </CreamContainer>
  );
};