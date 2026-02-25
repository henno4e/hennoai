const SERVICE_INFO: Record<string, Record<string, string>> = {
  shadow_day: {
    title: "Shadow Day",
    description:
      "Henno spends a full day embedded in your business — watching how your team works, where time gets wasted, and which tasks are ripe for automation. At the end, you get a prioritized list of automation opportunities with estimated time savings for each.",
    ideal_for:
      "Businesses that know they're inefficient but aren't sure where to start.",
    deliverable:
      "A written automation roadmap with 5-10 specific opportunities ranked by impact and effort.",
  },
  automation_builds: {
    title: "Automation Builds",
    description:
      "Henno builds custom automations that connect your existing tools and eliminate manual work. Common builds include: invoice data extraction, CRM-to-spreadsheet syncing, automated email sequences, booking/scheduling flows, report generation, and document processing.",
    how_it_works:
      "After the audit call, Henno scopes the build, gives you a clear quote, and delivers a working automation — typically within 1-2 weeks.",
    deliverable:
      "A fully working automation integrated into your existing tools, with documentation and a walkthrough.",
  },
  ongoing_support: {
    title: "Ongoing Support",
    description:
      "After the build, Henno offers optional monthly retainer packages for monitoring, optimization, and building new automations as your business evolves. No lock-in — everything built is yours to keep.",
    includes:
      "Monitoring, bug fixes, performance tweaks, and building new automations as needs arise.",
  },
  pricing: {
    title: "Pricing",
    description:
      "The initial 30-minute audit call is completely free. Automation builds depend on the size and complexity of your business. Henno will give you a clear quote after the audit once he understands your situation. No surprises. Most clients see a return on their investment within the first month.",
    note: "For specific pricing, book the free audit call and Henno will provide a transparent quote.",
  },
  process: {
    title: "How It Works",
    steps:
      "1. Book a free 30-minute audit call. 2. On the call, Henno digs into your daily operations and identifies 2-3 quick wins. 3. If there's a fit, Henno scopes an automation build and gives you a clear quote. 4. Henno builds and delivers, typically within 1-2 weeks. 5. Optional ongoing support to keep things running and add new automations.",
    note: "You walk away from the audit with actionable insights whether you work with Henno or not.",
  },
};

export function getServiceInfo(
  service: string
): Record<string, string> | { error: string } {
  const info = SERVICE_INFO[service];
  if (!info) {
    return { error: `Unknown service: ${service}` };
  }
  return info;
}
