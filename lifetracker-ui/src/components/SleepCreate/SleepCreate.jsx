import './SleepCreate.css'
import { useState } from 'react'
import axios from 'axios'
import Cheer from "../ActivityPage/cheer.mp3"
import {Howl, Howler} from "howler"

export default function SleepCreate({ user_id }) {

// function play() {
//    const audio = new Audio(Cheer)
//  }
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()


    const handleSubmit = (e) => {
        e.preventDefault();
        handleSleep(startTime, endTime, user_id);
        const audio = new Audio(Cheer);
        audio.play();
        setTimeout(() => {
          window.location.href = "/sleep";
        }, 5000); 
        console.log(startTime)
        console.log(endTime)
        console.log(user_id)
        // console.log(user_id)
    }

    const handleSleep = async (startTime, endTime, user_id) => {
      try {
        let response = await axios.post('http://localhost:3001/sleep', {startTime, endTime, user_id})
        console.log("Response output ", response)
      } catch (error) {
        console.log(error)
      }
    }

    return (
    <div className="SleepPage css-1bpnzr33">
   <div className="css-k2eq80">
      <div className="chakra-stack css-1cgbrw5">
         <h2 className="chakra-heading css-b5coes">Sleep</h2>
      </div>
   </div>
   <div className="css-vpbd2d">
      <div className="css-0">
         <div className="css-pwgvc2">
            <div className="chakra-stack css-1jtnem3">
               <div className="css-1hv8zgx">
                  <div></div>
                  <div className="css-mlsaez">
                     <div className="chakra-stack css-13ra036">
                        <h2 className="chakra-heading css-j6rr3f">Record Sleep</h2>
                        <div className="css-ebzegt">
                           <form onSubmit={handleSubmit}>
                              <div className="chakra-stack css-1db3zf7">
                                 <div role="group" className="chakra-form-control css-1kxonj9">
                                    <label id="field-:re:-label" for="field-:re:" className="chakra-form__label css-g6pte">Start Time<span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span></label>
                                    <div className="chakra-input__group css-bx0blc" data-group="true"><input name="startTime" type="datetime-local" placeholder="Start Time" id="field-:re:" required aria-required="true" class="chakra-input css-p20xy6" value={startTime} onChange={(e) => setStartTime(e.target.value)}/> </div>
                                 </div>
                                 <div role="group" class="chakra-form-control css-1kxonj9">
                                    <label id="field-:rf:-label" for="field-:rf:" class="chakra-form__label css-g6pte">End Time<span role="presentation" aria-hidden="true" class="chakra-form__required-indicator css-1tfjd1n">*</span></label>
                                    <div class="chakra-input__group css-bx0blc" data-group="true"><input name="endTime" type="datetime-local" placeholder="End Time" id="field-:rf:" required aria-required="true" class="chakra-input css-p20xy6" value={endTime} onChange={(e) => setEndTime(e.target.value)} /></div>
                                 </div>
                                 <button type="submit" class="chakra-button css-1hnyqz6">Save</button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
                  <div></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
)
}