import React from 'react';

import DottedBackground from '@/components/layout/dotted-background';
import GridSection from '@/components/layout/grid-section';
import PageFrame from '@/components/layout/page-frame';
import Contact from '@/components/sections/contact';

const Page = () => {
  return (
    <PageFrame>
      <div className="min-h-screen bg-background">
        <DottedBackground showGlow={false}>
          <GridSection showTopBorder showBottomBorder>
            <Contact />
          </GridSection>
        </DottedBackground>
      </div>
    </PageFrame>
  );
};

export default Page;
