import "./NutritionCard.css";

export default function NutritionCard({ nutrition }) {
    
    return (
    <div className="nutrition-card">
      <span>{nutrition.category}</span>
      <div className="card-content">
        <div className="card-text">
          <span>
            {nutrition.image_url ? (
              <img className="icon" src={nutrition.image_url}/>
            ) : (
              <span className="icon">{nutrition.name[0]}</span>
            )}
          </span>
          <span>{nutrition.name}</span>
        </div>
        <div className="numeral-data">
          <div className="quantity-data">
            <span>Quantity</span>
            <span>{nutrition.quantity}</span>
          </div>
          <div className="quantity-data">
            <span>Calories</span>
            <span>{nutrition.calories}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
