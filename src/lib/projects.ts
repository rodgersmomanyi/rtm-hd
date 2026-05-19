export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  result: string;
  description: string;
  link?: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "kplc-smart-grid",
    title: "KPLC Smart Grid Backbone",
    client: "Kenya Power",
    year: "2024–Present",
    tags: ["DWDM", "IP/MPLS", "Huawei NetEngine 8000", "Segment Routing"],
    result: "60+ sites · 99.99% uptime · <200µs latency · 50ms failover",
    description:
      "Designed and deployed a national DWDM + IP/MPLS backbone for Kenya Power, spanning 60+ substations and control centres. Implemented Segment Routing with Huawei NetEngine 8000 routers for sub-50ms automated failover, enabling real-time smart-grid telemetry and SCADA reliability at national scale.",
    link: "https://kplc.co.ke",
    color: "#0A4DFF",
  },
  {
    id: "vilcom-isp-core",
    title: "Vilcom ISP Core & Backbone",
    client: "Vilcom Networks",
    year: "2020–Present",
    tags: ["BGP", "ISIS", "100G DWDM", "FTTx", "CDN Peering"],
    result: "100K+ customers · 20+ counties · 300G optimised traffic",
    description:
      "Built and continuously scaled Vilcom's national ISP backbone from the ground up — BGP full-table peering, IS-IS interior routing, 100G DWDM transmission rings, and FTTx last-mile across 20+ Kenyan counties. Integrated CDN peering and DDoS mitigation delivering measurable last-mile improvements.",
    link: "https://radar.qrator.net/as/328739",
    color: "#FF6A1A",
  },
  {
    id: "kenya-biovax-sdwan",
    title: "Kenya Biovax SD-WAN",
    client: "Biovax Institute",
    year: "2024–2025",
    tags: ["SD-WAN", "IPSec", "BGP Failover", "FTTB"],
    result: "Multi-site 100% redundancy · pharma-grade security",
    description:
      "Architected a multi-site SD-WAN solution for a pharmaceutical research institute with strict data-security requirements. Dual-ISP IPSec tunnels with BGP-based automatic failover, achieving 100% site uptime and regulatory-compliant encryption across all lab and admin locations.",
    link: "https://biovax.go.ke",
    color: "#061A4A",
  },
  {
    id: "kpa-ipmpls-wan",
    title: "Kenya Ports Authority IP/MPLS WAN",
    client: "Kenya Ports Authority",
    year: "2023–2024",
    tags: ["BGP Peering", "MPLS L2/L3 VPN", "ISIS"],
    result: "5 main + 15 branch sites · primary internet + WAN",
    description:
      "Designed and delivered KPA's enterprise WAN — BGP peering for primary internet, IS-IS for internal routing, MPLS L2/L3 VPN services connecting 5 main port facilities and 15 branch offices. Ensured carrier-grade resilience for critical national port logistics operations.",
    link: undefined,
    color: "#0A4DFF",
  },
  {
    id: "uasin-gishu-county",
    title: "Uasin Gishu County Connectivity",
    client: "County Government of Uasin Gishu",
    year: "2023",
    tags: ["OSPF", "DIA", "Fibre + Wireless"],
    result: "21 sites: HQ + branches · DNS/email propagation",
    description:
      "Connected 21 county government sites — headquarters and all branch offices — across Eldoret and surrounding areas. Hybrid fibre and wireless topology with OSPF routing, dedicated internet access, and full DNS/email propagation for government e-services.",
    link: "https://uasingishu.go.ke",
    color: "#FF6A1A",
  },
];
