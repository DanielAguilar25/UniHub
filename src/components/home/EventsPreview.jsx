import '../../../src/styles/Events.css';

const events = [
  {
    month: 'Apr',
    day: '3',
    title: 'Spring Hackathon — CECS Edition',
    meta: 'EENGR 1.200 · 9:00 AM – 9:00 PM',
    tag: 'RSVP open',
    tagClass: 'tag-green',
  },
  {
    month: 'Apr',
    day: '8',
    title: 'ACM General Meeting',
    meta: 'ENGR 1.100 · 5:00 PM – 6:00 PM',
    tag: 'Club event',
    tagClass: 'tag-blue',
  },
  {
    month: 'Apr',
    day: '14',
    title: 'Industry Night — Tech Career Fair',
    meta: 'Student Union Ballroom · 4:00 PM – 7:00 PM',
    tag: 'Featured',
    tagClass: 'tag-amber',
  },
];

export default function EventsPreview() {
  return (
    <section className="uh-section uh-section-no-top">
      <div className="uh-section-label">Upcoming</div>
      <div className="uh-section-title">Events on campus.</div>
      <div className="uh-events-list">
        {events.map((e) => (
          <div key={e.title} className="uh-event-row">
            <div className="uh-event-date">
              <div className="uh-event-date-mo">{e.month}</div>
              <div className="uh-event-date-day">{e.day}</div>
            </div>
            <div className="uh-event-info">
              <div className="uh-event-title">{e.title}</div>
              <div className="uh-event-meta">{e.meta}</div>
            </div>
            <span className={`uh-tag ${e.tagClass}`}>{e.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
