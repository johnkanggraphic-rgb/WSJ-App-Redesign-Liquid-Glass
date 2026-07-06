import { useRef, useEffect } from 'react'
import { CaretLeft, Headphones, BookmarkSimple } from '@phosphor-icons/react'
import './StylePage.css'
import StatusBar from './StatusBar'

interface Story {
  flashline: string
  headline: string
  summary: string
  image: string
  readTime: string
}

const sectionStoriesMap: Record<string, Story[]> = {
  'Style': [
    {
      flashline: 'Fashion',
      headline: 'The Quiet Luxury Trend That Took Over Every Runway This Season',
      summary: 'Designers from Milan to Paris are embracing understated elegance — think cashmere, neutral palettes, and impeccable tailoring over logo-heavy streetwear.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Beauty',
      headline: "Skin Care's New Obsession: The $12 Ingredient That Outperforms Retinol",
      summary: 'Dermatologists are raving about bakuchiol, a plant-based alternative that delivers comparable anti-aging results without the irritation.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Style',
      headline: 'The 10 Wardrobe Essentials That Will Still Look Good in 10 Years',
      summary: 'Fashion editors share the pieces they reach for again and again — and why investing in quality over quantity pays off in the long run.',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Design',
      headline: "Interiors' Biggest Shift: Why Everyone Is Suddenly Embracing Warm Minimalism",
      summary: 'Cold, stark spaces are out. The new ideal mixes natural materials, earthy tones, and deliberate curation for spaces that feel lived-in yet refined.',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Shopping',
      headline: 'The Investment Bag That Holds Its Value Better Than Most Stocks',
      summary: "Resale data shows certain Hermès and Chanel styles have appreciated more than 30% over five years — here's what collectors are buying now.",
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      readTime: '8 min read',
    },
  ],

  'Books & Arts': [
    {
      flashline: 'Literature',
      headline: 'The Novel That Has Everyone Talking — and Nobody Can Agree On',
      summary: 'A debut work of literary fiction upends assumptions about family, memory, and the immigrant experience. Critics are divided; readers are obsessed.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Art',
      headline: "The Basquiat Estate's $200 Million Bet on a New Museum",
      summary: 'Heirs to the late artist\'s legacy are breaking ground on a Brooklyn institution they say will reframe how American art history is taught.',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Books',
      headline: 'Nonfiction Is Having a Moment. Here Are 12 Titles Worth Your Time',
      summary: "From war reportage to scientific biography, this season's best nonfiction reads like the best fiction — but every word of it happened.",
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Theater',
      headline: 'Broadway Is Back — and It Brought Something to Say',
      summary: 'A string of bold new productions is drawing younger audiences back to live theater, proving the form has plenty of life left in it.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Music',
      headline: 'Classical Music Finds Its Youngest Audience in a Generation',
      summary: 'Symphony halls from Chicago to Seoul are reporting surges in under-35 ticket sales as orchestras lean into social media and informal formats.',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
      readTime: '5 min read',
    },
  ],

  'Real Estate': [
    {
      flashline: 'Market',
      headline: 'Home Prices Are Rising Again. Here Is Why the Math Still Does Not Add Up for Buyers',
      summary: 'Even with mortgage rates easing slightly, affordability remains near historic lows. A full breakdown of what it costs to buy in 20 major markets.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Luxury',
      headline: 'The Ultra-Wealthy Are Snapping Up Manhattan Penthouses at Record Pace',
      summary: 'Demand for units priced above $10 million has outpaced supply for three consecutive quarters, with all-cash deals dominating the market.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Residential',
      headline: 'Suburbs Are Booming Again as Remote Work Reshapes the Map',
      summary: 'Towns 30 to 60 minutes from major metros are posting the strongest price growth in the country as hybrid workers prioritize space over proximity.',
      image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Commercial',
      headline: 'Office Vacancy Hits Post-Pandemic High Even as Downtown Revivals Are Claimed',
      summary: "Despite optimistic headlines, the data tells a different story. Sublease inventory is climbing and conversion projects are stalling on financing.",
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Investing',
      headline: "REITs Are Staging a Comeback as Interest Rates Stabilize",
      summary: 'Real estate investment trusts lagged during the rate-hiking cycle but fund managers say the setup for the next 18 months looks unusually attractive.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      readTime: '5 min read',
    },
  ],

  'Sports': [
    {
      flashline: 'NBA',
      headline: 'The Three-Point Revolution Has a Ceiling — Teams Are Starting to Hit It',
      summary: "Analytics departments across the league are quietly walking back their volume-shooting mandates as defenses adapt and efficiency numbers plateau.",
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Soccer',
      headline: "MLS Is Now Competing With Europe for the World's Best Players",
      summary: 'A decade of strategic investment has turned American soccer into a legitimate destination for elite talent, not just a retirement league.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Golf',
      headline: 'The PGA Tour-LIV Merger That Refuses to Die — or Get Done',
      summary: "Negotiations have dragged on for over a year. Here's what both sides are still fighting about and why a deal remains elusive.",
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Athletics',
      headline: 'Meet the 17-Year-Old Who May Rewrite the Sprint Record Books',
      summary: "Track insiders are buzzing about a teenager from Jamaica whose training times suggest a sub-9.7 hundred meters is a matter of when, not if.",
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Business of Sports',
      headline: "Private Equity Comes for the NFL — and the League Has Mixed Feelings",
      summary: 'Owners voted to allow limited institutional investment in team stakes. Now the money is flowing in faster than anyone expected.',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
      readTime: '7 min read',
    },
  ],

  'Journal Reports': [
    {
      flashline: 'Health & Medicine',
      headline: 'The Science of Sleep Has Transformed. Most Doctors Have Not Caught Up',
      summary: "New research upends decades of assumptions about how long we should sleep, when, and why. The implications for public health are enormous.",
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      readTime: '9 min read',
    },
    {
      flashline: 'Retirement',
      headline: '401(k)s Were a Compromise. Now They Are the System — for Better or Worse',
      summary: "The shift from pensions to defined-contribution plans was never supposed to be universal. Fifty years in, we can finally assess the damage.",
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      readTime: '10 min read',
    },
    {
      flashline: 'Technology & Innovation',
      headline: 'How AI Is Quietly Replacing the Entry-Level Knowledge Worker',
      summary: "From legal research to financial analysis, the first wave of AI displacement is hitting white-collar workers far below the executive level.",
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Education',
      headline: "The College ROI Is Shrinking. Here Are the Majors Where It Is Not",
      summary: 'A decade of wage data shows widening gaps between the earnings trajectories of different degrees — and the results may surprise you.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Leadership',
      headline: "What 500 CEOs Told Us About the Trait They Most Wish They Had More Of",
      summary: 'A multi-year survey of top executives reveals a consistent gap between how leaders see themselves and how they want to be seen.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      readTime: '6 min read',
    },
  ],

  'The Future of Everything': [
    {
      flashline: 'Artificial Intelligence',
      headline: "The Next AI Leap Isn't More Data — It's Better Reasoning",
      summary: "The frontier labs are quietly pivoting from scaling raw compute to teaching models to think in steps. The results are already beating benchmarks.",
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Space',
      headline: 'The Moon Economy Is Taking Shape — and the Land Grab Has Begun',
      summary: "Private companies backed by governments are staking claims to lunar resources that no international treaty fully governs. It is going to get messy.",
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      readTime: '9 min read',
    },
    {
      flashline: 'Biotech',
      headline: "Gene Therapy Has Its First Blockbuster. Now Comes the Hard Part",
      summary: "A one-time cure for a rare genetic disorder racked up $3.5 billion in its first year. The industry is betting the model scales — skeptics are not so sure.",
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Energy',
      headline: "Fusion Power Has Its Most Credible Timeline Yet",
      summary: "For the first time, multiple independent programs are projecting grid-connected fusion by the mid-2030s. Investors are paying attention.",
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Transportation',
      headline: "Autonomous Trucks Are Already Hauling Freight. Drivers Are Watching Closely",
      summary: "Self-driving semis have quietly racked up millions of commercial miles in the Southwest. The industry insists drivers will shift roles, not disappear.",
      image: 'https://images.unsplash.com/photo-1552960394-c81add8de6b8?w=800&q=80',
      readTime: '7 min read',
    },
  ],

  'Video': [
    {
      flashline: 'Streaming',
      headline: "Netflix's Password Crackdown Generated $2 Billion in New Revenue. What Comes Next?",
      summary: "Having converted password sharers into paying subscribers, the streamer is turning its attention to ad-supported tiers and live sports rights.",
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Hollywood',
      headline: "The Sequel Economy Is Cracking — and Studios Are Scrambling for What Comes Next",
      summary: "A string of high-profile franchise misfires has forced Hollywood to confront a decades-long dependence on IP that audiences are no longer guaranteed to show up for.",
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Creator Economy',
      headline: "YouTube's Top Earners Are Outpacing Traditional TV Stars. Here Is How They Did It",
      summary: "The platform's highest-paid creators have quietly built media empires with leaner teams, broader reach, and more loyal audiences than network counterparts.",
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Production',
      headline: "AI Video Tools Are Reaching Professional Quality Faster Than Anyone Expected",
      summary: "What took a full production crew six months can now be roughed out in days. The creative industries are working through what that actually means.",
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Live Events',
      headline: "Live Sports Rights Are the Last Thing Worth Paying For — and Everyone Wants Them",
      summary: "As on-demand content saturates the market, real-time sports remain the one category that resists skipping, ad-blocking, and piracy.",
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
      readTime: '5 min read',
    },
  ],

  "Today's Front Page": [
    {
      flashline: 'Top Story',
      headline: "Senate Reaches Deal on Federal Budget, Averting a Shutdown at the Eleventh Hour",
      summary: "A last-minute agreement between party leaders cleared the way for a continuing resolution that funds the government through the end of the fiscal year.",
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Markets',
      headline: "Dow Closes Above 42,000 for the First Time as Earnings Season Exceeds Low Expectations",
      summary: "Better-than-feared results from a broad swath of S&P 500 companies lifted equities broadly, with cyclicals and financials leading the advance.",
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      readTime: '4 min read',
    },
    {
      flashline: 'World',
      headline: "Ceasefire Talks Resume in Cairo as Fighting Continues Along the Northern Front",
      summary: "Negotiators from both sides returned to the table under Egyptian mediation, though battlefield activity showed no sign of slowing.",
      image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Business',
      headline: "Apple's India Manufacturing Push Hits Its First Major Snag",
      summary: "Supplier quality issues and infrastructure gaps are slowing the company's ambitious plan to shift a meaningful share of iPhone production out of China.",
      image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Opinion',
      headline: "The AI Regulation Debate Is Missing the Point Entirely",
      summary: "Lawmakers are focused on the wrong risks. The more immediate threat is not a rogue superintelligence — it is a generation of workers left without a plan.",
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
      readTime: '6 min read',
    },
  ],

  'WSJ Buy Side': [
    {
      flashline: 'Reviews',
      headline: "We Tested 14 Robot Vacuums. Only Three Are Worth Your Money",
      summary: "After months of floor-level testing, our reviewers found that most smart vacuums overpromise on autonomy and underdeliver on suction where it matters.",
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Best of',
      headline: "The Best Running Shoes of 2025, Ranked by Actual Runners",
      summary: "Our testers logged hundreds of miles across road, trail, and track to find the models that deliver on comfort, durability, and speed.",
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Home',
      headline: "The $400 Air Purifier That Outperformed Models Costing Twice as Much",
      summary: "Third-party lab testing shows one mid-range model consistently matched or beat premium competitors on particle removal efficiency and noise levels.",
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Tech',
      headline: "Should You Buy a Laptop With AI Features Built In? We Put Them to the Test",
      summary: "Chip makers are touting on-device AI as a productivity revolution. The reality, for now, is more modest — but there are a few genuinely useful features.",
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Style',
      headline: "The Capsule Wardrobe That Actually Works, According to Personal Stylists",
      summary: "Forget the 10-item wardrobe. Stylists who dress real people share the 18-piece mix that genuinely covers every occasion without decision fatigue.",
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
      readTime: '6 min read',
    },
  ],

  'WSJ Cybersecurity': [
    {
      flashline: 'Threat Intelligence',
      headline: "Chinese Hackers Spent 18 Months Inside a U.S. Telecom Before Being Detected",
      summary: "A sweeping investigation into the Salt Typhoon intrusion reveals systemic failures in network monitoring that affected at least nine carriers.",
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
      readTime: '9 min read',
    },
    {
      flashline: 'Ransomware',
      headline: "The Hospital Hack That Killed a Patient — and Changed the Industry Forever",
      summary: "A wrongful death lawsuit tied to a ransomware attack is moving forward, raising the legal stakes for healthcare executives who underfund security.",
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Policy',
      headline: "The U.S. Cyber Agency Is Losing Its Best People — and Congress Is Not Helping",
      summary: "CISA is facing a talent exodus driven by pay gaps, political pressure, and budget cuts at the exact moment adversaries are escalating.",
      image: 'https://images.unsplash.com/photo-1614064641938-63e56c57e0e2?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'AI Security',
      headline: "Prompt Injection Is the New Phishing — and Nobody Has a Fix Yet",
      summary: "As enterprises deploy AI assistants with access to internal systems, security researchers are finding that manipulating these tools is alarmingly straightforward.",
      image: 'https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Corporate Security',
      headline: "Why CISOs Are Burning Out — and What That Means for Everyone Else",
      summary: "Chief information security officers are leaving their roles at record rates, citing impossible expectations, legal exposure, and boards that still do not get it.",
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
      readTime: '7 min read',
    },
  ],

  'Logistics Report': [
    {
      flashline: 'Supply Chain',
      headline: "The Red Sea Crisis Is Reshaping Global Shipping Lanes — Possibly Permanently",
      summary: "Carriers that rerouted around the Cape of Good Hope are quietly considering whether the longer route makes structural sense even after hostilities end.",
      image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Warehousing',
      headline: "Industrial Real Estate Is Cooling — and Retailers Are Rethinking Their Inventory Strategy",
      summary: "After years of panic-building safety stock, companies are pulling back on warehouse leases as carrying costs bite and demand normalizes.",
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Air Freight',
      headline: "E-Commerce Demand Is Turning Cargo Planes Into the Hottest Asset in Aviation",
      summary: "Freighter utilization rates are hitting records as fast-fashion giants and electronics brands bypass ocean freight for speed-sensitive shipments.",
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
      readTime: '5 min read',
    },
    {
      flashline: 'Last Mile',
      headline: "Delivery Robots Are Finally Making Economic Sense in Dense Urban Markets",
      summary: "After years of false starts, autonomous sidewalk delivery units are quietly turning profitable in a handful of U.S. cities with the right density and regulation.",
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Trade',
      headline: "Reshoring Is Real — Just Not Where or How Politicians Are Describing It",
      summary: "Manufacturing investment data shows supply chains moving, but the jobs and facilities landing in the U.S. look very different from the ones that left.",
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      readTime: '8 min read',
    },
  ],

  'CFO Journal': [
    {
      flashline: 'Capital Allocation',
      headline: "CFOs Are Sitting on Record Cash. Boards Want to Know Why",
      summary: "Balance sheet conservatism born during the pandemic has outlasted the emergency. Shareholders are growing impatient with the cautious stance.",
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Accounting',
      headline: "The New Revenue Recognition Rules Are Tripping Up More Companies Than Expected",
      summary: "A wave of restatements tied to ASC 606 compliance has put finance teams under pressure and audit committees on high alert.",
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Financing',
      headline: "Private Credit Is Eating the Leveraged Loan Market — and CFOs Love It",
      summary: "Direct lending has grown from a niche alternative to a mainstream financing tool, offering speed and flexibility that syndicated markets cannot match.",
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Tax',
      headline: "The Global Minimum Tax Is Here. Finance Teams Are Still Figuring Out What It Means",
      summary: "The OECD's 15% floor is now law in dozens of jurisdictions. Multinational CFOs are scrambling to assess exposure and restructure accordingly.",
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Technology',
      headline: "AI in Finance: CFOs Who Moved Early Are Already Seeing the Gains",
      summary: "Companies that deployed AI for forecasting and close processes 18 months ago are reporting measurable reductions in cycle time and error rates.",
      image: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&q=80',
      readTime: '6 min read',
    },
  ],

  'CIO Journal': [
    {
      flashline: 'Infrastructure',
      headline: "The CIO's New Problem: AI Is Overwhelming the Data Center",
      summary: "GPU clusters and inference workloads are blowing through power and cooling budgets that were set just 18 months ago. Nobody planned for this.",
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Cloud',
      headline: "Multi-Cloud Was Supposed to Prevent Lock-In. Now It Is Creating New Complexity",
      summary: "CIOs who distributed workloads across AWS, Azure, and Google Cloud are discovering that the management overhead may outweigh the resilience benefits.",
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Enterprise AI',
      headline: "What Actually Happens When You Give Every Employee an AI Assistant",
      summary: "Three companies that completed full deployments share what changed, what broke, and what they wished they had done differently.",
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
      readTime: '9 min read',
    },
    {
      flashline: 'Cybersecurity',
      headline: "Zero Trust Is No Longer Optional. Here Is What Real Implementation Looks Like",
      summary: "Security frameworks have shifted from aspirational to mandatory. CIOs who have completed the transition share what the journey actually costs and takes.",
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Talent',
      headline: "The IT Talent Shortage Is Evolving — and Getting Harder to Solve",
      summary: "Demand for AI engineers and data architects is outpacing supply by a widening margin. CIOs are increasingly turning to internal reskilling as the only viable path.",
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      readTime: '6 min read',
    },
  ],

  'CMO Today': [
    {
      flashline: 'Advertising',
      headline: "The Death of the Cookie Is Finally, Actually Happening — and Brands Are Unprepared",
      summary: "After years of delays, third-party tracking is winding down in earnest. Marketers who treated the deadline as hypothetical are now scrambling.",
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Social Media',
      headline: "TikTok's Ad Business Is Growing Faster Than Any Platform in History",
      summary: "Despite regulatory uncertainty, brands are pouring money into short-form video. CMOs explain why the ROI data makes the risk worth it.",
      image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Branding',
      headline: "Purpose-Led Marketing Is in Retreat. Sales Are Up",
      summary: "A growing number of CMOs are quietly stepping back from values-based campaigns as consumer data shows purchase behavior responds more to value than values.",
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Data',
      headline: "First-Party Data Is the New Oil — but Most Brands Are Still Drilling for It",
      summary: "The transition from third-party audiences to owned customer data is proving harder than anticipated, with loyalty programs and direct relationships at the center.",
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'AI in Marketing',
      headline: "AI Creative Tools Are Cutting Campaign Production Costs by 60%. The Craft Question Remains",
      summary: "Finance departments love the efficiency numbers. Creative directors are wrestling with what is lost when iteration becomes instantaneous.",
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      readTime: '7 min read',
    },
  ],

  'WSJ Pro Sustainable Business': [
    {
      flashline: 'Clean Energy',
      headline: "Solar Capacity Additions Hit a Record — and the Grid Is Struggling to Keep Up",
      summary: "Interconnection queues are clogging with solar and storage projects as transmission infrastructure lags years behind renewable generation ambitions.",
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'ESG',
      headline: "The ESG Backlash Was Real. What Survived It Will Be Stronger",
      summary: "After years of political pressure and fund outflows, sustainable investing is being rebuilt on harder data and clearer materiality standards.",
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Carbon Markets',
      headline: "Voluntary Carbon Credits Are Being Rebuilt From the Ground Up",
      summary: "A series of credibility scandals gutted the voluntary market. New verification standards and independent oversight are trying to revive it.",
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Electric Vehicles',
      headline: "Fleet Electrification Is Where the Real EV Market Is Playing Out",
      summary: "Consumer EV adoption is plateauing, but commercial fleet conversions are accelerating sharply as total cost of ownership math finally tips positive.",
      image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Regulation',
      headline: "The SEC's Climate Disclosure Rules Survived the Courts — Mostly. Here Is What Companies Now Owe",
      summary: "After a partial rollback, the requirements that remained are still substantial. Legal and finance teams are assessing what the final rules demand.",
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80',
      readTime: '7 min read',
    },
  ],

  'Risk & Compliance': [
    {
      flashline: 'Regulation',
      headline: "The DOJ's New Corporate Enforcement Priorities Are Reshaping Compliance Programs",
      summary: "Revised guidance on what earns a company credit for cooperation is forcing general counsels to rebuild their internal investigation playbooks.",
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      readTime: '8 min read',
    },
    {
      flashline: 'Financial Crime',
      headline: "AML Programs Are Failing — and Regulators Are Running Out of Patience",
      summary: "A string of consent orders against major institutions signals that bank examiners are no longer accepting inadequate transaction monitoring as a technical problem.",
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Data Privacy',
      headline: "State Privacy Laws Are Multiplying Faster Than Compliance Teams Can Track",
      summary: "With 18 states now operating their own data protection regimes, multistate companies face a patchwork that national legislation has so far failed to simplify.",
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      readTime: '6 min read',
    },
    {
      flashline: 'Third-Party Risk',
      headline: "The Next Big Corporate Liability Is in Your Vendor List",
      summary: "Supply chain attacks and outsourcing failures are driving regulators to hold companies accountable for the security and compliance posture of their partners.",
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      readTime: '7 min read',
    },
    {
      flashline: 'Governance',
      headline: "Board Oversight of AI Is the Next Frontier in Corporate Governance",
      summary: "Regulators and institutional investors are beginning to ask pointed questions about how boards are supervising algorithmic decision-making. Most are not ready.",
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
      readTime: '6 min read',
    },
  ],
}

