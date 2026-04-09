import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';
import AskifyLogo from './AskifyLogo';
import './LandingPage.css';

/* ─── Animation variants ───────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  show:   { opacity: 1, y: 0,   transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.22 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
};

const modalBox: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  show:   { opacity: 1, scale: 1,    y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, scale: 0.94, y: 20, transition: { duration: 0.22 } },
};

/* ─── Feature data ─────────────────────────────────────────── */
const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast Responses',
    desc: 'Get instant answers powered by state-of-the-art language models with sub-second latency.',
  },
  {
    icon: '🧠',
    title: 'Context-Aware Memory',
    desc: 'Askify remembers your entire conversation, building on previous messages for coherent dialogue.',
  },
  {
    icon: '🎨',
    title: 'Rich Markdown Output',
    desc: 'Beautifully rendered responses with code highlighting, tables, math, and more.',
  },
  {
    icon: '🔐',
    title: 'Privacy First',
    desc: 'Your conversations are yours. End-to-end security with no data sold to third parties.',
  },
  {
    icon: '🌐',
    title: 'Multilingual Support',
    desc: 'Converse in 50+ languages. Askify understands and responds fluently in your native language.',
  },
  {
    icon: '🔌',
    title: 'Custom AI Personas',
    desc: 'Build and share custom AI assistants tailored to specific tasks, topics, or personalities.',
  },
];

/* ─── Demo messages ────────────────────────────────────────── */
const demoMessages = [
  { role: 'user', text: 'Explain quantum entanglement in simple terms.' },
  {
    role: 'ai',
    text: "Imagine two coins flipped at the same time — no matter how far apart they are, when one lands heads, the other instantly lands tails. That's entanglement: particles share a linked quantum state across any distance. ✨",
  },
  { role: 'user', text: 'That\'s amazing! Can this be used for communication?' },
];

/* ─── Particles config ─────────────────────────────────────── */
const particlesConfig = {
  fpsLimit: 60,
  particles: {
    number:   { value: 80, density: { enable: true, width: 1400 } },
    color:    { value: ['#19c37d', '#10a37f', '#1de99b', '#ffffff'] },
    opacity:  { value: { min: 0.3, max: 0.7 }, animation: { enable: true, speed: 0.6, minimumValue: 0.2 } },
    size:     { value: { min: 1.5, max: 3.5 } },
    links:    { enable: true, distance: 150, color: '#19c37d', opacity: 0.25, width: 1.2 },
    move:     { enable: true, speed: 0.6, direction: 'none' as const, random: true, outModes: 'out' as const },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: { distance: 220, links: { opacity: 0.85, color: '#1de99b' } },
      push: { quantity: 4 },
    },
  },
  detectRetina: true,
};

