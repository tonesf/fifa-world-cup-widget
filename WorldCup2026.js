// ══════════════════════════════════════════════════════════════
//  ⚽  FIFA WORLD CUP 2026 — Scriptable Widget + Day Browser
//      v5: Timezone-aware — all times in your local timezone
// ══════════════════════════════════════════════════════════════
//
//  HOW TO INSTALL:
//  1. Download "Scriptable" (free) from the App Store
//  2. Open Scriptable → tap + → paste this entire script → Done
//  3. Hit ▶ to open the interactive day browser
//  4. Long-press Home Screen → + → Scriptable → pick a size → select this
//  5. Tap the widget to open the day browser
//
//  All kickoff times are stored as UTC and displayed in YOUR
//  device's local timezone automatically — works anywhere in the world.
// ══════════════════════════════════════════════════════════════

// ── WIDGET COLORS (Stadium Floodlight) ───────────────────────
const C = {
  bg:    new Color("#000000"),
  blue:  new Color("#3b9eff"),
  text:  new Color("#e0e8ff"),
  dim:   new Color("#7a90a8"),
  muted: new Color("#1a2535"),
  usa:   new Color("#f0a500"),
  usaBg: new Color("#0f0900"),
}

// ── FULL SCHEDULE (UTC kickoff times) ────────────────────────
// Fields: grp, t1, t2, um (UTC month), ud (UTC day),
//         uh (UTC hour 0-23), un (UTC minute, default 0), v (venue), usa?
// All ET times converted to UTC by adding 4h (EDT = UTC-4 during tournament).
const GAMES = [
  // ── GROUP STAGE ────────────────────────────────────────────
  // Jun 11 ET
  {grp:"A",t1:"Mexico",        t2:"South Africa",  um:6,ud:11,uh:19,v:"Azteca, Mexico City"},
  {grp:"A",t1:"South Korea",   t2:"Czechia",        um:6,ud:12,uh:2, v:"Akron, Zapopan"},
  // Jun 12 ET
  {grp:"B",t1:"Canada",        t2:"Bosnia & Herz.", um:6,ud:12,uh:19,v:"BMO Field, Toronto"},
  {grp:"D",t1:"USA",           t2:"Paraguay",       um:6,ud:13,uh:1, v:"SoFi, Inglewood",usa:true},
  // Jun 13 ET
  {grp:"B",t1:"Qatar",         t2:"Switzerland",    um:6,ud:13,uh:19,v:"Levi's, Santa Clara"},
  {grp:"C",t1:"Brazil",        t2:"Morocco",        um:6,ud:13,uh:22,v:"MetLife, NJ"},
  {grp:"C",t1:"Haiti",         t2:"Scotland",       um:6,ud:14,uh:1, v:"Gillette, Foxborough"},
  {grp:"D",t1:"Australia",     t2:"Türkiye",        um:6,ud:14,uh:4, v:"BC Place, Vancouver"},
  // Jun 14 ET
  {grp:"E",t1:"Germany",       t2:"Curaçao",        um:6,ud:14,uh:17,v:"NRG, Houston"},
  {grp:"F",t1:"Netherlands",   t2:"Japan",          um:6,ud:14,uh:20,v:"AT&T, Dallas"},
  {grp:"E",t1:"Ivory Coast",   t2:"Ecuador",        um:6,ud:14,uh:23,v:"Lincoln Fin., Philly"},
  {grp:"F",t1:"Sweden",        t2:"Tunisia",        um:6,ud:15,uh:2, v:"BBVA, Monterrey"},
  // Jun 15 ET
  {grp:"H",t1:"Spain",         t2:"Cape Verde",     um:6,ud:15,uh:16,v:"Mercedes-Benz, Atlanta"},
  {grp:"G",t1:"Belgium",       t2:"Egypt",          um:6,ud:15,uh:19,v:"Lumen Field, Seattle"},
  {grp:"H",t1:"Saudi Arabia",  t2:"Uruguay",        um:6,ud:15,uh:22,v:"Hard Rock, Miami"},
  {grp:"G",t1:"Iran",          t2:"New Zealand",    um:6,ud:16,uh:1, v:"SoFi, Inglewood"},
  // Jun 16 ET
  {grp:"I",t1:"France",        t2:"Senegal",        um:6,ud:16,uh:19,v:"MetLife, NJ"},
  {grp:"I",t1:"Iraq",          t2:"Norway",         um:6,ud:16,uh:22,v:"Gillette, Foxborough"},
  {grp:"J",t1:"Argentina",     t2:"Algeria",        um:6,ud:17,uh:1, v:"Arrowhead, Kansas City"},
  {grp:"J",t1:"Austria",       t2:"Jordan",         um:6,ud:17,uh:4, v:"Levi's, Santa Clara"},
  // Jun 17 ET
  {grp:"K",t1:"Portugal",      t2:"DR Congo",       um:6,ud:17,uh:17,v:"NRG, Houston"},
  {grp:"L",t1:"England",       t2:"Croatia",        um:6,ud:17,uh:20,v:"AT&T, Dallas"},
  {grp:"L",t1:"Ghana",         t2:"Panama",         um:6,ud:17,uh:23,v:"BMO Field, Toronto"},
  {grp:"K",t1:"Uzbekistan",    t2:"Colombia",       um:6,ud:18,uh:2, v:"Azteca, Mexico City"},
  // Jun 18 ET
  {grp:"A",t1:"Czechia",       t2:"South Africa",   um:6,ud:18,uh:16,v:"Mercedes-Benz, Atlanta"},
  {grp:"B",t1:"Switzerland",   t2:"Bosnia & Herz.", um:6,ud:18,uh:19,v:"SoFi, Inglewood"},
  {grp:"B",t1:"Canada",        t2:"Qatar",          um:6,ud:18,uh:22,v:"BC Place, Vancouver"},
  {grp:"A",t1:"Mexico",        t2:"South Korea",    um:6,ud:19,uh:1, v:"Akron, Zapopan"},
  // Jun 19 ET
  {grp:"D",t1:"USA",           t2:"Australia",      um:6,ud:19,uh:19,v:"Lumen Field, Seattle",usa:true},
  {grp:"C",t1:"Scotland",      t2:"Morocco",        um:6,ud:19,uh:22,v:"Gillette, Foxborough"},
  {grp:"C",t1:"Brazil",        t2:"Haiti",          um:6,ud:20,uh:0, un:30,v:"Lincoln Fin., Philly"},
  {grp:"D",t1:"Türkiye",       t2:"Paraguay",       um:6,ud:20,uh:3, v:"Levi's, Santa Clara"},
  // Jun 20 ET
  {grp:"F",t1:"Netherlands",   t2:"Sweden",         um:6,ud:20,uh:17,v:"NRG, Houston"},
  {grp:"E",t1:"Germany",       t2:"Ivory Coast",    um:6,ud:20,uh:20,v:"BMO Field, Toronto"},
  {grp:"E",t1:"Ecuador",       t2:"Curaçao",        um:6,ud:21,uh:0, v:"Arrowhead, Kansas City"},
  {grp:"F",t1:"Tunisia",       t2:"Japan",          um:6,ud:21,uh:4, v:"BBVA, Monterrey"},
  // Jun 21 ET
  {grp:"H",t1:"Spain",         t2:"Saudi Arabia",   um:6,ud:21,uh:16,v:"Mercedes-Benz, Atlanta"},
  {grp:"G",t1:"Belgium",       t2:"Iran",           um:6,ud:21,uh:19,v:"SoFi, Inglewood"},
  {grp:"H",t1:"Uruguay",       t2:"Cape Verde",     um:6,ud:21,uh:22,v:"Hard Rock, Miami"},
  {grp:"G",t1:"New Zealand",   t2:"Egypt",          um:6,ud:22,uh:1, v:"BC Place, Vancouver"},
  // Jun 22 ET
  {grp:"J",t1:"Argentina",     t2:"Austria",        um:6,ud:22,uh:17,v:"AT&T, Dallas"},
  {grp:"I",t1:"France",        t2:"Iraq",           um:6,ud:22,uh:21,v:"Lincoln Fin., Philly"},
  {grp:"I",t1:"Norway",        t2:"Senegal",        um:6,ud:23,uh:0, v:"MetLife, NJ"},
  {grp:"J",t1:"Jordan",        t2:"Algeria",        um:6,ud:23,uh:3, v:"Levi's, Santa Clara"},
  // Jun 23 ET
  {grp:"K",t1:"Portugal",      t2:"Uzbekistan",     um:6,ud:23,uh:17,v:"NRG, Houston"},
  {grp:"L",t1:"England",       t2:"Ghana",          um:6,ud:23,uh:20,v:"Gillette, Foxborough"},
  {grp:"L",t1:"Panama",        t2:"Croatia",        um:6,ud:23,uh:23,v:"BMO Field, Toronto"},
  {grp:"K",t1:"Colombia",      t2:"DR Congo",       um:6,ud:24,uh:2, v:"Akron, Zapopan"},
  // Jun 24 ET (simultaneous group finales)
  {grp:"B",t1:"Switzerland",   t2:"Canada",         um:6,ud:24,uh:19,v:"BC Place, Vancouver"},
  {grp:"B",t1:"Bosnia & Herz.",t2:"Qatar",          um:6,ud:24,uh:19,v:"Lumen Field, Seattle"},
  {grp:"C",t1:"Scotland",      t2:"Brazil",         um:6,ud:24,uh:22,v:"Hard Rock, Miami"},
  {grp:"C",t1:"Morocco",       t2:"Haiti",          um:6,ud:24,uh:22,v:"Mercedes-Benz, Atlanta"},
  {grp:"A",t1:"Czechia",       t2:"Mexico",         um:6,ud:25,uh:1, v:"Azteca, Mexico City"},
  {grp:"A",t1:"South Africa",  t2:"South Korea",    um:6,ud:25,uh:1, v:"BBVA, Monterrey"},
  // Jun 25 ET
  {grp:"E",t1:"Curaçao",       t2:"Ivory Coast",    um:6,ud:25,uh:20,v:"Lincoln Fin., Philly"},
  {grp:"E",t1:"Ecuador",       t2:"Germany",        um:6,ud:25,uh:20,v:"MetLife, NJ"},
  {grp:"F",t1:"Japan",         t2:"Sweden",         um:6,ud:25,uh:23,v:"AT&T, Dallas"},
  {grp:"F",t1:"Tunisia",       t2:"Netherlands",    um:6,ud:25,uh:23,v:"Arrowhead, Kansas City"},
  {grp:"D",t1:"Türkiye",       t2:"USA",            um:6,ud:26,uh:2, v:"SoFi, Inglewood",usa:true},
  {grp:"D",t1:"Paraguay",      t2:"Australia",      um:6,ud:26,uh:2, v:"Levi's, Santa Clara"},
  // Jun 26 ET
  {grp:"I",t1:"Norway",        t2:"France",         um:6,ud:26,uh:19,v:"Gillette, Foxborough"},
  {grp:"I",t1:"Senegal",       t2:"Iraq",           um:6,ud:26,uh:19,v:"BMO Field, Toronto"},
  {grp:"H",t1:"Cape Verde",    t2:"Saudi Arabia",   um:6,ud:27,uh:0, v:"NRG, Houston"},
  {grp:"H",t1:"Uruguay",       t2:"Spain",          um:6,ud:27,uh:0, v:"Akron, Zapopan"},
  {grp:"G",t1:"Egypt",         t2:"Iran",           um:6,ud:27,uh:3, v:"Lumen Field, Seattle"},
  {grp:"G",t1:"New Zealand",   t2:"Belgium",        um:6,ud:27,uh:3, v:"BC Place, Vancouver"},
  // Jun 27 ET
  {grp:"L",t1:"Panama",        t2:"England",        um:6,ud:27,uh:21,v:"MetLife, NJ"},
  {grp:"L",t1:"Croatia",       t2:"Ghana",          um:6,ud:27,uh:21,v:"Lincoln Fin., Philly"},
  {grp:"K",t1:"Colombia",      t2:"Portugal",       um:6,ud:27,uh:23,un:30,v:"Hard Rock, Miami"},
  {grp:"K",t1:"DR Congo",      t2:"Uzbekistan",     um:6,ud:27,uh:23,un:30,v:"Mercedes-Benz, Atlanta"},
  {grp:"J",t1:"Algeria",       t2:"Austria",        um:6,ud:28,uh:2, v:"Arrowhead, Kansas City"},
  {grp:"J",t1:"Jordan",        t2:"Argentina",      um:6,ud:28,uh:2, v:"AT&T, Dallas"},
  // ── ROUND OF 32 ────────────────────────────────────────────
  {grp:"R32",t1:"2nd A",       t2:"2nd B",          um:6,ud:28,uh:19,v:"SoFi, Inglewood"},
  {grp:"R32",t1:"1st C",       t2:"2nd F",          um:6,ud:29,uh:17,v:"NRG, Houston"},
  {grp:"R32",t1:"1st E",       t2:"Best 3rd",       um:6,ud:29,uh:20,un:30,v:"Gillette, Foxborough"},
  {grp:"R32",t1:"1st F",       t2:"2nd C",          um:6,ud:30,uh:1, v:"BBVA, Monterrey"},
  {grp:"R32",t1:"2nd E",       t2:"2nd I",          um:6,ud:30,uh:17,v:"AT&T, Dallas"},
  {grp:"R32",t1:"1st I",       t2:"Best 3rd",       um:6,ud:30,uh:21,v:"MetLife, NJ"},
  {grp:"R32",t1:"1st A",       t2:"Best 3rd",       um:7,ud:1, uh:1, v:"Azteca, Mexico City"},
  {grp:"R32",t1:"1st L",       t2:"Best 3rd",       um:7,ud:1, uh:16,v:"Mercedes-Benz, Atlanta"},
  {grp:"R32",t1:"1st G",       t2:"Best 3rd",       um:7,ud:1, uh:20,v:"Lumen Field, Seattle"},
  {grp:"R32",t1:"1st D",       t2:"Best 3rd",       um:7,ud:2, uh:0, v:"Levi's, Santa Clara"},
  {grp:"R32",t1:"1st H",       t2:"2nd J",          um:7,ud:2, uh:19,v:"SoFi, Inglewood"},
  {grp:"R32",t1:"2nd K",       t2:"2nd L",          um:7,ud:2, uh:23,v:"BMO Field, Toronto"},
  {grp:"R32",t1:"1st B",       t2:"Best 3rd",       um:7,ud:3, uh:3, v:"BC Place, Vancouver"},
  {grp:"R32",t1:"2nd D",       t2:"2nd G",          um:7,ud:3, uh:18,v:"AT&T, Dallas"},
  {grp:"R32",t1:"1st J",       t2:"2nd H",          um:7,ud:3, uh:22,v:"Hard Rock, Miami"},
  {grp:"R32",t1:"1st K",       t2:"Best 3rd",       um:7,ud:4, uh:1, un:30,v:"Arrowhead, Kansas City"},
  // ── ROUND OF 16 ────────────────────────────────────────────
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:4, uh:17,v:"NRG, Houston"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:4, uh:21,v:"Lincoln Fin., Philly"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:5, uh:20,v:"MetLife, NJ"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:6, uh:0, v:"Azteca, Mexico City"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:6, uh:19,v:"AT&T, Dallas"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:7, uh:0, v:"Lumen Field, Seattle"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:7, uh:16,v:"Mercedes-Benz, Atlanta"},
  {grp:"R16",t1:"TBD",         t2:"TBD",            um:7,ud:7, uh:20,v:"BC Place, Vancouver"},
  // ── QUARTERFINALS ──────────────────────────────────────────
  {grp:"QF", t1:"TBD",         t2:"TBD",            um:7,ud:9, uh:20,v:"Gillette, Foxborough"},
  {grp:"QF", t1:"TBD",         t2:"TBD",            um:7,ud:10,uh:19,v:"SoFi, Inglewood"},
  {grp:"QF", t1:"TBD",         t2:"TBD",            um:7,ud:11,uh:21,v:"Hard Rock, Miami"},
  {grp:"QF", t1:"TBD",         t2:"TBD",            um:7,ud:12,uh:1, v:"Arrowhead, Kansas City"},
  // ── SEMIFINALS ─────────────────────────────────────────────
  {grp:"SF", t1:"TBD",         t2:"TBD",            um:7,ud:14,uh:19,v:"AT&T, Dallas"},
  {grp:"SF", t1:"TBD",         t2:"TBD",            um:7,ud:15,uh:19,v:"Mercedes-Benz, Atlanta"},
  // ── THIRD PLACE ────────────────────────────────────────────
  {grp:"3RD",t1:"TBD",         t2:"TBD",            um:7,ud:18,uh:21,v:"Hard Rock, Miami"},
  // ── FINAL ──────────────────────────────────────────────────
  {grp:"FIN",t1:"TBD",         t2:"TBD",            um:7,ud:19,uh:19,v:"MetLife, NJ"},
]

