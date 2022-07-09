import NutritionCard from "../NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition";

export default function NutritionFeed() {
  const { nutritions } = useNutritionContext();

  console.log("NUTRITION FEED: ", nutritions);

  return (
    <div className="nutrition-feed">
      {nutritions?.nutritions ? (
        nutritions.nutritions.map((n) => (
          <NutritionCard
            name={n.name}
            calories={n.calories}
            category={n.category}
            createdAt={n.createdAt}
          />
        ))
      ) : (
        <h1 className="empty-message">Nothing here yet</h1>
      )}
      <h1 className="empty-message">Nothing here yet</h1>
    </div>
  );
}
