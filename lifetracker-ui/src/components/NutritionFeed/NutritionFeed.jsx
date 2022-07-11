import NutritionCard from "../NutritionCard/NutritionCard";
import { useNutritionContext } from "../../contexts/nutrition";
import { useAuthContext } from "../../contexts/auth";

export default function NutritionFeed({ nutritions }) {
  return (
    <div className="nutrition-feed">
      {nutritions ? (
        nutritions.map((n) => (
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
    </div>
  );
}
