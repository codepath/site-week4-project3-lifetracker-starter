// - [x] Should render JSX that is wrapped by an element with the `className` of `activity-feed`
//     - [x] Should accept **at least** the following props:
//       - [x] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
//       - [x] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
//       - [ ] Any other
//     - [x] Inside an element with the `className` of `per-category`, it should:
//       - [x] Render the text: `"Average Calories Per Category` inside an `h4` element
//       - [ ] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat.jsx` component for each item.
//         - [ ] It should pass the calories **rounded down to one decimal place** as the `stat` prop
//         - [ ] It should pass the string of `calories` as the `label` prop
//         - [ ] It should pass the `category` as the `substat` prop
//     - [ ] Inside an element with the `className` of `per-day`, it should:
//       - [ ] Render the text: `"Total Calories Per Day` inside an `h4` element
//       - [ ] For each item in the `totalCaloriesPerDay` array, it should render a `SummaryStat.jsx` component.
//         - [ ] It should pass the calories **rounded down to the nearest whole number** as the `stat` prop
//         - [ ] It should pass the string of `calories` as the `label` prop
//         - [ ] It should pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

import SummaryStat from "components/SummaryStat/SummaryStat";

export default function ActivityFeed({
  totalCaloriesPerDay,
  avgCaloriesPerCategory,
}) {
  return (
    <div className="activity-feed">
      <div className="per-category">
        <h4>Average Calories Per Category:</h4>
        {avgCaloriesPerCategory.map((c) => (
          <SummaryStat
            stat={c.avgCaloriesPerCategory}
            label={"Calories"}
            substat={c.category}
          ></SummaryStat>
        ))}
      </div>
      <div className="per-day">
        <h4>Average Calories Per Day:</h4>
        {totalCaloriesPerDay.map((c) => (
          <SummaryStat
            stat={c.totalCaloriesPerDay}
            label={"Calories"}
            substat={c.date}
          ></SummaryStat>
        ))}
      </div>
    </div>
  );
}
