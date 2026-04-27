// Calendar modal — month view of workshops
const { useState: useStateC } = React;

function CalendarModal({ workshops, enrolled, toggleEnroll, onClose }) {
  const [view, setView] = useStateC(new Date(2026, 9, 1)); // October 2026
  const [selected, setSelected] = useStateC(null);

  const year = view.getFullYear();
  const month = view.getMonth();
  const monthName = view.toLocaleString('en', { month: 'long' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date(2026, 9, 12); // Oct 12, 2026

  const workshopsByDate = {};
  workshops.forEach(w => {
    const d = new Date(w.date + 'T00:00:00');
    if (d.getFullYear() === year && d.getMonth() === month) {
      const key = d.getDate();
      if (!workshopsByDate[key]) workshopsByDate[key] = [];
      workshopsByDate[key].push(w);
    }
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const navMonth = (delta) => {
    setView(new Date(year, month + delta, 1));
    setSelected(null);
  };

  const selectedWorkshops = selected ? (workshopsByDate[selected] || []) : [];

  return (
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,18,8,0.55)', zIndex: 100, display: 'flex', alignItems: 'flex-end', fontFamily: 'Public Sans, system-ui' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--cm)', width: '100%', borderRadius: '20px 20px 0 0', maxHeight: '92%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--bd)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 20, fontWeight: 700, color: 'var(--tx)' }}>Workshops Calendar</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mt)" strokeWidth="2.2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={() => navMonth(-1)} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 9, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tx)" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 17, fontWeight: 700, color: 'var(--tx)' }}>{monthName} {year}</p>
            <button onClick={() => navMonth(1)} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 9, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--tx)" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div style={{ padding: '12px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, marginBottom: 6 }}>
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--mt)', letterSpacing: 0.6, padding: '4px 0' }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {cells.map((d, i) => {
              if (d === null) return <div key={i}/>;
              const ws = workshopsByDate[d] || [];
              const has = ws.length > 0;
              const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSel = selected === d;
              return (
                <button key={i} onClick={() => has && setSelected(d)}
                  style={{ aspectRatio: '1', border: 'none', borderRadius: 9, cursor: has ? 'pointer' : 'default', background: isSel ? 'var(--cr)' : isToday ? 'var(--lcr)' : has ? 'var(--wh)' : 'transparent', color: isSel ? '#fff' : 'var(--tx)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, fontFamily: 'inherit', position: 'relative', border: has && !isSel ? '1.5px solid var(--bd)' : 'none' }}>
                  <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 14, fontWeight: isToday || isSel ? 700 : 500 }}>{d}</span>
                  {has && (
                    <div style={{ display: 'flex', gap: 2 }}>
                      {ws.slice(0, 3).map((w, j) => {
                        const cat = CATEGORIES[w.cat];
                        return <div key={j} style={{ width: 4, height: 4, borderRadius: '50%', background: isSel ? '#fff' : cat.color }}/>;
                      })}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected day workshops or all-month list */}
        <div style={{ padding: '6px 18px 24px', flex: 1 }}>
          {selected ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.3, color: 'var(--mt)' }}>{monthName.toUpperCase()} {selected} · {selectedWorkshops.length} EVENT{selectedWorkshops.length !== 1 ? 'S' : ''}</p>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cr)', fontSize: 11, fontWeight: 700, fontFamily: 'inherit' }}>Show all month</button>
              </div>
              {selectedWorkshops.map(w => <WorkshopRow key={w.id} w={w} enrolled={enrolled} toggleEnroll={toggleEnroll}/>)}
            </>
          ) : (
            <>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.3, color: 'var(--mt)', marginBottom: 10 }}>{Object.keys(workshopsByDate).length} EVENTS THIS MONTH</p>
              {Object.entries(workshopsByDate).sort((a, b) => +a[0] - +b[0]).flatMap(([d, ws]) => ws).map(w => <WorkshopRow key={w.id} w={w} enrolled={enrolled} toggleEnroll={toggleEnroll}/>)}
              {Object.keys(workshopsByDate).length === 0 && (
                <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--mt)', padding: '32px 0' }}>No workshops scheduled this month.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function WorkshopRow({ w, enrolled, toggleEnroll }) {
  const cat = CATEGORIES[w.cat];
  const dt = new Date(w.date + 'T00:00:00');
  const m = dt.toLocaleString('en', { month: 'short' }).toUpperCase();
  const d = dt.getDate();
  const isEnrolled = enrolled.includes(w.id);
  return (
    <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: 12, marginBottom: 9, display: 'flex', gap: 11, alignItems: 'center' }}>
      <div style={{ width: 44, height: 50, background: cat.color, borderRadius: 9, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
        <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 17, fontWeight: 700, lineHeight: 1 }}>{d}</span>
        <span style={{ fontSize: 8.5, fontWeight: 700, letterSpacing: 0.5, marginTop: 2 }}>{m}</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: cat.color, marginBottom: 2 }}>{cat.title.toUpperCase()}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx)', lineHeight: 1.25, marginBottom: 3 }}>{w.title}</p>
        <p style={{ fontSize: 10.5, color: 'var(--mt)', lineHeight: 1.3 }}>{w.time} · {w.loc}</p>
      </div>
      <button onClick={() => toggleEnroll(w.id)}
        style={{ background: isEnrolled ? 'var(--tx)' : 'var(--wh)', color: isEnrolled ? '#fff' : 'var(--tx)', border: '1.5px solid var(--tx)', borderRadius: 8, padding: '6px 11px', fontSize: 10.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
        {isEnrolled ? '✓' : 'Register'}
      </button>
    </div>
  );
}

Object.assign(window, { CalendarModal });
