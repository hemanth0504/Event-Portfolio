import DecorsRentalPreview from "../components/DecorsRentalPreview"
import Hero from "../components/Hero"
import InfoStats from "../components/InfoStats"
import Testimonials from "../components/Testimonials"
import WorkPreview from "../components/WorkPreview"



export default function Home() {
  return (
    <div>
      <Hero/>
      <WorkPreview/>
      <InfoStats/>
      <DecorsRentalPreview/>
      <Testimonials/>
    </div>
  )
}
