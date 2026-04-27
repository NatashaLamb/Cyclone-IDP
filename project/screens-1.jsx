// Home + Assessments screens
const { useState, useEffect, useMemo } = React;

// ---------- shared atoms ----------
function NavIcon({ name, active }) {
  const stroke = active ? 'var(--cr)' : 'var(--mt)';
  const props = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (name === 'home') return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (name === 'assessments') return <svg {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
  if (name === 'resources') return <svg {...props}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
  if (name === 'profile') return <svg {...props}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  return null;
}

function Donut({ pct, color, size = 116, stroke = 9, label = 'overall' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}/>
      <text x={size/2} y={size/2 - 2} textAnchor="middle" fill="#fff" fontFamily="Newsreader, Georgia, serif" fontWeight="700" fontSize="26">{pct}%</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="Public Sans, system-ui, sans-serif" fontSize="9" letterSpacing="0.5">{label}</text>
    </svg>
  );
}

function Radar({ scores, axes, color }) {
  const cx = 140, cy = 130, r = 78, n = axes.length;
  const pt = (ai, lv) => {
    const a = (ai / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + (lv / 5) * r * Math.cos(a), cy + (lv / 5) * r * Math.sin(a)];
  };
  const grids = [];
  for (let lv = 1; lv <= 5; lv++) {
    const pts = axes.map((_, i) => pt(i, lv));
    grids.push(<polygon key={lv} points={pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}
      fill="none" stroke="#E8DFC8" strokeWidth={lv === 5 ? 1.5 : 0.7}/>);
  }
  const sp = scores.map((s, i) => pt(i, Math.max(s, 0.25)));
  return (
    <svg width="280" height="260" viewBox="0 0 280 260" style={{ display: 'block', margin: '0 auto' }}>
      {grids}
      {axes.map((_, i) => {
        const p = pt(i, 5);
        return <line key={i} x1={cx} y1={cy} x2={p[0].toFixed(1)} y2={p[1].toFixed(1)} stroke="#E8DFC8" strokeWidth="1"/>;
      })}
      <polygon points={sp.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}
        fill={`${color}26`} stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      {sp.map((p, i) => <circle key={i} cx={p[0].toFixed(1)} cy={p[1].toFixed(1)} r="4.5" fill={color} stroke="white" strokeWidth="1.5"/>)}
      {axes.map((ax, i) => {
        const lp = pt(i, 6.4);
        const anch = lp[0] < cx - 8 ? 'end' : lp[0] > cx + 8 ? 'start' : 'middle';
        const dy = lp[1] < cy - 8 ? -2 : lp[1] > cy + 8 ? 13 : 6;
        return <text key={i} x={lp[0].toFixed(1)} y={(lp[1] + dy).toFixed(1)} textAnchor={anch}
          fontSize="10" fill="#524727" fontFamily="Public Sans, system-ui" fontWeight="600">{ax}</text>;
      })}
    </svg>
  );
}

function MiniBar({ pct, color }) {
  return (
    <div style={{ height: 5, background: 'rgba(255,255,255,0.22)', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3, transition: 'width .8s' }}/>
    </div>
  );
}

