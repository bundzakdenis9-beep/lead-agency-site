import { LuArrowRight } from 'react-icons/lu'
import Reveal from './Reveal'
import { CTA_LABEL } from '../config/site'

export default function CallToAction({ onCta }) {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-line-strong bg-gradient-to-b from-surface-2 to-ink px-6 py-16 text-center sm:px-12 sm:py-24">
            {/* мягкое свечение и сетка */}
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" style={{ maskImage: 'radial-gradient(ellipse 60% 70% at 50% 100%, #000 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 100%, #000 20%, transparent 70%)' }} />
            <div className="glow-orb -bottom-40 left-1/2 h-80 w-[640px] max-w-full -translate-x-1/2 bg-accent/[0.18]" />

            <div className="relative mx-auto max-w-xl">
              <span className="eyebrow">Следующий шаг</span>
              <h2 className="mt-6 text-[34px] leading-[1.1] font-semibold tracking-[-0.03em] text-fg sm:text-[48px]">
                Готовы попробовать? <span className="inline-block text-[0.8em]">🚀</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-muted">
                Оставьте заявку — свяжемся с вами и обсудим ваш бизнес.
              </p>
              <button type="button" onClick={onCta} className="btn-primary mt-10 h-14 px-7 text-[16px]">
                {CTA_LABEL}
                <LuArrowRight className="size-[18px]" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
