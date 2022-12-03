import { autocompleteClasses } from "@mui/material";

export default function BreadItem({ item }) {
  return (
    <div className="Outer">
      <div className="Details">
        <h2>{item.name}</h2>
        <div>
          {item.tier} TIER, rating: {item.rating}
        </div>
        <p>{item.description}</p>
      </div>

      <div className="Bottom">
        <div className="Filters">
          <div>{item.taste} flavor</div>

          {item.diet.map((x) => (
            <div>{" • " + x + " • "}</div>
          ))}
        </div>
        <img
          src={item.image}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
}
