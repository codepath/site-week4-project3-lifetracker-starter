import React from "react"
import { Flex } from "@chakra-ui/react"
import Hero from "../Hero/Hero"
import trackerImage from "../../assets/tracker.jpg"
import FeedTiles from "../FeedTiles/FeedTiles"

import "./Home.css"

export default function Home() {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1200px" }} m="0 auto">
      <Hero
        title="LifeTracker"
        subtitle="Helping you take back control of your world."
        // image="https://source.unsplash.com/collection/404339/800x600"
        image={trackerImage}
        ctaText="Create your account now"
        ctaLink="/signup"
      />
      <FeedTiles />
    </Flex>
  )
}
