export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About PredictCare</h1>

      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            PredictCare was founded with a simple yet powerful mission: to make health prediction accessible to
            everyone. We believe that by leveraging the power of machine learning and artificial intelligence, we can
            help individuals understand their health risks and take proactive measures to improve their wellbeing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How PredictCare Works</h2>
          <p className="text-muted-foreground mb-4">
            Our platform utilizes advanced machine learning algorithms trained on extensive healthcare datasets to
            provide accurate predictions for various health conditions. The process is simple:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
            <li>You input your health parameters through our secure forms</li>
            <li>Our machine learning models analyze your data</li>
            <li>You receive a risk assessment based on the analysis</li>
            <li>We provide recommendations based on your results</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Prediction Models</h2>

          <div className="space-y-4">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Chronic Heart Disease (CHD) Detection</h3>
              <p className="text-muted-foreground">
                Our CHD prediction model analyzes various factors including age, cholesterol levels, blood pressure,
                smoking habits, and family history to assess your risk of developing chronic heart disease.
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Stroke Detection</h3>
              <p className="text-muted-foreground">
                The stroke prediction model evaluates key indicators such as age, hypertension status, heart disease
                history, average glucose level, and BMI to determine your risk of experiencing a stroke.
              </p>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">Diabetes Detection</h3>
              <p className="text-muted-foreground">
                Our diabetes prediction model examines factors like glucose levels, BMI, age, insulin levels, and family
                history to assess your risk of developing diabetes.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Privacy & Security</h2>
          <p className="text-muted-foreground">
            At PredictCare, we take your privacy seriously. All data submitted through our platform is encrypted and
            securely processed. We do not store your health information after providing predictions, and all analyses
            are performed in real-time. Our platform adheres to strict data protection guidelines to ensure your
            information remains confidential.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-muted-foreground">
            PredictCare is designed to provide risk assessments based on the information you provide. These predictions
            are not medical diagnoses and should not replace professional medical advice. Always consult with healthcare
            professionals for proper diagnosis and treatment of medical conditions.
          </p>
        </section>
      </div>
    </div>
  )
}

