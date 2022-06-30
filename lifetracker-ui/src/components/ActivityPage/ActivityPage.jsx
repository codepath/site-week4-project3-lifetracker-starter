import React from 'react'
import Loading from "../Loading/Loading";

export default function ActivityPage() {
  let isProcessing=true
  return (
    <div className='activity-page'>
      {isProcessing?<Loading/>:<SetThisUpPlease/>}
    </div>
  )
}
