import '../../../src/styles/Stats.css';

const stats = [
    { num: '1,200+', label: 'CECS students' },
    { num: '40+', label: 'Active clubs' },
    { num: '80+', label: 'Events this semester' },
    { num: '300+', label: 'Study connections made' },
];

export default function Stats() {
    return (
      <div className="uh-stats">
      {stats.map((s) => (
        <div key={s.label} className="uh-stat">
          <span className="uh-stat-num">{s.num}</span>
          <span className="uh-stat-lbl">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
