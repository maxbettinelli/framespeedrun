import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';
import CryptoChart from './components/CryptoChart';
import Head from 'next/head';
import park1 from '../public/park-1.png'
import park2 from '../public/park-2.png'



<>
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content='../public/park-1.png' />
<meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
<meta property="og:image" content="../public/park-2.png" />
<meta property="fc:frame:button:1" content="Green" />
<meta property="fc:frame:button:2" content="Purple" />
<meta property="fc:frame:button:3" content="Red" />
<meta property="fc:frame:button:4" content="Blue" />
</>

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Graph Time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  image: `${NEXT_PUBLIC_URL}/park-1.png`,
  input: {
    text: 'Sing simple stories sir',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata: Metadata = {
  
  title: 'Frame Speedrun',
  description: 'LFG',
  openGraph: {
    title: 'How fast can I go?',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <CryptoChart />
    </>
  );
}
