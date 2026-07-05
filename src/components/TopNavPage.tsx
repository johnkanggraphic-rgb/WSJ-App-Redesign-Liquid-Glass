import { BookmarkSimple, PlusCircle } from '@phosphor-icons/react'
import './TopNavPage.css'
import './TodayFeed.css'

const iconHeadphones = 'https://www.figma.com/api/mcp/asset/4b2003eb-885f-4967-95cb-ee29ba9648a8'
const iconChat       = 'https://www.figma.com/api/mcp/asset/93ed0ef8-af4a-4c14-85e2-6c36f464374e'

interface Card {
  headline: string
  summary?: string
  img?: string
  readTime: string
}

interface TabData {
  label: string
  s1hero: Card
  s1compact: [Card, Card]
  s2hero: Card
  s2compact: [Card, Card]
}

const tabData: Record<number, TabData> = {
  1: {
    label: 'Markets & Finance',
    s1hero: {
      headline: 'S&P 500 Notches Best Week of the Year as Earnings Season Tops Expectations',
      summary: 'Strong results from major banks and tech giants pushed equities higher, with the Dow Jones gaining more than 600 points on the week.',
      img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
      readTime: '5 min read',
    },
    s1compact: [
      { headline: 'Fed Officials Signal No Rush to Cut Rates Despite Cooling Inflation Data', readTime: '4 min read' },
      { headline: 'Oil Prices Slide 3% as OPEC+ Signals It May Boost Output Ahead of Schedule', readTime: '3 min read' },
    ],
    s2hero: {
      headline: 'Dollar Retreats as Investors Weigh Fed Path and Global Trade Tensions',
      summary: "Currency traders are reassessing the greenback's safe-haven appeal as Treasury yields drop and trade uncertainty lingers.",
      img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80',
      readTime: '6 min read',
    },
    s2compact: [
      { headline: 'Bitcoin Tops $75,000 for First Time Since November as Institutional Buying Returns', readTime: '4 min read' },
      { headline: 'JPMorgan Posts Record Profit, Warns of Uncertainty Ahead for U.S. Economy', readTime: '5 min read' },
    ],
  },
  2: {
    label: 'Opinion',
    s1hero: {
      headline: 'The Fed Is Running Out of Time to Get Inflation Right',
      summary: 'Central bankers have spent two years waiting for the data to turn. The window for a soft landing is narrowing faster than they admit.',
      img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
      readTime: '8 min read',
    },
    s1compact: [
      { headline: "Trump's Triple-Dog Supreme Court Dare", readTime: '6 min read' },
      { headline: 'Prada Hits the FTC With a Handbag', readTime: '5 min read' },
    ],
    s2hero: {
      headline: 'America Needs a Real Industrial Policy, Not Just Tariffs',
      summary: 'Slapping duties on imports without a coherent strategy for domestic manufacturing is a half-measure that risks the worst of both worlds.',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      readTime: '7 min read',
    },
    s2compact: [
      { headline: 'The Tariff Demon on Trump\'s Shoulder', readTime: '6 min read' },
      { headline: 'Review & Outlook: Trump, Wrongful Deportation and the Courts', readTime: '5 min read' },
    ],
  },
  3: {
    label: 'Business',
    s1hero: {
      headline: 'Boeing Reaches $1.1 Billion Settlement With Families of 737 MAX Crash Victims',
      summary: 'The agreement resolves the last major civil litigation tied to two crashes that killed 346 people and led to a 20-month global grounding of the jet.',
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      readTime: '7 min read',
    },
    s1compact: [
      { headline: 'Amazon Expands Same-Day Delivery to 15 New Cities Amid Logistics Push', readTime: '4 min read' },
      { headline: 'Goldman Sachs Cuts 200 Managing Director Roles in Annual Culling', readTime: '3 min read' },
    ],
    s2hero: {
      headline: 'Starbucks CEO Bets on Fewer Customizations to Win Back Lapsed Customers',
      summary: 'The coffee chain is simplifying its menu and cutting back on limited-time items as it tries to reverse a steep decline in foot traffic.',
      img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
      readTime: '6 min read',
    },
    s2compact: [
      { headline: 'Disney Reports Strong Streaming Profits but Theme Park Revenue Disappoints', readTime: '5 min read' },
      { headline: 'Volkswagen Plans to Close Three German Factories in Historic Restructuring', readTime: '6 min read' },
    ],
  },
  4: {
    label: 'World',
    s1hero: {
      headline: 'For Working Women in India, Staying Safe Can Feel Like a Full-Time Job',
      summary: 'Across major cities, female professionals navigate a hidden tax of time, money and mental energy just to get to work and back.',
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
      readTime: '8 min read',
    },
    s1compact: [
      { headline: 'Flights Redirected From Barcelona as Fresh Storms Lash Spanish Coast', readTime: '3 min read' },
      { headline: 'Kate Middleton Returns With A New Royal Role', readTime: '4 min read' },
    ],
    s2hero: {
      headline: 'Ukraine Strikes Russian Oil Depot Deep Inside Enemy Territory With Long-Range Drones',
      summary: 'The overnight attack targeted a fuel storage facility more than 400 miles from the front line, marking one of the deepest strikes of the war.',
      img: 'https://images.unsplash.com/photo-1580902394724-b08ff42e8c93?w=800&q=80',
      readTime: '5 min read',
    },
    s2compact: [
      { headline: 'China Signals It Will Match Any Further U.S. Tariff Hikes', readTime: '4 min read' },
      { headline: 'France\'s Snap Election Leaves No Party With a Clear Majority', readTime: '6 min read' },
    ],
  },
  5: {
    label: 'Lifestyle',
    s1hero: {
      headline: 'The $20 Grocery Haul That\'s Winning Over Stressed-Out Home Cooks',
      summary: 'A new generation of budget meal planners is proving that eating well doesn\'t require a big budget — just a willingness to embrace repetition.',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
      readTime: '6 min read',
    },
    s1compact: [
      { headline: 'Why Everyone Suddenly Wants a Smaller Kitchen', readTime: '5 min read' },
      { headline: 'The Sleep Supplement That Doctors Are Finally Taking Seriously', readTime: '4 min read' },
    ],
    s2hero: {
      headline: 'The Return of the Long Lunch: How Midday Eating Became a Status Symbol',
      summary: 'As remote work blurs the boundaries of the workday, a growing number of professionals are reclaiming the noon hour as their own.',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      readTime: '7 min read',
    },
    s2compact: [
      { headline: 'These Are the Vacation Destinations Gen Z Is Booking for 2025', readTime: '5 min read' },
      { headline: 'A Designer\'s Guide to Making a Small Apartment Feel Enormous', readTime: '6 min read' },
    ],
  },
  6: {
    label: 'Tech',
    s1hero: {
      headline: 'Judge Rules Google Operates Illegal Ad Monopoly',
      summary: 'A federal judge found the tech giant illegally dominated the online advertising technology market, setting the stage for potential breakup proceedings.',
      img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
      readTime: '6 min read',
    },
    s1compact: [
      { headline: 'Trump Exempts Smartphones, Other Electronics From Chinese Tariffs', readTime: '4 min read' },
      { headline: 'Apple Intelligence Rolls Out to More Countries as Demand Surges', readTime: '3 min read' },
    ],
    s2hero: {
      headline: 'The A.I. Arms Race Moves to the Data Center',
      summary: 'Tech giants are racing to build ever-larger clusters of chips. The winner may be whoever can keep the lights on.',
      img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      readTime: '8 min read',
    },
    s2compact: [
      { headline: 'Meta\'s New AI Assistant Is Taking On ChatGPT With a More Personal Touch', readTime: '5 min read' },
      { headline: 'Musk Vaulted to Top of a Popular Game. How Did He Find the Time?', readTime: '6 min read' },
    ],
  },
  7: {
    label: 'U.S.',
    s1hero: {
      headline: 'Senate Passes Sweeping Infrastructure Bill in Rare Bipartisan Vote',
      summary: 'The legislation directs $400 billion toward roads, bridges, broadband and clean energy over the next decade, with support from both parties.',
      img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
      readTime: '6 min read',
    },
    s1compact: [
      { headline: 'Supreme Court Agrees to Hear Challenge to EPA\'s Clean Air Rules', readTime: '4 min read' },
      { headline: 'Border Crossings Hit Lowest Level in a Decade After Policy Shift', readTime: '3 min read' },
    ],
    s2hero: {
      headline: 'Inside the Fight Over America\'s Nursing Home Industry',
      summary: 'Private equity ownership of elder-care facilities has come under intense scrutiny as lawmakers probe staffing shortfalls and patient outcomes.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
      readTime: '9 min read',
    },
    s2compact: [
      { headline: 'Texas Wildfires Force Evacuations Across Three Counties', readTime: '3 min read' },
      { headline: 'New York City\'s Congestion Pricing Plan Faces Fresh Legal Challenge', readTime: '5 min read' },
    ],
  },
  8: {
    label: 'Sections',
    s1hero: {
      headline: 'The Best of the WSJ: Stories You May Have Missed This Week',
      summary: 'From a deep dive into the shadow banking system to a profile of the world\'s most reclusive billionaire, here\'s what our editors are reading.',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      readTime: '3 min read',
    },
    s1compact: [
      { headline: 'Mansion: The $50 Million Compound That Spent 10 Years Off the Market', readTime: '5 min read' },
      { headline: 'Books: The Novel That Has Wall Street Buzzing', readTime: '6 min read' },
    ],
    s2hero: {
      headline: 'WSJ Magazine: The Quiet Power of Staying Private',
      summary: 'A new generation of founders is choosing to forgo IPOs entirely, building billion-dollar companies on their own terms.',
      img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
      readTime: '8 min read',
    },
    s2compact: [
      { headline: 'Travel: The Most Underrated Cities in Europe Right Now', readTime: '7 min read' },
      { headline: 'Health: What the Latest Research Says About Sitting All Day', readTime: '5 min read' },
    ],
  },
}

