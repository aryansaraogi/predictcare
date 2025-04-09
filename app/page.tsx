import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, Brain, Droplet } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="text-4xl font-bold mb-4">PredictCare</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive health prediction platform powered by machine learning to help you understand potential health
          risks.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <Heart className="h-12 w-12 text-red-500 mb-2" />
            <CardTitle>Chronic Heart Disease Detection</CardTitle>
            <CardDescription>
              Predict your risk of chronic heart disease based on various health parameters.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Our model analyzes factors like age, cholesterol levels, blood pressure, and lifestyle habits to assess
              your CHD risk.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/predict/chd" className="w-full">
              <Button className="w-full">
                Try Prediction <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <Brain className="h-12 w-12 text-purple-500 mb-2" />
            <CardTitle>Stroke Detection</CardTitle>
            <CardDescription>Assess your stroke risk based on health and lifestyle factors.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Our stroke prediction model evaluates key indicators including age, hypertension, heart disease, and
              glucose levels.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/predict/stroke" className="w-full">
              <Button className="w-full">
                Try Prediction <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <Droplet className="h-12 w-12 text-blue-500 mb-2" />
            <CardTitle>Diabetes Detection</CardTitle>
            <CardDescription>Evaluate your diabetes risk using our machine learning model.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>
              Our diabetes prediction model analyzes glucose levels, BMI, age, and other factors to assess your risk.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/predict/diabetes" className="w-full">
              <Button className="w-full">
                Try Prediction <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Input Your Data</h3>
            <p className="text-muted-foreground">Fill in the required health parameters in our secure forms.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
            <p className="text-muted-foreground">
              Our machine learning models analyze your data to generate predictions.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 rounded-full p-4 mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Results</h3>
            <p className="text-muted-foreground">Receive instant risk assessment and recommendations.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Take the first step towards understanding your health risks with our prediction tools.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link href="/about">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
          <Link href="/suggestion">
            <Button size="lg">Give Feedback</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

