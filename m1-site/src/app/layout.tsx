import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Bibliothèque ISEN',
  description: 'Site dédié aux livres et auteurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
