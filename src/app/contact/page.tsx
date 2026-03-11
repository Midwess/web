import React from 'react';

import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import PageFrame from '@/components/layout/page-frame';
import Contact from '@/components/sections/contact';

const Page = () => {
  return (
    <PageFrame>
      <div className="bg-background flex min-h-screen flex-col items-center justify-center pt-20">
        <DottedBackground showGlow={false} className="w-full">
          <GridSection 
            showTopBorder 
            showBottomBorder 
            className="my-0 w-full"
            contentClassName="flex items-center justify-center min-h-[calc(100vh-5rem)]"
          >
            <Contact />
          </GridSection>
        </DottedBackground>
      </div>
    </PageFrame>
  );
};

export default Page;
