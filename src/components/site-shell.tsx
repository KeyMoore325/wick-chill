import type React from 'react';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ChevronRight, Flame, Heart, Instagram, Menu, Sparkles, X, Facebook, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RitualArticle } from '@/components/ritual-article';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

type SiteActions = { openKit: () => void; openInfo: (label: string) => void; openArticle: () => void };
// Keep one context object across live reloads so the page and the shell always share it.
const contextStore = globalThis as typeof globalThis & { __wickChillSiteContext?: React.Context<SiteActions | null> };
const SiteContext = (contextStore.__wickChillSiteContext ??= createContext<SiteActions | null>(null));
export function useSiteActions() {
  const actions = useContext(SiteContext);
  if (!actions) throw new Error('Site actions need the shared site shell');
  return actions;
}
const footerGroups = [
  { title: 'Product', links: ['Candle-making kits', 'Our scents', 'How it works'] },
  { title: 'Company', links: ['Our story', 'Our philosophy', 'Get in touch'] },
  { title: 'Resources', links: ['Candle care', 'The journal', 'FAQs'] },
  { title: 'Legal', links: ['Privacy policy', 'Terms of service', 'Cookie policy'] },
];
function Brand() { return <Link className="brand" to="/" aria-label="Wick and Chill home"><span className="brand-mark"><Flame size={29} strokeWidth={1.6} /></span>wick & chill<span className="text-primary text-xs self-start mt-1">®</span></Link>; }
const scentOptions = [
  { id: 'citrus', label: 'Bright citrus', hint: 'Orange, lemon, a little sunshine' },
  { id: 'lavender', label: 'Soft lavender', hint: 'Calm, floral, wind-down energy' },
  { id: 'vanilla', label: 'Warm vanilla', hint: 'Cozy, sweet, like a hug' },
  { id: 'botanical', label: 'Fresh botanicals', hint: 'Eucalyptus, sage, green notes' },
  { id: 'ocean', label: 'Sea breeze', hint: 'Clean, airy, open-window fresh' },
  { id: 'spice', label: 'Amber & spice', hint: 'Warm, rich, golden-hour glow' },
];
const levelOptions = [
  { id: 'new', label: 'Brand new', hint: 'Never poured a candle in my life' },
  { id: 'curious', label: 'Casually curious', hint: 'Tried a kit or watched a few videos' },
  { id: 'maker', label: 'Weekend maker', hint: 'I own a pouring pitcher and I’m proud of it' },
];
const kitMatches: Record<string, { name: string; blurb: string }> = {
  citrus: { name: 'The Sunny Side Kit', blurb: 'Bright, cheerful pours for slow summer mornings. Expect zesty fragrance notes and an easy, feel-good first candle.' },
  lavender: { name: 'The Wind-Down Kit', blurb: 'Soft florals and an unhurried pace. Made for evenings when you want the world to quiet down a little.' },
  vanilla: { name: 'The Cozy Corner Kit', blurb: 'Warm, sweet comfort in candle form. Your couch, a blanket, and something lovely you made yourself.' },
  botanical: { name: 'The Fresh Start Kit', blurb: 'Green, clean, and clarifying. A breath of fresh air you can light.' },
  ocean: { name: 'The Open Window Kit', blurb: 'Airy, coastal freshness for clear heads and calm afternoons.' },
  spice: { name: 'The Golden Hour Kit', blurb: 'Rich amber warmth for makers who like their calm with a little depth.' },
};
export function SiteShell({ children }: { children: ReactNode }) {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [scents, setScents] = useState<string[]>([]);
  const [level, setLevel] = useState<string | null>(null);
  const quizPrefsKey = 'wick-chill-quiz-prefs';
  const savePrefs = (nextScents: string[], nextLevel: string | null) => { try { window.localStorage.setItem(quizPrefsKey, JSON.stringify({ scents: nextScents, level: nextLevel })); } catch { /* storage unavailable */ } };
  const loadPrefs = (): { scents: string[]; level: string | null } => {
    try {
      const raw = window.localStorage.getItem(quizPrefsKey);
      if (!raw) return { scents: [], level: null };
      const parsed = JSON.parse(raw) as { scents?: unknown; level?: unknown };
      return { scents: Array.isArray(parsed.scents) ? (parsed.scents as string[]) : [], level: typeof parsed.level === 'string' ? parsed.level : null };
    } catch { return { scents: [], level: null }; }
  };
  const clearPrefs = () => { try { window.localStorage.removeItem(quizPrefsKey); } catch { /* ignore */ } };
  const openKit = () => { setMenuOpen(false); const saved = loadPrefs(); setQuizStep(0); setScents(saved.scents); setLevel(saved.level); setModal('kit-quiz'); };
  const toggleScent = (id: string) => setScents(prev => { const next = prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 3 ? [...prev, id] : prev; savePrefs(next, level); return next; });
  const chooseLevel = (id: string) => { setLevel(id); savePrefs(scents, id); };
  const match = kitMatches[scents[0] ?? 'citrus'] ?? { name: 'The Sunny Side Kit', blurb: 'A bright, cheerful first pour.' };
  const go = () => setMenuOpen(false);
  const openArticle = () => { setMenuOpen(false); setModal('ritual-article'); };
  function navLinks() { return <><Link to="/" activeOptions={{ exact: true }} onClick={go}>Home</Link><Link to="/" hash="features" activeOptions={{ includeHash: true }} onClick={go}>Explore</Link><Link to="/wick-it" onClick={go}>Wick It</Link><Link to="/about-us" onClick={go}>About Us</Link><button type="button" className="nav-link" onClick={openArticle}>Why Chill</button></>; }
  const info: Record<string, string> = {
    'Our story': 'Wick & Chill is a concept built around a simple idea: making room for small, creative rituals in a busy day. A candle is just the beginning. The time you give yourself is the meaningful part.',
    'Our philosophy': 'Less rushing. More making. We believe in mindful creativity, simple materials, and finding joy in the process rather than chasing perfection.',
    'Candle care': 'Let your candle cure according to your wax supplier’s instructions. Trim the wick before each use, place the candle on a heat-resistant surface, and keep it away from drafts and flammable objects. Never leave a burning candle unattended.',
    'Our scents': 'Imagine bright citrus for a sunny morning, lavender for a softer evening, or fresh botanical notes for a moment of clarity. The final scent collection is still to be confirmed.',
    'The journal': 'A space for slow living, scent inspiration, and creative rituals. Stories are coming soon.',
    'Get in touch': 'Contact details have not been added yet. This candle-making brand is a preview concept.',
    'Privacy policy': 'This preview does not ask you to create an account or submit personal information. A business-specific privacy policy will be added before the store opens.',
    'Terms of service': 'This page is a candle-making brand preview, not an active store. Products, pricing, shipping, and purchase terms will be confirmed before launch.',
    'Cookie policy': 'This preview does not use optional advertising or analytics cookies. A full cookie policy will be reviewed before launch.',
    'Instagram': 'Our Instagram profile will be linked here before launch.',
    'Pinterest': 'Our Pinterest profile will be linked here before launch.',
    'Facebook': 'Our Facebook profile will be linked here before launch.',
  };
  function footerClick(label: string) {
    if (label === 'Candle-making kits') { openKit(); return; }
    setModal(label);
  }
  return <SiteContext.Provider value={{ openKit, openInfo: setModal, openArticle }}>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:p-3">Skip to content</a>
    <header className="site-nav"><div className="page-width nav-inner"><Brand /><nav className="nav-links" aria-label="Main navigation">{navLinks()}</nav><Button variant="hero" className="desktop-cta" onClick={openKit}>Find your calm <ArrowRight size={15}/></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button></div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navLinks()}<Button variant="hero" onClick={openKit}>Find your calm <ArrowRight/></Button></nav>}</header>
    {children}
    <footer id="about" className="site-footer"><div className="page-width"><div className="footer-top"><div className="footer-brand"><Brand/><p className="footer-about">Thoughtful making for slower living.<br/>Find a little calm in the everyday.</p><div className="social-links">{[{ label: 'Instagram', icon: Instagram },{ label: 'Pinterest', icon: Pin },{ label: 'Facebook', icon: Facebook }].map(s => <Button key={s.label} variant="social" size="icon" title={s.label} aria-label={s.label} onClick={() => setModal(s.label)}><s.icon size={17}/></Button>)}</div></div>{footerGroups.map(group => <div className="footer-links" key={group.title}><h3>{group.title}</h3>{group.links.map(label => label === 'Candle-making kits' ? <Link key={label} to="/wick-it">{label}</Link> : label === 'Our story' || label === 'Our philosophy' ? <Link key={label} to="/about-us">{label}</Link> : label === 'FAQs' || label === 'How it works' ? <Link key={label} to="/" hash={label === 'FAQs' ? 'faq' : 'features'}>{label}</Link> : <a key={label} href="#about" onClick={e => { e.preventDefault(); footerClick(label); }}>{label}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Wick & Chill. All rights reserved.</span><span>Made with care. Meant for calm. <Heart size={11} className="inline ml-1"/></span></div></div></footer>
    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className={modal === 'ritual-article' ? 'site-dialog ritual-dialog w-[calc(100%-32px)] rounded-lg' : modal === 'kit-quiz' ? 'site-dialog quiz-dialog max-w-lg w-[calc(100%-32px)] rounded-lg' : 'site-dialog max-w-lg w-[calc(100%-32px)] rounded-lg'}>{modal === 'kit-quiz' ? <>
      <DialogHeader><DialogTitle className="font-display text-2xl">{quizStep === 0 ? 'What scents make you exhale?' : quizStep === 1 ? 'How handy are you with a wick?' : 'Your kit match'}</DialogTitle><DialogDescription>{quizStep === 0 ? 'Pick up to three favorites. No wrong answers.' : quizStep === 1 ? 'So we can match your pace, not test you.' : 'Picked just for you.'}</DialogDescription></DialogHeader>
      <div className="quiz-progress" aria-hidden="true">{[0,1,2].map(i => <span key={i} className={i <= quizStep ? 'quiz-dot quiz-dot-active' : 'quiz-dot'}/>)}</div>
      {quizStep === 0 && <>
        <div className="quiz-scroll"><div className="quiz-options">{scentOptions.map(s => <Button variant="ghost" key={s.id} type="button" className={scents.includes(s.id) ? 'quiz-option quiz-option-selected' : 'quiz-option'} aria-pressed={scents.includes(s.id)} onClick={() => toggleScent(s.id)}><span className="quiz-option-label">{s.label}</span><span className="quiz-option-hint">{s.hint}</span></Button>)}</div></div>
        <div className="quiz-nav"><Button variant="hero" disabled={scents.length === 0} onClick={() => setQuizStep(1)}>Next <ArrowRight/></Button></div>
      </>}
      {quizStep === 1 && <>
        <div className="quiz-scroll"><div className="quiz-options">{levelOptions.map(l => <Button variant="ghost" key={l.id} type="button" className={level === l.id ? 'quiz-option quiz-option-selected' : 'quiz-option'} aria-pressed={level === l.id} onClick={() => chooseLevel(l.id)}><span className="quiz-option-label">{l.label}</span><span className="quiz-option-hint">{l.hint}</span></Button>)}</div></div>
        <div className="quiz-nav"><Button variant="ghost" onClick={() => setQuizStep(0)}>Back</Button><Button variant="hero" disabled={level === null} onClick={() => setQuizStep(2)}>See my match <Sparkles size={15}/></Button></div>
      </>}
      {quizStep === 2 && <>
        <div className="quiz-scroll"><div className="quiz-result"><Flame size={26} strokeWidth={1.5}/><h3 className="font-display text-xl">{match.name}</h3><p>{match.blurb}</p><p className="quiz-result-meta">Your picks: {scents.map(s => scentOptions.find(o => o.id === s)?.label).join(' · ')}<br/>Experience: {levelOptions.find(l => l.id === level)?.label}</p></div>
        <p className="text-sm text-muted-foreground leading-relaxed">Our kit collection is coming soon — pricing and availability haven’t been set, and orders aren’t open yet. This match is just a little inspiration for your first pour.</p></div>
        <div className="quiz-nav"><Button variant="ghost" onClick={() => { setQuizStep(0); setScents([]); setLevel(null); clearPrefs(); }}>Start over</Button><Button variant="hero" onClick={() => setModal('ritual-article')}>Why Chill <ChevronRight/></Button></div>
      </>}
    </> : modal === 'ritual-article' ? <>
      <DialogHeader className="ritual-header"><DialogDescription>Wick & Chill · A moment for you</DialogDescription><DialogTitle className="font-display text-2xl leading-tight">Finding a little peace through making</DialogTitle></DialogHeader>
      <div className="quiz-scroll ritual-scroll" tabIndex={0} aria-label="Ritual article"><RitualArticle/></div>
      <div className="ritual-actions"><Button variant="calm" onClick={() => setModal('kit-quiz')}>Back to my match <Flame size={16}/></Button></div>
    </> : <><DialogHeader><DialogTitle className="font-display text-2xl">{modal}</DialogTitle><DialogDescription>Wick & Chill</DialogDescription></DialogHeader><p className="text-sm text-muted-foreground leading-relaxed">{modal ? info[modal] : ''}</p></>}</DialogContent></Dialog>
  </SiteContext.Provider>;
}
