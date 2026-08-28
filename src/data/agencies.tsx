import type { ReactNode } from 'react';

export interface AgencyOffering {
  title: string;
  desc: string;
  icon: ReactNode;
}

export interface AgencyStep {
  num: string;
  title: string;
  desc: string;
}

export interface AgencyStat {
  value: string;
  label: string;
}

export interface AgencyServiceCategory {
  title: string;
  items: string[];
}

export interface Agency {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  description: string;
  calendlyUrl: string;
  heroImage: string;
  overviewImage: string;
  overviewTitle: string;
  overviewHighlight: string;
  overviewParagraphs: string[];
  icon: ReactNode;
  logoImage?: string;
  logoOnGlass?: boolean;
  serviceCategories?: AgencyServiceCategory[];
  calloutTitle: string;
  calloutDesc: string;
  offerings: AgencyOffering[];
  offeringsIntro: string;
  steps: AgencyStep[];
  stats: AgencyStat[];
}

const icons = {
  marketing: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  events: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
  launchpad: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84" />
    </svg>
  ),
  tech: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
    </svg>
  ),
  studios: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
    </svg>
  ),
  capital: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  creativePulse: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12h2.25L4.5 8l2 8 1.5-4H9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12h1.5l1.5-4 2 8 1.25-4H23" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 8.25 10.7 7a1 1 0 0 1 .87-.5h.86a1 1 0 0 1 .87.5l.7 1.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25h6a2 2 0 0 1 2 2V15a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-4.75a2 2 0 0 1 2-2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 12a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
  lightbulb: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  community: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
  ),
};

