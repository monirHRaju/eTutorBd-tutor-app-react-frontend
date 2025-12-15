import FeaturedTutors from '../../components/Home/FeaturedTutors'
import Hero from '../../components/Home/Hero'
import Tuitions from '../../components/Home/Tuitions'
import WhyChooseUs from '../../components/Home/WhyChooseUs'
import Satisfy from '../../components/Shared/Satisfy'


const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Satisfy></Satisfy>
      <Tuitions></Tuitions>
      <FeaturedTutors></FeaturedTutors>
      <WhyChooseUs></WhyChooseUs>
      {/* More components */}
    </div>
  )
}

export default Home
