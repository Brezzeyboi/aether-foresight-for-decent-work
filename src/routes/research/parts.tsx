/* ============================================================================
   Research board building blocks.

   Editorial apparatus for a research publication: numbered sections, evidence
   callouts, comparison matrices, and disclosable caveats.

   The design constraint that shapes all of it: the report must turn research
   into visual communication rather than filling pages with text, and it must
   print as a paginated publication from these same components.
   ============================================================================ */

import { useId, useState, type ReactNode } from 'react';
import { Basis } from '../../components/Basis.tsx';
import { Tip } from '../../components/Tip.tsx';
import { CLAIMS, type ClaimId } from '../../data/claims.ts';
import { citeFull, citeShort } from '../../data/evidence.ts';
import './research.css';

/* --- Section ------------------------------------------------------------- */

/**
 * Layout family. Chosen by the kind of information a section carries, not for
 * novelty: a reader should be able to tell what sort of content is coming from
 * the shape of the section before reading a word.
 *
 *   spine   argument-led. Numeral in the margin, prose in the wide column.
 *   figure  chart-led. No margin column, so the visualisation gets full width.
 *   ledger  comparison-led. Wide, tabular, minimal prose.
 *   quiet   method and reference. Deliberately plainer and lower contrast.
 */
export type SectionVariant = 'spine' | 'figure' | 'ledger' | 'quiet';

interface ReportSectionProps {
  /** Two-digit section number, 01 to 12. */
  number: string;
  title: string;
  /** The section's argument in one or two sentences. */
  standfirst: string;
  id: string;
  variant?: SectionVariant;
  /**
   * The one-line answer, set large. This is the layer a skimming reader gets,
   * and for most sections it is the only thing they will read. If a section
   * cannot state its finding in a sentence, the section is not finished.
   */
  takeaway?: string;
  children: ReactNode;
}

/**
 * A numbered report section. Breaks onto a fresh page when printed.
 *
 * Three reading depths, so a twelve-section publication does not demand to be
 * read end to end:
 *   1. the takeaway, always visible, scannable in a few seconds
 *   2. figures and matrices, visible, scannable in a minute
 *   3. the full analysis, behind a disclosure
 */
export function ReportSection({
  number,
  title,
  standfirst,
  id,
  variant = 'spine',
  takeaway,
  children,
}: ReportSectionProps) {
  return (
    <section
      className="report-section"
      data-variant={variant}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="report-section__head">
        <p className="report-section__number" aria-hidden="true">
          {number}
        </p>
        <div className="report-section__intro">
          <h2 className="report-section__title" id={`${id}-title`}>
            {title}
          </h2>
          <p className="report-section__standfirst">{standfirst}</p>
        </div>
      </div>

      {takeaway && (
        <p className="report-section__takeaway">
          <span className="report-section__takeaway-mark" aria-hidden="true" />
          {takeaway}
        </p>
      )}

      <div className="report-section__body">{children}</div>
    </section>
  );
}

/* --- Depth --------------------------------------------------------------
   The full analysis, collapsed by default.

   This is the single most important structural decision in the report. The
   research is thorough, which is a strength; presented as thirteen pages of
   unbroken prose it becomes a wall, and a reader with limited time reads none
   of it. Collapsed, the same depth becomes available rather than mandatory:
   the surface is short, and anyone who wants the argument can open it.

   Print overrides this and expands everything, because paper has no toggle. */

export function Depth({
  label = 'Read the full analysis',
  words,
  children,
}: {
  label?: string;
  /** Rough length, so the reader knows the cost before committing. */
  words?: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="depth" data-open={open || undefined}>
      <button
        type="button"
        className="depth__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="depth__marker" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
        <span>{open ? 'Hide the full analysis' : label}</span>
        {words && !open && (
          <span className="depth__cost">{Math.max(1, Math.round(words / 200))} min</span>
        )}
      </button>
      <div className="depth__body" id={id} hidden={!open}>
        {children}
      </div>
    </div>
  );
}

/* --- Evidence callout ---------------------------------------------------- */

/**
 * A single claim, given the weight of a pull quote but carrying a figure and its
 * provenance instead of a sentence of prose.
 *
 * Everything here comes from the claim record, so a callout cannot be written
 * with a number that has no source.
 */
export function Evidence({ id, emphasis = false }: { id: ClaimId; emphasis?: boolean }) {
  const c = CLAIMS[id];
  return (
    <aside className="evidence" data-emphasis={emphasis || undefined}>
      <p className="evidence__value">{c.value}</p>
      <p className="evidence__statement">{c.statement}</p>
      {c.note && <p className="evidence__note">{c.note}</p>}
      <Basis basis={c.basis} source={c.source} />
    </aside>
  );
}

/**
 * Several claims as a horizontal band. Used where the finding is the pattern
 * across figures rather than any single one.
 */
export function EvidenceRow({ ids }: { ids: readonly ClaimId[] }) {
  return (
    <div className="evidence-row">
      {ids.map((id) => {
        const c = CLAIMS[id];
        return (
          <div className="evidence-row__item" key={id}>
            <p className="evidence-row__value">{c.value}</p>
            <p className="evidence-row__statement">{c.statement}</p>
            <Basis basis={c.basis} source={c.source} compact />
          </div>
        );
      })}
    </div>
  );
}

