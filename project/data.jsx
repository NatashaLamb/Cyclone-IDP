// Skill assessment data + workshops + micro-credentials
const TYPE_COLORS = {
  'Self-Reflection': { bg: '#EEF0F8', tx: '#3B4A8A' },
  'Scenario': { bg: '#FEF3E2', tx: '#8A5A00' },
  'Knowledge': { bg: '#EBF5EC', tx: '#2A6A30' },
  'Multiple Choice': { bg: '#FCE8EC', tx: '#C8102E' },
};

const ICONS = {
  research: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  teaching: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  communication: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  career: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
};

const CATEGORIES = {
  research: {
    title: 'Research',
    desc: 'Methods, ethics & academic practice',
    color: '#C8102E', light: '#FCE8EC',
    axes: ['Lit. Review', 'Res. Design', 'Collaboration', 'Data Analysis', 'Ethics'],
    full: ['Literature Review', 'Research Design', 'Collaboration', 'Data Analysis', 'Research Ethics'],
    qs: [
      ['Self-Reflection', 1, "Rate your confidence in designing a research study independently.", [
        ["I struggle significantly and need constant guidance from others", 1],
        ["I can design studies but require substantial support from my advisor", 2],
        ["I design studies competently but still seek input on key decisions", 3],
        ["I confidently design rigorous studies with minimal external guidance", 5],
      ]],
      ['Self-Reflection', 3, "Rate your ability to analyze and interpret complex data.", [
        ["I find complex data analysis very challenging", 1],
        ["I can perform basic analysis but struggle with complex datasets", 2],
        ["I analyze data well but interpretation sometimes requires support", 3],
        ["I confidently analyze and draw meaningful insights from complex data", 5],
      ]],
      ['Self-Reflection', 0, "Rate your confidence in identifying gaps in the literature.", [
        ["I have difficulty recognizing what is missing in existing research", 1],
        ["I can spot obvious gaps but miss more nuanced ones", 2],
        ["I identify gaps reasonably well after thorough reading", 3],
        ["I systematically identify meaningful gaps that can anchor new research", 5],
      ]],
      ['Scenario', 3, "Your dataset shows unexpected patterns. What do you do first?", [
        ["Discard those data points — they're likely errors", 1],
        ["Report only the patterns that match your hypothesis", 1],
        ["Consult your advisor immediately before taking any action", 3],
        ["Examine the data carefully to determine whether the pattern is meaningful or an artifact", 5],
      ]],
      ['Scenario', 2, "A collaborator's results contradict yours. How do you respond?", [
        ["Assert that your results are correct and push back firmly", 1],
        ["Ignore the discrepancy and proceed with your own findings", 1],
        ["Inform your PI and wait for their guidance", 3],
        ["Arrange a meeting to review both datasets together and identify the source of discrepancy", 5],
      ]],
      ['Knowledge', 4, "Which action best reflects ethical research conduct?", [
        ["Reporting only statistically significant results to strengthen your argument", 1],
        ["Adjusting data points that significantly skew your findings", 1],
        ["Citing sources selectively to support your argument", 2],
        ["Transparently reporting all results, including null or unexpected findings", 5],
      ]],
      ['Knowledge', 0, "What is the primary purpose of a literature review?", [
        ["To demonstrate how much you have read on a topic", 1],
        ["To summarize all existing research in your field", 2],
        ["To argue that prior research in your area is flawed", 2],
        ["To situate your research within existing knowledge and identify gaps", 5],
      ]],
      ['Multiple Choice', 4, "Which strategy best improves data reproducibility?", [
        ["Conducting the experiment multiple times until results are consistent", 1],
        ["Sharing only cleaned and finalized datasets with collaborators", 2],
        ["Using proprietary analysis software that locks in your steps", 1],
        ["Documenting all methods, code, and raw data in a shared, accessible repository", 5],
      ]],
    ],
  },
  teaching: {
    title: 'Teaching',
    desc: 'Pedagogy, curriculum & engagement',
    color: '#9B945F', light: '#F5F3E6',
    axes: ['Adaptability', 'Pedagogy', 'Engagement', 'Assessment', 'Curriculum'],
    full: ['Adaptability', 'Pedagogical Knowledge', 'Student Engagement', 'Assessment Design', 'Curriculum Design'],
    qs: [
      ['Self-Reflection', 2, "Rate your confidence in facilitating classroom discussions.", [
        ["I struggle to generate meaningful discussion and often end up just lecturing", 1],
        ["I can get discussion going but it's often dominated by a few students", 2],
        ["I facilitate discussions competently but don't always reach everyone", 3],
        ["I confidently facilitate inclusive, productive discussions that engage all students", 5],
      ]],
      ['Self-Reflection', 1, "Rate your ability to explain complex concepts clearly.", [
        ["I often lose students when explaining difficult ideas", 1],
        ["I explain clearly to some students but struggle to reach others", 2],
        ["I explain complex ideas well and use multiple approaches when needed", 4],
        ["I consistently make complex concepts accessible to learners at all levels", 5],
      ]],
      ['Scenario', 2, "A student expresses confusion about an assignment. What do you do?", [
        ["Tell them to re-read the instructions carefully", 1],
        ["Quickly re-explain the assignment verbally", 2],
        ["Break down the assignment step-by-step and check for understanding", 4],
        ["Ask clarifying questions to understand the confusion, then co-construct a clear path forward", 5],
      ]],
      ['Scenario', 0, "Your class seems disengaged during a lecture. What's your next step?", [
        ["Continue — students are responsible for their own engagement", 1],
        ["Speak louder and pace more slowly", 1],
        ["Call on individual students to re-engage the group", 2],
        ["Pause and shift to an interactive activity directly connected to the content", 5],
      ]],
      ['Knowledge', 4, "Which strategy best supports inclusive teaching?", [
        ["Providing all students with identical materials and assessments", 1],
        ["Grading on a curve to account for ability differences", 1],
        ["Setting lower expectations for students with learning differences", 1],
        ["Offering multiple means of representation, engagement, and expression (UDL principles)", 5],
      ]],
      ['Knowledge', 4, "What is backward design in curriculum planning?", [
        ["Reviewing previous course materials for improvement before the semester", 1],
        ["Starting the semester with a review of foundational content", 2],
        ["Designing your course starting with the hardest material and working backward", 2],
        ["Beginning with desired learning outcomes, then designing assessments and content accordingly", 5],
      ]],
      ['Multiple Choice', 3, "What is the primary purpose of formative assessment?", [
        ["To assign grades at key intervals throughout the semester", 1],
        ["To evaluate whether students have met learning objectives at semester end", 2],
        ["To compare student performance against a national benchmark", 1],
        ["To provide ongoing feedback that guides and improves student learning in real time", 5],
      ]],
      ['Self-Reflection', 3, "Rate how effectively you provide constructive feedback to students.", [
        ["My feedback is minimal or primarily evaluative", 1],
        ["I give feedback but it tends to be general rather than specific", 2],
        ["I provide specific, actionable feedback most of the time", 4],
        ["I give consistently targeted, growth-oriented feedback that students can act on", 5],
      ]],
    ],
  },
  communication: {
    title: 'Communication',
    desc: 'Oral, written & professional voice',
    color: '#524727', light: '#F0EAE0',
    axes: ['Oral Pres.', 'Writing', 'Prof. Conduct', 'Listening', 'Networking'],
    full: ['Oral Presentation', 'Written Communication', 'Professional Conduct', 'Active Listening', 'Networking'],
    qs: [
      ['Self-Reflection', 3, "Rate your confidence in communicating ideas in group settings.", [
        ["I often feel anxious and struggle to articulate ideas clearly in groups", 1],
        ["I can share ideas but feel uncertain about how they land", 2],
        ["I communicate comfortably in most group settings", 3],
        ["I confidently contribute ideas and help shape productive discussions", 5],
      ]],
      ['Self-Reflection', 4, "Rate your ability to adapt your message to different audiences.", [
        ["I present information the same way regardless of who I'm talking to", 1],
        ["I make minor adjustments but rarely rethink my core approach", 2],
        ["I adapt my language and examples depending on the audience", 4],
        ["I fully tailor content, tone, and depth of my message for each specific audience", 5],
      ]],
      ['Self-Reflection', 0, "Rate your confidence in giving presentations.", [
        ["I find presentations very stressful and struggle with delivery", 1],
        ["I can get through presentations but lack confidence and polish", 2],
        ["I present competently and handle most situations with ease", 4],
        ["I present with strong presence, clarity, and genuine command of the room", 5],
      ]],
      ['Scenario', 0, "Your audience looks confused during a presentation. What do you do?", [
        ["Keep going — you don't want to lose your momentum", 1],
        ["Speak more slowly and repeat what you just said", 2],
        ["Ask a yes/no check-in question to gauge understanding", 3],
        ["Pause, invite questions, and reframe the concept from a different angle", 5],
      ]],
      ['Scenario', 1, "A collaborator misinterprets your email. What's your next step?", [
        ["Assume they'll figure it out and wait to see what happens", 1],
        ["Apologize even though your message was clear", 1],
        ["Send a follow-up email re-clarifying what you meant", 2],
        ["Reach out directly — call or meet — to resolve the misunderstanding and prevent recurrence", 5],
      ]],
      ['Knowledge', 1, "Which strategy best improves clarity in academic writing?", [
        ["Using sophisticated vocabulary to demonstrate expertise", 1],
        ["Writing long, detailed sentences that cover all nuances", 1],
        ["Structuring your argument clearly before you start writing", 4],
        ["Using precise language, clear topic sentences, and logical paragraph structure", 5],
      ]],
      ['Knowledge', 3, "What is active listening?", [
        ["Taking detailed written notes during every conversation", 2],
        ["Staying silent while the other person speaks", 1],
        ["Preparing your response while the other person is still talking", 1],
        ["Fully attending to, understanding, and thoughtfully responding to what someone is saying", 5],
      ]],
      ['Multiple Choice', 4, "Which technique best maintains audience engagement during a talk?", [
        ["Reading from your slides to ensure accuracy", 1],
        ["Including as much content as possible to be thorough", 1],
        ["Telling personal anecdotes unrelated to your topic", 1],
        ["Using strategic pauses, direct questions, and varied pacing to keep the audience involved", 5],
      ]],
    ],
  },
  career: {
    title: 'Career',
    desc: 'Planning, goals & professional growth',
    color: '#7A5800', light: '#FEF7E0',
    axes: ['Goal Setting', 'Networking', 'Self-Advocacy', 'Career Plan', 'Industry'],
    full: ['Goal Setting', 'Networking', 'Self-Advocacy', 'Career Planning', 'Industry Knowledge'],
    qs: [
      ['Self-Reflection', 3, "Rate your confidence in navigating your career path.", [
        ["I feel lost and unsure of where I'm heading professionally", 1],
        ["I have a vague sense of direction but no clear plan", 2],
        ["I have a general plan but still carry significant uncertainties", 3],
        ["I feel confident in my direction and maintain a structured plan I actively revisit", 5],
      ]],
      ['Self-Reflection', 1, "Rate your ability to network professionally.", [
        ["I avoid networking — it feels inauthentic or uncomfortable", 1],
        ["I network occasionally but don't follow up or maintain relationships", 2],
        ["I network regularly and maintain some professional relationships", 4],
        ["I actively build and sustain a diverse professional network with intention", 5],
      ]],
      ['Self-Reflection', 2, "Rate your confidence in preparing application materials.", [
        ["I find application materials very daunting and don't know where to start", 1],
        ["I can put materials together but they often feel generic", 2],
        ["I prepare tailored, polished materials for most applications", 4],
        ["I craft highly targeted, compelling materials that clearly communicate my value", 5],
      ]],
      ['Scenario', 3, "You receive a rejection email after applying for a position. What's your next step?", [
        ["Assume the process was unfair and move on without reflection", 1],
        ["Take a break from job searching until you feel ready again", 2],
        ["Ask your advisor if they can contact the organization on your behalf", 2],
        ["Request feedback from the recruiter and use it to strategically refine your approach", 5],
      ]],
      ['Scenario', 4, "You're unsure how your academic skills translate outside academia. What do you do?", [
        ["Assume they don't and limit your search to academic positions", 1],
        ["Ask friends what they think your skills are worth", 1],
        ["Review generic job postings to guess which skills might transfer", 2],
        ["Conduct informational interviews with professionals in target sectors to learn how your skills map", 5],
      ]],
      ['Scenario', 0, "You're overwhelmed by too many job options. What's your first move?", [
        ["Apply to everything and see what sticks", 1],
        ["Choose the role with the highest salary", 1],
        ["Ask your advisor to help you decide", 2],
        ["Reflect on your values, strengths, and long-term goals to identify the roles that best align", 5],
      ]],
      ['Knowledge', 4, "What is the primary purpose of an informational interview?", [
        ["A formal job interview for a specific open position", 1],
        ["A performance review conducted by a supervisor", 1],
        ["A way to ask someone for a job reference", 2],
        ["A conversation to learn about a career path, role, or organization from someone working in it", 5],
      ]],
      ['Multiple Choice', 1, "What makes a strong elevator pitch?", [
        ["Covering your full CV so nothing important is missed", 1],
        ["Using technical jargon to quickly establish credibility", 1],
        ["Being memorable by focusing on personality rather than work", 2],
        ["A concise, compelling statement of who you are, what you do, and why it matters", 5],
      ]],
    ],
  },
};