// ── SHARED HELPERS ────────────────────────────────────────────
// All time logic is UTC-based — no hardcoded timezone offsets.

// Returns a Date object for the UTC kickoff moment
function kickoffDate(g) {
  return new Date(Date.UTC(2026, g.um-1, g.ud, g.uh, g.un||0))
}

// Local date key (m*100+d) for grouping games by day in the device's timezone
function localDayKey(g) {
  const s=kickoffDate(g).toLocaleDateString('en-US',{month:'numeric',day:'numeric'})
  const [m,d]=s.split('/').map(Number); return m*100+d
}

// Kickoff time formatted in the device's local timezone
function displayTime(g) {
  return kickoffDate(g).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})
}

// Returns local day key for right now
function getTodayKey() {
  const s=new Date().toLocaleDateString('en-US',{month:'numeric',day:'numeric'})
  const [m,d]=s.split('/').map(Number); return m*100+d
}

// Human-readable date label from a day key
function keyToLabel(key) {
  const m=Math.floor(key/100),d=key%100
  const mo=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const wd=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  return wd[new Date(2026,m-1,d).getDay()]+", "+mo[m]+" "+d
}

// Stage label for badge
function badgeLabel(grp) {
  return {R32:"Rd 32",R16:"Rd 16",QF:"QF",SF:"SF","3RD":"3rd Pl","FIN":"FINAL"}[grp]||("Grp "+grp)
}