/* ─── Component ────────────────────────────────────────────── */
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin]   = useState(false);
  const [isSignUp, setIsSignUp]     = useState(false);
  const [visibleMsg, setVisibleMsg] = useState(0);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(8,11,15,0)', 'rgba(8,11,15,0.85)']);

  /* tsParticles init (v3 API) */
  const [particlesReady, setParticlesReady] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);
  const particlesLoaded = useCallback(async (_container: Container | undefined) => {}, []);

  /* Animate demo messages one by one */
  useEffect(() => {
    if (visibleMsg >= demoMessages.length) return;
    const t = setTimeout(() => setVisibleMsg(v => v + 1), visibleMsg === 0 ? 800 : 1600);
    return () => clearTimeout(t);
  }, [visibleMsg]);

  /* Lock body scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = showLogin ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showLogin]);

  return (
    <div className="landing-root">
      {/* ── Particles background ── */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={particlesConfig}
        />
      )}

      <div className="landing-content">

        {/* ── Navbar ── */}
        <motion.nav className="land-nav" style={{ background: navBg }}>
          <motion.div
            className="land-logo-group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <AskifyLogo size={34} />
            <span className="land-logo-text">Askify</span>
          </motion.div>

          <motion.div
            className="land-nav-links"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <button className="land-nav-link" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>Features</button>
            <button className="land-nav-link" onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}>Pricing</button>
            <motion.button
              className="land-login-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsSignUp(false); setShowLogin(true); }}
            >
              Log in
            </motion.button>
          </motion.div>
        </motion.nav>

        {/* ── Hero ── */}
        <section className="hero-section">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <span className="hero-badge-dot" />
            Now powered by GPT-4o &amp; beyond
          </motion.div>

          <motion.h1
            className="hero-title"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.span variants={fadeUp} style={{ display: 'block' }}>
              Chat smarter with
            </motion.span>
            <motion.span variants={fadeUp} className="hero-title-green" style={{ display: 'block' }}>
              Askify AI
            </motion.span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5 }}
          >
            The most intuitive AI chat experience — ask anything, get brilliant answers, and unlock your productivity like never before.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.65 }}
          >
            <motion.button
              className="cta-primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsSignUp(true); setShowLogin(true); }}
            >
              Start for free →
            </motion.button>
            <motion.button
              className="cta-secondary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/chat')}
            >
              Try without login
            </motion.button>
          </motion.div>

          {/* Demo window */}
          <motion.div
            className="demo-window"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="demo-titlebar">
              <span className="demo-dot demo-dot-red" />
              <span className="demo-dot demo-dot-yellow" />
              <span className="demo-dot demo-dot-green" />
            </div>
            <div className="demo-body">
              <AnimatePresence>
                {demoMessages.slice(0, visibleMsg).map((msg, i) => (
                  <motion.div
                    key={i}
                    className={`demo-msg ${msg.role}`}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className={`demo-avatar ${msg.role === 'ai' ? 'ai-avatar' : 'user-avatar'}`}>
                      {msg.role === 'ai' ? '✦' : 'U'}
                    </div>
                    <div className={`demo-bubble ${msg.role}`}>
                      {msg.text}
                      {i === visibleMsg - 1 && msg.role === 'ai' && visibleMsg < demoMessages.length && (
                        <span className="demo-cursor" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* ── Stats ── */}
        <motion.div
          className="stats-strip"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          {[
            { n: '10M+', l: 'Messages Sent' },
            { n: '99.9%', l: 'Uptime' },
            { n: '50+', l: 'Languages' },
            { n: '<1s', l: 'Avg Response' },
          ].map(s => (
            <motion.div key={s.l} className="stat-item" variants={fadeUp}>
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.l}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Features ── */}
        <section id="features" className="features-section">
          <motion.p
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Askify
          </motion.p>
          <motion.h2
            className="section-title"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            Everything you need.<br />Nothing you don't.
          </motion.h2>

          <motion.div
            className="features-grid"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {features.map(f => (
              <motion.div
                key={f.title}
                className="feat-card"
                variants={cardVariant}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(25,195,125,0.35)',
                  boxShadow: '0 24px 60px rgba(25,195,125,0.12)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                <div className="feat-icon-wrap">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA banner ── */}
        <section id="cta">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Ready to think bigger?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
            >
              Join millions already using Askify to work smarter every day.
            </motion.p>
            <motion.button
              className="cta-primary"
              style={{ fontSize: 18, padding: '18px 48px' }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsSignUp(true); setShowLogin(true); }}
            >
              Get started — it's free
            </motion.button>
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="land-footer">
          <div className="land-logo-group">
            <AskifyLogo size={24} />
            <span className="land-logo-text" style={{ fontSize: 16 }}>Askify</span>
          </div>
          <p>© 2026 Askify. All rights reserved.</p>
          <p>Built with ❤️ and AI.</p>
        </footer>
      </div>

      {/* ── Login / Signup Modal ── */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            className="modal-overlay"
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={e => { if (e.target === e.currentTarget) setShowLogin(false); }}
          >
            <motion.div
              className="modal-card"
              variants={modalBox}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <button className="modal-x" onClick={() => setShowLogin(false)}>✕</button>

              <div className="modal-logo-row">
                <AskifyLogo size={32} />
                <span className="modal-brand">Askify</span>
              </div>

              <div className="modal-title">{isSignUp ? 'Create your account' : 'Welcome back'}</div>
              <div className="modal-sub">{isSignUp ? 'Start chatting in seconds.' : 'Sign in to continue to Askify.'}</div>

              {isSignUp && (
                <div className="modal-field">
                  <label className="modal-label">Full name</label>
                  <motion.input
                    className="modal-input"
                    placeholder="Jane Doe"
                    type="text"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              )}

              <div className="modal-field">
                <label className="modal-label">Email</label>
                <input className="modal-input" placeholder="you@example.com" type="email" />
              </div>

              <div className="modal-field">
                <label className="modal-label">Password</label>
                <input className="modal-input" placeholder="••••••••" type="password" />
              </div>

              <motion.button
                className="modal-submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSignUp ? 'Create account' : 'Sign in'}
              </motion.button>

              <div className="modal-divider">or continue with</div>

              <div className="modal-oauth">
                {[
                  { icon: '🌐', label: 'Continue with Google' },
                  { icon: '🐙', label: 'Continue with GitHub' },
                ].map(o => (
                  <motion.button
                    key={o.label}
                    className="oauth-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>{o.icon}</span>
                    {o.label}
                  </motion.button>
                ))}
              </div>

              <div className="modal-footer-text">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span onClick={() => setIsSignUp(v => !v)}>
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
