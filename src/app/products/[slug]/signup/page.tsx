import Image from 'next/image';
import Link from 'next/link';

import { FcGoogle } from 'react-icons/fc';

import CreamContainer from '@/components/layout/cream-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export async function generateStaticParams() {
  return [{ slug: 'bitbridge' }];
}

const Signup = ({ params }: any) => {
  const backgroundImage = `/illusional-backgrounds/${params.slug}.jpg`;
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
                  <p className="mb-2 text-2xl font-bold">Hi!</p>
                  <p className="text-muted-foreground">
                    Sign up in less than 5 seconds.
                  </p>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    Sign up with Google
                  </Button>
                  <div className="text-muted-foreground mx-auto mt-8 flex justify-center gap-1 text-sm">
                    <p>Already have an account?</p>
                    <Link href="./signin" className="text-primary font-medium">
                      Sign in
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

export default Signup;