export const agencies: Agency[] = [
  {
    slug: 'i3-plus-marketing',
    name: 'I3 Plus',
    shortName: 'I3 Plus',
    category: 'Growth & Marketing',
    tagline: 'We build brands, acquire customers, and accelerate revenue growth.',
    description: 'Growth and marketing that builds brands.',
    calendlyUrl: 'https://calendly.com/mercyprotas',
    heroImage: '/photo/S43A1930.jpg',
    overviewImage: '/photo/S43A3774.jpg',
    overviewTitle: 'Growth Built on',
    overviewHighlight: 'Strong Positioning',
    overviewParagraphs: [
      "Marketing without infrastructure is just noise. I3 Plus builds the brand foundations, acquisition channels, and growth systems that let businesses find, convert, and retain customers on purpose — not by accident.",
      "We work across brand strategy, demand generation, and revenue growth — embedding ourselves in your business long enough to see the numbers move, not just the campaigns launch.",
    ],
    icon: icons.marketing,
    logoImage: '/logos/i3-plus-marketing.png',
    calloutTitle: 'Revenue-First Marketing',
    calloutDesc: 'Turning brand and market positioning into measurable, compounding growth.',
    offeringsIntro: 'Four core capabilities that turn marketing into a growth engine.',
    offerings: [
      { title: 'Brand Strategy & Positioning', desc: 'Clarifying who you serve, what you stand for, and why customers should choose you over anyone else.', icon: icons.marketing },
      { title: 'Customer Acquisition & Demand Generation', desc: 'Building the channels and funnels that consistently bring qualified customers to your door.', icon: icons.launchpad },
      { title: 'Digital & Performance Marketing', desc: 'Data-driven campaigns across digital channels, optimized continuously for return on spend.', icon: icons.tech },
      { title: 'Sales Enablement & Growth Advisory', desc: 'Equipping your sales function with the tools, messaging, and processes to close more, faster.', icon: icons.capital },
    ],
    steps: [
      { num: '01', title: 'Diagnose', desc: 'We audit your current brand, market position, and growth channels to find what is and isn’t working.' },
      { num: '02', title: 'Position', desc: 'We define a sharp brand and market position that differentiates you in a crowded landscape.' },
      { num: '03', title: 'Build', desc: 'We build the campaigns, content, and acquisition channels that bring your positioning to life.' },
      { num: '04', title: 'Launch', desc: 'We launch and manage campaigns across the channels that matter most to your customers.' },
      { num: '05', title: 'Scale', desc: 'We double down on what performs and cut what doesn’t, compounding growth over time.' },
    ],
    stats: [
      { value: '120+', label: 'Campaigns Launched' },
      { value: '90%', label: 'Client Retention' },
      { value: '15+', label: 'Industries Served' },
    ],
  },
  {
    slug: 'i3x-events',
    name: 'I3X Africa',
    shortName: 'I3X Africa',
    category: 'Events & Experiences',
    tagline: 'Platforms for collaboration, investment, and business connection.',
    description: 'Events that connect people, capital, and ideas.',
    calendlyUrl: 'https://calendly.com/comurwa-kabarak',
    heroImage: '/photo/S43A3789.jpg',
    overviewImage: '/photo/S43A3792.jpg',
    overviewTitle: 'Where Business',
    overviewHighlight: 'Meets Opportunity',
    overviewParagraphs: [
      "The best deals, partnerships, and ideas happen in rooms where the right people are already in conversation. I3X Africa designs and runs those rooms — conferences, summits, roadshows, and corporate experiences engineered for real business outcomes.",
      "From concept to execution, we handle the programming, partnerships, logistics, and follow-through that turn an event from a one-day gathering into a lasting business platform.",
    ],
    icon: icons.events,
    logoImage: '/logos/I3xLogo.png',
    calloutTitle: 'Experiences With Outcomes',
    calloutDesc: 'Every event is built around a business result, not just an agenda.',
    offeringsIntro: 'Four formats we design and operate across the continent.',
    offerings: [
      { title: 'Conferences & Summits', desc: 'Flagship gatherings that convene industry leaders, investors, and innovators around a shared agenda.', icon: icons.events },
      { title: 'Investment & Business Roadshows', desc: 'Multi-city platforms connecting businesses directly with capital, partners, and new markets.', icon: icons.capital },
      { title: 'Corporate Experiences', desc: 'Bespoke experiences for organizations — launches, retreats, and stakeholder engagements done right.', icon: icons.studios },
      { title: 'Community & Networking Platforms', desc: 'Recurring convenings that keep founders, operators, and investors connected between big events.', icon: icons.launchpad },
    ],
    steps: [
      { num: '01', title: 'Define', desc: 'We clarify the business objective and audience the experience needs to serve.' },
      { num: '02', title: 'Design', desc: 'We build the program, format, and partner line-up around that objective.' },
      { num: '03', title: 'Secure', desc: 'We lock in venues, sponsors, speakers, and logistics with precision.' },
      { num: '04', title: 'Execute', desc: 'We run the event end-to-end, managing every moving part on the day.' },
      { num: '05', title: 'Follow Through', desc: 'We measure impact and convert connections made into lasting business outcomes.' },
    ],
    stats: [
      { value: '60+', label: 'Events Delivered' },
      { value: '18+', label: 'Countries Reached' },
      { value: '10K+', label: 'Attendees Convened' },
    ],
  },
  {
    slug: 'i3-launchpad',
    name: 'I3 Launchpad',
    shortName: 'I3 Launchpad',
    category: 'Innovation & Business Support',
    tagline: 'From idea to scalable business — diagnostics, strategy, and execution.',
    description: 'From idea to scalable business.',
    calendlyUrl: 'https://calendly.com/samuelobukosia/book-a-session',
    heroImage: '/photo/S43A3804.jpg',
    overviewImage: '/photo/S43A9039.jpg',
    overviewTitle: 'From Idea to',
    overviewHighlight: 'Scalable Business',
    overviewParagraphs: [
      "Most businesses don't fail from a lack of ideas — they fail from a lack of structure, support, and follow-through. I3 Launchpad exists to close that gap, working hands-on with startups and SMEs at every stage of the journey.",
      "We diagnose the real constraints holding a business back, build the strategy to address them, and stay in the work through mentorship and operational support until execution actually happens.",
    ],
    icon: icons.launchpad,
    logoImage: '/logos/i3-launchpad.png',
    calloutTitle: 'Built for Execution',
    calloutDesc: 'We don’t hand over a strategy deck and walk away — we stay for the build.',
    offeringsIntro: 'Four pillars that carry a business from diagnosis to scale.',
    offerings: [
      { title: 'Business Diagnostics', desc: 'A structured assessment of your business model, operations, and market position to find what’s really holding growth back.', icon: icons.tech },
      { title: 'Strategy & Roadmapping', desc: 'A clear, sequenced plan that turns diagnosis into a practical path forward.', icon: icons.marketing },
      { title: 'Mentorship & Advisory', desc: 'Direct access to experienced operators and industry mentors who’ve built and scaled before.', icon: icons.events },
      { title: 'Operational Execution Support', desc: 'Hands-on support implementing the systems, structures, and processes the strategy calls for.', icon: icons.capital },
    ],
    steps: [
      { num: '01', title: 'Diagnose', desc: 'We assess the real problem behind the business, not just the symptoms on the surface.' },
      { num: '02', title: 'Design', desc: 'We co-create a strategy tailored to your context, capacity, and market realities.' },
      { num: '03', title: 'Build', desc: 'We help build the systems, structures, and tools the strategy depends on.' },
      { num: '04', title: 'Execute', desc: 'We support rollout, adoption, and the operational grind of getting it working.' },
      { num: '05', title: 'Scale', desc: 'We prepare the business — and its team — for sustainable, structured growth.' },
    ],
    stats: [
      { value: '200+', label: 'Businesses Supported' },
      { value: '85%', label: 'Survival Rate' },
      { value: '18+', label: 'Countries Represented' },
    ],
  },
  {
    slug: 'itek',
    name: 'iTek',
    shortName: 'iTek',
    category: 'Technology & Digital Transformation',
    tagline: 'Software, automation, and AI systems that scale businesses.',
    description: 'The software and AI systems businesses need.',
    calendlyUrl: 'https://calendly.com/meet-with-orodi',
    heroImage: '/photo/S43A9142.jpg',
    overviewImage: '/photo/S43A9196.jpg',
    overviewTitle: 'Technology as',
    overviewHighlight: 'Infrastructure',
    overviewParagraphs: [
      "For most African businesses, technology is still treated as a cost rather than infrastructure. iTek exists to change that — implementing the software, automation, and AI systems that make a business more efficient and more scalable at the same time.",
      "We work end-to-end: evaluating what a business actually needs, implementing the right systems, and staying involved until those systems are actually being used, not just installed.",
    ],
    icon: icons.tech,
    logoImage: '/logos/itekLogo.png',
    calloutTitle: 'Systems That Scale',
    calloutDesc: 'Technology implemented as a growth lever, not a line item.',
    offeringsIntro: 'Four areas where technology compounds into real business capacity.',
    offerings: [
      { title: 'Software Implementation', desc: 'Selecting and deploying the right software systems for how your business actually operates.', icon: icons.tech },
      { title: 'Business Process Automation', desc: 'Removing manual, repetitive work from your operations so your team can focus on what matters.', icon: icons.launchpad },
      { title: 'AI & Data Systems', desc: 'Practical AI and data infrastructure that improves decision-making and operational efficiency.', icon: icons.studios },
      { title: 'Digital Infrastructure & Scalability', desc: 'Building the technical foundation that lets a business grow without breaking what already works.', icon: icons.capital },
    ],
    steps: [
      { num: '01', title: 'Assess', desc: 'We evaluate your existing systems, infrastructure, and team capabilities to find the real gaps.' },
      { num: '02', title: 'Define', desc: 'We define the technology architecture that best supports your operations and growth goals.' },
      { num: '03', title: 'Roadmap', desc: 'We create a phased implementation plan with clear milestones and resourcing.' },
      { num: '04', title: 'Implement', desc: 'We oversee implementation to ensure quality, adoption, and alignment with the business.' },
      { num: '05', title: 'Optimize', desc: 'We establish processes for ongoing optimization so your technology advantage compounds.' },
    ],
    stats: [
      { value: '40+', label: 'Systems Implemented' },
      { value: '95%', label: 'On-Time Delivery' },
      { value: '8+', label: 'Tech Domains' },
    ],
  },
  {
    slug: 'i3-studios',
    name: 'I3 Studios',
    shortName: 'I3 Studios',
    category: 'Creative Production',
    tagline: 'Branding, media production, and content that tell your story.',
    description: 'Media and branding that tell your story.',
    calendlyUrl: 'https://calendly.com/connectwithmaison',
    heroImage: '/i3Studios/S43A9214.jpg',
    overviewImage: '/i3Studios/S43A3874.jpg',
    overviewTitle: 'Stories Told',
    overviewHighlight: 'With Craft',
    overviewParagraphs: [
      "A business can have the right strategy and still be invisible if it can't tell its story well. I3 Studios exists to close that gap — giving businesses and organizations the branding, media, and content needed to be seen and understood.",
      "From brand identity to photography, videography, and ongoing content, we produce work built to represent a business at the level it's actually operating at.",
    ],
    icon: icons.creativePulse,
    logoImage: '/logos/i3StudioLogo.png',
    logoOnGlass: true,
    calloutTitle: 'Craft With a Purpose',
    calloutDesc: 'Creative production built to serve the business behind it.',
    offeringsIntro: 'Four disciplines that shape how a business is seen and remembered.',
    offerings: [
      { title: 'Brand Identity & Design', desc: 'Visual identity systems — logo, colour, typography — that give a business a distinct presence.', icon: icons.studios },
      { title: 'Photography & Videography', desc: 'Professional imagery and film that capture a business, its people, and its products with intent.', icon: icons.events },
      { title: 'Media Production', desc: 'End-to-end production of promotional, documentary, and campaign content.', icon: icons.tech },
      { title: 'Digital Content Strategy', desc: 'A content system that keeps a brand consistently visible across the channels that matter.', icon: icons.marketing },
    ],
    steps: [
      { num: '01', title: 'Understand', desc: 'We learn the business, its audience, and the story it needs to tell.' },
      { num: '02', title: 'Concept', desc: 'We develop the creative direction and visual language for the work.' },
      { num: '03', title: 'Produce', desc: 'We shoot, design, and produce the content across the required formats.' },
      { num: '04', title: 'Refine', desc: 'We edit and polish every deliverable to a standard that represents the brand well.' },
      { num: '05', title: 'Deploy', desc: 'We package content for use across the channels where your audience actually is.' },
    ],
    stats: [
      { value: '300+', label: 'Assets Produced' },
      { value: '50+', label: 'Brands Shaped' },
      { value: '12+', label: 'Industries Covered' },
    ],
    serviceCategories: [
      {
        title: 'Content Production',
        items: ['Brand photography', 'Corporate/event photography', 'Videography', 'Short-form video / Reels / TikToks', 'Event coverage', 'Product/lifestyle content', 'Behind-the-scenes content'],
      },
      {
        title: 'Post-Production',
        items: ['Video editing', 'Motion graphics', 'Color grading', 'Social-media edits', 'Long-form → short-form repurposing', 'Graphic design'],
      },
      {
        title: 'Social Media Management',
        items: ['Content strategy', 'Content calendars', 'Platform management', 'Posting & scheduling', 'Community management', 'Captions/copywriting', 'Performance reporting'],
      },
      {
        title: 'Creative Strategy',
        items: ['Content ideation', 'Campaign concepts', 'Brand storytelling', 'Creative direction', 'Content systems', 'Social-media growth strategy'],
      },
      {
        title: 'Brand & Campaign Content',
        items: ['Campaign development', 'Product launches', 'Brand activations', 'Promotional campaigns', 'Event campaigns', 'Brand photography/video packages'],
      },
      {
        title: 'Event Media',
        items: ['Event photography', 'Event videography', 'Same-day/social-first content', 'Speaker/interview content', 'Event recap videos', 'Social-media coverage'],
      },
      {
        title: 'Design & Brand Assets',
        items: ['Social-media graphics', 'Carousels', 'Posters', 'Presentation/marketing materials', 'Digital campaign assets', 'Visual identity support'],
      },
    ],
  },
  {
    slug: 'impact360',
    name: 'Impact360',
    shortName: 'Impact360',
    category: 'Ecosystem Development & Opportunity Access',
    tagline: "Decentralizing access to opportunity across Africa.",
    description: 'Connecting entrepreneurs and investors across Africa.',
    calendlyUrl: 'https://calendly.com/o-maxwellgad',
    heroImage: '/photo/S43A9123.jpg',
    overviewImage: '/photo/S43A0051.jpg',
    overviewTitle: 'Opportunity Without',
    overviewHighlight: 'Geography',
    overviewParagraphs: [
      "Impact360 is TOIG's ecosystem development and decentralization platform. We believe innovation and entrepreneurship shouldn't be limited by geography.",
      "Impact360 connects entrepreneurs, innovators, investors, and institutions across Africa — discovering businesses beyond traditional economic hubs through roadshows, founder communities, research, and innovation programs.",
    ],
    icon: icons.globe,
    logoImage: '/images/impact360-logo.png',
    calloutTitle: 'The Entry Point',
    calloutDesc: 'Where businesses first connect to the TOIG ecosystem.',
    offeringsIntro: 'Four programs that carry a business from idea to funded growth.',
    offerings: [
      { title: 'Business Incubation Program', desc: 'We support founders from idea to execution — mentorship, business model validation, legal setup, and early-stage resources that turn concepts into real businesses.', icon: icons.lightbulb },
      { title: 'Startup Acceleration Track', desc: 'A high-intensity program for early-stage ventures ready to scale — investor readiness, growth coaching, a pan-African mentor network, and pathways to funding.', icon: icons.launchpad },
      { title: 'Decentralized Innovation Hubs', desc: "Entrepreneurship resources shouldn't be locked in one city. We bring incubation support, bootcamps, and programs directly to founders in underserved regions.", icon: icons.globe },
      { title: 'Events, Bootcamps & Meetups', desc: 'We run workshops, bootcamps, and founder meetups that help innovators learn, connect, and grow — practical skills and real relationships, not just inspiration.', icon: icons.community },
    ],
    steps: [
      { num: '01', title: 'Discover', desc: 'We identify entrepreneurs and businesses beyond traditional economic hubs.' },
      { num: '02', title: 'Connect', desc: 'We link them to founder communities, mentors, and ecosystem partners.' },
      { num: '03', title: 'Activate', desc: 'We bring roadshows, research, and programs directly to their region.' },
      { num: '04', title: 'Route', desc: 'We route ready businesses into the right TOIG agency for their stage.' },
      { num: '05', title: 'Scale', desc: 'We stay connected as the business grows across the ecosystem.' },
    ],
    stats: [
      { value: 'Pan-Africa', label: 'Reach' },
      { value: '18+', label: 'Countries Represented' },
      { value: '500+', label: 'Founders Connected' },
    ],
  },
];

export function getAgency(slug: string): Agency | undefined {
  return agencies.find(a => a.slug === slug);
}