// ---------- HOME ----------
function HomeScreen({ state, go, scoresPct, overallPct }) {
  const upcoming = WORKSHOPS.slice(0, 2);
  const enrolledIds = state.enrolled;
  const { research, teaching, communication, career } = scoresPct;
  return (
    <div style={{ padding: '14px 18px 28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 12, color: 'var(--mt)', fontFamily: 'Public Sans, system-ui' }}>Monday, October 12</p>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 26, fontWeight: 700, color: 'var(--tx)', lineHeight: 1.15, marginTop: 3, whiteSpace: 'nowrap' }}>
            Good morning, <span style={{ color: 'var(--cr)' }}>Alex</span>
          </h1>
        </div>
      </div>

      {/* Skill Portfolio Hero Card */}
      <div style={{ background: 'var(--cr)', borderRadius: 22, padding: '18px 18px 16px', marginBottom: 22, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(241,190,72,0.18)' }}/>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.4, color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontFamily: 'Public Sans, system-ui' }}>SKILL PORTFOLIO</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
          <Donut pct={overallPct} color="var(--sd)" size={108} stroke={8}/>
          <div style={{ flex: 1, fontFamily: 'Public Sans, system-ui' }}>
            {[
              { k: 'research', label: 'Research', v: research },
              { k: 'teaching', label: 'Teaching', v: teaching },
              { k: 'communication', label: 'Communication', v: communication },
              { k: 'career', label: 'Career', v: career },
            ].map(row => (
              <div key={row.k} style={{ marginBottom: 7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#fff' }}>
                  <span>{row.label}</span><span style={{ fontWeight: 700 }}>{row.v}%</span>
                </div>
                <MiniBar pct={row.v} color="var(--sd)"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--mt)', marginBottom: 10, fontFamily: 'Public Sans, system-ui' }}>QUICK ACTIONS</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 9, marginBottom: 22 }}>
        {[
          { icon: 'pulse', label: 'Take\nAssessment', tab: 'assessments' },
          { icon: 'book', label: 'Browse\nResources', tab: 'resources' },
          { icon: 'plus', label: 'Add New\nGoal', tab: 'profile', sub: 'goal' },
        ].map((a, i) => (
          <button key={i} onClick={() => go(a.tab, a.sub)} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: '14px 8px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'Public Sans, system-ui' }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--lcr)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cr)' }}>
              {a.icon === 'pulse' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
              {a.icon === 'book' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>}
              {a.icon === 'plus' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>}
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--tx)', whiteSpace: 'pre-line', textAlign: 'center', lineHeight: 1.25 }}>{a.label}</span>
          </button>
        ))}
      </div>

      {/* Upcoming Workshops */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--mt)', fontFamily: 'Public Sans, system-ui' }}>UPCOMING WORKSHOPS</p>
        <button onClick={() => state.openCalendar()} aria-label="Open calendar" title="Open calendar" style={{ background: 'var(--lcr)', border: 'none', cursor: 'pointer', color: 'var(--cr)', width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </button>
      </div>
      {upcoming.map(w => {
        const enrolled = enrolledIds.includes(w.id);
        const dt = new Date(w.date + 'T00:00:00');
        const m = dt.toLocaleString('en', { month: 'short' }).toUpperCase();
        const d = dt.getDate();
        return (
          <div key={w.id} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 16, padding: 14, marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ width: 50, height: 56, background: 'var(--cr)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
              <span style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 19, fontWeight: 700, lineHeight: 1 }}>{d}</span>
              <span style={{ fontFamily: 'Public Sans, system-ui', fontSize: 9, fontWeight: 700, letterSpacing: 0.5, marginTop: 2 }}>{m}</span>
            </div>
            <div style={{ flex: 1, fontFamily: 'Public Sans, system-ui' }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--tx)', marginBottom: 2 }}>{w.title}</p>
              <p style={{ fontSize: 11, color: 'var(--mt)', marginBottom: 8, lineHeight: 1.35 }}>{w.time} · {w.loc}</p>
              <button onClick={() => state.toggleEnroll(w.id)}
                style={{ background: enrolled ? 'var(--tx)' : 'var(--wh)', color: enrolled ? '#fff' : 'var(--tx)', border: '1.5px solid var(--tx)', borderRadius: 8, padding: '5px 14px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Public Sans, system-ui' }}>
                {enrolled ? '✓ Registered' : 'Register'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------- ASSESSMENTS LIST ----------
function AssessmentsList({ state, openAssessment }) {
  return (
    <div style={{ padding: '14px 18px 28px', fontFamily: 'Public Sans, system-ui' }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: 'var(--cr)' }}>SKILL DEVELOPMENT</p>
      <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 26, fontWeight: 700, color: 'var(--tx)', margin: '4px 0 4px' }}>Skill Assessments</h2>
      <p style={{ fontSize: 12, color: 'var(--mt)', marginBottom: 18 }}>Evaluate competencies across four key areas.</p>
      {Object.entries(CATEGORIES).map(([id, cat]) => {
        const done = state.completed[id];
        const avg = done ? (done.reduce((a, b) => a + b, 0) / done.length).toFixed(1) : null;
        return (
          <button key={id} onClick={() => openAssessment(id)} style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 18, padding: '14px 14px', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 13, width: '100%', textAlign: 'left', fontFamily: 'inherit' }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: cat.light, color: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {ICONS[id]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--tx)', marginBottom: 2, fontFamily: 'Newsreader, Georgia, serif' }}>{cat.title}</div>
              <div style={{ fontSize: 11.5, color: 'var(--mt)', marginBottom: 6, lineHeight: 1.3 }}>{cat.desc}</div>
              {done ? (
                <span style={{ fontSize: 9, fontWeight: 700, background: cat.light, color: cat.color, borderRadius: 20, padding: '3px 9px', letterSpacing: 0.5 }}>COMPLETED · {avg} / 5</span>
              ) : (
                <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--mt)', letterSpacing: 0.6 }}>{cat.qs.length} QUESTIONS · ~6 MIN</span>
              )}
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mt)" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        );
      })}
    </div>
  );
}

// ---------- ASSESSMENT QUIZ ----------
function AssessmentQuiz({ catId, onBack, onComplete }) {
  const cat = CATEGORIES[catId];
  const [qIdx, setQIdx] = useState(0);
  const [selOpt, setSelOpt] = useState(null);
  const [answers, setAnswers] = useState([]);

  const [type, , qtext, opts] = cat.qs[qIdx];
  const tc = TYPE_COLORS[type] || { bg: '#eee', tx: '#333' };
  const pct = Math.round(qIdx / cat.qs.length * 100);
  const isLast = qIdx === cat.qs.length - 1;
  const hasSel = selOpt !== null;

  const next = () => {
    if (selOpt === null) return;
    const newAns = [...answers, opts[selOpt][1]];
    if (isLast) {
      onComplete(catId, newAns);
    } else {
      setAnswers(newAns);
      setQIdx(qIdx + 1);
      setSelOpt(null);
    }
  };

  return (
    <div style={{ padding: '14px 18px 28px', fontFamily: 'Public Sans, system-ui' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: 0, marginBottom: 14, color: 'var(--mt)', fontFamily: 'inherit' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        {cat.title} Assessment
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, color: 'var(--mt)', marginBottom: 7 }}>
        <span>Question {qIdx + 1} of {cat.qs.length}</span>
        <span style={{ color: cat.color }}>{pct}% complete</span>
      </div>
      <div style={{ height: 4, background: 'var(--bd)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: cat.color, borderRadius: 2, transition: 'width .4s' }}/>
      </div>
      <span style={{ display: 'inline-block', fontSize: 9, fontWeight: 700, letterSpacing: 1.1, borderRadius: 20, padding: '3px 9px', marginBottom: 12, background: tc.bg, color: tc.tx }}>{type.toUpperCase()}</span>
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--tx)', lineHeight: 1.45, marginBottom: 18, fontFamily: 'Newsreader, Georgia, serif' }}>{qtext}</p>
      {['A', 'B', 'C', 'D'].map((L, i) => {
        const sel = selOpt === i;
        return (
          <button key={i} onClick={() => setSelOpt(i)} style={{ background: sel ? cat.light : 'var(--wh)', border: sel ? `2px solid ${cat.color}` : '1.5px solid var(--bd)', borderRadius: 13, padding: sel ? '9px 11px' : '10px 12px', marginBottom: 8, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 10, width: '100%', textAlign: 'left', fontFamily: 'inherit', transition: 'all .15s' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: sel ? cat.color : 'var(--bd)', color: sel ? '#fff' : 'var(--mt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{L}</div>
            <span style={{ fontSize: 13, lineHeight: 1.4, color: 'var(--tx)' }}>{opts[i][0]}</span>
          </button>
        );
      })}
      <button onClick={next} disabled={!hasSel}
        style={{ width: '100%', border: 'none', borderRadius: 13, padding: 14, fontSize: 14, fontWeight: 700, cursor: hasSel ? 'pointer' : 'default', marginTop: 12, fontFamily: 'inherit', background: hasSel ? cat.color : 'var(--bd)', color: hasSel ? '#fff' : 'var(--mt)' }}>
        {isLast ? 'See My Results →' : 'Next Question →'}
      </button>
    </div>
  );
}

// ---------- ASSESSMENT RESULTS ----------
function AssessmentResults({ catId, onBack, state }) {
  const cat = CATEGORIES[catId];
  const ans = state.completed[catId] || [];
  const tot = Array(5).fill(0), cnt = Array(5).fill(0);
  ans.forEach((sc, i) => { const ax = cat.qs[i][1]; tot[ax] += sc; cnt[ax]++; });
  const sc = tot.map((t, i) => cnt[i] ? +(t / cnt[i]).toFixed(1) : 0);
  const overall = (sc.reduce((a, b) => a + b, 0) / sc.length).toFixed(1);
  const ranked = sc.map((s, i) => ({ s, n: cat.full[i] })).sort((a, b) => b.s - a.s);
  const sqr = (s) => Array(5).fill(0).map((_, i) =>
    <span key={i} style={{ width: 9, height: 9, borderRadius: 2, background: i < Math.round(s) ? cat.color : 'var(--bd)', display: 'inline-block', marginRight: 2 }}/>);
  return (
    <div style={{ padding: '14px 18px 28px', fontFamily: 'Public Sans, system-ui' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, padding: 0, marginBottom: 12, color: 'var(--mt)', fontFamily: 'inherit' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to Assessments
      </button>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.4, color: cat.color, marginBottom: 4 }}>ASSESSMENT COMPLETE</p>
      <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 24, fontWeight: 700, color: 'var(--tx)', marginBottom: 4 }}>{cat.title} Results</h2>
      <p style={{ fontSize: 13, color: 'var(--mt)', marginBottom: 14 }}>Overall: <strong style={{ color: cat.color, fontSize: 18, fontFamily: 'Newsreader, Georgia, serif' }}>{overall}</strong><span style={{ fontSize: 12 }}> / 5</span></p>
      <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 18, padding: '14px 8px', marginBottom: 12 }}>
        <Radar scores={sc} axes={cat.axes} color={cat.color}/>
      </div>
      <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 18, padding: 14, marginBottom: 12 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.3, color: 'var(--mt)', marginBottom: 10 }}>SKILL BREAKDOWN</p>
        {cat.full.map((ax, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: i < cat.full.length - 1 ? '1px solid var(--bd)' : 'none' }}>
            <span style={{ fontSize: 12.5, color: 'var(--tx)' }}>{ax}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {sqr(sc[i])}
              <span style={{ fontSize: 12.5, fontWeight: 700, color: cat.color, minWidth: 22, fontFamily: 'Newsreader, Georgia, serif' }}>{sc[i]}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: 12 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: '#2A6A30', marginBottom: 8 }}>STRENGTHS</p>
          {ranked.slice(0, 2).map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2A6A30', flexShrink: 0, marginTop: 4 }}/>
              <span style={{ fontSize: 11, color: 'var(--tx)', lineHeight: 1.3 }}>{x.n}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'var(--wh)', border: '1.5px solid var(--bd)', borderRadius: 14, padding: 12 }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: cat.color, marginBottom: 8 }}>FOCUS AREAS</p>
          {ranked.slice(-2).reverse().map((x, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: cat.color, flexShrink: 0, marginTop: 4 }}/>
              <span style={{ fontSize: 11, color: 'var(--tx)', lineHeight: 1.3 }}>{x.n}</span>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onBack} style={{ width: '100%', background: cat.color, color: '#fff', border: 'none', borderRadius: 13, padding: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
        Continue →
      </button>
    </div>
  );
}

Object.assign(window, { NavIcon, Donut, Radar, MiniBar, HomeScreen, AssessmentsList, AssessmentQuiz, AssessmentResults });
