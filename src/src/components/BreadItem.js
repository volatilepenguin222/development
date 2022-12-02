export default function BreadItem({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div>{item.tier}</div>
      <div>{item.rating}</div>
      <img
        src={item.image}
        style={{
          width: 100,
          height: 100,
        }}
      />
    </div>
  );
}
