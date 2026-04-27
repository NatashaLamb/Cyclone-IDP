// Resources + Profile screens
const { useState: useState2 } = React;

// ---------- RESOURCES ----------
function ResourcesScreen({ state }) {
  const [tab, setTab] = useState2(state.resourcesTab || 'workshops');
  const [filter, setFilter] = useState2('all');
  const isMicro = tab === 'micro';
  const items = isMicro ? MICRO_CREDS : WORKSHOPS.map(w => ({
    id: w.id, cat: w.cat, title: w.title,
    provider: `${w.time} · ${w.loc}`, duration: w.date,
    desc: null,
  }));

  const filtered = filter === 'all' ? items : items.filter(i => i.cat === filter);

  return (
    <div style={{ padding: '14px 18px 28px', fontFamily: 'Public Sans, system-ui' }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--cr)' }}>DEVELOPMENT</p>
      <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 26, fontWeight: 700, color: 'var(--tx)', margin: '4px 0 4px' }}>Resources</h2>
      <p style={{ fontSize: 12, color: 'var(--mt)', marginBottom: 16 }}>Curated for academic & professional growth.</p>

      {/* Search */}
      <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 11, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--mt)" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span style={{ fontSize: 13, color: 'var(--mt)' }}>Search resources</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
        {[['workshops', 'Workshops'], ['micro', 'Micro-Credentials']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)}
            style={{ flex: 1, padding: '9px 8px', borderRadius: 9, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, cursor: 'pointer', border: tab === k ? '1.5px solid var(--tx)' : '1.5px solid var(--bd)', background: tab === k ? 'var(--tx)' : 'var(--wh)', color: tab === k ? '#fff' : 'var(--mt)', fontFamily: 'inherit' }}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Category filter chips */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'auto', paddingBottom: 2 }}>
        {[['all', 'All', 'var(--tx)']].concat(Object.entries(CATEGORIES).map(([id, c]) => [id, c.title, c.color])).map(([id, l, col]) => (
          <button key={id} onClick={() => setFilter(id)}
            style={{ padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: filter === id ? '1.5px solid var(--cr)' : '1.5px solid var(--bd)', background: filter === id ? 'var(--cr)' : 'var(--wh)', color: filter === id ? '#fff' : 'var(--tx)', whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'inherit' }}>
            {l}
          </button>
        ))}
      </div>

      {isMicro && (
        <div style={{ background: '#FEF7E0', border: '1px solid #E8D090', borderRadius: 12, padding: '10px 12px', marginBottom: 14, display: 'flex', gap: 9, alignItems: 'flex-start' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A5800" strokeWidth="2.2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 2 }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p style={{ fontSize: 11, color: '#7A5800', lineHeight: 1.4 }}>Earn verified <strong>ISU digital badges</strong> on completion. Track progress in your Profile.</p>
        </div>
      )}

      {filtered.map(r => {
        const cat = CATEGORIES[r.cat];
        const enrolled = state.enrolled.includes(r.id);
        return (
          <div key={r.id} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 16, padding: 14, marginBottom: 11 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              {isMicro && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: cat.light, borderRadius: 6, padding: '3px 8px', fontSize: 9, fontWeight: 700, color: cat.color, letterSpacing: 0.5 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                  BADGE
                </div>
              )}
              <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.2, color: cat.color }}>{cat.title.toUpperCase()}</p>
            </div>
            <p style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--tx)', lineHeight: 1.3, marginBottom: 4, fontFamily: 'Newsreader, Georgia, serif' }}>{r.title}</p>
            <p style={{ fontSize: 11.5, color: 'var(--mt)', marginBottom: 10 }}>{r.provider}{isMicro ? ` · Self-paced · ${r.duration}` : ''}</p>
            {r.desc && <p style={{ fontSize: 11.5, color: 'var(--tx)', marginBottom: 11, lineHeight: 1.5 }}>{r.desc}</p>}
            <button onClick={() => state.toggleEnroll(r.id)}
              style={{ background: enrolled ? 'var(--wh)' : 'var(--cr)', color: enrolled ? 'var(--cr)' : '#fff', border: enrolled ? '1.5px solid var(--cr)' : 'none', borderRadius: 9, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              {enrolled ? '✓ Enrolled' : isMicro ? 'Start Course' : 'Register'}
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ---------- PROFILE ----------
function ProfileScreen({ state, scoresPct, overallPct, addingGoal, setAddingGoal }) {
  const enrolledMicros = MICRO_CREDS.filter(m => state.enrolled.includes(m.id));
  const completedAssessments = Object.keys(state.completed).length;

  return (
    <div style={{ padding: '14px 18px 28px', fontFamily: 'Public Sans, system-ui' }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--cr)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 26, fontWeight: 700, fontFamily: 'Newsreader, Georgia, serif' }}>A</div>
        <div>
          <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 22, fontWeight: 700, color: 'var(--tx)', lineHeight: 1.1 }}>Alex Chen</h2>
          <p style={{ fontSize: 12, color: 'var(--mt)', marginTop: 3 }}>PhD Candidate · Year 3</p>
          <p style={{ fontSize: 11, color: 'var(--mt)' }}>Mechanical Engineering</p>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 22 }}>
        {[
          { v: `${overallPct}%`, l: 'Portfolio' },
          { v: completedAssessments, l: 'Assessed' },
          { v: enrolledMicros.length, l: 'Enrolled' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: '12px 8px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 22, fontWeight: 700, color: 'var(--cr)', lineHeight: 1 }}>{s.v}</p>
            <p style={{ fontSize: 9.5, color: 'var(--mt)', marginTop: 4, letterSpacing: 0.5, fontWeight: 600 }}>{s.l.toUpperCase()}</p>
          </div>
        ))}
      </div>

      {/* Goals */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: 'var(--mt)' }}>DEVELOPMENT GOALS</p>
        <button onClick={() => setAddingGoal(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cr)', fontSize: 11, fontWeight: 700, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 3 }}>
          + New Goal
        </button>
      </div>

      {addingGoal && <NewGoalForm state={state} close={() => setAddingGoal(false)}/>}

      {state.goals.map(g => {
        const cat = CATEGORIES[g.cat];
        return (
          <div key={g.id} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 16, padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 1.1, color: cat.color, marginBottom: 3 }}>{cat.title.toUpperCase()}</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--tx)', lineHeight: 1.3, fontFamily: 'Newsreader, Georgia, serif' }}>{g.title}</p>
                <p style={{ fontSize: 11, color: 'var(--mt)', marginTop: 3 }}>Due {g.due}</p>
              </div>
              <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 18, fontWeight: 700, color: cat.color }}>{g.progress}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--bd)', borderRadius: 3, overflow: 'hidden', marginBottom: 10 }}>
              <div style={{ height: '100%', width: `${g.progress}%`, background: cat.color, borderRadius: 3, transition: 'width .5s' }}/>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {g.milestones.map((m, i) => {
                const done = (i + 1) / g.milestones.length * 100 <= g.progress;
                return (
                  <span key={i} style={{ fontSize: 10, padding: '3px 9px', borderRadius: 12, background: done ? cat.light : 'transparent', color: done ? cat.color : 'var(--mt)', border: done ? 'none' : '1px solid var(--bd)', fontWeight: done ? 700 : 500 }}>
                    {done && '✓ '}{m}
                  </span>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
              <button onClick={() => state.bumpGoal(g.id, 10)} style={{ flex: 1, background: cat.color, color: '#fff', border: 'none', borderRadius: 9, padding: '7px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ Log Progress</button>
              <button onClick={() => state.removeGoal(g.id)} style={{ background: 'var(--wh)', color: 'var(--mt)', border: '1.5px solid var(--bd)', borderRadius: 9, padding: '7px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Archive</button>
            </div>
          </div>
        );
      })}

      {/* Earned badges */}
      {enrolledMicros.length > 0 && (
        <>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: 'var(--mt)', margin: '20px 0 10px' }}>ENROLLED CREDENTIALS</p>
          {enrolledMicros.map(m => {
            const cat = CATEGORIES[m.cat];
            return (
              <div key={m.id} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: '10px 12px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: cat.light, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--tx)', lineHeight: 1.25 }}>{m.title}</p>
                  <p style={{ fontSize: 10.5, color: 'var(--mt)', marginTop: 2 }}>{m.duration}</p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

function NewGoalForm({ state, close }) {
  const [title, setTitle] = useState2('');
  const [cat, setCat] = useState2('research');
  const [due, setDue] = useState2('Dec 31');
  const submit = () => {
    if (!title.trim()) return;
    state.addGoal({ id: 'g' + Date.now(), title, cat, due, progress: 0, milestones: ['Plan', 'Start', 'Mid-point', 'Complete'] });
    close();
  };
  return (
    <div style={{ background: 'var(--wh)', border: `2px solid var(--cr)`, borderRadius: 16, padding: 14, marginBottom: 12 }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--tx)', marginBottom: 11, fontFamily: 'Newsreader, Georgia, serif' }}>New Development Goal</p>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Submit conference paper"
        style={{ width: '100%', border: '1.5px solid var(--bd)', borderRadius: 9, padding: '9px 11px', fontSize: 13, marginBottom: 10, outline: 'none', fontFamily: 'inherit' }}
        onFocus={e => e.target.style.borderColor = 'var(--cr)'}
        onBlur={e => e.target.style.borderColor = 'var(--bd)'}/>
      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--mt)', marginBottom: 6, letterSpacing: 0.5 }}>CATEGORY</p>
      <div style={{ display: 'flex', gap: 5, marginBottom: 11, flexWrap: 'wrap' }}>
        {Object.entries(CATEGORIES).map(([id, c]) => (
          <button key={id} onClick={() => setCat(id)}
            style={{ padding: '5px 10px', borderRadius: 16, fontSize: 11, fontWeight: 600, cursor: 'pointer', border: cat === id ? `1.5px solid ${c.color}` : '1.5px solid var(--bd)', background: cat === id ? c.light : 'var(--wh)', color: cat === id ? c.color : 'var(--mt)', fontFamily: 'inherit' }}>
            {c.title}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--mt)', marginBottom: 6, letterSpacing: 0.5 }}>DUE</p>
      <input value={due} onChange={e => setDue(e.target.value)} placeholder="e.g. Dec 31"
        style={{ width: '100%', border: '1.5px solid var(--bd)', borderRadius: 9, padding: '9px 11px', fontSize: 13, marginBottom: 12, outline: 'none', fontFamily: 'inherit' }}/>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={submit} style={{ flex: 1, background: 'var(--cr)', color: '#fff', border: 'none', borderRadius: 10, padding: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Create Goal</button>
        <button onClick={close} style={{ background: 'var(--wh)', color: 'var(--mt)', border: '1.5px solid var(--bd)', borderRadius: 10, padding: '10px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
      </div>
    </div>
  );
}

Object.assign(window, { ResourcesScreen, ProfileScreen });
