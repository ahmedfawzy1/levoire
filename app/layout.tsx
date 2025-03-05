import generateSEO from '@/lib/seo';
import './styles/globals.css';
import localFont from 'next/font/local';
import Provider from './components/Provider';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const satoshi = localFont({
  src: [
    {
      path: './fonts/satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/satoshi/Satoshi-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});
const integralCF = localFont({
  src: [
    {
      path: './fonts/integralcf/integralcf-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/integralcf/integralcf-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/integralcf/integralcf-demibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/integralcf/integralcf-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/integralcf/integralcf-extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/integralcf/integralcf-heavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-integralcf',
});

export async function generateMetadata() {
  return generateSEO({
    title: 'Levoire | Trendy & High-Quality Fashion for Every Occasion',
    description:
      'Shop the latest fashion trends at Levoire. Discover high-quality, stylish outfits for every occasion. Elevate your wardrobe with timeless and trendy pieces.',
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${satoshi.variable} ${integralCF.variable} antialiased`}
      >
        <Provider>
          <AuthProvider>
            <ProductProvider>
              <CartProvider>
                <div className='bodyContainer max-w-[1500px] mx-auto'>
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </CartProvider>
            </ProductProvider>
          </AuthProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
