import React from 'react'
import Loading from "../Loading/Loading";
import ActivityFeed from "../ActivityFeed/ActivityFeed";

export default function ActivityPage() {
  let isProcessing=true
  return (
    <div className='activity-page'>
      ActivityPage
      <ActivityFeed/>
      {/* {isProcessing?<Loading/>:<ActivityFeed/>} */}
    </div>
  )
}
