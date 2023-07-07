import "./NutritionFeed.css";

export default function NutritionFeed({ appState }) {
  if (!appState.nutritions) {
    return (
      <div className="nutrition-feed">
        <h1 className="empty-message">Nothing Here Yet</h1>
      </div>
    );
  } else {
    return (
        <div className="nutrition-feed"></div>
    )
  }
}
