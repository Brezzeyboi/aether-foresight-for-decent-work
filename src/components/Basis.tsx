/* ============================================================================
   The Basis chip.

   The visible half of the responsible-AI mechanism. Wherever a figure appears,
   this states how it is known: measured, projection, scenario, or our own
   assumption. It is small, quiet, and always present, so a reader never has to
   guess whether a number is evidence or illustration.

   Each basis carries a distinct GLYPH as well as a color, so the distinction
   survives colorblindness, greyscale printing, and forced-colors mode.
   ============================================================================ */

import { BASIS_META, type Basis as BasisKind, type SourceId, citeShort } from '../data/evidence.ts';
import './basis.css';

/* Marks are geometric rather than iconographic: a filled square reads as
   "solid ground", an open ring as "modelled", a half-open bracket as
   "conditional", a dotted square as "ours, not evidence". */
const GLYPH: Record<BasisKind, string> = {
  measured: '■', // filled square
  projection: '○', // open circle
  scenario: '◧', // half-filled square
  assumption: '▢', // dotted/open square
};

interface BasisProps {
  basis: BasisKind;
  /** When given, the chip also names the source inline: "Measured · ILO, 2026". */
  source?: SourceId;
  /** Suppresses the text label, leaving glyph + tooltip. For dense table cells. */
  compact?: boolean;
}

export function Basis({ basis, source, compact = false }: BasisProps) {
  const meta = BASIS_META[basis];
  const cite = source ? citeShort(source) : null;

  // The tooltip carries the full definition; the visible chip stays short.
  const title = cite ? `${meta.label}. ${meta.definition} Source: ${cite}` : `${meta.label}. ${meta.definition}`;

  return (
    <span className="basis" data-basis={basis} title={title}>
      <span className="basis__glyph" aria-hidden="true">
        {GLYPH[basis]}
      </span>
      {/* Compact drops the basis word but KEEPS the citation. An earlier version
          hid both, which left a bare glyph that nobody could read: the chip's
          entire job is telling a reader where a number came from, so the source
          is the last thing that may be dropped. */}
      {!compact && <span className="basis__label">{meta.label}</span>}
      {cite && <span className="basis__cite">{cite}</span>}
      {/* Screen readers get the unabbreviated statement regardless of compact. */}
      <span className="sr-only">
        {compact ? `${meta.label}.` : ''} {meta.definition}
        {cite ? ` Source: ${cite}.` : ''}
      </span>
    </span>
  );
}

/**
 * A figure with its basis attached. Use this rather than printing a number
 * directly, so the epistemic status can never be dropped by accident.
 */
interface FigureProps {
  value: string;
  label: string;
  basis: BasisKind;
  source?: SourceId;
  /** Optional caveat shown under the label, e.g. what the figure excludes. */
  note?: string;
  size?: 'hero' | 'lg' | 'md';
}

export function EvidenceFigure({ value, label, basis, source, note, size = 'lg' }: FigureProps) {
  return (
    <div className="evfig">
      <div className={`evfig__value figure-${size}`}>{value}</div>
      <div className="evfig__label">{label}</div>
      {note && <p className="evfig__note">{note}</p>}
      <Basis basis={basis} source={source} />
    </div>
  );
}
