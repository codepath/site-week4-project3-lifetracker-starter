import { useState, useEffect } from "react";
import axios from "axios";
import "./SleepPage.css";
import SleepCard from "../SleepCard/SleepCard";

export default function SleepPage({ loggedIn }) {
  const [sleepData, setSleepData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/sleep").then((response) => {
      setSleepData(response.data);
    });
  }, []);
  console.log(sleepData);
  return (
   !loggedIn?(
      <div className='loggedoutActivity'>
      <div className="ActivityPage css-ra15rn">
<div className="chakra-container css-1m340o4">
<h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
</div>
</div>
</div>
)   : (

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
              <a className="chakra-link button css-spn4bz" href="/sleep/create">
                <button type="button" className="chakra-button css-ez23ye">
                  Add Sleep
                </button>
              </a>
              <div className="sleep-containter">
                {sleepData?.map((sleepItem, index) => {
                  return (
                    <div className="sleep-item">
                      <SleepCard
                        key={sleepItem.id}
                        sleepItem={sleepItem}
                        index={index}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  )
}