function CardFooter({ readTime }: { readTime: string }) {
  return (
    <div className="card-footer">
      <div className="card-footer-left">
        <span className="card-read-time">{readTime}</span>
      </div>
      <div className="card-footer-right">
        <button className="card-action-btn">
          <img src={iconHeadphones} alt="" className="card-action-icon" />
        </button>
        <button className="card-action-btn">
          <img src={iconChat} alt="" className="card-action-icon" />
        </button>
        <button className="card-action-btn">
          <BookmarkSimple size={24} color="#6f6f6f" />
        </button>
        <button className="card-action-btn">
          <PlusCircle size={24} color="#6f6f6f" />
        </button>
      </div>
    </div>
  )
}

function Section({ hero, compact, bgColor }: { hero: Card; compact: [Card, Card]; bgColor?: string }) {
  const bg = bgColor ? { background: bgColor } : undefined
  return (
    <div className="world-pkg" style={{ borderTop: 'none', ...bg }}>
      <div className="feed-card" style={bg}>
        <h2 className="card-headline-l">{hero.headline}</h2>
        {hero.summary && <p className="card-summary">{hero.summary}</p>}
        {hero.img && (
          <div className="card-image-wrap">
            <img src={hero.img} alt="" className="card-image" />
          </div>
        )}
        <CardFooter readTime={hero.readTime} />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={bg}>
        <h3 className="card-headline-s">{compact[0].headline}</h3>
        <CardFooter readTime={compact[0].readTime} />
      </div>
      <div className="feed-divider" />
      <div className="feed-card" style={bg}>
        <h3 className="card-headline-s">{compact[1].headline}</h3>
        <CardFooter readTime={compact[1].readTime} />
      </div>
    </div>
  )
}

