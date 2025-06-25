/**
 * OverviewCards.jsx
 */

export default function OverviewCards() {
  const data = [
    { title: 'Tickets Abertos', value: 12 },
    { title: 'Pendentes', value: 5 },
    { title: 'Encerrados', value: 18 }
  ];

  return (
    <div style={{ display: 'flex', gap: 20, marginTop: 20 }}>
      {data.map((item, i) => (
        <div key={i} style={{
          flex: 1,
          background: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ margin: 0 }}>{item.title}</h4>
          <strong style={{ fontSize: 24 }}>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}