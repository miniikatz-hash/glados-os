import { useState, useEffect } from 'react';
import {
  Brain, Search, Lightbulb, Zap, Monitor, Database, Code,
  BarChart3, FileText, Users, MessageSquare, Mic, Clock,
  Mail, Globe, Plug, Bell, Target, Menu, X,
  Check, Minus, ArrowRight, Send, Shield, Cpu, Rocket,
  FileCheck, Workflow, BarChart2, AlertTriangle,
  MessageCircle, Banknote, Archive, UserCheck, Server,
  ShoppingCart, Scale
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PrivacyPage, TermsPage } from './LegalPages';

// ============================================
// Types
// ============================================

interface Capability {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Product {
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

interface ComparisonRow {
  feature: string;
  traditional: boolean | string;
  other: boolean | string;
  glados: boolean;
}

interface Step {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

// ============================================
// Data
// ============================================

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Enterprise', href: '#enterprise' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const STATS = [
  { value: '18+', label: 'Capabilities' },
  { value: '3', label: 'Industries' },
  { value: '∞', label: 'Self-Learning' },
  { value: '0', label: 'Limits' },
];

const CAPABILITIES: Capability[] = [
  { icon: Brain, title: 'Continuous Learning', desc: 'Learns and improves from every message you send, permanently' },
  { icon: Search, title: 'Autonomous Research', desc: 'Searches, reads, synthesizes and reports on any topic in real time' },
  { icon: Lightbulb, title: 'Problem Solving', desc: 'Breaks down complex problems and executes multi-step solutions' },
  { icon: Zap, title: 'Task Automation', desc: 'Handles repetitive workflows across apps and systems' },
  { icon: Monitor, title: 'Desktop & App Control', desc: 'Controls your computer, opens apps, fills forms, sends messages' },
  { icon: Database, title: 'Memory & Context', desc: 'Remembers your preferences, history, and past decisions permanently' },
  { icon: Code, title: 'Code Generation & Execution', desc: 'Writes, tests, and runs code autonomously' },
  { icon: BarChart3, title: 'Data Analysis', desc: 'Processes spreadsheets, databases, and reports instantly' },
  { icon: FileText, title: 'Document Intelligence', desc: 'Reads, summarizes, and extracts insight from any document' },
  { icon: Users, title: 'Multi-Agent Orchestration', desc: 'Deploys teams of specialized sub-agents for complex tasks' },
  { icon: MessageSquare, title: 'Natural Language Commands', desc: 'Plain text is all you need, zero technical knowledge required' },
  { icon: Mic, title: 'Voice Integration', desc: 'Understands and responds to voice input natively' },
  { icon: Clock, title: 'Scheduled Automation', desc: 'Runs tasks on a schedule without being asked' },
  { icon: Mail, title: 'Email & Communication', desc: 'Drafts, sends, and manages all communications' },
  { icon: Globe, title: 'Web Browsing & Scraping', desc: 'Navigates websites and extracts structured information' },
  { icon: Plug, title: 'API Integration', desc: 'Connects to any service or platform with an API' },
  { icon: Bell, title: 'Real-Time Monitoring & Alerts', desc: 'Watches for changes and notifies you instantly' },
  { icon: Target, title: 'Decision Support', desc: 'Analyzes options and recommends best actions with full reasoning' },
];

const PRODUCTS: Product[] = [
  {
    badge: 'Available Now · Beta',
    badgeColor: 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/20',
    title: 'GladOS Agent Core',
    desc: 'Our flagship self-learning AI agent. Grows smarter with every conversation. Handles research, automation, communication, and complex reasoning — all from a simple chat interface. Deployable for individuals, teams, and enterprises.',
    icon: Cpu,
  },
  {
    badge: 'In Development',
    badgeColor: 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20',
    title: 'GameHub AI',
    desc: 'Complete gaming center management software powered by AI. Handles bookings, billing, customer analytics, staff scheduling, inventory, and loyalty programs. The agent monitors everything in real time and flags issues before they happen.',
    icon: Rocket,
  },
  {
    badge: 'Enterprise · Government',
    badgeColor: 'bg-white/10 text-white/80 border-white/10',
    title: 'GovOS',
    desc: 'AI infrastructure for government agencies and large enterprises. Automates citizen services, processes applications, manages internal workflows, generates compliance reports, and provides decision support for leadership — with full data sovereignty and on-premise deployment options.',
    icon: Shield,
  },
];

const GOV_USE_CASES: { icon: LucideIcon; text: string }[] = [
  { icon: MessageCircle, text: 'Citizen service request processing and routing' },
  { icon: FileCheck, text: 'Document verification and processing automation' },
  { icon: Workflow, text: 'Internal workflow and approval automation' },
  { icon: BarChart2, text: 'Real-time data analysis and reporting dashboards' },
  { icon: AlertTriangle, text: 'Compliance monitoring and alert systems' },
  { icon: Users, text: 'Inter-department communication and task coordination' },
  { icon: Banknote, text: 'Budget analysis and financial reporting' },
  { icon: Archive, text: 'Public records management and retrieval' },
  { icon: UserCheck, text: 'HR onboarding and employee management automation' },
  { icon: Server, text: 'IT helpdesk and infrastructure monitoring' },
  { icon: ShoppingCart, text: 'Procurement and vendor management automation' },
  { icon: Scale, text: 'Policy research and impact analysis' },
];

const HOW_IT_WORKS: Step[] = [
  {
    num: '01',
    title: 'Connect',
    desc: 'Deploy GladOS Agent in minutes via our platform or API.',
    icon: Plug,
  },
  {
    num: '02',
    title: 'Teach',
    desc: 'Talk to it naturally. Every interaction makes it smarter and more personalized to you.',
    icon: Brain,
  },
  {
    num: '03',
    title: 'Automate',
    desc: 'It handles tasks, researches problems, and takes action while you focus on what matters.',
    icon: Zap,
  },
];

const COMPARISON: ComparisonRow[] = [
  { feature: 'Learns from every interaction', traditional: false, other: 'partial', glados: true },
  { feature: 'Takes real-world action', traditional: false, other: 'partial', glados: true },
  { feature: 'Researches autonomously', traditional: false, other: true, glados: true },
  { feature: 'Works across industries', traditional: true, other: false, glados: true },
  { feature: 'On-premise deployment option', traditional: true, other: false, glados: true },
  { feature: 'Self-improving over time', traditional: false, other: 'partial', glados: true },
  { feature: 'No coding required', traditional: false, other: true, glados: true },
  { feature: 'Multi-agent orchestration', traditional: false, other: false, glados: true },
];

// ============================================
// Hooks
// ============================================

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const els = document.querySelectorAll('[data-animate]');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

// ============================================
// Social Icons (SVG)
// ============================================

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function XTwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ============================================
// Cell Renderer for Comparison Table
// ============================================

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-[#00e5ff]/15 border border-[#00e5ff]/40 flex items-center justify-center">
          <Check size={14} className="text-[#00e5ff]" strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (value === 'partial') {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center">
          <Minus size={14} className="text-white/30" strokeWidth={2} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center">
      <div className="w-7 h-7 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center">
        <X size={12} className="text-white/20" strokeWidth={2.5} />
      </div>
    </div>
  );
}

// ============================================
// Navbar
// ============================================

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#020608]/70 backdrop-blur-2xl border-b border-[#00e5ff]/8 shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="font-syne text-xl font-bold tracking-tight">
            <span className="text-[#00e5ff]">GladOS</span>
            <span className="text-white/60 ml-1">AI</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link font-dm text-[13px] text-white/50 hover:text-[#00e5ff] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a href="#contact" className="btn-outline-cyan font-dm">
              Request Access
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white/70 hover:text-[#00e5ff] transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#020608]/95 backdrop-blur-2xl border-t border-[#00e5ff]/8 px-6 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 font-dm text-sm text-white/50 hover:text-[#00e5ff] transition-colors border-b border-white/5 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4">
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block text-center btn-outline-cyan font-dm"
            >
              Request Access
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ============================================
// Hero Section
// ============================================

function HeroSection() {
  return (
    <>
      <section id="product" className="relative min-h-screen pt-[72px] pb-20 lg:pb-28 overflow-visible">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full overflow-visible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 min-h-[calc(100vh-72px)] overflow-visible">
            {/* Left: Content — centered vertically within its column */}
            <div className="flex flex-col justify-center relative z-[1] max-w-[560px] py-10 lg:py-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#00e5ff]/15 bg-[#00e5ff]/5 mb-8 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] pulse-dot" />
                <span className="font-dm text-[11px] tracking-wider text-[#00e5ff]/80 uppercase">
                  Next Generation AI · 2026
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-syne text-[clamp(2.4rem,5.5vw,4.2rem)] font-bold leading-[1.08] mb-8 tracking-tight">
                The Agent That
                <br />
                <span className="gradient-text">Never Stops Learning</span>
              </h1>

              {/* Subheadline */}
              <p className="font-dm text-[15px] text-white/40 max-w-[460px] mb-10 leading-[1.8]">
                A self-evolving AI agent platform that researches, reasons, and
                solves real problems — for individuals, enterprises, and
                governments.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary font-dm text-sm inline-flex items-center gap-2">
                  Get Early Access
                  <ArrowRight size={16} />
                </a>
                <a href="#how-it-works" className="btn-outline font-dm text-sm">
                  See How It Works
                </a>
              </div>
            </div>

            {/* Right: Spline Robot — fills entire column, large and dominant */}
            <div className="spline-container lg:translate-x-[40px]">
              {/* @ts-expect-error — Spline web component loaded via script tag */}
              <spline-viewer
                url="https://prod.spline.design/TK3HLlgG1fNUehMu/scene.splinecode"
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
              {/* Click-block overlay: prevents redirect to Spline site */}
              <div className="spline-click-blocker" />
              {/* Watermark cover: hides "Built with Spline" badge */}
              <div className="spline-watermark-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="relative border-y border-[#00e5ff]/8 bg-[#00e5ff]/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center" data-animate data-delay={String(i + 1)}>
                <div className="font-syne text-3xl md:text-4xl font-bold text-[#00e5ff] glow-text mb-1">
                  {stat.value}
                </div>
                <div className="font-dm text-xs text-white/30 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================
// What Is Section
// ============================================

function WhatIsSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div data-animate>
            <span className="section-label">About</span>
          </div>
          <h2
            className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 mb-10 leading-tight"
            data-animate
            data-delay="1"
          >
            What Is{' '}
            <span className="gradient-text-subtle">GladOS AI</span>?
          </h2>
          <p
            className="font-dm text-[15px] md:text-base text-white/40 leading-[1.85] max-w-3xl mx-auto"
            data-animate
            data-delay="2"
          >
            GladOS AI is building a new category of artificial intelligence —
            self-evolving agents that learn continuously from every interaction.
            Unlike static AI tools, our agents grow smarter with every
            conversation, autonomously research any topic, adapt to your
            workflow, and take real action in the world. Built from the ground
            up, not on top of existing frameworks.
          </p>
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// Capabilities Section
// ============================================

function CapabilitiesSection() {
  return (
    <section id="solutions" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-animate>
          <span className="section-label">Solutions</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 leading-tight">
            Core Agent <span className="gradient-text-subtle">Capabilities</span>
          </h2>
          <p className="font-dm text-[15px] text-white/35 mt-5 max-w-2xl mx-auto leading-relaxed">
            Eighteen distinct capabilities working together as one intelligent system.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {CAPABILITIES.map((cap, i) => {
            const Icon = cap.icon;
            const delay = String((i % 6) + 1);
            return (
              <div
                key={cap.title}
                className="glass-card p-6 lg:p-7 group"
                data-animate
                data-delay={delay}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#00e5ff]/8 border border-[#00e5ff]/15 flex items-center justify-center group-hover:bg-[#00e5ff]/15 group-hover:border-[#00e5ff]/30 transition-all duration-300">
                    <Icon size={18} className="text-[#00e5ff]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-syne text-[15px] font-semibold text-white/90 mb-2 group-hover:text-[#00e5ff] transition-colors duration-300">
                      {cap.title}
                    </h3>
                    <p className="font-dm text-xs text-white/30 leading-[1.7]">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// Products Section
// ============================================

function ProductsSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-animate>
          <span className="section-label">Products</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 leading-tight">
            Built for <span className="gradient-text-subtle">Every Scale</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <div
                key={product.title}
                className="glass-card p-8 lg:p-10 flex flex-col group"
                data-animate
                data-delay={String(i + 1)}
              >
                <div className="mb-6">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-dm border ${product.badgeColor}`}
                  >
                    {product.badge}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#00e5ff]/8 border border-[#00e5ff]/15 flex items-center justify-center mb-5 group-hover:bg-[#00e5ff]/12 group-hover:border-[#00e5ff]/25 transition-all duration-300">
                  <Icon size={22} className="text-[#00e5ff]" strokeWidth={1.5} />
                </div>
                <h3 className="font-syne text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-[#00e5ff] transition-colors duration-300">
                  {product.title}
                </h3>
                <p className="font-dm text-xs text-white/35 leading-[1.8] flex-grow">
                  {product.desc}
                </p>
                <div className="mt-8 pt-6 border-t border-white/5">
                  <a
                    href="#contact"
                    className="font-dm text-xs text-[#00e5ff]/70 hover:text-[#00e5ff] transition-colors inline-flex items-center gap-1.5"
                  >
                    Learn more
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// Government & Enterprise Section
// ============================================

function GovernmentSection() {
  return (
    <section id="enterprise" className="relative py-24 lg:py-32">
      {/* Dark panel background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00e5ff]/[0.015] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20" data-animate>
          <span className="section-label">Enterprise & Government</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 leading-tight max-w-3xl mx-auto">
            Built for the Scale of{' '}
            <span className="gradient-text-subtle">Enterprises and Governments</span>
          </h2>
          <p className="font-dm text-[15px] text-white/35 mt-6 max-w-2xl mx-auto leading-[1.8]">
            GladOS AI agents are self-learning systems designed to handle the
            complexity, security requirements, and scale that enterprises and
            governments demand. Every interaction makes them smarter — continuously
            adapting to your organization's unique workflows and needs.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOV_USE_CASES.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <div
                key={uc.text}
                className="glass-card p-5 flex items-center gap-4 group"
                data-animate
                data-delay={String((i % 4) + 1)}
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00e5ff]/8 border border-[#00e5ff]/12 flex items-center justify-center group-hover:bg-[#00e5ff]/12 group-hover:border-[#00e5ff]/25 transition-all duration-300">
                  <Icon size={15} className="text-[#00e5ff]/70" strokeWidth={1.5} />
                </div>
                <span className="font-dm text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  {uc.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// How It Works Section
// ============================================

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-animate>
          <span className="section-label">How It Works</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 leading-tight">
            Three Steps to{' '}
            <span className="gradient-text-subtle">Intelligence</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#00e5ff]/20 to-transparent" />

          {HOW_IT_WORKS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="glass-card p-8 lg:p-10 text-center group relative"
                data-animate
                data-delay={String(i + 1)}
              >
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00e5ff]/8 border border-[#00e5ff]/15 mb-6 group-hover:bg-[#00e5ff]/12 group-hover:border-[#00e5ff]/30 transition-all duration-300 relative z-10">
                  <Icon size={24} className="text-[#00e5ff]" strokeWidth={1.5} />
                </div>
                <div className="font-dm text-[11px] text-[#00e5ff]/40 uppercase tracking-[0.2em] mb-3">
                  Step {step.num}
                </div>
                <h3 className="font-syne text-2xl font-bold text-white mb-4 group-hover:text-[#00e5ff] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-dm text-xs text-white/35 leading-[1.8]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// Comparison Section
// ============================================

function ComparisonSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20" data-animate>
          <span className="section-label">Why Us</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-5 leading-tight">
            Why We're <span className="gradient-text-subtle">Different</span>
          </h2>
        </div>

        {/* Table */}
        <div className="glass-card-static overflow-x-auto" data-animate data-delay="1">
          <div className="min-w-[600px]">
          {/* Table Header */}
          <div className="grid grid-cols-4 border-b border-[#00e5ff]/10">
            <div className="p-4 lg:p-5">
              <span className="font-dm text-[11px] text-white/30 uppercase tracking-wider">Feature</span>
            </div>
            <div className="p-4 lg:p-5 text-center border-l border-white/5">
              <span className="font-dm text-[11px] text-white/30 uppercase tracking-wider">Traditional Software</span>
            </div>
            <div className="p-4 lg:p-5 text-center border-l border-white/5">
              <span className="font-dm text-[11px] text-white/30 uppercase tracking-wider">Other AI Tools</span>
            </div>
            <div className="p-4 lg:p-5 text-center border-l border-[#00e5ff]/15 bg-[#00e5ff]/[0.03]">
              <span className="font-dm text-[11px] text-[#00e5ff] uppercase tracking-wider font-medium">GladOS AI</span>
            </div>
          </div>

          {/* Table Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-4 ${
                i < COMPARISON.length - 1 ? 'border-b border-white/[0.03]' : ''
              } hover:bg-white/[0.01] transition-colors duration-200`}
            >
              <div className="p-4 lg:p-5">
                <span className="font-dm text-xs text-white/50">{row.feature}</span>
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center border-l border-white/5">
                <ComparisonCell value={row.traditional} />
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center border-l border-white/5">
                <ComparisonCell value={row.other} />
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-center border-l border-[#00e5ff]/10 bg-[#00e5ff]/[0.02]">
                <ComparisonCell value={row.glados} />
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      <div className="section-divider mt-24 lg:mt-32" />
    </section>
  );
}

// ============================================
// Contact Section
// ============================================

function ContactSection() {
  return (
    <section id="contact" className="relative py-28 lg:py-36">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14" data-animate>
          <span className="section-label">Get In Touch</span>
          <h2 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold mt-6 leading-tight">
            Request <span className="gradient-text-subtle">Early Access</span>
          </h2>
          <p className="font-dm text-[15px] text-white/35 mt-5 max-w-lg mx-auto leading-[1.8]">
            GladOS AI is currently under active development. Reach out to learn
            more about early access, partnerships, and enterprise deployments.
            Access is not guaranteed — we onboard selectively.
          </p>
        </div>

        {/* Email Card */}
        <div
          className="glass-card-static p-10 lg:p-14 text-center"
          data-animate
          data-delay="1"
        >
          <div className="w-14 h-14 rounded-2xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 flex items-center justify-center mx-auto mb-7">
            <Mail size={22} className="text-[#00e5ff]" strokeWidth={1.5} />
          </div>
          <h3 className="font-syne text-lg font-semibold text-white/80 mb-3">
            Email Us Directly
          </h3>
          <p className="font-dm text-sm text-white/30 mb-8 leading-relaxed max-w-md mx-auto">
            For early access inquiries, enterprise partnerships, or any questions —
            drop us an email and we'll get back to you.
          </p>
          <a
            href="mailto:Glados-ai-dev@proton.me"
            className="btn-primary font-dm text-sm inline-flex items-center gap-2.5"
          >
            <Send size={15} />
            Glados-ai-dev@proton.me
          </a>
          <div className="mt-10 pt-7 border-t border-white/5">
            <p className="font-dm text-[11px] text-white/20 leading-relaxed max-w-sm mx-auto">
              GladOS AI is still under development. Early access is invite-only
              and not guaranteed. We review every request individually.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Footer
// ============================================

function FooterSection() {
  return (
    <footer className="relative border-t border-[#00e5ff]/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Logo + Tagline */}
          <div>
            <a href="#" className="font-syne text-xl font-bold tracking-tight inline-block mb-3">
              <span className="text-[#00e5ff]">GladOS</span>
              <span className="text-white/60 ml-1">AI</span>
            </a>
            <p className="font-dm text-xs text-white/25 leading-relaxed">
              The agent that never stops learning.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-center gap-3">
            <a href="#privacy" className="font-dm text-xs text-white/30 hover:text-[#00e5ff] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="font-dm text-xs text-white/30 hover:text-[#00e5ff] transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="font-dm text-xs text-white/30 hover:text-[#00e5ff] transition-colors">
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-white/25 hover:text-[#00e5ff] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                className="text-white/25 hover:text-[#00e5ff] transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <XTwitterIcon />
              </a>
              <a
                href="#"
                className="text-white/25 hover:text-[#00e5ff] transition-colors duration-300"
                aria-label="GitHub"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="font-dm text-[11px] text-white/15">
            © 2026 GladOS AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// Hash Router
// ============================================

function useHash() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

// ============================================
// Main Page (separate component so hooks are never conditional)
// ============================================

function MainPage({ currentHash }: { currentHash: string }) {
  useScrollAnimation();

  useEffect(() => {
    // If there's a section hash, scroll to it after the page mounts
    if (currentHash) {
      const id = currentHash.slice(1); // remove #
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    // No hash or invalid hash — go to top
    window.scrollTo(0, 0);
  }, [currentHash]);

  return (
    <>
      <main>
        <HeroSection />
        <WhatIsSection />
        <CapabilitiesSection />
        <ProductsSection />
        <GovernmentSection />
        <HowItWorksSection />
        <ComparisonSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}

// ============================================
// Main App
// ============================================

export default function App() {
  const hash = useHash();

  return (
    <div className="bg-[#020608] text-white min-h-screen noise-overlay grid-bg">
      <Navbar />
      {hash === '#privacy' ? (
        <PrivacyPage />
      ) : hash === '#terms' ? (
        <TermsPage />
      ) : (
        <MainPage currentHash={hash} />
      )}
    </div>
  );
}
