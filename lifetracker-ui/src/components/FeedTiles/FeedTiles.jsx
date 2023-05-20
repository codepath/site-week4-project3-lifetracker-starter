import React from "react"
import { Flex, Spacer, Text } from "@chakra-ui/react"
import Tile from "../Tile/Tile"
import alarmImage from "../../assets/alarm.jpg"
import athleteImage from "../../assets/athlete.jpg"
import calendarImage from "../../assets/calendar.jpg"
import foodImage from "../../assets/food.jpg"
import { IoFitnessSharp, IoCalendarSharp, IoFastFoodOutline } from "react-icons/io5"
import { GiNightSleep } from "react-icons/gi"

import "./FeedTiles.css"

const tileData = [
  { label: "Fitness", image: athleteImage, icon: <IoFitnessSharp />, id: 1 },
  { label: "Food", image: foodImage, icon: <IoFastFoodOutline />, id: 2 },
  { label: "Rest", image: alarmImage, icon: <GiNightSleep />, id: 3 },
  { label: "Planner", image: calendarImage, icon: <IoCalendarSharp />, id: 4 },
]

export default function FeedTiles() {
  return (
    <Flex justify="space-between" className="tiles">
      {tileData.map(({ label, image, icon, id }) => (
        <React.Fragment key={id}>
          <Flex direction="column" align="center" spacing="10px">
            <Flex align="center">
              <Text fontSize="3xl">{label}</Text>
              <Spacer />
              &nbsp;
              <>{icon}</>
            </Flex>
            <Spacer />
            <Tile
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></Tile>
          </Flex>
        </React.Fragment>
      ))}
    </Flex>
  )
}
