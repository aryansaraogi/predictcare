import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PredictCare</h3>
            <p className="text-muted-foreground">
              A comprehensive health prediction platform powered by machine learning to help you understand potential
              health risks.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/suggestion" className="text-muted-foreground hover:text-primary transition-colors">
                  Suggestion
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Prediction Models</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/predict/chd" className="text-muted-foreground hover:text-primary transition-colors">
                  CHD Detection
                </Link>
              </li>
              <li>
                <Link href="/predict/stroke" className="text-muted-foreground hover:text-primary transition-colors">
                  Stroke Detection
                </Link>
              </li>
              <li>
                <Link href="/predict/diabetes" className="text-muted-foreground hover:text-primary transition-colors">
                  Diabetes Detection
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PredictCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

