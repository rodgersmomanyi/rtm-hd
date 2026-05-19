export interface Cert {
  name: string;
  issuer: string;
  year: string;
  color?: string;
}

export const certs: Cert[] = [
  { name: "Google Cybersecurity", issuer: "Google", year: "2024" },
  { name: "Google IT Support", issuer: "Google", year: "2024" },
  { name: "Google Data Analytics", issuer: "Google", year: "2024" },
  { name: "JNCIA-Junos", issuer: "Juniper", year: "2023" },
  { name: "JNCIS-SP", issuer: "Juniper", year: "2023" },
  { name: "HCIA-Routing & Switching", issuer: "Huawei", year: "2022" },
  { name: "HCIP-Routing & Switching", issuer: "Huawei", year: "2022" },
  { name: "HCSA-Storage", issuer: "Huawei", year: "2023" },
  { name: "HCSP-Transmission", issuer: "Huawei", year: "2023" },
  { name: "Azure Fundamentals AZ-900", issuer: "Microsoft", year: "2023" },
  { name: "Azure AI Fundamentals AI-900", issuer: "Microsoft", year: "2023" },
  { name: "ACS — Certified Network Engineer", issuer: "Alcatel/Nokia", year: "2021" },
  { name: "Google Cloud Digital Leader", issuer: "Google", year: "2024" },
  { name: "CCNA (In Progress)", issuer: "Cisco", year: "2025" },
];

export const skills: string[] = [
  "Active Directory",
  "Ansible",
  "Azure",
  "Bash",
  "BGP",
  "CDN",
  "DHCP",
  "DNS",
  "DWDM",
  "FTTx",
  "GCP",
  "GPON",
  "Huawei",
  "IPv6",
  "IS-IS",
  "Juniper",
  "Linux",
  "MPLS",
  "MikroTik",
  "OSPF",
  "Python",
  "QoS",
  "SD-WAN",
  "SDH",
  "Segment Routing",
  "VLAN",
  "VoIP",
  "WAN",
  "Windows Server",
  "Wireshark",
  "Zabbix",
];
