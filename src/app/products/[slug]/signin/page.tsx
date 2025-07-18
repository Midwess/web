import SigninPage from './content'

export async function generateStaticParams() {
  return [{ slug: 'bitbridge' }];
}

export default async function Signin({ params }: any) {
  const slug = params.slug;
  return <div><SigninPage slug={slug}/></div>;
}