const sectionItems = [
  'Style',
  'Books & Arts',
  'Real Estate',
  'Sports',
  'Journal Reports',
  'The Future of Everything',
  'Video',
  "Today's Front Page",
  'WSJ Buy Side',
  'WSJ Cybersecurity',
  'Logistics Report',
  'CFO Journal',
  'CIO Journal',
  'CMO Today',
  'WSJ Pro Sustainable Business',
  'Risk & Compliance',
]

function SectionsList() {
  return (
    <div className="sections-list">
      {sectionItems.map((item, i) => (
        <div key={i} className="sections-list-item">
          <span className="sections-list-label">{item}</span>
          {i < sectionItems.length - 1 && <div className="sections-list-divider" />}
        </div>
      ))}
    </div>
  )
}

export default function TopNavPage({ tabIndex, visible }: { tabIndex: number; visible: boolean }) {
  const data = tabData[tabIndex]

  if (tabIndex === 8) {
    return (
      <div className={`topnav-page${visible ? ' topnav-page--visible' : ''}`} style={{ background: '#fff' }}>
        <SectionsList />
        <div className="feed-bottom-pad" style={{ background: '#fff' }} />
      </div>
    )
  }

  if (!data) return null

  return (
    <div className={`topnav-page${visible ? ' topnav-page--visible' : ''}`}>
      <Section hero={data.s1hero} compact={data.s1compact} bgColor={tabIndex === 2 ? '#f5f0eb' : '#fff'} />
      <div style={{ height: 8, background: '#f4f5f7', flexShrink: 0, width: '100%', boxShadow: 'inset 0 -1.5px 0 0 #ebebeb' }} />
      <Section hero={data.s2hero} compact={data.s2compact} bgColor={tabIndex === 2 ? '#f5f0eb' : '#fff'} />
      <div className="feed-bottom-pad" style={{ background: tabIndex === 2 ? '#f5f0eb' : '#fff' }} />
    </div>
  )
}
