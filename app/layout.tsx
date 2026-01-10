import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LaRuche.ai - Agent IA de Sourcing',
  description: 'Trouvez les produits gagnants avec l\'intelligence artificielle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
