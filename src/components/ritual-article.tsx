import { Flame } from 'lucide-react';
import studio from '@/assets/candle-studio.jpg';

export function RitualArticle() {
  return <article className="ritual-article" aria-label="Finding a little peace through making">
    <img className="ritual-image" src={studio} alt="Hands stirring candle wax in a sunlit studio, surrounded by amber candles" width={1920} height={1024}/>
    <p>The messages arrive before breakfast. Work follows us home. Bills, family responsibilities, and a relentless news cycle can make an ordinary day feel anything but ordinary. If you feel stretched thin, you are not failing at life. You may simply need a little space within it.</p>
    <h3>A busy world. A very human response.</h3>
    <p>The American Psychological Association’s <em>Stress in America 2023</em> survey found that <strong>24% of U.S. adults rated their stress between 8 and 10 on a 10-point scale</strong>, up from <strong>19% in 2019</strong>. These are self-reported survey findings, not a diagnosis or a measure of adults worldwide. <a href="https://www.apa.org/news/press/releases/stress/2023/collective-trauma-recovery/" target="_blank" rel="noopener noreferrer">Read the APA report ↗</a></p>
    <p>A candle cannot solve the pressures behind those numbers. But making one can be a small invitation to step out of the rush and give your attention to something here, in your hands.</p>
    <h3>Art makes room for understanding.</h3>
    <p>You do not have to call yourself an artist to create. Art offers a way to explore what you feel without needing the perfect words. Choosing a color, a scent, or a shape can become a quiet question: what do I need today? Something bright? Something soft? Something that feels like home?</p>
    <p>With candle making, that question becomes tangible. You choose a fragrance, watch the wax soften, and stir with care. There is no inbox to clear and no masterpiece to prove. Just a gentle process that may help you feel more present.</p>
    <h3>Let peace be something you practice.</h3>
    <p>Make a little room on your table. Put your phone aside. Follow your materials’ safety instructions, stay with the heating wax, and let the pour happen at its own pace. While your candle sets, notice how it feels to have made something rather than answered something.</p>
    <p>When it has cured and is ready to light, let it remind you of that pause. Serenity need not mean a life without stress. Sometimes it is one unhurried moment, one act of care, one candle made by you.</p>
    <blockquote><Flame size={22} aria-hidden="true"/><p>You do not have to finish everything to make room for yourself.</p></blockquote>
    <p className="ritual-source">Source: American Psychological Association, <em>Stress in America 2023</em>; online survey conducted by The Harris Poll, August 4–26, 2023, among 3,185 U.S. adults aged 18+. The figures above describe 2023 and 2019, not current 2026 rates. Candle making is a creative wellbeing ritual, not a treatment for anxiety or persistent stress. If stress is affecting daily life, consider support from a qualified healthcare professional.</p>
  </article>;
}