const WORKSHOPS = [
  { id: 'w1', date: '2026-10-12', title: 'Research Ethics 101', time: '2:00 PM', loc: 'Beardshear Hall, Rm 202', cat: 'research' },
  { id: 'w2', date: '2026-10-15', title: 'Grant Writing Seminar', time: '10:30 AM', loc: 'Memorial Union, Oak Room', cat: 'career' },
  { id: 'w3', date: '2026-10-18', title: 'Inclusive Pedagogy Workshop', time: '1:00 PM', loc: 'CELT, Lagomarcino 207', cat: 'teaching' },
  { id: 'w4', date: '2026-10-22', title: 'Three-Minute Thesis Prep', time: '4:00 PM', loc: 'Parks Library, Rm 198', cat: 'communication' },
  { id: 'w5', date: '2026-10-26', title: 'Industry Career Pathways', time: '11:00 AM', loc: 'Career Services Suite', cat: 'career' },
  { id: 'w6', date: '2026-10-29', title: 'Data Visualization Lab', time: '3:00 PM', loc: 'Parks Library, Rm 50', cat: 'research' },
  { id: 'w7', date: '2026-11-04', title: 'Academic CV Workshop', time: '10:00 AM', loc: 'Career Services Suite', cat: 'career' },
  { id: 'w8', date: '2026-11-09', title: 'Public Speaking for Researchers', time: '1:30 PM', loc: 'Memorial Union, Pine Room', cat: 'communication' },
  { id: 'w9', date: '2026-11-12', title: 'Course Design Institute', time: '9:00 AM', loc: 'CELT, Lagomarcino 304', cat: 'teaching' },
  { id: 'w10', date: '2026-11-18', title: 'Responsible Conduct of Research', time: '2:00 PM', loc: 'Beardshear Hall, Rm 202', cat: 'research' },
  { id: 'w11', date: '2026-11-23', title: 'Networking for Grad Students', time: '4:00 PM', loc: 'Career Services Suite', cat: 'career' },
  { id: 'w12', date: '2026-12-02', title: 'Academic Job Market Prep', time: '11:00 AM', loc: 'Memorial Union, Oak Room', cat: 'career' },
  { id: 'w13', date: '2026-12-07', title: 'Science Communication Lab', time: '2:30 PM', loc: 'Hamilton Hall, Rm 100', cat: 'communication' },
  { id: 'w14', date: '2026-12-10', title: 'Assessment for Student Learning', time: '10:00 AM', loc: 'CELT, Lagomarcino 207', cat: 'teaching' },
];

