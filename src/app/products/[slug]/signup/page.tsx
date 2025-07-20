import SignupPage from '@/app/products/[slug]/signup/content';

export async function generateStaticParams() {
  return [{ slug: 'bitbridge' }];
}

export default async function Signup({ params }: any) {
  const slug = (await params).slug;
  return (
    <div>
      <SignupPage slug={slug} />
    </div>
  );
}
