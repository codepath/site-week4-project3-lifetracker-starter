import "./ActivityPage.css";
import Loading from "../Loading/Loading";
import { useActivityContext } from "../../contexts/activity";
import ActivityFeed from "../ActivityFeed/ActivityFeed";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import { useEffect } from "react";

export default function ActivityPage() {
  const {
    activity,
    isProcessing,
    setIsProcessing,
    setError,
    setActivity,
    setInitialized,
  } = useActivityContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchActivities = async () => {
      if (user) {
        setIsProcessing(true);
        setError(null);
        const { data } = await apiClient.listActivity();
        console.log(data);

        if (data) {
          console.log(data);
          setActivity(data);
          setError(null);
        } else {
          setError("Error getting activities");
        }
        setIsProcessing(false);
        setInitialized(true);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="activity-page">
      <div className="banner">
        <h1>Activity Page</h1>
      </div>
      <div className="content">
        {isProcessing ? (
          <Loading />
        ) : (
          <ActivityFeed
            avgCaloriesPerCategory={activity.nutrition.calories.perCategory}
            totalCaloriesPerDay={activity.nutrition.calories.perDay}
          />
        )}
      </div>
    </div>
  );
}
