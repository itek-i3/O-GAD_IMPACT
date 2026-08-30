export interface Member {
  slug: string;
  name: string;
  title: string;
  role: string;
  agency: string | null;
  agencySlug: string | null;
  photo: string;
  objectPosition?: string;
  description: string;
  bio?: string[];
  expertise: string[];
  steps?: { num: string; title: string; desc: string }[];
}

export const members: Member[] = [
  {
    slug: 'maxwell-gad',
    name: 'O\'Maxwell Gad',
    title: 'Business Strategist, Operator & Ecosystem Builder',
    role: 'Founder & Executive Director',
    agency: 'TOIG',
    agencySlug: 'impact360',
    photo: '/profile/maxwell-crop.jpg',
    description: 'O\'Maxwell Gad is a business strategist, operator and ecosystem builder working at the intersection of operations, growth, innovation and technology.',
    bio: [
      'O\'Maxwell Gad is a business strategist, operator and ecosystem builder working at the intersection of operations, growth, innovation and technology.',
      'He works closely with founders and SMEs to identify opportunities, strengthen operations, improve execution and build practical systems that help businesses grow.',
      'His approach is detail-oriented, practical and execution-focused — breaking down complex challenges, understanding what is actually happening inside the business, and turning strategy into clear, actionable systems.',
      'He is Founder & Executive Director at TOIG, Founder of Impact360, and Head of Operations and Growth at DINAO International, working across startups, SMEs, and entrepreneurial ecosystems.',
    ],
    expertise: ['Business Operations', 'Growth Strategy', 'Innovation', 'Ecosystem Building', 'Detail-Oriented Execution'],
  },
  {
    slug: 'nelly-waiganjo',
    name: 'Nelly Waiganjo',
    title: 'Group Strategist & Operations Leader',
    role: 'Group Managing Director',
    agency: null,
    agencySlug: null,
    photo: '/profile/nelly-crop.jpg',
    description: "Nelly Waiganjo is the Group Managing Director at TOIG, overseeing and coordinating all of the group's agencies.",
    bio: [
      "Nelly Waiganjo is the Group Managing Director at The O'GAD Impact Group, overseeing and coordinating all of TOIG's agencies — I3 Plus, I3X Africa, I3 Launchpad, iTek, I3 Studios, and Impact360.",
      "She works across the group's full portfolio, partnering with each agency's leadership to keep strategy, operations, and execution aligned toward the same goals.",
      "Her role is to hold the bigger picture — making sure every agency is moving in the same direction, and that the group operates as one connected system rather than six separate businesses.",
    ],
    expertise: ['Group Operations', 'Cross-Agency Strategy', 'Organizational Leadership', 'Business Coordination'],
  },
  {
    slug: 'collins-aroni',
    name: 'Collins Aroni',
    title: 'Strategy & Events Professional',
    role: 'Executive Director',
    agency: 'I3X Africa',
    agencySlug: 'i3x-events',
    photo: '/profile/collins-crop.jpg',
    description: 'Collins is a strategy and events professional who helps founders, organisations, and communities transform ideas into initiatives that generate meaningful impact.',
    bio: [
      'Collins is a strategy and events professional who helps founders, organisations, and communities turn ideas into initiatives that generate meaningful impact—working across strategy, partnerships, events, distribution, and community building.',
      'Through Impact360, he has helped build the Impact360 Roadshow and Impact360 Locals, creating platforms where entrepreneurs, investors, businesses, and emerging talent connect, learn, and collaborate—covering event strategy, partnerships, stakeholder coordination, and end-to-end execution.',
      'His approach starts with a clear objective, then builds the partnerships and systems needed to sustain momentum—treating events as infrastructure that lets ideas scale and thrive, not one-off moments.',
    ],
    expertise: ['Conferences & Summits', 'Investment & Business Roadshows', 'Corporate Experiences', 'Community & Networking Platforms'],
  },
  {
    slug: 'maison-shani',
    name: 'Maison Shani',
    title: 'Creative & Brand Expert',
    role: 'Executive Director',
    agency: 'I3 Studios',
    agencySlug: 'i3-studios',
    photo: '/profile/maison-crop.jpg',
    description: 'Maison Shani helps businesses build strong brands and create impactful content directly tied to their core business goals.',
    bio: [
      'Maison Shani helps businesses build strong brands and create impactful content directly tied to their core business goals.',
      'By combining research, strategy, design, and creative direction, he delivers results that go beyond vanity metrics (likes and impressions), solve real business problems, earn trust, and drive measurable revenue growth.',
      'His approach ties strategy to a business outcome rather than a trend, builds brand and content to earn trust and drive revenue, and gives clients one point of accountability across content, design, and creative direction.',
    ],
    expertise: ['Brand Identity & Design', 'Photography & Videography', 'Media Production', 'Digital Content Strategy'],
  },
  {
    slug: 'mercy-protas',
    name: 'Mercy Protas',
    title: 'Strategic Communications & Marketing Professional',
    role: 'Director of Communications, Marketing & PR',
    agency: 'I3 Plus',
    agencySlug: 'i3-plus-marketing',
    photo: '/profile/mercy-crop.jpg',
    description: 'Mercy Protas is a strategic communications and marketing professional who helps organisations turn complexity into clarity.',
    bio: [
      'Mercy Protas is a strategic communications and marketing professional who helps organisations turn complexity into clarity—with a background spanning communications, broadcast journalism, media production, and PR at Nation Media Group, Truth TV, and the County Government of Nakuru.',
      'As Director of Communications, Marketing & PR at Impact360 Africa, she shapes how the organisation tells its story and connects with partners, entrepreneurs, and stakeholders—combining strategic thinking, storytelling, and data-driven marketing. She\'s especially drawn to the narratives shaping Africa\'s entrepreneurship and innovation ecosystems, and at TOIG, ensures its story is told with the same clarity it asks of the ecosystem it serves.',
    ],
    expertise: ['Brand Strategy & Positioning', 'Customer Acquisition & Demand Generation', 'Digital & Performance Marketing', 'Sales Enablement & Growth Advisory'],
  },
  {
    slug: 'samuel-obukosia',
    name: 'Samuel Obukosia',
    title: 'Business Growth & Strategy Expert',
    role: 'Executive Director',
    agency: 'I3 Launchpad',
    agencySlug: 'i3-launchpad',
    photo: '/profile/samuel-headshot.jpg',
    description: 'Samuel helps founders and businesses build, grow, scale, and move into their next stage. From turning an idea into a viable business and taking it to market, to scaling operations, entering new markets, and preparing for acquisition or exit, he helps businesses understand where they are and what needs to happen next.',
    bio: [
      'Samuel works with founders, startups, and SMEs to help them move from one stage of business to the next.',
      'He supports businesses from innovation and venture building through market entry, growth, scaling, expansion, and strategic exits.',
      'His approach starts with a simple question: where is the business now, where does it need to go, and what is stopping it from getting there?',
      'From there, Samuel helps build clear strategies and practical plans that can actually be executed. He believes good strategy should lead to action. Less theory. More movement.',
      'Whether a business is building something new, looking for customers, entering a new market, scaling its operations, or exploring acquisition and exit opportunities, Samuel helps bring clarity to the next move.',
    ],
    expertise: ['Venture Building', 'Go-to-Market', 'Business Scaling', 'Market Expansion', 'Exit Strategy'],
    steps: [
      { num: '01', title: 'Understand the Business', desc: 'Understand the business, its goals, its stage, and where it wants to go.' },
      { num: '02', title: 'Identify the Constraint', desc: 'Find what is holding the business back or slowing its growth.' },
      { num: '03', title: 'Build the Strategy', desc: 'Create a clear plan for growth, market entry, scaling, expansion, or transition.' },
      { num: '04', title: 'Support Execution', desc: 'Turn the strategy into practical actions and support the business in making progress.' },
    ],
  },
  {
    slug: 'ephrem-orodi',
    name: 'Ephrem Orodi',
    title: 'Technologist, Developer & Systems Builder',
    role: 'Executive Director',
    agency: 'iTek',
    agencySlug: 'itek',
    photo: '/profile/ephraim-crop.jpg',
    description: 'Ephrem Orodi is a technologist, developer, and systems builder working at the intersection of software, artificial intelligence, and hardware.',
    bio: [
      'Ephrem Orodi is a technologist, developer, and systems builder working at the intersection of software, artificial intelligence, and hardware.',
      'He works closely with founders, businesses, and institutions to design and build the technology that powers their ideas — from web platforms and AI-driven tools to computer vision systems and embedded hardware.',
      'His approach is hands-on and execution-first: understand the real problem first, then build a working system rather than a slide deck about one.',
      'He is Executive Director at iTek and Senior Developer at Impact360 Africa, working across full-stack web development, computer vision, embedded systems, and applied AI.',
    ],
    expertise: ['Full-Stack Web Development', 'Computer Vision', 'Embedded Systems', 'Applied AI'],
  },
  {
    slug: 'mariama-waiganjo',
    name: 'Mariama Waiganjo',
    title: 'Corporate Law, Governance & ADR Expert',
    role: 'Head of Legal & Governance',
    agency: null,
    agencySlug: null,
    photo: '/profile/mariama-crop.jpg',
    description: 'Mariama Waiganjo helps organizations build stronger foundations through the intersection of corporate law, governance, innovation, policy, and strategic systems.',
    bio: [
      'Mariama Waiganjo helps organizations build stronger foundations through the intersection of corporate law, governance, innovation, policy, and strategic systems.',
      'By combining legal research, governance thinking, and an understanding of business and innovation ecosystems, she supports the development of frameworks that help organizations create structure, manage risk, strengthen accountability, and build systems for sustainable growth.',
      'Her work spans corporate legal research, governance frameworks, policy development, commercial agreements, compliance systems, and organizational development, with a particular interest in how legal and operational structures can become strategic tools for businesses, startups, and innovation-driven organizations.',
      'She is an expert in Alternative Dispute Resolution (ADR), exploring how negotiation, mediation, and collaborative approaches can help organizations navigate conflict, preserve relationships, and create mutually beneficial outcomes.',
    ],
    expertise: [
      'Legal & Governance Frameworks',
      'Accountability & Compliance Systems',
      'Strategic Legal Thinking for Innovation',
      'Research & Policy Development',
      'Alternative Dispute Resolution (ADR)',
    ],
  },
];

export function getMember(slug: string) {
  return members.find((m) => m.slug === slug);
}
