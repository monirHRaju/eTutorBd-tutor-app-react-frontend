import BlogSection from '../../components/Home/BlogSection'
import Faq from '../../components/Home/Faq'
import FeaturedTutors from '../../components/Home/FeaturedTutors'
import Features from '../../components/Home/Features'
import Hero from '../../components/Home/Hero'
import HowItWorks from '../../components/Home/HowItWorks'
import Testimonial from '../../components/Home/Testimonial'
import Tuitions from '../../components/Home/Tuitions'
import WhyChooseUs from '../../components/Home/WhyChooseUs'
import Satisfy from '../../components/Shared/Satisfy'


const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Satisfy></Satisfy>
      <Tuitions></Tuitions>
      <Features></Features>
      <FeaturedTutors></FeaturedTutors>
      <Testimonial></Testimonial>
      <HowItWorks></HowItWorks>
      <BlogSection></BlogSection>
      <Faq></Faq>
      {/* More components */}
    </div>
  )
}

export default Home
