import './globals.css'
import './animations.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'CardioPredict AI - Heart Disease Risk Assessment',
  description: 'AI-powered cardiovascular disease risk prediction with advanced machine learning',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-content">{children}</main>
      </body>
    </html>
  )
}
