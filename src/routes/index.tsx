import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowRight, Check, ChevronRight, Flame, Heart, Instagram, Leaf, Menu, Package, Play, Sparkles, Sun, Wind, X, Facebook, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import studio from '@/assets/candle-studio.jpg';
import { RitualArticle } from '@/components/ritual-article';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Wick & Chill — Candle making for a calmer you' },
    { name: 'description', content: 'Slow down, make something beautiful, and discover the stress-relieving ritual of candle making with Wick & Chill.' },
    { property: 'og:title', content: 'Wick & Chill — Candle making for a calmer you' },
    { property: 'og:description', content: 'A little less rush. A little more ritual. Discover a calming, creative candle-making experience.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});
const steps = [
  { icon: Package, title: 'Make space for yourself', text: 'Set out your supplies, put on your favorite playlist, and leave the day at the door.' },
  { icon: Leaf, title: 'Find your feel-good scent', text: 'Fresh citrus, soft lavender, or something uniquely you. Choose a scent that feels like a deep breath.' },
  { icon: Wind, title: 'Melt. Mix. Be present.', text: 'Gently melt your wax, stir in your fragrance, and enjoy the simple rhythm of creating.' },
  { icon: Flame, title: 'Pour a little peace', text: 'Pour your candle, let it set, and savor something beautiful made by your own hands.' },
];
const faqs = [
  ['Do I need any candle-making experience?', 'Not at all. Candle making is a welcoming place to start, even if you don’t consider yourself creative. Begin with a simple beginner recipe and follow the wax and fragrance supplier’s instructions.'],
  ['How can candle making help me unwind?', 'The slow, hands-on rhythm gives your attention somewhere gentle to land. Choosing a scent, stirring wax, and creating something tangible can be a lovely break from screens and everyday pressures. It’s a creative ritual, not a medical treatment.'],
  ['What do I need to get started?', 'You’ll need candle wax, suitable fragrance, a wick, a heat-safe candle vessel, a thermometer, a pouring pitcher, and a way to gently melt the wax. A wick holder and a protected work surface make things easier, too.'],
  ['How long does making a candle take?', 'Plan an unhurried afternoon for preparation, melting, and pouring. Setting and curing take longer and depend on the wax you choose, so follow the supplier’s guidance before lighting your candle.'],
  ['Can I choose my own scents?', 'Absolutely. Try a candle-safe fragrance you love, such as citrus, lavender, or a fresh botanical blend. Always use the recommended fragrance load for your wax and avoid adding dried plants to the candle.'],
  ['Is candle making safe to do at home?', 'Yes, with care. Work on a stable, protected surface, keep hot wax away from children and pets, and never leave heating wax unattended. Use a thermometer and follow your materials’ safety instructions.'],
  ['Can I make candles with a friend?', 'Of course. A quiet afternoon of making together is a thoughtful way to reconnect. Prepare a separate work area for each person, share your scent ideas, and enjoy the process at your own pace.'],
];
const footerGroups = [
  { title: 'Product', links: ['Candle-making kits', 'Our scents', 'How it works', 'Pricing'] },
  { title: 'Company', links: ['Our story', 'Our philosophy', 'Get in touch'] },
  { title: 'Resources', links: ['Candle care', 'The journal', 'FAQs'] },
  { title: 'Legal', links: ['Privacy policy', 'Terms of service', 'Cookie policy'] },
];
function Brand() { return <a className="brand" href="#home" aria-label="Wick and Chill home"><span className="brand-mark"><Flame size={29} strokeWidth={1.6} /></span>wick & chill<span className="text-primary text-xs self-start mt-1">®</span></a>; }
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
function Index() {
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
  const match = kitMatches[scents[0] ?? 'citrus'] ?? kitMatches['citrus']!;
  const go = () => setMenuOpen(false);
  function navLinks() { return <><a href="#home" onClick={go}>Home</a><a href="#features" onClick={go}>Features</a><a href="#pricing" onClick={go}>Pricing</a><a href="#about" onClick={go}>About</a></>; }
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
    if (label === 'How it works') { document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (label === 'FAQs') { document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (label === 'Pricing' || label === 'Candle-making kits') { openKit(); return; }
    setModal(label);
  }
  return <>
    <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:p-3">Skip to content</a>
    <header className="site-nav"><div className="page-width nav-inner"><Brand /><nav className="nav-links" aria-label="Main navigation">{navLinks()}</nav><Button variant="hero" className="desktop-cta" onClick={openKit}>Find your calm <ArrowRight size={15}/></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button></div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navLinks()}<Button variant="hero" onClick={openKit}>Find your calm <ArrowRight/></Button></nav>}</header>
    <main id="main">
      <section id="home" className="hero" aria-labelledby="hero-title"><img src={studio} className="hero-image" alt="Hands gently stirring candle wax beside amber candles and natural botanicals in a sunlit studio" width={1920} height={1024} fetchPriority="high"/><div className="page-width hero-content page-enter"><div className="eyebrow hero-eyebrow"><Sun size={13}/> A little less rush. A little more ritual.</div><h1 id="hero-title">Candle making.<br/><span>A calmer you.</span></h1><p className="hero-description">Slow down. Breathe deep. Create something beautiful.<br className="hidden md:block"/> Discover the simple joy of candle making—and turn a little time for yourself into a moment of calm.</p><div className="hero-actions"><Button variant="hero" onClick={openKit}>Start your ritual <ArrowRight/></Button><Button variant="calm" asChild><a href="#features"><Play size={14}/> See how it works</a></Button></div><div className="hero-note"><Heart size={15}/><span>Made for beginners. Meant for your wellbeing.</span></div></div><div className="hero-caption"><Sparkles size={23}/><div><strong>A little creativity. A lot of calm.</strong><span className="text-muted-foreground">Your everyday escape, handmade.</span></div></div></section>
      <section className="partners" aria-label="Example partner logos"><div className="page-width"><p className="partners-label">Trusted by like-minded brands · sample partners</p><div className="logo-row"><div className="partner-logo"><Leaf size={22}/>mindful</div><div className="partner-logo">slow living</div><div className="partner-logo">THE GOOD CO.</div><div className="partner-logo">well & good</div><div className="partner-logo"><Sun size={24}/>Sunday Studio</div><div className="partner-logo">bloom.</div></div></div></section>
      <section id="features" className="how-section" aria-labelledby="how-title"><div className="page-width"><p className="eyebrow">How it works</p><h2 id="how-title" className="section-title">Your calm, in four simple steps.</h2><p className="section-description">No pressure. No perfection. Just you, a little creativity, and a slower pace.</p><div className="steps">{steps.map((step, i) => <article className="step" key={step.title}><div className="step-icon"><step.icon size={25} strokeWidth={1.5}/><span className="step-number">{i+1}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
      <section id="faq" className="faq-section" aria-labelledby="faq-title"><div className="page-width faq-layout"><div className="faq-intro"><p className="eyebrow">A little clarity</p><h2 id="faq-title" className="section-title">Good questions.<br/>Gentle answers.</h2><p className="section-description">Everything you’re wondering before your first pour. We’ve got you.</p><div className="faq-contact"><Button variant="link" className="p-0 h-auto" onClick={() => setModal('Get in touch')}>Still curious? Let’s talk <ArrowRight size={14}/></Button></div></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([q,a], i) => <AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="faq-trigger">{q}</AccordionTrigger><AccordionContent className="faq-answer">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section id="pricing" className="cta-section" aria-labelledby="cta-title"><Flame size={30} className="cta-icon" strokeWidth={1.5}/><h2 id="cta-title" className="section-title">Make a candle. Make a little room for you.</h2><p className="section-description">A softer evening starts with a simple ritual. Yours is waiting.</p><Button variant="hero" onClick={openKit}>Find your candle-making kit <ArrowRight/></Button><p className="cta-note">A little time. Something beautiful. A moment that’s yours.</p></section>
    </main>
    <footer id="about" className="site-footer"><div className="page-width"><div className="footer-top"><div className="footer-brand"><Brand/><p className="footer-about">Thoughtful making for slower living.<br/>Find a little calm in the everyday.</p><div className="social-links">{[{ label: 'Instagram', icon: Instagram },{ label: 'Pinterest', icon: Pin },{ label: 'Facebook', icon: Facebook }].map(s => <Button key={s.label} variant="social" size="icon" title={s.label} aria-label={s.label} onClick={() => setModal(s.label)}><s.icon size={17}/></Button>)}</div></div>{footerGroups.map(group => <div className="footer-links" key={group.title}><h3>{group.title}</h3>{group.links.map(label => <a key={label} href={label === 'FAQs' ? '#faq' : label === 'How it works' ? '#features' : '#about'} onClick={e => { e.preventDefault(); footerClick(label); }}>{label}</a>)}</div>)}</div><div className="footer-bottom"><span>© 2026 Wick & Chill. All rights reserved.</span><span>Made with care. Meant for calm. <Heart size={11} className="inline ml-1"/></span></div></div></footer>
    <Dialog open={modal !== null} onOpenChange={open => { if (!open) setModal(null); }}><DialogContent className={modal === 'ritual-article' ? 'ritual-dialog w-[calc(100%-32px)] rounded-lg' : modal === 'kit-quiz' ? 'quiz-dialog max-w-lg w-[calc(100%-32px)] rounded-lg' : 'max-w-lg w-[calc(100%-32px)] rounded-lg'}>{modal === 'kit-quiz' ? <>
      <DialogHeader><DialogTitle className="font-display text-2xl">{quizStep === 0 ? 'What scents make you exhale?' : quizStep === 1 ? 'How handy are you with a wick?' : 'Your kit match'}</DialogTitle><DialogDescription>{quizStep === 0 ? 'Pick up to three favorites. No wrong answers.' : quizStep === 1 ? 'So we can match your pace, not test you.' : 'Picked just for you.'}</DialogDescription></DialogHeader>
      <div className="quiz-progress" aria-hidden="true">{[0,1,2].map(i => <span key={i} className={i <= quizStep ? 'quiz-dot quiz-dot-active' : 'quiz-dot'}/>)}</div>
      {quizStep === 0 && <>
        <div className="quiz-scroll"><div className="quiz-options">{scentOptions.map(s => <button key={s.id} type="button" className={scents.includes(s.id) ? 'quiz-option quiz-option-selected' : 'quiz-option'} aria-pressed={scents.includes(s.id)} onClick={() => toggleScent(s.id)}><span className="quiz-option-label">{s.label}</span><span className="quiz-option-hint">{s.hint}</span></button>)}</div></div>
        <div className="quiz-nav"><Button variant="hero" disabled={scents.length === 0} onClick={() => setQuizStep(1)}>Next <ArrowRight/></Button></div>
      </>}
      {quizStep === 1 && <>
        <div className="quiz-scroll"><div className="quiz-options">{levelOptions.map(l => <button key={l.id} type="button" className={level === l.id ? 'quiz-option quiz-option-selected' : 'quiz-option'} aria-pressed={level === l.id} onClick={() => chooseLevel(l.id)}><span className="quiz-option-label">{l.label}</span><span className="quiz-option-hint">{l.hint}</span></button>)}</div></div>
        <div className="quiz-nav"><Button variant="ghost" onClick={() => setQuizStep(0)}>Back</Button><Button variant="hero" disabled={level === null} onClick={() => setQuizStep(2)}>See my match <Sparkles size={15}/></Button></div>
      </>}
      {quizStep === 2 && <>
        <div className="quiz-scroll"><div className="quiz-result"><Flame size={26} strokeWidth={1.5}/><h3 className="font-display text-xl">{match.name}</h3><p>{match.blurb}</p><p className="quiz-result-meta">Your picks: {scents.map(s => scentOptions.find(o => o.id === s)?.label).join(' · ')}<br/>Experience: {levelOptions.find(l => l.id === level)?.label}</p></div>
        <p className="text-sm text-muted-foreground leading-relaxed">Our kit collection is coming soon — pricing and availability haven’t been set, and orders aren’t open yet. This match is just a little inspiration for your first pour.</p></div>
        <div className="quiz-nav"><Button variant="ghost" onClick={() => { setQuizStep(0); setScents([]); setLevel(null); clearPrefs(); }}>Start over</Button><Button variant="hero" onClick={() => setModal('ritual-article')}>Explore the ritual <ChevronRight/></Button></div>
      </>}
    </> : modal === 'ritual-article' ? <>
      <DialogHeader className="ritual-header"><DialogDescription>Wick & Chill · A moment for you</DialogDescription><DialogTitle className="font-display text-2xl leading-tight">Finding a little peace through making</DialogTitle></DialogHeader>
      <div className="quiz-scroll ritual-scroll" tabIndex={0} aria-label="Ritual article"><RitualArticle/></div>
      <div className="ritual-actions"><Button variant="calm" onClick={() => setModal('kit-quiz')}>Back to my match <Flame size={16}/></Button></div>
    </> : <><DialogHeader><DialogTitle className="font-display text-2xl">{modal}</DialogTitle><DialogDescription>Wick & Chill</DialogDescription></DialogHeader><p className="text-sm text-muted-foreground leading-relaxed">{modal ? info[modal] : ''}</p></>}</DialogContent></Dialog>
  </>;
}
