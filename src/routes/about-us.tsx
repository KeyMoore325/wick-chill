import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Heart, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import studio from '@/assets/candle-studio.jpg';

export const Route = createFileRoute('/about-us')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'About Wick & Chill | Creativity, Candles & Connection' },
    { name: 'description', content: 'Explore the idea behind Wick & Chill: creativity, connection, and time for yourself through candle making. Read a preview of our founder story.' },
    { property: 'og:title', content: 'About Wick & Chill | Creativity, Candles & Connection' },
    { property: 'og:description', content: 'Explore the idea behind Wick & Chill: creativity, connection, and time for yourself through candle making. Read a preview of our founder story.' },
    { property: 'og:url', content: 'https://serenity-scent-story.lovable.app/about-us' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://serenity-scent-story.lovable.app/about-us' }] }),
  component: AboutUs,
});

function AboutUs() {
  return <main id="main">
    <section className="about-hero hero" aria-labelledby="about-title"><img src={studio} className="hero-image" alt="Hands making a candle in the warm, sunlit Wick & Chill studio concept" width={1920} height={1024} fetchPriority="high"/><div className="page-width hero-content page-enter"><p className="eyebrow">Our story · Our kind of calm</p><h1 id="about-title">About Us</h1><p className="hero-description">Wick & Chill began with a simple idea:<br/>making something beautiful can also mean making a little room for yourself.</p></div></section>
    <section className="page-width founder-section" aria-labelledby="founder-title">
      <div><p className="eyebrow">A note from the founder</p><h2 id="founder-title" className="section-title">Hi, I’m Key.</h2><p className="founder-signature">A little less rush.<br/>A little more ritual.</p></div>
      <div className="founder-copy"><p className="preview-note">Draft founder story · The story below is imagined placeholder copy, not a confirmed biography. The studio image is illustrative.</p><p>Like so many of us, I know how easy it is for a day to fill up before we’ve had a moment to ourselves. Between responsibilities, constant notifications, and the feeling that there’s always something next, slowing down can feel like one more thing on the list.</p><p>I imagined Wick & Chill as a different kind of pause: one you can make with your own hands. Choosing a scent, stirring wax, and watching a candle take shape offers a simple reason to be here, in this moment, rather than racing toward the next.</p><p>My hope is to create a welcoming space for that feeling. No creative credentials, no pressure to get everything perfect—just the chance to explore, reconnect with yourself, and leave with something meaningful.</p><p>Because the candle is lovely. But the time you give yourself? That’s the part worth keeping.</p><p className="founder-signoff">With care,<br/><strong>Key</strong><span>Founder, Wick & Chill · Draft introduction</span></p></div>
    </section>
    <section className="values-section"><div className="page-width"><p className="eyebrow">What we’re making room for</p><h2 className="section-title">More than a candle.</h2><div className="values-grid">{[
      { icon: Heart, title: 'Time for yourself', text: 'Small pauses matter. A creative ritual can be a gentle way to step out of the rush and pay attention to what feels good.' },
      { icon: Sparkles, title: 'Creativity without pressure', text: 'You don’t have to be an artist to enjoy making. Curiosity is enough, and a little imperfection belongs in the process.' },
      { icon: Leaf, title: 'Connection through making', text: 'A quiet afternoon alone or a shared table with a friend: there is room for both in a slower, more thoughtful day.' },
    ].map(value => <article className="value-item" key={value.title}><value.icon size={27} strokeWidth={1.5}/><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>
    <section className="cta-section"><h2 className="section-title">Make a little room for you.</h2><p className="section-description">Your next quiet moment could begin with a candle.</p><Button variant="hero" asChild><Link to="/wick-it">Explore Wick It <ArrowRight/></Link></Button></section>
  </main>;
}