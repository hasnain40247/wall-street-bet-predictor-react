import React from "react"
import AnalysisSection from "./AnalysisSection"
import Footer from "./Footer"
import Historic from "./Historic"
import IndivStock from "./IndivStock"
import Navbar from "./Navbar"
import Prediction from "./Prediction"
import Section from "./Section"

function Home() {

    return (<><Navbar to={"/about"} />
        <Section />
        <AnalysisSection />
        <IndivStock />
        <Historic />
        <Prediction />
        <Footer /></>
    )
}
export default Home