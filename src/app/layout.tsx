import './globals.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Roboto } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'

const roboto = Roboto({ subsets: ['cyrillic'], weight: ['400', '500', '700'] });

export const metadata = {
  title: 'Anuj Chaudhari - Full Stack Developer',
  description: 'Portfolio of Anuj Chaudhari, a Full Stack Developer, DevOps, and Cloud Enthusiast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

