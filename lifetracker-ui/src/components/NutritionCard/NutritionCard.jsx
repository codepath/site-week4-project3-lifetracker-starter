export default function NutritionCard({ name, calories, category, createdAt }) {
  return (
    <div className="nutrition-card">
      <p>Name: {name}</p>
      <p>Calories: {calories}</p>
      <p>Category: {category}</p>
      <p>Date logged: {createdAt} </p>
    </div>
  );
}