// Normalize ESPN team names → canonical for matching
function normTeam(name) {
  if(!name)return''
  const map={
    'korea republic':'south korea','czech republic':'czechia',
    'bosnia-herzegovina':'bosnia','bosnia and herzegovina':'bosnia','bosnia & herz.':'bosnia',
    'turkey':'turkiye','türkiye':'turkiye',
    "cote d'ivoire":'ivory coast',"côte d'ivoire":'ivory coast','ivory coast':'ivory coast',
    'united states':'usa','dr congo':'dr congo','congo dr':'dr congo',
    'dem. rep. congo':'dr congo','democratic republic of congo':'dr congo',
    'curacao':'curacao','curaçao':'curacao',
  }
  const lower=name.toLowerCase().trim(); return map[lower]||lower
}

// ── FLAGS + DISPLAY HELPERS ───────────────────────────────────
const WF = {
  'Mexico':'🇲🇽','South Africa':'🇿🇦','South Korea':'🇰🇷','Czechia':'🇨🇿',
  'Canada':'🇨🇦','Bosnia & Herz.':'🇧🇦','Qatar':'🇶🇦','Switzerland':'🇨🇭',
  'Brazil':'🇧🇷','Morocco':'🇲🇦','Haiti':'🇭🇹','Scotland':'🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'Australia':'🇦🇺','Türkiye':'🇹🇷','Germany':'🇩🇪','Curaçao':'🇨🇼',
  'Netherlands':'🇳🇱','Japan':'🇯🇵','Ivory Coast':'🇨🇮','Ecuador':'🇪🇨',
  'Sweden':'🇸🇪','Tunisia':'🇹🇳','Spain':'🇪🇸','Cape Verde':'🇨🇻',
  'Belgium':'🇧🇪','Egypt':'🇪🇬','Saudi Arabia':'🇸🇦','Uruguay':'🇺🇾',
  'Iran':'🇮🇷','New Zealand':'🇳🇿','France':'🇫🇷','Senegal':'🇸🇳',
  'Iraq':'🇮🇶','Norway':'🇳🇴','Argentina':'🇦🇷','Algeria':'🇩🇿',
  'Austria':'🇦🇹','Jordan':'🇯🇴','Portugal':'🇵🇹','DR Congo':'🇨🇩',
  'England':'🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croatia':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦',
  'Uzbekistan':'🇺🇿','Colombia':'🇨🇴','USA':'🇺🇸','Paraguay':'🇵🇾',
}
const wf = name => WF[name] || ''
const shortTeam = n => ({'South Africa':'S. Africa','South Korea':'S. Korea','Bosnia & Herz.':'Bosnia','New Zealand':'N. Zealand','Cape Verde':'C. Verde','Saudi Arabia':'S. Arabia'}[n]||n)
const shortBadge = g => ({R32:'R32',R16:'R16',QF:'QF',SF:'SF','3RD':'3P','FIN':'🏆'}[g]||g)

