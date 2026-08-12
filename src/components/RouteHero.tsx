/* ============================================================================
   Route hero.

   A banded image at the top of a dashboard screen, with the heading set over it.
   Two decisions make it work rather than decorate:

   1. The image is duotoned to the screen's own section colour, so a photograph
      belongs to the route it opens instead of sitting on top of it as stock art.
      Done with a blend layer over the picture, not baked into the file, so the
      same asset would re-tint if a section colour changed.

   2. Text sits on a gradient scrim, not on the raw photograph. A heading over an
      unmodified image is the most common way contrast quietly fails, because the
      ratio depends on whatever pixels happen to be underneath. The scrim floors
      the luminance under the type so the measured contrast holds wherever the
      image is bright.

   Images are decorative here: every hero repeats a heading that is already
   present as real text, so they carry empty alt text and are skipped by screen
   readers rather than described twice.
   ============================================================================ */

import './route-hero.css';

interface RouteHeroProps {
  /** Imported asset, so the bundler emits it as a local hashed file. */
  src: string;
  /** The question this screen answers. Rendered as the h1. */
  title: string;
  standfirst: string;
  /** Optional right-hand slot: a key figure or status. */
  aside?: React.ReactNode;
  /** Vertical focus of the image, for framing faces. Defaults to centre. */
  focus?: string;
}

export function RouteHero({ src, title, standfirst, aside, focus = '50%' }: RouteHeroProps) {
  return (
    <header className="rhero">
      <div className="rhero__media" aria-hidden="true">
        <img
          className="rhero__img"
          src={src}
          alt=""
          width={1536}
          height={1024}
          style={{ objectPosition: `50% ${focus}` }}
          decoding="async"
        />
        <span className="rhero__tint" />
        <span className="rhero__scrim" />
      </div>

      <div className="rhero__body page">
        <div className="rhero__text">
          <h1 className="rhero__title">{title}</h1>
          <p className="rhero__standfirst">{standfirst}</p>
        </div>
        {aside && <div className="rhero__aside">{aside}</div>}
      </div>
    </header>
  );
}
