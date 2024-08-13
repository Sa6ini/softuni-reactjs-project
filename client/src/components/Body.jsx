import Carousel from "./BodyParts/Carousel/Carousel"
import About from "./BodyParts/About"
import TimeTable from "./BodyParts/TimeTable"
import Team from "./BodyParts/Team/Team"
import Testimonial from "./BodyParts/Testimonial"
import Facts from "./BodyParts/Facts"


export default function Body() {
    return (
        <>
            
            <Carousel />
            
            <About />
            
            <TimeTable />
            
            <Facts />
            
            <Team />
            
            <Testimonial />
            
        </>
    )
}