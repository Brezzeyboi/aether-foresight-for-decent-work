/* ============================================================================
   Shared layout primitives: screen header, section, figure frame, panel.

   These exist so every screen has the same rhythm and the same relationship
   between a heading, its standfirst, and its content. Screens compose these
   rather than re-inventing spacing.
   ============================================================================ */

import type { ReactNode } from 'react';
import './layout.css';

interface ScreenHeaderProps {
  /** The question this screen answers, set as the primary heading. */
  title: string;
  /** One or two sentences on what the reader is looking at. */
  standfirst: string;
  /** Optional right-hand slot: a key figure, a control, or a status. */
  aside?: ReactNode;
}

/**
 * The top of every dashboard screen. Asymmetric by default: the heading and
 * standfirst take the wide left column, the aside a narrower right one.
 */
export function ScreenHeader({ title, standfirst, aside }: ScreenHeaderProps) {
  return (
    <header className="screen-head page">
      <div className="screen-head__text">
        <h1 className="title">{title}</h1>
        <p className="lead">{standfirst}</p>
      </div>
      {aside && <div className="screen-head__aside">{aside}</div>}
    </header>
  );
}

interface SectionProps {
  id?: string;
  /** Heading for the section. Omit for continuation blocks. */
  title?: string;
  /** Short deck under the heading. */
  standfirst?: string;
  children: ReactNode;
  /** Adds a top hairline, for dividing bands of content. */
  divided?: boolean;
}

export function Section({ id, title, standfirst, children, divided = false }: SectionProps) {
  return (
    <section className="section page" id={id} data-divided={divided || undefined} data-reveal>
      {(title || standfirst) && (
        <div className="section__head">
          {title && <h2 className="section-title">{title}</h2>}
          {standfirst && <p className="lead">{standfirst}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

interface FigureFrameProps {
  /** What question this figure answers. Every chart must have one. */
  title: string;
  /** How to read it, when the encoding is not self-evident. */
  help?: string;
  /** Source and basis apparatus, rendered under the chart. */
  footnote?: ReactNode;
  /** Controls that belong to this figure (table toggle, filters). */
  controls?: ReactNode;
  children: ReactNode;
}

/**
 * Wraps a chart with its title, reading instructions, and source apparatus.
 * A chart without a stated question is decoration, so the title is required.
 */
export function FigureFrame({ title, help, footnote, controls, children }: FigureFrameProps) {
  return (
    <figure className="figure-frame" data-reveal>
      <div className="figure-frame__head">
        <div>
          <h3 className="figure-frame__title">{title}</h3>
          {help && <p className="figure-frame__help">{help}</p>}
        </div>
        {controls && <div className="figure-frame__controls">{controls}</div>}
      </div>
      <div className="figure-frame__body">{children}</div>
      {footnote && <figcaption className="figure-frame__foot">{footnote}</figcaption>}
    </figure>
  );
}

interface PanelProps {
  children: ReactNode;
  /** Quiet panels sit on the sunken plane, for secondary or inset content. */
  tone?: 'raised' | 'sunken';
  className?: string;
}

export function Panel({ children, tone = 'raised', className }: PanelProps) {
  return (
    <div className={`panel panel--${tone}${className ? ` ${className}` : ''}`}>{children}</div>
  );
}

/**
 * A responsive grid. Column count is a maximum: it collapses to one column on
 * narrow screens without needing per-screen media queries.
 */
export function Grid({
  cols = 3,
  min = '18rem',
  children,
}: {
  cols?: 2 | 3 | 4;
  min?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`grid grid-${cols}`}
      style={{ '--grid-min': min } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