const MICRO_CREDS = [
  { id: 'm1', cat: 'research', title: 'Responsible Conduct of Research', provider: 'Graduate College · CELT', duration: '~3 hrs', desc: 'Research ethics, data integrity, mentoring, and authorship standards.' },
  { id: 'm2', cat: 'research', title: 'Research Data Management', provider: 'University Library', duration: '~2 hrs', desc: 'Foundations of documentation, storage, sharing, and reproducibility.' },
  { id: 'm3', cat: 'teaching', title: 'Evidence-Based Teaching Practices', provider: 'CELT', duration: '~4 hrs', desc: 'Active learning, inclusion, and assessment strategies.' },
  { id: 'm4', cat: 'teaching', title: 'Inclusive Classroom Design', provider: 'CELT', duration: '~3 hrs', desc: 'Universal Design for Learning principles for equitable instruction.' },
  { id: 'm5', cat: 'communication', title: 'Science Communication', provider: 'Center for Communication Excellence', duration: '~2.5 hrs', desc: 'Explaining complex research to diverse audiences.' },
  { id: 'm6', cat: 'communication', title: 'Academic Writing & Publishing', provider: 'Writing Center', duration: '~3 hrs', desc: 'Scholarly writing, peer review, and publication readiness.' },
  { id: 'm7', cat: 'career', title: 'Career Readiness for Grad Students', provider: 'Career Services', duration: '~2 hrs', desc: 'Goal-setting, job search, and professional identity.' },
  { id: 'm8', cat: 'career', title: 'Grant Writing Fundamentals', provider: 'Office of Research', duration: '~2 hrs', desc: 'Proposal structure, budget, and funding agency expectations.' },
];

const GOALS_DEFAULT = [
  { id: 'g1', title: 'Submit first-author manuscript', cat: 'research', due: 'Dec 15', progress: 60, milestones: ['Draft methods', 'Run analysis', 'Internal review', 'Submit'] },
  { id: 'g2', title: 'Lead 2 guest lectures this semester', cat: 'teaching', due: 'Nov 30', progress: 50, milestones: ['Pick topic', 'Build deck', 'Lecture 1', 'Lecture 2'] },
  { id: 'g3', title: 'Attend 3 networking events', cat: 'career', due: 'Dec 31', progress: 33, milestones: ['Mixer (done)', 'Industry panel', 'Alumni dinner'] },
];

Object.assign(window, { TYPE_COLORS, ICONS, CATEGORIES, WORKSHOPS, MICRO_CREDS, GOALS_DEFAULT });