// Reverse map: normalized name → our canonical display spelling.
// Lets us turn an ESPN name ("Turkey", "Bosnia and Herzegovina") back into
// the exact spelling our flag/shorten lookups expect ("Türkiye", "Bosnia & Herz.").
const CANON = {}
Object.keys(WF).forEach(k => { CANON[normTeam(k)] = k })

// A team slot is a placeholder if it's not a real country (real ones are all in WF).
// e.g. "1st C", "2nd F", "Best 3rd", "TBD" → true
const isPlaceholderTeam = name => !WF[name]

// Fill in knockout team names from ESPN's bracket once it's known.
// Matches each placeholder slot to an ESPN fixture by kickoff time (±2h),
// disambiguating simultaneous kickoffs by city rather than stadium name —
// stadiums get sponsor-renamed mid-tournament (e.g. Azteca → Estadio
// Banorte) but the host city never changes. Mutates `games` in place.
function resolveBracket(games, fixtures) {
  if(!fixtures||!fixtures.length) return
  for(const g of games){
    if(!isPlaceholderTeam(g.t1) && !isPlaceholderTeam(g.t2)) continue
    const ko=kickoffDate(g).getTime()
    const cands=fixtures.filter(f=>Math.abs(f.t-ko)<7200000)
    let match=null
    if(cands.length===1){ match=cands[0] }
    else if(cands.length>1){
      // Our `v` field is "Venue, City" — take the city half
      const cityTok=((g.v.split(',')[1]||g.v.split(',')[0]||'').toLowerCase().trim())
      match=cands.find(f=>f.city&&cityTok&&f.city.toLowerCase().indexOf(cityTok)>=0)||cands[0]
    }
    if(match){ g.t1=match.t1; g.t2=match.t2 }
  }
}

// ── FETCH SCORES + BRACKET FROM ESPN ──────────────────────────
// ESPN's scoreboard endpoint isn't reliable with very wide multi-week
// date ranges — it can silently cap or drop events instead of erroring,
// which is why knockout fixtures were failing to resolve. The fix is to
// always query small, targeted windows instead of one huge range.

// Mutates the shared scoreMap/fixtures accumulators so multiple window
// fetches can be merged together.
function processEvents(events, scoreMap, fixtures) {
  for(const ev of(events||[])){
    const comp=(ev.competitions||[])[0]; if(!comp)continue
    const comps=comp.competitors||[]; if(comps.length<2)continue
    const nm1=comps[0].team.displayName||comps[0].team.name||''
    const nm2=comps[1].team.displayName||comps[1].team.name||''

    // Bracket fixture — only when both teams are real (not "TBD").
    // City (not stadium name) is captured for disambiguation — stadium
    // sponsor names can change mid-tournament, city names don't.
    const t=Date.parse(ev.date||comp.date||'')
    const city=(comp.venue&&comp.venue.address&&comp.venue.address.city)||''
    const c1=CANON[normTeam(nm1)], c2=CANON[normTeam(nm2)]
    if(t&&c1&&c2){ fixtures.push({t,t1:c1,t2:c2,city}) }

    // Score — only when live or finished
    const statusObj=comp.status||ev.status||{}
    const type=statusObj.type||{}
    const done=type.completed===true
    const live=type.name==='STATUS_IN_PROGRESS'||type.state==='in'
    if(done||live){
      const scores={},normNames=[]
      let winner=null, shootout=null
      for(const c of comps){
        const n=normTeam(c.team.displayName||c.team.name||'')
        scores[n]=c.score||'0'; normNames.push(n)
        // ESPN flags the actual winner even when reg/ET score is tied
        // (i.e. decided on penalties) — this is the reliable signal.
        if(c.winner===true) winner=n
        // Shootout score isn't consistently keyed across ESPN's soccer
        // payloads; try the couple of shapes it's been seen under.
        const so=c.shootoutScore ?? c.score?.shootout ?? null
        if(so!=null){ shootout=shootout||{}; shootout[n]=so }
      }
      normNames.sort()
      // Match clock for live games — ESPN's shortDetail is purpose-built
      // for this ("63'", "HT", "45+2'"); displayClock is the fallback.
      const clock = live ? (type.shortDetail||statusObj.displayClock||null) : null
      scoreMap[normNames.join('|')]={scores,done,live,winner,shootout,clock}
    }
  }
}

// Single small, targeted fetch — e.g. "20260630-20260703".
// Returns fresh {scoreMap, fixtures} for just that window.
async function fetchESPNWindow(datesParam) {
  const scoreMap={}, fixtures=[]
  try {
    const url="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates="+datesParam+"&limit=100"
    const req=new Request(url); req.timeoutInterval=7
    const data=await req.loadJSON()
    processEvents(data.events, scoreMap, fixtures)
  } catch(e){ console.error("ESPN "+datesParam+": "+e.message) }
  return {scoreMap, fixtures}
}

// Fetch several windows and merge — used when full-tournament coverage
// is needed (the day browser, where any date can be navigated to).
async function fetchESPNMulti(windows) {
  const scoreMap={}, fixtures=[]
  for(const win of windows){
    const r=await fetchESPNWindow(win)
    Object.assign(scoreMap, r.scoreMap)
    fixtures.push(...r.fixtures)
  }
  return {scoreMap, fixtures}
}

// The tournament's distinct phases, as small date windows. Querying these
// separately (instead of one 20260611-20260719 sweep) avoids the range
// being too wide for ESPN to return in full.
const PHASE_WINDOWS = [
  '20260611-20260627', // Group Stage
  '20260628-20260703', // Round of 32
  '20260704-20260707', // Round of 16
  '20260709-20260712', // Quarterfinals
  '20260714-20260715', // Semifinals
  '20260718-20260719', // 3rd Place + Final
]
async function fetchESPNFull() { return fetchESPNMulti(PHASE_WINDOWS) }

