const steps = [
  {
    title: "Co-creation with partners",
    icon: "partners",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We signed an MoU with the partner.",
      },
      {
        id: 2,
        status: false,
        task: "We agreed on a continous collaboration with the partner beyond OIP.",
      },
      {
        id: 3,
        status: false,
        task: "We built a good relationship and we can easily reach out to the partner at any time.",
      },
      {
        id: 4,
        status: false,
        task: "We were able to make relevant progress on our product or strategy based on partners feedback.",
      },
      {
        id: 5,
        status: false,
        task: "We used partner feedback to refine our win-win hypothesis for a partnership.",
      },
      {
        id: 6,
        status: false,
        task: "We had a first meeting with the strategic partner.",
      },
      {
        id: 7,
        status: false,
        task: "We identified a relevant strategic partner we are not yet partnering with.",
      },
    ],
  },
  {
    title: "Teams",
    icon: "team",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have a structured and standardized our processes for growth",
      },
      {
        id: 2,
        status: false,
        task: "We are actively cultivating a culture for high performance that everyone in the team can articulate",
      },
      {
        id: 3,
        status: false,
        task: "Our culture, structures, salary, and benefits allow us to retain top talent for many years",
      },
      {
        id: 4,
        status: false,
        task: "We have managed to attract and hire diverse top talent for the startup",
      },
      {
        id: 5,
        status: false,
        task: "We actively use feedback from clients and team members to improve the company and product",
      },
      {
        id: 6,
        status: false,
        task: "We have built strong networks with people who have sector expertise and with investors",
      },
      {
        id: 7,
        status: false,
        task: "We can precisely articulate our value proposition and pitch confidently in all possible contexts",
      },
      {
        id: 8,
        status: false,
        task: "All our co-founders are full-time working on the startup",
      },
      {
        id: 9,
        status: false,
        task: "We have clearly defined roles and responsibilities in the team",
      },
      {
        id: 10,
        status: false,
        task: "All co-founders have vesting agreements with a cliff and details on finances and shares in place",
      },
      {
        id: 11,
        status: false,
        task: "All our co-founders are fully aligned & committed to our vision and product roadmap",
      },
      {
        id: 12,
        status: false,
        task: "We have one co-founder or core team member focussing on product with 50%+ of their time",
      },
      {
        id: 13,
        status: false,
        task: "We have one co-founder or core team member focussing on growth with 50%+ of their time",
      },
    ],
  },
  {
    title: "Problem, Market & Value Proposition",
    icon: "team",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have a vision and a strategy of how to solve the problem at a massive scale for various segments",
      },
      {
        id: 2,
        status: false,
        task: "We understand the problem of our clients better than they do themselves and are experts in our field",
      },
      {
        id: 3,
        status: false,
        task: "We  know why similar companies are not growing faster and understand the challenges of competitors",
      },
      {
        id: 4,
        status: false,
        task: "We know our TAM, SAM, and SOM and have conducted a market trend analysis",
      },
      {
        id: 5,
        status: false,
        task: "We have a pricing hypothesis based on feedback from interviews & competitor analysis",
      },
      {
        id: 6,
        status: false,
        task: "We have conducted competitor analysis & looked for similar solutions in other African & global markets and can express our superior value proposition",
      },
      {
        id: 7,
        status: false,
        task: "We have conducted 15+ customer interviews with early adopters to understand the problem in depth",
      },
      {
        id: 8,
        status: false,
        task: "The problem we solve is growing (following market trends, >20% per year market growth)",
      },
      {
        id: 9,
        status: false,
        task: "The problem we solve is expensive (very hard to solve otherwise)",
      },
      {
        id: 10,
        status: false,
        task: "The problem we solve is popular (many have it, 10 Bn USD+ TAM)",
      },
      {
        id: 11,
        status: false,
        task: "The problem we solve is mandatory (e.g. regulatory)",
      },
      {
        id: 12,
        status: false,
        task: "The problem we solve is frequent (happens at least monthly)",
      },
      {
        id: 13,
        status: false,
        task: "The problem we solve is urgent (must-have, now)",
      },
      {
        id: 14,
        status: false,
        task: "Our value proposition is a must-have and not a nice-to-have",
      },
      {
        id: 15,
        status: false,
        task: "We have identified unsolved customer problems for a narrow and specific early adopter segment and have formulated a superior value proposition for them",
      },
    ],
  },
  {
    title: "Product",
    icon: "product",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have a way to harmonize growth and retention with progress on our product",
      },
      {
        id: 2,
        status: false,
        task: "We have a product infrastructure strategy that allows massive scale",
      },
      {
        id: 3,
        status: false,
        task: "We have a process to harmonize client needs, timelines, infrastructure progress & internal capacities",
      },
      {
        id: 4,
        status: false,
        task: "Our product is stable and has minimal downtime and we can repsond fast to emergencies",
      },
      {
        id: 5,
        status: false,
        task: "We have designed and optimized our UI/UX to be intuitive and have a process to continuously improve it",
      },
      {
        id: 6,
        status: false,
        task: "We have analysed and stay updated on core product features of competitors",
      },
      {
        id: 7,
        status: false,
        task: "Our user and customer onboarding process is optimized and has minimal friction",
      },
      {
        id: 8,
        status: false,
        task: "We take key product and feature decisions based on data and analytics",
      },
      {
        id: 9,
        status: false,
        task: "We have top-notch code documentation and a changelog that makes onboarding new developers easy",
      },
      {
        id: 10,
        status: false,
        task: "We have a separate build & test environment, do internal, user + UI/UX testing before pushing updates",
      },
      {
        id: 11,
        status: false,
        task: "We are aware of any supplier/ third party relationships (inlc. Integrations) needed and have a strategy to manage these",
      },
      {
        id: 12,
        status: false,
        task: "We have a product roadmap, are clear about our stack and user journey",
      },
      {
        id: 13,
        status: false,
        task: "We have many open communication channels and it is extremly frictionless for our customers to reach us and give feedback",
      },
      {
        id: 14,
        status: false,
        task: "We are tracking key analytics of our solution to understand how customers use our product",
      },
      {
        id: 15,
        status: false,
        task: "We have a spec document for an MVP including a timeline (<less than 4 weeks) or launched our MVP",
      },
      {
        id: 16,
        status: false,
        task: "We talk to users at least weekly and have a process of gathering user feedback to improve the product",
      },
      {
        id: 17,
        status: false,
        task: "We have the technical capacity in our team to build the MVP and continuously improve the product",
      },
    ],
  },
  {
    title: "Markting, Sales, Growth",
    icon: "sales",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have an expert-level understanding about our customers, how to reach them, and are ready to switch from mostly „doing things that don‘t scale“",
      },
      {
        id: 2,
        status: false,
        task: "We know/ have solid estimates for CAC, LTV, and conversion rates for all funnel taskts for all channels",
      },
      {
        id: 3,
        status: false,
        task: "We have a growth team that drives prospecting, conversion, and strategy and works closely with the product team",
      },
      {
        id: 4,
        status: false,
        task: "We actively and constantly remarket and upsell our customers in non-annoying ways to increase LTV",
      },
      {
        id: 5,
        status: false,
        task: "We have a coherent and appealing brand appearance that is tailored to our market and customers",
      },
      {
        id: 6,
        status: false,
        task: "We have reevaluated our initial pricing hypothesis and tested new prices with new customers",
      },
      {
        id: 7,
        status: false,
        task: "We have 100+ customers that LOVE the product, retain, are excited to keep using it and refer others",
      },
      {
        id: 8,
        status: false,
        task: "We have evaluated and know which of the three sustainable growth engines we are optimizing for",
      },
      {
        id: 9,
        status: false,
        task: "We structuredly evaluate new growth channels and prioritize our growth efforts based on data",
      },
      {
        id: 10,
        status: false,
        task: "We have identified which users get which value from our solution, who can make a purchasing decision, and who needs to be convinced to close a sale",
      },
      {
        id: 11,
        status: false,
        task: "We have defined and track our core growth and retention metrics continuously, everyone on the team knows our core metrics at all times, and our core metrics influence our decision making every week",
      },
      {
        id: 12,
        status: false,
        task: "We have 10+ customers that LOVE the product, retain, are excited to keep using it, and refer others",
      },
      {
        id: 13,
        status: false,
        task: "We have a landing page that is optimized for conversion and SEO",
      },
      {
        id: 14,
        status: false,
        task: "We have a growth strategy including a structured marketing and sales process in place",
      },
      {
        id: 15,
        status: false,
        task: "We are clear about the exact needs of our specific early adopter segment and have a clear and compelling message for this segment",
      },
      {
        id: 16,
        status: false,
        task: "We have 1+ customers who has paid for the product and are hiring customers directly",
      },
      {
        id: 17,
        status: false,
        task: "We have clearly defined who is in charge to generate leads and who is in charge to convert leads",
      },
      {
        id: 18,
        status: false,
        task: "We have a clear plan to make a first sale & are embracing the mindset of „doing things that don‘t scale“",
      },
      {
        id: 19,
        status: false,
        task: "We have a written persona of all the segments we consider as early adopters",
      },
      {
        id: 20,
        status: false,
        task: "We have a list of possible customer segments that was informed by our 15+ interviews",
      },
    ],
  },
  {
    title: "Finance & Investment",
    icon: "finance",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have financial controls and structures in place to avoid fraud and non-priority expenses",
      },
      {
        id: 2,
        status: false,
        task: "We have evaluated if and what employee share incentives fit to our strategy and culture",
      },
      {
        id: 3,
        status: false,
        task: "We have CRM of potential investors and actively reach out to multiple investors at a time",
      },
      {
        id: 4,
        status: false,
        task: "We have a data room set up with all documents up to date, and track and manage access to it",
      },
      {
        id: 5,
        status: false,
        task: "We have a fundraising strategy including why, how, how much, valuation, type of capital, and for what",
      },
      {
        id: 6,
        status: false,
        task: "We have a designated co-founder for fundraising and they are allocating up to 100% of their time to it",
      },
      {
        id: 7,
        status: false,
        task: "We have an idea about how a potential exit could look like and materialize, and who a buyer could be",
      },
      {
        id: 8,
        status: false,
        task: "We understand what type of capital (debt, equity, etc.) and investor is ideal for us, why, their registration requirements (geography!), and we understand how they operate, make money, and investor rights",
      },
      {
        id: 9,
        status: false,
        task: "All co-founders know current revenues, expenses, runway, and financial status at all times",
      },
      {
        id: 10,
        status: false,
        task: "We have an up-to-date financial model and can update it ourselves",
      },
      {
        id: 11,
        status: false,
        task: "We have evaluated and optimized our cost structure",
      },
      {
        id: 12,
        status: false,
        task: "We know how to finance all priority expenses and salaries for the next three months",
      },
      {
        id: 13,
        status: false,
        task: "We use accounts under the company name, only use traceable payment channels, and avoid cash",
      },
      {
        id: 14,
        status: false,
        task: "We do bookkeeping and track all revenues, expenses, and account balance at all times and have complete financial records and all receipts/invoices stored and documented",
      },
      {
        id: 15,
        status: false,
        task: "All our co-founders know each other‘s financial situation and have secured sources of income to focus on the startup",
      },
    ],
  },
  {
    title: "Operations & Management",
    icon: "operations",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have a culture that helps us achieve our goals and stay aligned to our values, principles and ways of working",
      },
      {
        id: 2,
        status: false,
        task: "We have regular employee performance review, linked to process of payraises",
      },
      {
        id: 3,
        status: false,
        task: "We have a clearly communicated organizational and reporting structure that everyone can articulate",
      },
      {
        id: 4,
        status: false,
        task: "We regularly reflect on and adjust processes and structures as we grow and remove what is not needed",
      },
      {
        id: 5,
        status: false,
        task: "Every core activity has a responsible person in charge of driving its progress",
      },
      {
        id: 6,
        status: false,
        task: "We have structured hiring, onboarding, payraises and offboarding process",
      },
      {
        id: 7,
        status: false,
        task: "We have clearly defined roles and resposibilities for all team members and accountability in execution",
      },
      {
        id: 8,
        status: false,
        task: "We take decisions based on data and outcomes of experiments that we run",
      },
      {
        id: 9,
        status: false,
        task: "We have formulated goals and KPIs for growth, product, operations, and finance, and track them continuously",
      },
      {
        id: 10,
        status: false,
        task: "We are clear about the most important things we have to master in order to unlock large-scale success",
      },
      {
        id: 11,
        status: false,
        task: "All meetings are scheduled in a shared calendar, treated professionally, and punctuality is valued",
      },
      {
        id: 12,
        status: false,
        task: "The co-founders have regular meetings (at least monthly) to align on any important topics",
      },
      {
        id: 13,
        status: false,
        task: "We hold regular team and 1-on-1 feedback meetings and understand the personal and work situation with all employees",
      },
      {
        id: 14,
        status: false,
        task: "We hold weekly meetings to discuss growth & key metrics, and work packages",
      },
      {
        id: 15,
        status: false,
        task: "We have a productive work setup including necessary work tools, documents/file storage, standard company templates, and communication channels in place",
      },
    ],
  },
  {
    title: "Compliance",
    icon: "compliance",
    tasks: [
      {
        id: 1,
        status: false,
        task: "We have management accounts and audited financial reports for atleast the past year",
      },
      {
        id: 2,
        status: false,
        task: "We have all permits and certification that are required by the regulator in the sector we operate",
      },
      {
        id: 3,
        status: false,
        task: "We know all other specific regulations that apply to us, our specific business/ sector, and are compliant",
      },
      {
        id: 4,
        status: false,
        task: "We have all policies and valid data protection license and are compliant with the regulator ",
      },
      {
        id: 5,
        status: false,
        task: "We have acquired the necessary intellectual property rights and trademarks, and have an IP strategy if necessary",
      },
      {
        id: 6,
        status: false,
        task: "We have a tax strategy to minimize the tax burden, inside the legal context",
      },
      {
        id: 7,
        status: false,
        task: "We have registered for VAT as we have surpassed the threshold of 37.5M UGX revenue in any 3 months period and only issue official electronic invoices only",
      },
      {
        id: 8,
        status: false,
        task: "We have a valid trading license that is renewed annually",
      },
      {
        id: 9,
        status: false,
        task: "We pay the mandatory PAYE (work contracts >235,000 UGX/ month) and NSSF contributions for all employees and WHT for contracted services",
      },
      {
        id: 10,
        status: false,
        task: "We know current and future tax implications and understand what taxes apply to us",
      },
      {
        id: 11,
        status: false,
        task: "We are tax-registered and compliant, we have a TIN for the company and all directors",
      },
      {
        id: 12,
        status: false,
        task: "We have contracts with stakeholders in place, such as employees, shareholders, clients, suppliers, etc.",
      },
      {
        id: 13,
        status: false,
        task: "We have registered a company and have vesting agreements in place for all co-founders",
      },
    ],
  },
];

export { steps };
