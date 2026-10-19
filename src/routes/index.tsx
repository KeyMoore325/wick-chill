import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Flame, Heart, Leaf, Package, Play, Sparkles, Sun, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import studio from '@/assets/candle-studio.jpg';
import { useSiteActions } from '@/components/site-shell';

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
function Index() {
  const { openKit, openInfo } = useSiteActions();
  return <>
    <main id="main">
      <section id="home" className="hero" aria-labelledby="hero-title"><img src={studio} className="hero-image" alt="A woman's hands gently stirring candle wax beside amber candles and natural botanicals in a sunlit studio" width={1920} height={1024} fetchPriority="high"/><div className="page-width hero-content page-enter"><div className="eyebrow hero-eyebrow"><Sun size={13}/> A little less rush. A little more ritual.</div><h1 id="hero-title">Candle making.<br/><span>A calmer you.</span></h1><p className="hero-description">Slow down. Breathe deep. Create something beautiful.<br className="hidden md:block"/> Discover the simple joy of candle making—and turn a little time for yourself into a moment of calm.</p><div className="hero-actions"><Button variant="hero" onClick={openKit}>Get started <ArrowRight/></Button><Button variant="calm" asChild><a href="#features"><Play size={14}/> See how it works</a></Button></div><div className="hero-note"><Heart size={15}/><span>Made for beginners. Meant for your wellbeing.</span></div></div><div className="hero-caption"><Sparkles size={23}/><div><strong>A little creativity. A lot of calm.</strong><span className="text-muted-foreground">Your everyday escape, handmade.</span></div></div></section>
      <section className="partners" aria-label="Example partner logos"><div className="page-width"><p className="partners-label">Trusted by like-minded brands · sample partners</p><div className="logo-row"><div className="partner-logo"><Leaf size={22}/>mindful</div><div className="partner-logo">slow living</div><div className="partner-logo">THE GOOD CO.</div><div className="partner-logo">well & good</div><div className="partner-logo"><Sun size={24}/>Sunday Studio</div><div className="partner-logo">bloom.</div></div></div></section>
      <section id="features" className="how-section" aria-labelledby="how-title"><div className="page-width"><p className="eyebrow">How it works</p><h2 id="how-title" className="section-title">Your calm, in four simple steps.</h2><p className="section-description">No pressure. No perfection. Just you, a little creativity, and a slower pace.</p><div className="steps">{steps.map((step, i) => <article className="step" key={step.title}><div className="step-icon"><step.icon size={25} strokeWidth={1.5}/><span className="step-number">{i+1}</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>
      <section id="faq" className="faq-section" aria-labelledby="faq-title"><div className="page-width faq-layout"><div className="faq-intro"><p className="eyebrow">A little clarity</p><h2 id="faq-title" className="section-title">Good questions.<br/>Gentle answers.</h2><p className="section-description">Everything you’re wondering before your first pour. We’ve got you.</p><div className="faq-contact"><Button variant="link" className="p-0 h-auto" onClick={() => openInfo('Get in touch')}>Still curious? Let’s talk <ArrowRight size={14}/></Button></div></div><Accordion type="single" collapsible className="faq-list">{faqs.map(([q,a], i) => <AccordionItem key={q} value={`faq-${i}`}><AccordionTrigger className="faq-trigger">{q}</AccordionTrigger><AccordionContent className="faq-answer">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section id="start" className="cta-section" aria-labelledby="cta-title"><Flame size={30} className="cta-icon" strokeWidth={1.5}/><h2 id="cta-title" className="section-title">Make a candle. Make a little room for you.</h2><p className="section-description">A softer evening starts with a simple ritual. Yours is waiting.</p><Button variant="hero" onClick={openKit}>Find your candle-making kit <ArrowRight/></Button><p className="cta-note">A little time. Something beautiful. A moment that’s yours.</p></section>
    </main>
  </>;
}
