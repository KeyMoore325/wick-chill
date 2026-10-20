import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Flame, Leaf, Sun, Wind, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSiteActions } from '@/components/site-shell';
import kitsImage from '@/assets/candle-kits.jpg';

export const Route = createFileRoute('/wick-it')({
  staticData: { sitemap: true },
  head: () => ({ meta: [
    { title: 'Wick It Candle-Making Kit Collection Preview | Wick & Chill' },
    { name: 'description', content: 'Preview six Wick It candle-making kit concepts, from citrus and lavender to vanilla and amber. Find your scent inspiration. Collection coming soon.' },
    { property: 'og:title', content: 'Wick It Candle-Making Kit Collection Preview | Wick & Chill' },
    { property: 'og:description', content: 'Preview six Wick It candle-making kit concepts, from citrus and lavender to vanilla and amber. Find your scent inspiration. Collection coming soon.' },
    { property: 'og:url', content: 'https://serenity-scent-story.lovable.app/wick-it' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://serenity-scent-story.lovable.app/wick-it' }] }),
  component: WickIt,
});

const kits = [
  { name: 'The Sunny Side Kit', notes: 'Orange · Lemon · Sunshine', icon: Sun, description: 'A bright citrus-inspired pour for mornings that deserve a softer start. A little zest, a little creativity, and something lovely to look forward to.' },
  { name: 'The Wind-Down Kit', notes: 'Lavender · Soft florals', icon: Flame, description: 'Put the day on pause with a gentle floral-inspired candle. An invitation to turn down the noise and enjoy the easy rhythm of making.' },
  { name: 'The Cozy Corner Kit', notes: 'Vanilla · Warm sweetness', icon: Heart, description: 'Comfort, poured by hand. Imagine a mellow vanilla scent, your favorite playlist, and an unhurried afternoon with nowhere else to be.' },
  { name: 'The Fresh Start Kit', notes: 'Eucalyptus · Green botanicals', icon: Leaf, description: 'Fresh, leafy fragrance inspiration for a little mental breathing room. Clear a space, settle in, and make something that feels like a new beginning.' },
  { name: 'The Open Window Kit', notes: 'Sea air · Clean, airy notes', icon: Wind, description: 'A coastal-inspired moment, even when the beach is miles away. Light, breezy scent notes meet the grounding pleasure of working with your hands.' },
  { name: 'The Golden Hour Kit', notes: 'Amber · Gentle spice', icon: Sparkles, description: 'Rich warmth for the end of a busy day. Think amber-inspired notes, a touch of spice, and the quiet satisfaction of a candle you made yourself.' },
];

function WickIt() {
  const { openKit } = useSiteActions();
  return <main id="main">
    <section className="collection-heading page-width page-enter">
      <p className="eyebrow">A little making. A little me-time.</p>
      <h1 className="inner-title">Wick It</h1>
      <p className="section-description">A scent for every kind of slow day.<br/>Find the candle-making ritual that feels like you.</p>
    </section>
    <section className="page-width collection-feature" aria-label="The kit collection">
      <img src={kitsImage} alt="Candle-making kit concept with amber vessels, wax, fragrance bottles, a pouring pitcher, and wick holders" width={1536} height={1024} fetchPriority="high"/>
      <div className="collection-feature-copy"><p className="eyebrow">The collection preview</p><h2 className="section-title">Small rituals.<br/>Lovely possibilities.</h2><p className="section-description">From your first pour to your next creative escape, each kit idea begins with the same intention: a little time to slow down and make something your own.</p><p className="preview-note">Placeholder collection · Kit names, scent notes, contents, and imagery are illustrative. Final products, pricing, and availability are still to come. Orders are not open.</p></div>
    </section>
    <section className="page-width collection-section" aria-labelledby="collection-title">
      <div className="collection-section-heading"><h2 id="collection-title" className="section-title">Find your kind of calm.</h2><span className="eyebrow">Six scent stories</span></div>
      <div className="kit-grid">{kits.map(kit => <article className="kit-card" key={kit.name}><div className="kit-card-icon"><kit.icon size={27} strokeWidth={1.5}/></div><p className="kit-notes">{kit.notes}</p><h3>{kit.name}</h3><p>{kit.description}</p><span className="kit-status">Coming soon · Concept kit</span></article>)}</div>
    </section>
    <section className="cta-section"><Flame className="cta-icon" size={30}/><h2 className="section-title">Not sure where to start?</h2><p className="section-description">Follow your favorite scents. We’ll find a little inspiration for your first pour.</p><Button variant="hero" onClick={openKit}>Find my kit match <ArrowRight/></Button></section>
  </main>;
}