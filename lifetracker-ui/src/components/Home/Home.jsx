import './Home.css'
import {useState} from 'react'

export default function Home ({ loggedIn, firstName }) {
    return (
        <div className="css-16ecvb5">
   <div className="css-1561uet">
      <div className="chakra-stack css-18rb735">
         <h1 className="chakra-heading css-bgad6s">LifeTracker</h1>
         <h2 className="chakra-heading css-1la3ewl">
            {loggedIn ? `Hi, ${firstName}! Welcome to LifeTracker` : "Helping you take back control of your world."}
          </h2>
          {!loggedIn && <a href="/register"><button type="button" className="chakra-button css-uybm84">Create your account now</button></a>}
        </div>
        <div className="css-jocq0n"><img src="src/assets/tracker.jpg" className="chakra-image css-incex5" /></div>
      </div>
      <div className="tiles css-gg4vpm">
      <div spacing="10px" className="css-dvxtzn">
         <div className="css-70qvj9">
            <p className="chakra-text css-1jijfcn">Fitness</p>
            <div className="css-17xejub"></div>
            &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <path d="M480 272h-37.34a261.41 261.41 0 01-18.25 32H480zM32 240v32h37.34a225.1 225.1 0 01-12.4-32z"></path>
               <path d="M304 259.78l-51.73 103.46-48-160L169.89 272H69.34c10 20.92 23.5 41.41 40.63 61.68 40.12 47.46 94.25 79.75 137 108.32l9 6 9-6c42.78-28.57 96.91-60.86 137-108.32A322.78 322.78 0 00424.41 304h-98.3z"></path>
               <path d="M211.73 116.76l48 160L304 188.22 345.89 272h96.77A213.13 213.13 0 00464 176.65C463.37 114.54 413.54 64 352.92 64c-48.11 0-80.1 28-96.92 48.21C239.18 92 207.19 64 159.08 64 98.46 64 48.63 114.54 48 176.65A211.23 211.23 0 0056.94 240h93.17z"></path>
            </svg>
            <img src='src/assets/athlete.jpg'/>
         </div>
         <div className="css-17xejub"></div>
      </div>
      <div spacing="10px" className="css-dvxtzn">
         <div className="css-70qvj9">
            <p className="chakra-text css-1jijfcn">Food</p>
            <div className="css-17xejub"></div>
            &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64m258-80c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40"></path>
               <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M344 336H179.31a8 8 0 00-5.65 2.34l-26.83 26.83a4 4 0 01-5.66 0l-26.83-26.83a8 8 0 00-5.65-2.34H56a24 24 0 01-24-24h0a24 24 0 0124-24h288a24 24 0 0124 24h0a24 24 0 01-24 24zM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97"></path>
               <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M256 480h139.31a32 32 0 0031.91-29.61L463 112"></path>
               <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 112l16-64 47-16"></path>
               <path fill="none" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M224 112h256"></path>
            </svg>
            <img src='src/assets/food.jpg'/>
         </div>
         <div className="css-17xejub"></div>
      </div>
      <div spacing="10px" className="css-dvxtzn">
         <div className="css-70qvj9">
            <p className="chakra-text css-1jijfcn">Rest</p>
            <div className="css-17xejub"></div>
            &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <path d="M294.8 26.57L238 60.37l7.8 13.17L281 52.59 270.8 118l6.3 10.6L336 93.53l-7.8-13.17-37.3 22.14L301 37.12l-6.2-10.55zM147.1 60.55A224 224 0 0 0 32 256a224 224 0 0 0 224 224 224 224 0 0 0 214.9-161.2A208 208 0 0 1 320 384a208 208 0 0 1-208-208 208 208 0 0 1 35.1-115.45zm244.5 52.05l-6.9 16.5 44.1 18.4-68.3 35.9-5.5 13.2 73.7 30.8 6.9-16.5-46.7-19.5 68.3-35.9 5.5-13.2-71.1-29.7zm-115 64l-97.8 35 8.1 22.7 60.6-21.7-35.4 97.9 6.5 18.1L320 292.4l-8.1-22.7-64.2 23 35.4-97.9-6.5-18.2z"></path>
            </svg>
            <img src='src/assets/alarm.jpg'/>
         </div>
         <div className="css-17xejub"></div>
      </div>
      <div spacing="10px" className="css-dvxtzn">
         <div className="css-70qvj9">
            <p className="chakra-text css-1jijfcn">Planner</p>
            <div className="css-17xejub"></div>
            &nbsp;
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
               <path d="M32 456a24 24 0 0024 24h400a24 24 0 0024-24V176H32zm320-244a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm-80-80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zm0 80a4 4 0 014-4h40a4 4 0 014 4v40a4 4 0 01-4 4h-40a4 4 0 01-4-4zM456 64h-55.92V32h-48v32H159.92V32h-48v32H56a23.8 23.8 0 00-24 23.77V144h448V87.77A23.8 23.8 0 00456 64z"></path>
            </svg>
            <img src='src/assets/calendar.jpg'/>
         </div>
         <div className="css-17xejub"></div>
      </div>
   </div>
</div>
    )
}
