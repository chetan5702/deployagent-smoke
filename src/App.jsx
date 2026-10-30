import React, { useEffect, useState } from 'react';
import orbitArtwork from './orbit.svg?no-inline';

function readPage() {
  return window.location.hash === '#checks' ? 'checks' : 'overview';
}

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function App() {
  const [page, setPage] = useState(readPage);
  const [clicks, setClicks] = useState(0);
  const [artworkLoaded, setArtworkLoaded] = useState(false);
  const [artworkFailed, setArtworkFailed] = useState(false);
  const [browserReady, setBrowserReady] = useState(false);

  useEffect(() => {
    setBrowserReady(true);
    const onHashChange = () => setPage(readPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = `${page === 'checks' ? 'Browser checks' : 'Launch check'} · DeployAgent`;
  }, [page]);

  const checks = [
    { number: '01', name: 'React rendered', detail: 'The browser mounted this interactive application.', value: browserReady ? 'Ready' : 'Waiting', ready: browserReady },
    { number: '02', name: 'Local artwork', detail: 'An SVG imported from this application, with no image service.', value: artworkLoaded ? 'Loaded' : artworkFailed ? 'Failed to load' : 'Loading', ready: artworkLoaded },
    { number: '03', name: 'Hash navigation', detail: 'Open Browser checks, refresh, then use your browser’s Back button.', value: page === 'checks' ? 'Checks route open' : 'Try the next tab', ready: page === 'checks' },
    { number: '04', name: 'Click interaction', detail: 'Use the counter to check that a browser event updates React state.', value: clicks > 0 ? `${clicks} ${clicks === 1 ? 'click' : 'clicks'} recorded` : 'Try the counter', ready: clicks > 0 },
  ];

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="DeployAgent overview">
          <span className="brand-mark" aria-hidden="true">d<span>↗</span></span>
          <span>DeployAgent<span className="brand-label">Launch check</span></span>
        </a>
        <span className="project-pill"><span aria-hidden="true" />Static React demo</span>
      </header>

      <main id="main-content" tabIndex={-1}>
        <div className="page-topline">
          <p className="eyebrow">A small app. A real deployment check.</p>
          <nav className="page-nav" aria-label="Demo pages">
            <a href="#overview" aria-current={page === 'overview' ? 'page' : undefined}>Overview</a>
            <a href="#checks" aria-current={page === 'checks' ? 'page' : undefined}>Browser checks</a>
          </nav>
        </div>

        <section className={`hero ${page === 'checks' ? 'hero-compact' : ''}`} aria-labelledby="page-title">
          <div className="hero-copy">
            <div className="section-kicker"><span className="tiny-star" aria-hidden="true">✳</span> Your first launch, one check at a time</div>
            <h1 id="page-title">{page === 'overview' ? <>From repository<br />to <span>something real.</span></> : <>Let’s check<br /><span>the little things.</span></>}</h1>
            <p className="hero-description">{page === 'overview' ? 'A lightweight React app for testing DeployAgent’s path from source code to a public page. Open the checks, try an interaction, and see what your browser can verify.' : 'A successful build is one step. These checks help you inspect assets, navigation, and interaction in the browser you’re using now.'}</p>
            <a className="text-link" href={page === 'overview' ? '#checks' : '#overview'}>{page === 'overview' ? 'Explore the browser checks' : 'Back to the overview'} <Arrow /></a>
          </div>
          <div className="artwork-panel">
            <span className="artwork-label">SOURCE → BUILD → BROWSER</span>
            <img src={orbitArtwork} alt="A green launch arrow rising through a set of orbital paths" width="440" height="340" onLoad={() => { setArtworkLoaded(true); setArtworkFailed(false); }} onError={() => { setArtworkFailed(true); setArtworkLoaded(false); }} />
            <span className="artwork-caption">Local asset · No external requests</span>
          </div>
        </section>

        <section className="test-grid" aria-label="Interactive deployment checks">
          <article className="interaction-card">
            <div className="card-heading"><span className="eyebrow">01 / Interaction</span><span className="small-arrow" aria-hidden="true">↗</span></div>
            <h2>Give it a click.</h2>
            <p>This counter updates in your browser. It resets when you refresh the page.</p>
            <div className="counter-row">
              <output className="counter" aria-live="polite" aria-atomic="true" aria-label="Click count">{String(clicks).padStart(2, '0')}</output>
              <button className="primary-button" onClick={() => setClicks(value => value + 1)}>Test interaction <Arrow /></button>
            </div>
            <div className="card-bottom"><span>{clicks > 0 ? 'React state updated in this session.' : 'Ready when you are.'}</span><button className="reset-button" disabled={clicks === 0} onClick={() => setClicks(0)}>Reset</button></div>
          </article>

          <article className="checks-card">
            <div className="card-heading"><span className="eyebrow">02 / Browser signals</span><span className="session-label">This session</span></div>
            <h2>{page === 'overview' ? 'Small checks, useful signals.' : 'What can we observe?'}</h2>
            <ul className="check-list">
              {checks.map(check => (
                <li key={check.number}>
                  <span className={`check-icon ${check.ready ? 'ready' : ''}`} aria-hidden="true">{check.ready ? '✓' : '·'}</span>
                  <div className="check-copy"><span className="check-name">{check.name}</span>{page === 'checks' && <p>{check.detail}</p>}</div>
                  <span className={`check-status ${check.ready ? 'ready-text' : ''}`}>{check.value}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        {page === 'checks' && <section className="manual-check" aria-labelledby="manual-title"><span className="manual-number" aria-hidden="true">03</span><div><h2 id="manual-title">Try a fresh start.</h2><p>Refresh this page while the address ends in <code>#checks</code>. You should return here with the counter at zero. Then use Overview and your browser’s Back button to check navigation.</p></div><span className="small-arrow" aria-hidden="true">↻</span></section>}

        <aside className="scope-note"><span aria-hidden="true">i</span><p>These are browser observations, not proof of a completed public deployment. The deployment agent verifies the public URL, source marker, and startup assets separately.</p></aside>
      </main>

      <footer className="site-footer"><span>Made to test the journey.</span><span>React + Vite <span aria-hidden="true">/</span> Static files <span aria-hidden="true">/</span> No backend</span></footer>
    </div>
  );
}
