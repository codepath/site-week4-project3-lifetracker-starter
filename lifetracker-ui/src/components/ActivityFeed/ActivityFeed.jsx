import axios from "axios"
import { useParams} from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"

const fetchDuration = async ({ user_email, setIsFetching, setError, setDuration }) => {
    setIsFetching(true)
  
    try {
      const res = await axios.get(`http://localhost:3005/exercise/total`)
      if (res?.data?.duratiom) {
        console.log ("minutes")
        console.log(res?.data?.duration)
        setDuration(res.data.duration)
      } else {
        setError("Something went wrong fetching duration.")
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setError(message ?? String(err))
    } finally {
      setIsFetching(false)
    }
  }
    
function ActivityFeed ({user}) {

  const { user_email} = useParams()
  const [duration, setDuration] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDuration({ user_email, setIsFetching, setError, setDuration })
  }, [user_email])





    return (
        <div className="activity-feed">
            <div className="total-exercise">
                <div className="title">
                    <h4 className="card-title">
                        Total Exercise Minutes
                    </h4>
                </div>
                <div className="number">
                    <p>1025 mins</p>
                </div>
            </div>
            <div className="avg-hrs">
                <div className="title">
                    <h4 className="card-title">
                        Average Hours of Sleep
                    </h4>
                </div>
                <div className="number">
                    <p>9.0 hours</p>
                </div>
            </div>
            <div className="avg-cal">
                <div className="title">
                    <h4 className="card-title">
                         Average Daily Calories
                    </h4>
                </div>
                <div className="number">
                    <p> 2139 caloriess</p>
                </div>
            </div>
        </div>

    )
}

export default ActivityFeed