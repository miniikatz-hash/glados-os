import { useState, useEffect, useMemo, useCallback } from 'react';

// ============================================
// Shared TOC Data Types
// ============================================
interface TocItem {
  id: string;
  label: string;
}

// ============================================
// useActiveSection Hook — scroll-based for accuracy
// ============================================
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableIds = ids.join(',');

  useEffect(() => {
    const OFFSET = 120; // navbar + breathing room

    function update() {
      // Near bottom of page? Force last section active
      const atBottom = (window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 100);
      if (atBottom && ids.length > 0) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0] || '';
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= OFFSET) {
            current = ids[i];
            break;
          }
        }
      }
      setActive(current);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [stableIds, ids]);

  return active;
}

// ============================================
// LegalLayout
// ============================================
function LegalLayout({
  toc,
  children,
}: {
  toc: TocItem[];
  children: React.ReactNode;
}) {
  const ids = useMemo(() => toc.map((t) => t.id), [toc]);
  const active = useActiveSection(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="legal-layout">
      {/* Desktop Sidebar */}
      <nav className="legal-sidebar">
        <div className="legal-sidebar-title">On This Page</div>
        {toc.map((t) => (
          <button
            key={t.id}
            onClick={() => scrollTo(t.id)}
            className={`legal-toc-item${active === t.id ? ' active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="legal-content">
        {/* Mobile TOC */}
        <div className="legal-mobile-toc">
          <button
            className="legal-mobile-toc-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '▲ Close Table of Contents' : '▼ Table of Contents'}
          </button>
          {mobileOpen && (
            <div className="legal-mobile-toc-list">
              {toc.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { scrollTo(t.id); setMobileOpen(false); }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {children}

        {/* Legal footer */}
        <div className="legal-footer">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#">Back to Home</a>
        </div>
      </div>
    </div>
  );
}

// ============================================
// PRIVACY POLICY PAGE
// ============================================

const PRIVACY_TOC: TocItem[] = [
  { id: 'p-who', label: 'Who We Are' },
  { id: 'p-collect', label: 'Information We Collect' },
  { id: 'p-deploy', label: 'Cloud vs Local Deployment' },
  { id: 'p-use', label: 'How We Use Your Info' },
  { id: 'p-share', label: 'Data Sharing & Disclosure' },
  { id: 'p-retain', label: 'Data Retention' },
  { id: 'p-rights', label: 'Your Rights' },
  { id: 'p-cookies', label: 'Cookies & Tracking' },
  { id: 'p-security', label: 'Security Measures' },
  { id: 'p-children', label: "Children's Privacy" },
  { id: 'p-intl', label: 'International Transfers' },
  { id: 'p-third', label: 'Third Party Links' },
  { id: 'p-changes', label: 'Changes to Policy' },
  { id: 'p-contact', label: 'Contact Us' },
];

export function PrivacyPage() {
  return (
    <LegalLayout toc={PRIVACY_TOC}>
      <h1>
        GladOS AI — <span className="cyan">Privacy Policy</span>
      </h1>
      <div className="legal-date">
        Last Updated: May 2026 <span>Effective Date: May 2026</span>
      </div>

      <div className="legal-intro">
        <p>
          GladOS AI is committed to protecting the privacy and security of every
          individual and organization that interacts with our platform. This
          Privacy Policy describes in detail how GladOS AI (&quot;we&quot;,
          &quot;us&quot;, &quot;our&quot;, &quot;the Company&quot;) collects,
          processes, uses, stores, shares, and protects information obtained
          through our website, platform, products, APIs, and services
          (collectively, the &quot;Services&quot;). By accessing or using our
          Services, you acknowledge that you have read, understood, and agree to
          the practices described in this Policy.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-who">
        <h2>
          <span className="lnum">01</span>Who We Are
        </h2>
        <p>
          GladOS AI is an artificial intelligence technology company developing
          self-evolving agent systems for individuals, businesses, enterprises,
          and government entities. Our products include the GladOS Agent Core,
          GameHub AI, and GovOS. We operate globally and serve clients across
          multiple industries.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-collect">
        <h2>
          <span className="lnum">02</span>Information We Collect
        </h2>

        <h3>2.1 Information You Provide Directly</h3>
        <ul>
          <li>Full name and contact details (email address, phone number, organization name)</li>
          <li>Account credentials (username, password — stored in hashed form only)</li>
          <li>Messages, instructions, and tasks submitted to the GladOS agent</li>
          <li>Files, documents, and data uploaded to the platform</li>
          <li>Communications with our support team</li>
          <li>Information submitted via contact or waitlist forms</li>
        </ul>

        <h3>2.2 Information Collected Automatically (Cloud Users Only)</h3>
        <ul>
          <li>IP address and approximate geographic location</li>
          <li>Browser type, version, and operating system</li>
          <li>Device identifiers and hardware specifications</li>
          <li>Session duration, pages visited, features used</li>
          <li>Error logs and crash reports</li>
          <li>Interaction patterns with the AI agent (used solely for improving the system)</li>
        </ul>

        <h3>2.3 Information From Third Parties</h3>
        <ul>
          <li>If you connect third-party services (email, calendar, APIs) to GladOS AI, we may receive data from those services as authorized by you</li>
          <li>Publicly available business information for enterprise onboarding verification</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-deploy">
        <h2>
          <span className="lnum">03</span>Cloud vs Local Deployment
        </h2>
        <p>
          GladOS AI offers two deployment modes. Your privacy rights and data handling differ significantly:
        </p>

        <div className="legal-compare">
          <div className="legal-compare-card legal-compare-cloud">
            <h4>☁ Cloud Deployment</h4>
            <ul>
              <li>Data is transmitted to and processed on our secure servers</li>
              <li>We implement AES-256 encryption at rest, TLS 1.3 in transit</li>
              <li>Interaction data may be used in anonymized, aggregated form to improve models</li>
              <li>Cloud usage carries inherent risks including data transmission vulnerabilities and third-party infrastructure dependencies</li>
              <li>We cannot guarantee absolute security of data transmitted over the internet</li>
              <li>You use cloud-based features at your own risk</li>
            </ul>
          </div>
          <div className="legal-compare-card legal-compare-local">
            <h4>🔒 Local Deployment</h4>
            <ul>
              <li>Data never leaves your machine or private network</li>
              <li>GladOS AI makes zero network calls to external servers</li>
              <li>We have no access to your data, conversations, or files</li>
              <li>Complete data sovereignty guaranteed</li>
              <li>You are responsible for your own infrastructure security</li>
              <li>We cannot support data loss within your local environment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-use">
        <h2>
          <span className="lnum">04</span>How We Use Your Information
        </h2>
        <ul>
          <li>To operate, maintain, and improve the GladOS AI platform and agent capabilities</li>
          <li>To personalize your experience and enable continuous learning features</li>
          <li>To process and fulfill your requests, tasks, and instructions</li>
          <li>To communicate regarding your account, updates, and service changes</li>
          <li>To send technical notices, security alerts, and support messages</li>
          <li>To detect, investigate, and prevent fraudulent or illegal activity</li>
          <li>To comply with applicable laws, regulations, and legal obligations</li>
          <li>To enforce our Terms of Service and other agreements</li>
          <li>To conduct internal research and development with anonymized data</li>
          <li>To generate aggregate, anonymized analytics about platform usage</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-share">
        <h2>
          <span className="lnum">05</span>Data Sharing and Disclosure
        </h2>

        <h3>5.1 We Do Not Sell Your Data</h3>
        <p>
          GladOS AI does not sell, rent, trade, or otherwise transfer your personal information to third parties for their marketing or commercial purposes. Ever.
        </p>

        <h3>5.2 Service Providers</h3>
        <p>
          We may share data with trusted third-party vendors who assist in operating our platform (hosting, analytics, security, payment processing) under strict confidentiality and data processing agreements.
        </p>

        <h3>5.3 Legal Requirements</h3>
        <p>We may disclose your information if required by law, court order, or government regulation, or to protect the rights, property, or safety of GladOS AI, our users, or the public.</p>

        <h3>5.4 Business Transfers</h3>
        <p>
          In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your data becomes subject to a different privacy policy.
        </p>

        <h3>5.5 With Your Consent</h3>
        <p>We may share your information in other ways if you have explicitly given us consent.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-retain">
        <h2>
          <span className="lnum">06</span>Data Retention
        </h2>
        <ul>
          <li><strong className="text-white/70">Cloud users:</strong> Data retained for duration of account plus 90 days after deletion request, then permanently deleted</li>
          <li><strong className="text-white/70">Anonymized data:</strong> Aggregate data may be retained indefinitely for research</li>
          <li><strong className="text-white/70">Local deployment:</strong> We retain no data — nothing reaches our servers</li>
          <li><strong className="text-white/70">Backup copies:</strong> May persist up to 30 additional days for disaster recovery</li>
          <li>Request early deletion anytime at privacy@gladosai.com</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-rights">
        <h2>
          <span className="lnum">07</span>Your Rights and Choices
        </h2>
        <ul>
          <li><strong className="text-white/70">Right to Access</strong> — Request a copy of all personal data we hold</li>
          <li><strong className="text-white/70">Right to Rectification</strong> — Request correction of inaccurate data</li>
          <li><strong className="text-white/70">Right to Erasure</strong> — Request permanent deletion</li>
          <li><strong className="text-white/70">Right to Portability</strong> — Receive data in structured, machine-readable format</li>
          <li><strong className="text-white/70">Right to Restriction</strong> — Request limited processing</li>
          <li><strong className="text-white/70">Right to Object</strong> — Object to processing based on legitimate interests</li>
          <li><strong className="text-white/70">Right to Withdraw Consent</strong> — Withdraw consent at any time</li>
          <li><strong className="text-white/70">Right to Complain</strong> — File a complaint with data protection authorities</li>
        </ul>
        <p>Contact privacy@gladosai.com to exercise any right. We respond within 30 days.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-cookies">
        <h2>
          <span className="lnum">08</span>Cookies and Tracking
        </h2>
        <ul>
          <li>Essential cookies necessary for platform functionality</li>
          <li>Analytics cookies to understand user interaction (opt-out available)</li>
          <li>No advertising or tracking cookies</li>
          <li>Control preferences through browser settings</li>
          <li>Disabling essential cookies may affect functionality</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-security">
        <h2>
          <span className="lnum">09</span>Security Measures
        </h2>
        <ul>
          <li>AES-256 encryption for data at rest (cloud)</li>
          <li>TLS 1.3 encryption for all data in transit (cloud)</li>
          <li>Regular third-party security audits and penetration testing</li>
          <li>Strict internal access controls</li>
          <li>Incident response with user notification within 72 hours of confirmed breach</li>
        </ul>
        <div className="legal-disclaimer">
          <p>No security system is impenetrable. We cannot guarantee absolute security of data transmitted over the internet. Cloud usage is at user's own risk.</p>
        </div>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-children">
        <h2>
          <span className="lnum">10</span>Children's Privacy
        </h2>
        <p>
          GladOS AI services are not directed at individuals under 18. We do not knowingly collect personal information from minors. If we become aware that a minor has provided information, we will delete it immediately.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-intl">
        <h2>
          <span className="lnum">11</span>International Data Transfers
        </h2>
        <p>
          GladOS AI operates globally. By using our Services, you acknowledge that your information may be processed in countries other than your own. We ensure appropriate safeguards for all international transfers.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-third">
        <h2>
          <span className="lnum">12</span>Third Party Links
        </h2>
        <p>
          Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices. Review their policies before sharing data.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-changes">
        <h2>
          <span className="lnum">13</span>Changes to This Policy
        </h2>
        <ul>
          <li>Update the &quot;Last Updated&quot; date at the top of this page</li>
          <li>Send email notification to registered users</li>
          <li>Display prominent notice on our platform for 30 days</li>
        </ul>
        <p>Continued use after changes constitutes acceptance.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="p-contact">
        <h2>
          <span className="lnum">14</span>Contact Us
        </h2>
        <div className="legal-hl">
          <div className="hl-label">GladOS AI Privacy Team</div>
          <p>
            Email: <a href="mailto:privacy@gladosai.com">privacy@gladosai.com</a>
            <br />
            For urgent privacy concerns, mark subject: URGENT — PRIVACY
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}

// ============================================
// TERMS OF SERVICE PAGE
// ============================================

const TERMS_TOC: TocItem[] = [
  { id: 't-accept', label: 'Acceptance of Terms' },
  { id: 't-services', label: 'Description of Services' },
  { id: 't-eligible', label: 'Eligibility' },
  { id: 't-account', label: 'Account & Security' },
  { id: 't-use', label: 'Acceptable Use' },
  { id: 't-ai', label: 'AI Agent Limitations' },
  { id: 't-ip', label: 'Intellectual Property' },
  { id: 't-privacy', label: 'Privacy' },
  { id: 't-fees', label: 'Fees & Billing' },
  { id: 't-beta', label: 'Free Trial & Beta' },
  { id: 't-third', label: 'Third Party Integrations' },
  { id: 't-terminate', label: 'Termination' },
  { id: 't-warranty', label: 'Disclaimer of Warranties' },
  { id: 't-liability', label: 'Limitation of Liability' },
  { id: 't-indemnify', label: 'Indemnification' },
  { id: 't-law', label: 'Governing Law' },
  { id: 't-force', label: 'Force Majeure' },
  { id: 't-sever', label: 'Severability' },
  { id: 't-entire', label: 'Entire Agreement' },
  { id: 't-changes', label: 'Changes to Terms' },
  { id: 't-contact', label: 'Contact Information' },
];

export function TermsPage() {
  return (
    <LegalLayout toc={TERMS_TOC}>
      <h1>
        GladOS AI — <span className="cyan">Terms of Service</span>
      </h1>
      <div className="legal-date">
        Last Updated: May 2026 <span>Effective Date: May 2026</span>
      </div>

      <div className="legal-intro">
        <p>
          These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally
          binding agreement between you (&quot;User&quot;, &quot;you&quot;, &quot;your&quot;) and GladOS AI
          (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;). By accessing, registering for, or
          using any GladOS AI product, platform, API, or service, you confirm that you
          have read, understood, and agree to be bound by these Terms in their entirety.
          If you do not agree with any part of these Terms, you must immediately
          discontinue use of our Services.
        </p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-accept">
        <h2><span className="lnum">01</span>Acceptance of Terms</h2>
        <p>These Terms apply to all users including individuals, businesses, enterprises, government entities, and developers accessing our platform via API. Use of our Services constitutes full acceptance. We reserve the right to refuse service to anyone for any reason at any time.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-services">
        <h2><span className="lnum">02</span>Description of Services</h2>
        <p>GladOS AI provides proprietary self-evolving AI agent technology:</p>
        <ul>
          <li><strong className="text-white/70">GladOS Agent Core</strong> — Continuously learning AI agent: research, automation, desktop control, communication, code generation, data analysis, problem solving</li>
          <li><strong className="text-white/70">GameHub AI</strong> — AI-powered gaming center management: bookings, billing, analytics, staff scheduling, inventory, loyalty (in development)</li>
          <li><strong className="text-white/70">GovOS</strong> — Enterprise/government AI infrastructure: citizen services, workflow automation, compliance, decision support, on-premise deployment</li>
        </ul>
        <p>Services accessed via web platform, API, or local deployment depending on subscription tier.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-eligible">
        <h2><span className="lnum">03</span>Eligibility</h2>
        <ul>
          <li>Be at least 18 years of age</li>
          <li>Have legal capacity to enter into a binding agreement</li>
          <li>If registering for an organization: have full legal authority to bind it</li>
          <li>Not be located where AI agent services are prohibited</li>
          <li>Not be subject to sanctions or export restrictions</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-account">
        <h2><span className="lnum">04</span>Account Registration and Security</h2>
        <ul>
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain confidentiality of account credentials</li>
          <li>Notify us immediately of unauthorized access</li>
          <li>You are fully responsible for all activity under your account</li>
          <li>GladOS AI is not liable for losses from credential failures</li>
          <li>We may terminate accounts with fraudulent information</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-use">
        <h2><span className="lnum">05</span>Acceptable Use Policy</h2>
        <p>You must NOT:</p>
        <ul>
          <li>Conduct, facilitate, or promote illegal activities</li>
          <li>Harass, threaten, defame, or harm any individual or group</li>
          <li>Reverse engineer, decompile, or extract source code from our models</li>
          <li>Generate spam or deceptive automated content at scale</li>
          <li>Circumvent or interfere with security features</li>
          <li>Create deepfakes or impersonate individuals</li>
          <li>Resell access without written permission</li>
          <li>Train competing AI models using our Services</li>
          <li>Submit false data to manipulate agent behavior</li>
          <li>Overload or disrupt platform infrastructure</li>
          <li>Violate applicable laws or industry standards</li>
        </ul>
        <p>Violation may result in immediate suspension or termination without refund.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-ai">
        <h2><span className="lnum">06</span>AI Agent Behavior, Limitations, and Disclaimer</h2>
        <ul>
          <li>Agent outputs should be reviewed before acting in critical situations</li>
          <li>Continuous learning means behavior evolves over time — responses may vary across sessions</li>
          <li>GladOS AI is not a substitute for professional legal, medical, or financial advice</li>
          <li>Users are solely responsible for verifying accuracy of agent outputs</li>
          <li>GladOS AI is not liable for decisions made based on agent outputs</li>
          <li>Desktop control features require your authorization — you accept full responsibility</li>
          <li>Automation success is not guaranteed in all environments</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-ip">
        <h2><span className="lnum">07</span>Intellectual Property Rights</h2>
        <h3>7.1 GladOS AI Ownership</h3>
        <p>GladOS AI retains all rights to the Services, including models, algorithms, software, designs, and trademarks. Nothing transfers ownership to you.</p>
        <h3>7.2 Your Content</h3>
        <p>You retain ownership of all content you submit. By using cloud Services, you grant GladOS AI a limited, non-exclusive license to process content solely to provide Services.</p>
        <h3>7.3 Feedback</h3>
        <p>Suggestions or feedback may be used by GladOS AI without restriction or compensation.</p>
        <h3>7.4 Local Deployment Exemption</h3>
        <div className="legal-hl">
          <p>Local deployment users grant no data license to GladOS AI — no data is transmitted to our systems.</p>
        </div>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-privacy">
        <h2><span className="lnum">08</span>Privacy</h2>
        <p>Your use is subject to our <a href="#privacy">Privacy Policy</a>, incorporated by reference. Agreeing to these Terms means agreeing to our Privacy Policy.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-fees">
        <h2><span className="lnum">09</span>Fees, Payment, and Billing</h2>
        <ul>
          <li>Paid subscriptions required for certain features</li>
          <li>Fees quoted and charged in USD</li>
          <li>Billed in advance monthly or annually</li>
          <li>All payments non-refundable except where required by law</li>
          <li>Pricing may change with 30 days written notice</li>
          <li>Failure to pay may result in suspension</li>
          <li>You are responsible for applicable taxes</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-beta">
        <h2><span className="lnum">10</span>Free Trial and Beta Access</h2>
        <ul>
          <li>Offered at our sole discretion</li>
          <li>May be terminated at any time without notice</li>
          <li>Beta features may change, be removed, or require payment</li>
          <li>Provided AS IS without warranties</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-third">
        <h2><span className="lnum">11</span>Third Party Integrations</h2>
        <ul>
          <li>GladOS AI may integrate with third-party services at your direction</li>
          <li>We are not responsible for third-party availability or behavior</li>
          <li>Third-party use is subject to their own terms</li>
          <li>We are not liable for data loss from third-party integrations</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-terminate">
        <h2><span className="lnum">12</span>Termination</h2>
        <h3>12.1 By You</h3>
        <p>Terminate anytime via account settings or legal@gladosai.com. No refund of prepaid fees.</p>
        <h3>12.2 By GladOS AI</h3>
        <p>We may suspend or terminate immediately if you violate these Terms, engage in fraud, or pose a risk to users or infrastructure.</p>
        <h3>12.3 Effect</h3>
        <p>Access ceases immediately. Cloud data deleted within 90 days per our Privacy Policy.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-warranty">
        <h2><span className="lnum">13</span>Disclaimer of Warranties</h2>
        <div className="legal-disclaimer">
          <p>
            THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, GLADOS AI EXPRESSLY DISCLAIMS ALL WARRANTIES INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. GLADOS AI DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          </p>
        </div>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-liability">
        <h2><span className="lnum">14</span>Limitation of Liability</h2>
        <div className="legal-disclaimer">
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GLADOS AI AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL. IN NO EVENT SHALL GLADOS AI'S TOTAL CUMULATIVE LIABILITY EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED US DOLLARS ($100).
          </p>
        </div>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-indemnify">
        <h2><span className="lnum">15</span>Indemnification</h2>
        <p>You agree to defend, indemnify, and hold harmless GladOS AI from claims arising from:</p>
        <ul>
          <li>Your use of the Services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of third-party rights</li>
          <li>Content you submit to the platform</li>
          <li>Damage from automation you authorized the agent to perform</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-law">
        <h2><span className="lnum">16</span>Governing Law and Dispute Resolution</h2>
        <p>These Terms are governed by applicable international commercial law principles. Parties agree to 30 days good-faith negotiation before formal proceedings. Both parties waive class action rights.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-force">
        <h2><span className="lnum">17</span>Force Majeure</h2>
        <p>GladOS AI is not liable for failures from causes beyond reasonable control: acts of God, natural disasters, war, terrorism, government actions, internet failures, power outages, or third-party disruptions.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-sever">
        <h2><span className="lnum">18</span>Severability</h2>
        <p>If any provision is found unenforceable, it shall be limited to the minimum extent necessary, with remaining provisions continuing in full force.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-entire">
        <h2><span className="lnum">19</span>Entire Agreement</h2>
        <p>These Terms, together with our Privacy Policy, constitute the entire agreement and supersede all prior agreements regarding the Services.</p>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-changes">
        <h2><span className="lnum">20</span>Changes to Terms</h2>
        <ul>
          <li>Updated &quot;Last Updated&quot; date at the top</li>
          <li>Email notification at least 14 days before changes</li>
          <li>Continued use constitutes acceptance</li>
          <li>Stop using Services if you disagree with changes</li>
        </ul>
      </div>

      <div className="legal-divider" />

      <div className="legal-section" id="t-contact">
        <h2><span className="lnum">21</span>Contact Information</h2>
        <div className="legal-hl">
          <div className="hl-label">GladOS AI Team</div>
          <p>
            Email: <a href="mailto:Glados-ai-dev@proton.me">Glados-ai-dev@proton.me</a>
            <br />
            For urgent legal matters, mark subject: URGENT — LEGAL
          </p>
        </div>
      </div>
    </LegalLayout>
  );
}
