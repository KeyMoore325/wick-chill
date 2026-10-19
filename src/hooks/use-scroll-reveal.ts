import { useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

/** Enhance off-screen sections only; content stays visible without JavaScript. */
export function useScrollReveal() {
  const pathname = useLocation({ select: location => location.pathname });

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > section:not(.hero)'));
    const reveal = (element: HTMLElement) => element.classList.remove('scroll-reveal-pending');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

    sections.forEach(section => {
      // Never hide first-screen content or the destination of a restored scroll.
      if (section.getBoundingClientRect().top < window.innerHeight) return;
      section.classList.add('scroll-reveal', 'scroll-reveal-pending');
      observer.observe(section);
    });

    const showAll = () => {
      if (!motion.matches) return;
      sections.forEach(reveal);
      observer.disconnect();
    };
    motion.addEventListener('change', showAll);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', showAll);
      sections.forEach(section => section.classList.remove('scroll-reveal', 'scroll-reveal-pending'));
    };
  }, [pathname]);
}