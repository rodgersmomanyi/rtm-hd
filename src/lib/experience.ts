export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isFuture?: boolean;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "google",
    role: "Data Center Technician III",
    company: "Google",
    location: "LPP Hamina Data Center · Hamina, Finland 🇫🇮",
    period: "Starts July 27, 2026",
    isFuture: true,
    bullets: [
      "Joining Google's hyperscale infrastructure team at the Hamina data center in Finland.",
      "Bringing 8+ years of African ISP-scale operations experience into one of the world's most advanced data center campuses.",
      "Focus on physical layer reliability, server lifecycle management, and data center operations excellence.",
    ],
    tags: ["Hyperscale DC", "Google", "Finland", "LPP Campus"],
  },
  {
    id: "vilcom-manager",
    role: "Technical Program Manager | Network Core Systems & Solutions",
    company: "Vilcom Networks Limited",
    location: "Nairobi, Kenya",
    period: "Sept 2024 – Present",
    bullets: [
      "Lead a 19-member multidisciplinary team across Network Engineering, Cybersecurity, Systems, Development, and Data functions.",
      "Maintain 99.99% service availability across the ISP core and transmission infrastructure.",
      "Oversee KPLC DWDM/IP backbone — 60+ sites across Kenya.",
      "Launched SaaS and SECaaS product lines, expanding revenue streams and enterprise market share.",
      "Own SLA governance, vendor management (Huawei, Juniper, Cisco), and OSS/BSS platforms.",
    ],
    tags: ["Leadership", "DWDM", "BGP", "SaaS", "SECaaS", "99.99% Uptime"],
  },
  {
    id: "vilcom-engineer",
    role: "Network Implementation & Systems Engineer",
    company: "Vilcom Networks Limited",
    location: "Nairobi, Kenya",
    period: "Dec 2020 – Aug 2024",
    bullets: [
      "Developed Python/Ansible automation pipelines cutting provisioning time by 65%.",
      "Optimised BGP/IS-IS routing across the core, handling 300G of live traffic.",
      "Commissioned 15+ metropolitan PoPs across 20+ Kenyan counties.",
      "Deployed FTTx access networks connecting 100K+ subscribers.",
      "Integrated CDN peering and DDoS mitigation improving last-mile performance by 40%.",
    ],
    tags: ["Python", "Ansible", "BGP", "IS-IS", "100G DWDM", "FTTx", "CDN"],
  },
  {
    id: "geonet-lead",
    role: "Team Leader — National Optical Fibre, FTTx & IT Systems",
    company: "Geonet Technologies",
    location: "Nairobi, Kenya",
    period: "May 2018 – Nov 2020",
    bullets: [
      "Led a 12-engineer NOC team resolving 150+ monthly incidents across national fibre infrastructure.",
      "Managed Safaricom, ICTA, KPLC, and Huawei enterprise accounts.",
      "Designed and deployed FTTx last-mile solutions across multiple counties.",
      "Established NOC monitoring dashboards and escalation playbooks reducing MTTR by 35%.",
    ],
    tags: ["NOC", "Optical Fibre", "FTTx", "Huawei", "Team Leadership"],
  },
  {
    id: "geonet-noc",
    role: "NOC Engineer",
    company: "Geonet Technologies",
    location: "Nairobi, Kenya",
    period: "Apr 2017 – Apr 2018",
    bullets: [
      "Maintained 99.5% SLA across national optical fibre and DWDM transmission networks.",
      "Diagnosed DWDM dispersion, TCP/IP packet-loss, and BGP anomalies across 12 counties.",
      "First-line fault management for enterprise and carrier-grade circuits.",
    ],
    tags: ["NOC", "DWDM", "BGP", "TCP/IP", "SLA Management"],
  },
  {
    id: "kemri",
    role: "Network/Server Engineer · IT Desktop Support · IT Service Desk",
    company: "KEMRI Wellcome Trust",
    location: "Kilifi, Kenya",
    period: "May – Aug 2016",
    bullets: [
      "Administered Windows Server 2008 R2, Active Directory, DNS, and DHCP.",
      "Managed VoIP infrastructure via Microsoft Lync for a 500-person research facility.",
      "Handled 200+ support tickets per month with high first-call resolution.",
    ],
    tags: ["Windows Server", "Active Directory", "VoIP", "MS Lync", "IT Support"],
  },
];
