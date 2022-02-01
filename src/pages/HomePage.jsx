import Hero from '../components/Sections/HomePage/Hero'
import Features from '../components/Sections/HomePage/Features'
import CallToAction from '../components/Sections/HomePage/CallToAction'
import DemoToast from '../components/DemoToast/DemoToast'

const HomePage = () => {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <CallToAction />
      <DemoToast />
    </main>
  )
}

export default HomePage
