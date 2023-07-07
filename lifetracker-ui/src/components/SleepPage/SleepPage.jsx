import { useState, useEffect } from 'react'
import axios from 'axios'
import './SleepPage.css'
import SleepCard from '../SleepCard/SleepCard'

export default function SleepPage() {

   const [sleepData, setSleepData] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:3001/sleep').then((response) => {
         setSleepData(response.data)
      })
   }, []);
   console.log(sleepData)
    return (
<div className="SleepPage css-1bpnzr3">
   <div className="css-k2eq80">
      <div className="chakra-stack css-1cgbrw5">
         <h2 className="chakra-heading css-b5coes">Sleep</h2>
      </div>
   </div>
   <div className="css-vpbd2d">
      <div className="css-1qfrez2">
         <div className="css-uiodal">
            <div className="sleep-feed">
               <a className="chakra-link button css-spn4bz" href="/sleep/create"><button type="button" className="chakra-button css-ez23ye">Add Sleep</button></a>
               <div className='sleep-containter'>
                  {sleepData?.map((sleepItem, index) => {
                     return(
                        <div className='sleep-item'>
                     <SleepCard key={sleepItem.id} sleepItem={sleepItem} index = {index} />
                        </div>
                     )
                  })}
               </div>
               {/* <div className="chakra-stack css-xixnl8">
                  <div className="css-sxxv4f">
                     <div className="css-56yjmq"> */}
                        {/* <span className="chakra-avatar css-js4g9"> */}
                           {/* <div role="img" aria-label="-2150hr" className="chakra-avatar__initials css-1ebyn6">-</div>
                        </span>
                        <div className="css-1kw2fa0">
                           <h2 className="chakra-heading css-y5314g">Apr 10th, 2003</h2>
                        </div>
                     </div>
                     <div className="white css-1lekzkb">
                        <div className="chakra-stat css-1mbo1ls">
                           <dl>
                              <dt className="chakra-stat__label css-14go5ty">Start Time</dt>
                              <dd className="chakra-stat__number css-1axeus7">6:01 PM</dd>
                           </dl>
                        </div>
                        <div className="chakra-stat css-1mbo1ls">
                           <dl>
                              <dt className="chakra-stat__label css-14go5ty">End Time</dt>
                              <dd className="chakra-stat__number css-1axeus7">3:01 AM</dd>
                           </dl>
                        </div> */}
                     {/* </div>
                  </div>
               </div> */}
            </div>
         </div>
      </div>
   </div>
</div>
    )
}   