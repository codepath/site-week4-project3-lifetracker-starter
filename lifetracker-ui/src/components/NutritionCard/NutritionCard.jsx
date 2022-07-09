export default function NutritionCard({ name, calories, category, createdAt }) {
  return (
    <div className="nutrition-feed">
      <div>Name: {name}</div>
      <div>Calories: {calories}</div>
      <div>Category: {category}</div>
      <div>createdAt: {createdAt} </div>
    </div>
  );
}
