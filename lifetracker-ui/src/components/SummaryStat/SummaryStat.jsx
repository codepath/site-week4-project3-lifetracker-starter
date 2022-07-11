import "./SummaryStat.css";
// - [ ] Should render JSX that is wrapped by an element with the `className` of `summary-stat`
//     - [ ] Should accept **at least** the following props:
//       - [ ] `stat` - the primary statistic to display
//       - [ ] `label` - the unit label assigned to the statistic
//       - [ ] `substat` - a secondary statistic related to the primary statistic
//     - [ ] It should render the `stat` prop inside an element with the `className` of `primary-statistic`
//     - [ ] It should render the `label` prop inside an element with the `className` of `stat-label`
//     - [ ] It should render the `substat` prop inside an element with the `className` of `secondary-statistic`

export default function SummaryStat({ stat, label, substat }) {
  return (
    <div className="summary-stat">
      <div className="primary-statistic">{stat}</div>
      <div className="stat-label">{label}</div>
      <div className="secondary-statistic">{substat}</div>
    </div>
  );
}