/* --- Inline citation ----------------------------------------------------- */

/**
 * Inline source attribution for a statement in running prose. Keeps the
 * citation visible without breaking the reading line.
 */
export function Cite({ id }: { id: ClaimId }) {
  const c = CLAIMS[id];
  const explain = c.note ? `${c.statement}. ${c.note}` : `${c.statement}.`;
  return (
    <Tip text={explain}>
      <span className="cite">{citeShort(c.source)}</span>
    </Tip>
  );
}

/* --- Caveat -------------------------------------------------------------- */

/**
 * A disclosable limit. Collapsed by default, because a reader wants the finding
 * first, but always present, because the limit is part of the finding.
 *
 * Not hidden behind hover: a real button with aria-expanded, reachable by
 * keyboard and usable on touch.
 */
export function Caveat({
  label = 'What this does not say',
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="caveat" data-open={open || undefined}>
      <button
        type="button"
        className="caveat__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="caveat__marker" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
        {label}
      </button>
      <div className="caveat__body" id={id} hidden={!open}>
        {children}
      </div>
    </div>
  );
}

/* --- Comparison matrix --------------------------------------------------- */

export interface MatrixColumn {
  key: string;
  header: string;
}

export interface MatrixRow {
  key: string;
  header: string;
  cells: Record<string, ReactNode>;
}

/**
 * A comparison matrix. Zebra striping rather than a hairline under every row,
 * because a rule per row is the laziest table treatment and reads as noise at
 * this density.
 */
export function Matrix({
  columns,
  rows,
  caption,
  firstColumnHeader,
}: {
  columns: readonly MatrixColumn[];
  rows: readonly MatrixRow[];
  caption: string;
  firstColumnHeader: string;
}) {
  return (
    <div className="matrix-wrap">
      <table className="matrix">
        <caption className="matrix__caption">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{firstColumnHeader}</th>
            {columns.map((c) => (
              <th scope="col" key={c.key}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <th scope="row">{r.header}</th>
              {columns.map((c) => (
                <td key={c.key}>{r.cells[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- Prose --------------------------------------------------------------- */

/** Long-form body. Serif, constrained measure, generous leading. */
export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose report-prose">{children}</div>;
}

/**
 * A finding stated as a single strong line, for the moments where the argument
 * turns. Set in display type rather than as a decorated quotation.
 */
export function Finding({ children }: { children: ReactNode }) {
  return <p className="finding">{children}</p>;
}

/* --- Photograph ---------------------------------------------------------
   Documentary photography, used where a scene carries a finding faster than a
   paragraph does.

   The rule that keeps it out of stock-image territory: a photograph must be
   anchored to a claim. The figure and its basis sit in the caption, so the
   picture stands beside a sourced number rather than decorating a section. The
   caption states what the reader is looking at and why it is here; it never
   asserts anything the image cannot show. */

export function ReportPhoto({
  src,
  alt,
  caption,
  claim,
  span = false,
}: {
  src: string;
  /** Describes the scene. The caption carries the argument, so these differ. */
  alt: string;
  caption: string;
  /** The sourced figure this image sits beside. */
  claim?: ClaimId;
  /** Span the margin column too, for the images that open a section. */
  span?: boolean;
}) {
  const c = claim ? CLAIMS[claim] : undefined;
  return (
    <figure className="photo" data-span={span || undefined} data-reveal>
      <img
        className="photo__img"
        src={src}
        alt={alt}
        width={1400}
        height={933}
        loading="lazy"
        decoding="async"
      />
      <figcaption className="photo__caption">
        {c && (
          <span className="photo__anchor">
            <span className="photo__value">{c.value}</span>
            <Basis basis={c.basis} source={c.source} compact />
          </span>
        )}
        <span className="photo__text">{caption}</span>
      </figcaption>
    </figure>
  );
}

/* --- Figure -------------------------------------------------------------- */

interface ReportFigureProps {
  /** The question this figure answers. Required: a chart without one is decoration. */
  title: string;
  /** How to read it, where the encoding is not self-evident. */
  help?: string;
  /** Claim ids whose sources back this figure. */
  sources?: readonly ClaimId[];
  /** Additional provenance note, e.g. for illustrative encodings. */
  note?: string;
  children: ReactNode;
}

export function ReportFigure({ title, help, sources, note, children }: ReportFigureProps) {
  return (
    <figure className="report-figure" data-reveal>
      <figcaption className="report-figure__head">
        <h3 className="report-figure__title">{title}</h3>
        {help && <p className="report-figure__help">{help}</p>}
      </figcaption>

      <div className="report-figure__body">{children}</div>

      {(sources || note) && (
        <div className="report-figure__foot">
          {note && <p className="report-figure__note">{note}</p>}
          {sources && (
            <ul className="report-figure__sources">
              {sources.map((id) => {
                const c = CLAIMS[id];
                return (
                  <li key={id}>
                    <Basis basis={c.basis} source={c.source} compact />
                    <span className="report-figure__source-text">
                      {c.statement}. {citeFull(c.source)}.
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </figure>
  );
}