// Plain query, no dates param — ESPN's endpoints default this to "today's"
// slate. This is a safety net alongside the explicit date windows: it's
// unconfirmed whether a dates-range query reflects real team names for a
// knockout game that hasn't kicked off yet (vs. one already live/finished),
// so today's game gets checked both ways rather than relying on one path.
async function fetchESPNCurrent() {
  const scoreMap={}, fixtures=[]
  try {
    const req=new Request("https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard")
    req.timeoutInterval=6
    const data=await req.loadJSON()
    processEvents(data.events, scoreMap, fixtures)
  } catch(e){ console.error("ESPN current: "+e.message) }
  return {scoreMap, fixtures}
}

// Format a Date as UTC YYYYMMDD
function ymdUTC(d) {
  const y=d.getUTCFullYear(), m=String(d.getUTCMonth()+1).padStart(2,'0'), dd=String(d.getUTCDate()).padStart(2,'0')
  return ''+y+m+dd
}

// Build the minimal "start-end" window covering a specific set of games,
// padded a day on each side for timezone safety. Used by the widget,
// which only ever needs to resolve/score the handful of games it's about
// to display — not the whole tournament.
function windowForGames(games) {
  if(!games.length) return null
  let min=null, max=null
  for(const g of games){
    const t=kickoffDate(g).getTime()
    if(min===null||t<min) min=t
    if(max===null||t>max) max=t
  }
  const day=86400000
  return ymdUTC(new Date(min-day))+'-'+ymdUTC(new Date(max+day))
}

// Score lookup for widget context.
// Adds `pens` (true if decided on penalties) and `wonBy` (1 or 2, which
// team won) so the UI can indicate a shootout instead of showing a flat tie.
function getWidgetScore(scoreMap,g) {
  const n1=normTeam(g.t1),n2=normTeam(g.t2)
  const key=[n1,n2].sort().join('|')
  const sc=scoreMap[key]; if(!sc)return null
  const s1=sc.scores[n1]||'?', s2=sc.scores[n2]||'?'
  const tied = s1===s2
  const wonBy = sc.winner===n1?1:sc.winner===n2?2:null
  const pens = !!(sc.done && tied && wonBy)
  const so1 = sc.shootout&&sc.shootout[n1], so2 = sc.shootout&&sc.shootout[n2]
  return{s1,s2,done:sc.done,live:sc.live,pens,wonBy,so1,so2,clock:sc.clock}
}

// ── HOME SCREEN WIDGET ────────────────────────────────────────
async function buildWidget() {
  const size=config.widgetFamily||"medium"
  const maxRows={small:2,medium:4,large:8}[size]||4
  const isSmall=size==="small"
  const todayKey=getTodayKey()
  const now=Date.now()

  // Determine which games to show FIRST, before touching the network —
  // placeholder team names don't affect date filtering, since kickoff
  // times (um/ud/uh) are fixed regardless of who's playing.
  let games=GAMES.filter(g=>localDayKey(g)===todayKey)
  let label="Today · "+keyToLabel(todayKey)

  if(games.length===0){
    // No games today — find next day with games
    const future=GAMES.filter(g=>kickoffDate(g).getTime()>now-7200000)
    future.sort((a,b)=>kickoffDate(a)-kickoffDate(b))
    if(future.length>0){
      const nxtKey=localDayKey(future[0])
      games=GAMES.filter(g=>localDayKey(g)===nxtKey)
      label="Next: "+keyToLabel(nxtKey)
    } else { label="Tournament complete 🏆" }
  }

  // Fetch the narrow window covering these specific games, AND the plain
  // "current" endpoint as a safety net (see fetchESPNCurrent above) — today's
  // game gets checked both ways since it's unconfirmed which one ESPN
  // reliably populates with real team names before kickoff.
  const win=windowForGames(games)
  const winResult=win?await fetchESPNWindow(win):{scoreMap:{},fixtures:[]}
  const curResult=await fetchESPNCurrent()
  const scoreMap={...winResult.scoreMap,...curResult.scoreMap}
  const fixtures=[...winResult.fixtures,...curResult.fixtures]
  resolveBracket(games, fixtures)   // fill in knockout names if known

  const w=new ListWidget()
  w.backgroundColor=C.bg
  w.setPadding(14,16,12,16)
  w.url="scriptable:///run?scriptName="+encodeURIComponent(Script.name())

  // ── Header ──
  if(isSmall){
    const t=w.addText("⚽ WC 2026")
    t.textColor=C.blue; t.font=Font.boldSystemFont(11); t.lineLimit=1
  } else {
    const tt=w.addText("⚽  WORLD CUP 2026")
    tt.textColor=C.blue; tt.font=Font.boldSystemFont(11); tt.lineLimit=1
    const st=w.addText(label)
    st.textColor=C.dim; st.font=Font.systemFont(9); st.lineLimit=1
  }
  w.addSpacer(8)

  // ── Game rows ──
  if(games.length===0){
    w.addSpacer()
    const t=w.addText("No upcoming matches")
    t.textColor=C.dim; t.font=Font.systemFont(12)
    w.addSpacer()
  } else {
    const TW=84, CW=64, SH=18
    const rows=games.slice(0,maxRows)

    for(let i=0;i<rows.length;i++){
      const g=rows[i]; if(i>0)w.addSpacer(4)
      const ko=kickoffDate(g).getTime()
      const isGO=now>ko+7200000       // game finished (>2h after KO)
      const isGL=now>=ko&&now<ko+7200000  // game live
      const sc=getWidgetScore(scoreMap,g)
      const f1=wf(g.t1),f2=wf(g.t2)
      const sn1=shortTeam(g.t1),sn2=shortTeam(g.t2)
      const isUSA=!!g.usa
      const ns=isSmall?10:11, fs=isSmall?11:12

      const row=w.addStack(); row.layoutHorizontally(); row.centerAlignContent()
      if(isUSA){ row.backgroundColor=C.usaBg; row.cornerRadius=6; row.setPadding(0,6,0,6) }

      if(!isSmall){
        const bst=row.addStack(); bst.cornerRadius=3; bst.setPadding(1,4,1,4)
        bst.backgroundColor=isUSA?new Color("#1a1000"):isGL?new Color("#091624"):C.muted
        const bl=bst.addText(shortBadge(g.grp)); bl.font=Font.boldSystemFont(7)
        bl.textColor=isUSA?C.usa:isGL?C.blue:C.dim
        row.addSpacer(4)
      }

      // Team 1: fixed width, left-aligned. Winner (on penalties) gets full
      // brightness even if the game is over; loser dims as usual.
      const t1s=row.addStack()
      if(!isSmall) t1s.size=new Size(TW,SH)
      t1s.layoutHorizontally(); t1s.centerAlignContent()
      if(f1){const fl=t1s.addText(f1);fl.font=Font.systemFont(fs);t1s.addSpacer(3)}
      const n1=t1s.addText(sn1); n1.lineLimit=1; n1.minimumScaleFactor=0.6
      n1.font=sc&&sc.pens&&sc.wonBy===1?Font.boldSystemFont(ns):Font.semiboldSystemFont(ns)
      n1.textColor=isGO&&!sc?C.dim:isUSA?C.usa:(sc&&sc.pens&&sc.wonBy===2?C.dim:C.text)

      row.addSpacer()

      // Center: fixed width, internal flex spacers center content horizontally.
      // Kept as a single line (score + optional "PK" tag) so row height
      // stays identical across every row, regardless of penalty shootouts.
      const ctr=row.addStack()
      if(!isSmall) ctr.size=new Size(CW,SH)
      ctr.layoutHorizontally(); ctr.centerAlignContent()
      ctr.addSpacer()
      if(sc&&(sc.done||sc.live)){
        const sv=ctr.addText(sc.s1+"–"+sc.s2)
        sv.font=Font.boldSystemFont(isSmall?12:13)
        sv.textColor=sc.live?C.blue:C.text
        if(sc.pens && !isSmall){
          ctr.addSpacer(2)
          const pk=ctr.addText("PK"); pk.font=Font.boldSystemFont(6); pk.textColor=C.dim
        } else if(sc.live && sc.clock && !isSmall){
          // Match clock ("63'", "HT") next to the live score
          ctr.addSpacer(2)
          const cl=ctr.addText(sc.clock); cl.font=Font.boldSystemFont(6); cl.textColor=C.blue
        }
      } else if(isGL){
        const dot=ctr.addText("●"); dot.font=Font.systemFont(9); dot.textColor=C.blue
      } else if(isGO){
        const ftl=ctr.addText("FT"); ftl.font=Font.systemFont(9); ftl.textColor=C.dim
      } else {
        const tm=ctr.addText(displayTime(g))
        tm.font=Font.boldSystemFont(isSmall?10:11); tm.textColor=C.blue
      }
      ctr.addSpacer()

      row.addSpacer()

      // Team 2: fixed width, right-aligned. Same winner-highlight logic as team 1.
      const t2s=row.addStack()
      if(!isSmall) t2s.size=new Size(TW,SH)
      t2s.layoutHorizontally(); t2s.centerAlignContent()
      t2s.addSpacer()
      const n2=t2s.addText(sn2); n2.lineLimit=1; n2.minimumScaleFactor=0.6
      n2.font=sc&&sc.pens&&sc.wonBy===2?Font.boldSystemFont(ns):Font.semiboldSystemFont(ns)
      n2.textColor=isGO&&!sc?C.dim:isUSA?C.usa:(sc&&sc.pens&&sc.wonBy===1?C.dim:C.text)
      if(f2){t2s.addSpacer(3);const fl2=t2s.addText(f2);fl2.font=Font.systemFont(fs)}
    }

    if(games.length>maxRows){
      w.addSpacer(4)
      const mRow=w.addStack(); mRow.layoutHorizontally()
      mRow.addSpacer()
      const m2=mRow.addText("+"+(games.length-maxRows)+" more today")
      m2.textColor=C.dim; m2.font=Font.systemFont(8)
      mRow.addSpacer()
    }
  }

  // Footer — centered
  w.addSpacer()
  const ftRow=w.addStack(); ftRow.layoutHorizontally()
  ftRow.addSpacer()
  const ft=ftRow.addText("All times local  ·  Tap to browse")
  ft.textColor=new Color("#3a5068"); ft.font=Font.systemFont(8)
  ftRow.addSpacer()

  const nx=new Date(); nx.setMinutes(nx.getMinutes()+5); w.refreshAfterDate=nx
  return w
}