export default function SectionSubPage({ title, visible, onBack }: {
  title: string
  visible: boolean
  onBack: () => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visible && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [visible])

  const stories = sectionStoriesMap[title] ?? sectionStoriesMap['Style']

  return (
    <div className={`style-page${visible ? ' style-page--visible' : ''}`}>
      <StatusBar transparent />
      {/* Toolbar */}
      <div className="style-toolbar">
        <div className="style-toolbar-leading">
          <button className="style-back-btn" onClick={onBack}>
            <div className="style-back-glass">
              <CaretLeft size={20} weight="bold" color="#222" />
            </div>
          </button>
        </div>
        <span className="style-toolbar-title">{title}</span>
        <div className="style-toolbar-trailing" />
      </div>

      {/* Scrollable content */}
      <div className="style-scroll" ref={scrollRef}>
        <div className="style-section-zone">
          {stories.map((story, i) => (
            <div key={i}>
              {i > 0 && <div className="style-divider" />}
              <div className="style-card">
                <p className="style-flashline">{story.flashline}</p>
                <div className="style-space-8" />
                <h2 className="style-headline">{story.headline}</h2>
                <div className="style-space-8" />
                <p className="style-summary">{story.summary}</p>
                <div className="style-space-16" />
                <div className="style-card-image">
                  <img src={story.image} alt="" />
                </div>
                <div className="style-space-8" />
                <div className="style-card-footer">
                  <span className="style-read-time">{story.readTime}</span>
                  <div className="style-footer-actions">
                    <button className="style-footer-btn">
                      <Headphones size={24} color="#6f6f6f" />
                    </button>
                    <button className="style-footer-btn">
                      <BookmarkSimple size={24} color="#6f6f6f" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="style-bottom-pad" />
      </div>

    </div>
  )
}