// ── DAY BROWSER ───────────────────────────────────────────────
function buildBrowserHTML(scoresJSON) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
body{background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,sans-serif;min-height:100vh;padding-bottom:40px;overflow-x:hidden}
.hdr{position:sticky;top:0;z-index:10;background:rgba(0,0,0,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #0d1a2e;padding:14px 16px 12px}
.wc{font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#3b9eff;margin-bottom:12px}
.nav{display:flex;align-items:center;gap:10px}
.arr{background:#0a1628;border:1px solid #0d1a2e;color:#3b9eff;width:46px;height:46px;border-radius:14px;font-size:22px;cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:transform .12s cubic-bezier(.34,1.5,.64,1),background .1s;-webkit-user-select:none}
.arr:active{transform:scale(0.86);background:#132034}
.arr:disabled{opacity:.18;pointer-events:none}
.day-info{flex:1;text-align:center}
.day-name{font-size:18px;font-weight:700;letter-spacing:-.3px}
.day-meta{font-size:11px;color:#7a90a8;margin-top:3px}
.today-chip{display:inline-block;background:#3b9eff;color:#000;font-size:9px;font-weight:900;padding:2px 8px;border-radius:20px;letter-spacing:1px;text-transform:uppercase;vertical-align:middle;margin-left:7px}
.hint{text-align:center;font-size:10px;color:#4a6070;padding:7px 0 0;letter-spacing:.5px}
.list{padding:10px 14px;transition:opacity .15s}
.list.fading{opacity:0}
.card{border-radius:16px;padding:13px 14px 11px;margin-bottom:10px;border:1px solid #0d1520}
.card-up  {background:#0c0c18}
.card-live{background:#040d1a;border-color:#142240;box-shadow:0 0 20px rgba(59,158,255,.1)}
.card-ft  {background:#080810;opacity:.75}
.card-usa {background:#0f0900;border-color:#2a1c00}
.card-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px}
.badge{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.5px;padding:3px 8px;border-radius:6px;background:#0a0a18;color:#7a90a8}
.badge-live{background:#0a1628;color:#3b9eff}
.badge-usa {background:#1a1000;color:#f0a500}
.status-up  {font-size:14px;font-weight:700;color:#3b9eff}
.status-ft  {font-size:10px;font-weight:700;color:#7a90a8;letter-spacing:1.5px}
.status-live{display:flex;align-items:center;gap:5px;font-size:10px;font-weight:800;color:#3b9eff;letter-spacing:1px}
.dot-live{width:7px;height:7px;background:#3b9eff;border-radius:50%;animation:glow 1.4s ease-in-out infinite;flex-shrink:0}
@keyframes glow{0%,100%{opacity:1;box-shadow:0 0 0 0 rgba(59,158,255,.6)}50%{opacity:.6;box-shadow:0 0 0 5px rgba(59,158,255,0)}}
.matchup{display:flex;align-items:center;gap:8px;margin-bottom:9px}
.team-l,.team-r{flex:1;min-width:0;display:flex;align-items:center;gap:5px}
.team-r{flex-direction:row-reverse;text-align:right}
.flag{font-size:22px;line-height:1;flex-shrink:0}
.tname{font-size:13px;font-weight:600;color:#d8e8ff;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tname-usa{color:#f0a500}
.tname-ft {color:#5a7285}
.tname-winner{color:#e8f0ff;font-weight:800}
.score-ctr{flex-shrink:0;min-width:64px;text-align:center}
.score-val{font-size:26px;font-weight:800;color:#fff;letter-spacing:1px;line-height:1}
.score-val.live{color:#3b9eff}
.score-val.faded{opacity:.45}
.score-dash{font-size:20px;font-weight:300;opacity:.4;margin:0 1px}
.pk-label{font-size:9px;font-weight:800;color:#7a90a8;letter-spacing:1px;margin-top:3px;text-align:center}
.pk-sub{font-size:9px;color:#4a6070;font-weight:600;margin-top:1px;text-align:center}
.vs-label{font-size:12px;font-weight:600;color:#4a6070;letter-spacing:1px}
@keyframes fadeUp{from{opacity:0;transform:translateY(7px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
.animate-in{animation:fadeUp .5s cubic-bezier(.34,1.5,.64,1) both}
.venue{font-size:10px;color:#4a6070;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.venue-live{color:#4a7090}
.empty{text-align:center;color:#4a6070;padding:70px 20px;font-size:15px}
.foot {text-align:center;color:#3a5068;font-size:10px;padding:16px 0 8px}
</style>
</head>
<body>
<div class="hdr">
  <div class="wc">⚽ &nbsp;FIFA World Cup 2026</div>
  <div class="nav">
    <button class="arr" id="prev" onclick="nav(-1)">&#x2039;</button>
    <div class="day-info">
      <div class="day-name" id="dayName"></div>
      <div class="day-meta" id="dayMeta"></div>
    </div>
    <button class="arr" id="next" onclick="nav(1)">&#x203a;</button>
  </div>
</div>
<div class="hint">Swipe left or right to change day</div>
<div class="list" id="list"></div>
<div class="foot">Kickoff times in your local timezone &nbsp;·&nbsp; Scores via ESPN</div>

<script>
var GAMES  = ${JSON.stringify(GAMES)};
var SCORES = ${scoresJSON};

var FLAGS = {
  'Mexico':'🇲🇽','South Africa':'🇿🇦','South Korea':'🇰🇷','Czechia':'🇨🇿',
  'Canada':'🇨🇦','Bosnia & Herz.':'🇧🇦','Qatar':'🇶🇦','Switzerland':'🇨🇭',
  'Brazil':'🇧🇷','Morocco':'🇲🇦','Haiti':'🇭🇹','Scotland':'🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
  'Australia':'🇦🇺','Türkiye':'🇹🇷','Germany':'🇩🇪','Curaçao':'🇨🇼',
  'Netherlands':'🇳🇱','Japan':'🇯🇵','Ivory Coast':'🇨🇮','Ecuador':'🇪🇨',
  'Sweden':'🇸🇪','Tunisia':'🇹🇳','Spain':'🇪🇸','Cape Verde':'🇨🇻',
  'Belgium':'🇧🇪','Egypt':'🇪🇬','Saudi Arabia':'🇸🇦','Uruguay':'🇺🇾',
  'Iran':'🇮🇷','New Zealand':'🇳🇿','France':'🇫🇷','Senegal':'🇸🇳',
  'Iraq':'🇮🇶','Norway':'🇳🇴','Argentina':'🇦🇷','Algeria':'🇩🇿',
  'Austria':'🇦🇹','Jordan':'🇯🇴','Portugal':'🇵🇹','DR Congo':'🇨🇩',
  'England':'🏴\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}',
  'Croatia':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦',
  'Uzbekistan':'🇺🇿','Colombia':'🇨🇴','USA':'🇺🇸','Paraguay':'🇵🇾',
};
var MONTHS=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var WDAYS =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var STAGE_LABELS={R32:"Round of 32",R16:"Round of 16",QF:"Quarterfinals",SF:"Semifinals","3RD":"Third Place","FIN":"Final"};

// UTC-based helpers — work in any timezone
function kickoffDate(g){ return new Date(Date.UTC(2026,g.um-1,g.ud,g.uh,g.un||0)); }
function localDayKey(g){
  var s=kickoffDate(g).toLocaleDateString('en-US',{month:'numeric',day:'numeric'});
  var p=s.split('/'); return parseInt(p[0])*100+parseInt(p[1]);
}
function getTodayKey(){
  var s=new Date().toLocaleDateString('en-US',{month:'numeric',day:'numeric'});
  var p=s.split('/'); return parseInt(p[0])*100+parseInt(p[1]);
}
function displayTime(g){
  return kickoffDate(g).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true});
}
function gameIsOver(g){ return Date.now()>kickoffDate(g).getTime()+7200000; }
function gameIsLive(g){ var el=Date.now()-kickoffDate(g).getTime(); return el>=0&&el<7200000; }

function normTeam(name){
  if(!name)return'';
  var map={'korea republic':'south korea','czech republic':'czechia','bosnia-herzegovina':'bosnia',
    'bosnia and herzegovina':'bosnia','bosnia & herz.':'bosnia','turkey':'turkiye','türkiye':'turkiye',
    "cote d'ivoire":'ivory coast',"côte d'ivoire":'ivory coast','ivory coast':'ivory coast',
    'united states':'usa','dr congo':'dr congo','congo dr':'dr congo','dem. rep. congo':'dr congo',
    'democratic republic of congo':'dr congo','curacao':'curacao','curaçao':'curacao'};
  var l=(name||'').toLowerCase().trim(); return map[l]||l;
}
function getScore(g){
  var n1=normTeam(g.t1),n2=normTeam(g.t2);
  var key=[n1,n2].sort().join('|');
  var sc=SCORES[key]; if(!sc)return null;
  var s1=sc.scores[n1]||'?', s2=sc.scores[n2]||'?';
  var tied = s1===s2;
  var wonBy = sc.winner===n1?1:sc.winner===n2?2:null;
  var pens = !!(sc.done && tied && wonBy);
  var so1 = sc.shootout&&sc.shootout[n1], so2 = sc.shootout&&sc.shootout[n2];
  return{s1:s1,s2:s2,done:sc.done,live:sc.live,pens:pens,wonBy:wonBy,so1:so1,so2:so2,clock:sc.clock};
}
function badgeLabel(grp){
  var m={R32:'Rd 32',R16:'Rd 16',QF:'QF',SF:'SF','3RD':'3rd Pl','FIN':'FINAL'};
  return m[grp]||('Grp '+grp);
}
function flag(name){ return FLAGS[name]||''; }

// Build day list from local day keys (timezone-aware)
var dayKeys=[],seen={};
for(var i=0;i<GAMES.length;i++){
  var k=localDayKey(GAMES[i]);
  if(!seen[k]){seen[k]=true;dayKeys.push(k);}
}
dayKeys.sort(function(a,b){return a-b;});
var DAYS=dayKeys.map(function(k){return{key:k,m:Math.floor(k/100),d:k%100};});

function dateLabel(key){
  var m=Math.floor(key/100),d=key%100;
  return WDAYS[new Date(2026,m-1,d).getDay()]+', '+MONTHS[m]+' '+d;
}

function startIdx(){
  var today=getTodayKey();
  for(var i=0;i<DAYS.length;i++){if(DAYS[i].key>=today)return i;}
  return DAYS.length-1;
}
var idx=startIdx();

function nav(dir){
  var list=document.getElementById('list');
  list.classList.add('fading');
  setTimeout(function(){
    idx=Math.max(0,Math.min(DAYS.length-1,idx+dir));
    render();
    list.classList.remove('fading');
  },130);
}

var _sx=0,_sy=0;
document.addEventListener('touchstart',function(e){_sx=e.touches[0].clientX;_sy=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchend',function(e){
  var dx=e.changedTouches[0].clientX-_sx;
  var dy=Math.abs(e.changedTouches[0].clientY-_sy);
  if(Math.abs(dx)>48&&dy<35){nav(dx<0?1:-1);}
},{passive:true});

function makeCard(g,isToday,isPast){
  var isOver=isPast||(isToday&&gameIsOver(g));
  var isLive=isToday&&gameIsLive(g);
  var sc=getScore(g);
  var isUSA=!!g.usa;
  var cc='card'+(isUSA?' card-usa':isLive?' card-live':isOver?' card-ft':' card-up');
  var bc='badge'+(isUSA?' badge-usa':isLive?' badge-live':'');

  // Team name class: winner-on-penalties gets bright/bold treatment even
  // though the game is "over"; the penalty loser dims same as a normal loss.
  var tc1='tname'+(isUSA?' tname-usa':sc&&sc.pens?(sc.wonBy===1?' tname-winner':' tname-ft'):isOver?' tname-ft':'');
  var tc2='tname'+(isUSA?' tname-usa':sc&&sc.pens?(sc.wonBy===2?' tname-winner':' tname-ft'):isOver?' tname-ft':'');

  var statusH;
  if(isLive){
    var liveText=(sc&&sc.clock)?sc.clock:'LIVE';
    statusH='<div class="status-live"><span class="dot-live"></span>'+liveText+'</div>';
  }
  else if(isOver){statusH='<div class="status-ft">'+(sc&&sc.pens?'FT (PENS)':'FT')+'</div>';}
  else{statusH='<div class="status-up">'+displayTime(g)+'</div>';}
  var header='<div class="card-top"><span class="'+bc+'">'+badgeLabel(g.grp)+'</span>'+statusH+'</div>';

  var f1=flag(g.t1),f2=flag(g.t2);
  var t1H='<div class="team-l">'+(f1?'<span class="flag">'+f1+'</span>':'')+'<span class="'+tc1+'">'+g.t1+'</span></div>';
  var t2H='<div class="team-r"><span class="'+tc2+'">'+g.t2+'</span>'+(f2?'<span class="flag">'+f2+'</span>':'')+'</div>';

  var ctrH;
  if(sc&&(sc.done||sc.live)){
    var sv='score-val animate-in'+(sc.live?' live':'');
    var scoreLine='<div class="'+sv+'">'+sc.s1+'<span class="score-dash">&ndash;</span>'+sc.s2+'</div>';
    var pkLine='';
    if(sc.pens){
      // Show the shootout score if ESPN provided one, otherwise just flag it as pens
      pkLine = (sc.so1!=null&&sc.so2!=null)
        ? '<div class="pk-sub">('+sc.so1+'&ndash;'+sc.so2+' pens)</div>'
        : '<div class="pk-label">PENS</div>';
    }
    ctrH='<div class="score-ctr">'+scoreLine+pkLine+'</div>';
  } else {
    ctrH='<div class="score-ctr"><div class="vs-label">'+(isOver?'&ndash;':'vs')+'</div></div>';
  }

  var vc=isLive?'venue venue-live':'venue';
  return'<div class="'+cc+'">'+header
    +'<div class="matchup">'+t1H+ctrH+t2H+'</div>'
    +'<div class="'+vc+'">'+g.v+'</div></div>';
}

function render(){
  var day=DAYS[idx];
  var todayKey=getTodayKey();
  var isToday=(day.key===todayKey);
  var isPast=(day.key<todayKey);

  var nameH=dateLabel(day.key);
  if(isToday)nameH+=' <span class="today-chip">TODAY</span>';
  document.getElementById('dayName').innerHTML=nameH;

  var dayGames=GAMES.filter(function(g){return localDayKey(g)===day.key;});
  var cnt=dayGames.length===1?'1 match':dayGames.length+' matches';
  var grp=dayGames.length>0?dayGames[0].grp:'';
  var stg=STAGE_LABELS[grp]?(' · '+STAGE_LABELS[grp]):'';
  document.getElementById('dayMeta').textContent=cnt+stg;

  document.getElementById('prev').disabled=(idx===0);
  document.getElementById('next').disabled=(idx===DAYS.length-1);

  if(!dayGames.length){document.getElementById('list').innerHTML='<div class="empty">No matches</div>';return;}
  var html='';
  for(var i=0;i<dayGames.length;i++)html+=makeCard(dayGames[i],isToday,isPast);
  document.getElementById('list').innerHTML=html;
}

render();
</script>
</body>
</html>`
}

// ── MAIN ──────────────────────────────────────────────────────
if(config.runsInWidget){
  const w=await buildWidget(); Script.setWidget(w)
} else {
  // Browser can navigate to any day across the whole tournament, so it
  // needs full coverage — fetched as several small windows, not one wide
  // one — plus the plain "current" endpoint merged in as a safety net for
  // whichever day is actually happening right now (see fetchESPNCurrent).
  const espn=await fetchESPNFull()
  const cur=await fetchESPNCurrent()
  Object.assign(espn.scoreMap, cur.scoreMap)
  espn.fixtures.push(...cur.fixtures)
  resolveBracket(GAMES, espn.fixtures)   // fill in knockout names if known
  const wv=new WebView()
  await wv.loadHTML(buildBrowserHTML(JSON.stringify(espn.scoreMap)))
  await wv.present(false)
}
Script.complete()
