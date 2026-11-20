import { 
  UserProfile, 
  StandingDuty, 
  ProjectTask, 
  EnterpriseProject, 
  ExpenseClaim, 
  ClientInvoice, 
  SoftwareSalesDeal, 
  SoftwareLicense,
  AttendanceRecord,
  MeetingMOM,
  ChatMessage,
  UserRole
} from '../types';

const STORAGE_KEY = 'aishnar_erp_data_v1';

export interface ERPStoreState {
  currentUser: UserProfile;
  users: UserProfile[];
  duties: StandingDuty[];
  tasks: ProjectTask[];
  projects: EnterpriseProject[];
  expenses: ExpenseClaim[];
  invoices: ClientInvoice[];
  salesDeals: SoftwareSalesDeal[];
  licenses: SoftwareLicense[];
  attendance: AttendanceRecord[];
  meetings: MeetingMOM[];
  messages: ChatMessage[];
  performanceScore: number;
}

// Initial Clean Production Business Data (Zero wedding data, zero dummy mock text)
const defaultState: ERPStoreState = {
  currentUser: {
    id: 'usr-admin-01',
    name: 'Narender Begad',
    email: 'Narender@aishnar.com',
    password: '#Narender0077',
    role: 'super_admin',
    department: 'Executive Leadership & Founder',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    licenseKey: 'AISH-ENT-2026-HQ01-8890',
    organizationName: 'Aishnar Digital Technologies',
    phone: '+91 98290 11223',
    joinedAt: '2025-01-10',
  },
  users: [
    {
      id: 'usr-admin-01',
      name: 'Narender Begad',
      email: 'Narender@aishnar.com',
      password: '#Narender0077',
      role: 'super_admin',
      department: 'Executive Leadership & Founder',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies',
      phone: '+91 98290 11223',
      joinedAt: '2025-01-10',
    },
    {
      id: 'usr-sales-02',
      name: 'Vikramaditya Rathore',
      email: 'vikram@aishnar.com',
      password: 'Vikram@2026',
      role: 'sales_admin',
      department: 'SaaS Software Sales & Growth',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies',
      phone: '+91 98290 44556',
      joinedAt: '2025-03-15',
    },
    {
      id: 'usr-pm-03',
      name: 'Priyanka Sen',
      email: 'priyanka@aishnar.com',
      password: 'Priyanka@2026',
      role: 'project_manager',
      department: 'Enterprise Delivery & Engineering',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies',
      phone: '+91 98290 77889',
      joinedAt: '2025-04-01',
    },
    {
      id: 'usr-eng-04',
      name: 'Rohit Khandelwal',
      email: 'rohit@aishnar.com',
      password: 'Rohit@2026',
      role: 'team_member',
      department: 'Full Stack Cloud Development',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies',
      phone: '+91 98290 99001',
      joinedAt: '2025-06-12',
    },
    {
      id: 'usr-client-05',
      name: 'Ananya Mehra',
      email: 'ananya@apexfinancial.com',
      password: 'Apex@2026',
      role: 'client_viewer',
      department: 'Client Representative',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-STARTER-2026-88F1-44B2',
      organizationName: 'Apex Financial Services',
      phone: '+91 98110 33445',
      joinedAt: '2026-11-18',
    }
  ],
  duties: [
    {
      id: 'duty-001',
      title: 'Review production cluster health & telemetry',
      description: 'Audit AWS ECS/Kubernetes node utilization and response times (<120ms latency).',
      frequency: 'daily',
      isCompleted: true,
      assignedTo: 'Rohit Khandelwal',
      category: 'Operations',
    },
    {
      id: 'duty-002',
      title: 'Audit enterprise license activations & seat limits',
      description: 'Inspect active licenses, token expiration dates, and pending user onboardings.',
      frequency: 'daily',
      isCompleted: false,
      assignedTo: 'Vikramaditya Rathore',
      category: 'Security',
    },
    {
      id: 'duty-003',
      title: 'Review and approve pending employee expense claims',
      description: 'Validate attached GST invoices and disburse approved vouchers by Friday.',
      frequency: 'daily',
      isCompleted: true,
      assignedTo: 'Aishnar Admin',
      category: 'Finance',
    },
    {
      id: 'duty-004',
      title: 'Run client milestone review and sync call',
      description: 'Present sprint deliverables to Apex Financial leadership and capture Minutes of Meeting.',
      frequency: 'daily',
      isCompleted: false,
      assignedTo: 'Priyanka Sen',
      category: 'Client Review',
    }
  ],
  tasks: [
    {
      id: 'task-101',
      projectId: 'proj-001',
      title: 'Deploy Automated Database Replication & Failover',
      assigneeName: 'Rohit Khandelwal',
      assigneeRole: 'Cloud DevOps',
      dueDate: '2026-11-22',
      priority: 'high',
      status: 'in_progress',
      pointsDeductionOnOverdue: 8,
    },
    {
      id: 'task-102',
      projectId: 'proj-001',
      title: 'Conduct Final Security Penetration Test & Audit Signoff',
      assigneeName: 'Priyanka Sen',
      assigneeRole: 'Lead Architect',
      dueDate: '2026-11-25',
      priority: 'urgent',
      status: 'pending',
      pointsDeductionOnOverdue: 8,
    },
    {
      id: 'task-103',
      projectId: 'proj-002',
      title: 'Complete Single Sign-On (SSO) SAML Integration',
      assigneeName: 'Rohit Khandelwal',
      assigneeRole: 'Backend Engineer',
      dueDate: '2026-11-21',
      priority: 'medium',
      status: 'in_progress',
      pointsDeductionOnOverdue: 5,
    },
    {
      id: 'task-104',
      projectId: 'proj-003',
      title: 'Submit Compliance Report for ISO 27001 Certification',
      assigneeName: 'Aishnar Admin',
      assigneeRole: 'Director',
      dueDate: '2026-11-29',
      priority: 'high',
      status: 'pending',
      pointsDeductionOnOverdue: 8,
    }
  ],
  projects: [
    {
      id: 'proj-001',
      code: 'AISH-PRJ-2026-01',
      name: 'Apex Global Financial Core Modernization',
      clientOrganization: 'Apex Financial Services Ltd.',
      clientContact: 'Rajesh Mehra (VP Technology)',
      leadManager: 'Priyanka Sen',
      status: 'Active Execution',
      progressPercent: 78,
      startDate: '2026-08-01',
      targetDeliveryDate: '2026-12-15',
      budgetTotal: 1850000,
      deliverablesCount: 14,
      openTasksCount: 4,
      criticalAlert: 'Security Penetration testing window starts this Thursday.',
    },
    {
      id: 'proj-002',
      code: 'AISH-PRJ-2026-02',
      name: 'Nova Healthcare Tele-Operations Suite',
      clientOrganization: 'Nova Hospitals & Clinics Group',
      clientContact: 'Dr. Shalini Kapoor (Chief Medical Officer)',
      leadManager: 'Priyanka Sen',
      status: 'Active Execution',
      progressPercent: 62,
      startDate: '2026-09-15',
      targetDeliveryDate: '2027-01-30',
      budgetTotal: 2400000,
      deliverablesCount: 20,
      openTasksCount: 7,
    },
    {
      id: 'proj-003',
      code: 'AISH-PRJ-2026-03',
      name: 'Zenith Omnichannel Logistics Supply Chain Portal',
      clientOrganization: 'Zenith Logistics International',
      clientContact: 'Kunal Singhania (Head of Operations)',
      leadManager: 'Rohit Khandelwal',
      status: 'Planning',
      progressPercent: 25,
      startDate: '2026-11-01',
      targetDeliveryDate: '2027-03-31',
      budgetTotal: 1450000,
      deliverablesCount: 10,
      openTasksCount: 3,
    }
  ],
  expenses: [
    {
      id: 'exp-501',
      claimantName: 'Rohit Khandelwal',
      claimantRole: 'DevOps Engineer',
      title: 'AWS Production Reserved Instance Annual Renewals',
      category: 'Cloud Infrastructure',
      amount: 42500,
      date: '2026-11-18',
      status: 'approved',
      approvedBy: 'Aishnar Admin',
      projectCode: 'AISH-PRJ-2026-01',
    },
    {
      id: 'exp-502',
      claimantName: 'Priyanka Sen',
      claimantRole: 'Lead Architect',
      title: 'On-site Client Architecture & Security Workshop Travel',
      category: 'Client Travel',
      amount: 14200,
      date: '2026-11-19',
      status: 'pending',
      projectCode: 'AISH-PRJ-2026-01',
    },
    {
      id: 'exp-503',
      claimantName: 'Vikramaditya Rathore',
      claimantRole: 'SaaS Sales Lead',
      title: 'Enterprise Software Exhibition & Booth Sponsorship',
      category: 'Office Operations',
      amount: 35000,
      date: '2026-11-15',
      status: 'reimbursed',
      approvedBy: 'Aishnar Admin',
    }
  ],
  invoices: [
    {
      id: 'inv-901',
      invoiceNumber: 'INV-AISH-2026-088',
      clientName: 'Apex Financial Services Ltd.',
      projectName: 'Apex Global Financial Core Modernization',
      amount: 450000,
      issueDate: '2026-11-05',
      dueDate: '2026-11-25',
      status: 'sent',
    },
    {
      id: 'inv-902',
      invoiceNumber: 'INV-AISH-2026-079',
      clientName: 'Nova Hospitals & Clinics Group',
      projectName: 'Nova Healthcare Tele-Operations Suite',
      amount: 600000,
      issueDate: '2026-10-15',
      dueDate: '2026-10-30',
      status: 'paid',
    },
    {
      id: 'inv-903',
      invoiceNumber: 'INV-AISH-2026-065',
      clientName: 'Zenith Logistics International',
      projectName: 'Zenith Omnichannel Logistics Supply Chain Portal',
      amount: 350000,
      issueDate: '2026-11-01',
      dueDate: '2026-11-15',
      status: 'paid',
    }
  ],
  // Special Section: Software Sales (Managing sales of Aishnar Digital-ERP)
  salesDeals: [
    {
      id: 'deal-001',
      companyName: 'Paramount Retail Network',
      website: 'paramountretail.in',
      industry: 'Omnichannel Retail & E-Commerce',
      contactName: 'Sanjay Deshmukh',
      contactRole: 'Chief Operating Officer (COO)',
      contactEmail: 'sanjay@paramountretail.in',
      contactPhone: '+91 98200 44112',
      planTier: 'Enterprise',
      seatsCount: 50,
      dealValue: 350000,
      mrr: 29166,
      billingCycle: 'annual',
      paymentTerms: 'Annual Upfront',
      stage: 'proposal_quote',
      probability: 75,
      createdDate: '2026-11-10',
      expectedCloseDate: '2026-11-28',
      assignedSalesRep: 'Vikramaditya Rathore',
      quotationNumber: 'QT-AISH-2026-081',
      nextStep: 'Executive quotation under review by board. Final approval call Friday.',
      notes: 'Need 50 employee seats with geofenced attendance, multi-warehouse SOPs and TV wallboard.',
    },
    {
      id: 'deal-002',
      companyName: 'BlueSky Digital Agency',
      website: 'blueskydigital.co',
      industry: 'Creative & Digital Marketing',
      contactName: 'Neha Tandon',
      contactRole: 'Managing Partner & Co-Founder',
      contactEmail: 'neha@blueskydigital.co',
      contactPhone: '+91 98450 11998',
      planTier: 'Professional',
      seatsCount: 25,
      dealValue: 180000,
      mrr: 15000,
      billingCycle: 'annual',
      paymentTerms: 'Net 30',
      stage: 'contract_negotiation',
      probability: 90,
      createdDate: '2026-11-05',
      expectedCloseDate: '2026-11-24',
      assignedSalesRep: 'Narender Begad',
      quotationNumber: 'QT-AISH-2026-074',
      nextStep: 'MSA & Master Service Agreement shared with legal team.',
      notes: 'Requested custom branding with their corporate color scheme and sprint tracking.',
    },
    {
      id: 'deal-003',
      companyName: 'Titanium Engineering Consortium',
      website: 'titaniumcorp.org',
      industry: 'Heavy Infrastructure & EPC',
      contactName: 'Col. Rakesh Sharma',
      contactRole: 'VP Operations & Procurement',
      contactEmail: 'r.sharma@titaniumcorp.org',
      contactPhone: '+91 99100 88221',
      planTier: 'Custom White-Label',
      seatsCount: 120,
      dealValue: 750000,
      mrr: 62500,
      billingCycle: 'annual',
      paymentTerms: 'Annual Upfront',
      stage: 'security_legal',
      probability: 65,
      createdDate: '2026-11-14',
      expectedCloseDate: '2026-12-10',
      assignedSalesRep: 'Narender Begad',
      quotationNumber: 'QT-AISH-2026-092',
      nextStep: 'SOC2 Type II compliance audit questionnaire submitted to infosec.',
      notes: 'Multi-branch deployment with on-premise data residency requirement and dedicated host.',
    },
    {
      id: 'deal-004',
      companyName: 'Kaveri Logistics & Movers',
      website: 'kaverilogistics.com',
      industry: 'Supply Chain & Freight Logistics',
      contactName: 'Gaurav Hegde',
      contactRole: 'Head of Technology',
      contactEmail: 'gaurav@kaverilogistics.com',
      contactPhone: '+91 98440 22331',
      planTier: 'Starter',
      seatsCount: 15,
      dealValue: 60000,
      mrr: 5000,
      billingCycle: 'annual',
      paymentTerms: 'Annual Upfront',
      stage: 'closed_won',
      probability: 100,
      createdDate: '2026-10-20',
      expectedCloseDate: '2026-11-02',
      assignedSalesRep: 'Vikramaditya Rathore',
      quotationNumber: 'QT-AISH-2026-052',
      nextStep: 'Onboarding completed. License key AISH-PRO-2026-77T1-9921 provisioned.',
      notes: 'License generated and activated. 15 seats active across 2 branch hubs.',
    },
    {
      id: 'deal-005',
      companyName: 'Zenith Global Healthcare',
      website: 'zenithhealth.org',
      industry: 'Hospitality & Telemedicine',
      contactName: 'Dr. Alok Verma',
      contactRole: 'Chief Medical & Technology Officer',
      contactEmail: 'alok.verma@zenithhealth.org',
      contactPhone: '+91 98110 55432',
      planTier: 'Enterprise',
      seatsCount: 75,
      dealValue: 480000,
      mrr: 40000,
      billingCycle: 'annual',
      paymentTerms: 'Net 15',
      stage: 'discovery_demo',
      probability: 45,
      createdDate: '2026-11-17',
      expectedCloseDate: '2026-12-15',
      assignedSalesRep: 'Narender Begad',
      nextStep: 'Product demo scheduled for medical board on Tuesday 11:30 AM.',
      notes: 'Interested in shift attendance tracking, doctor duties checklist and expense approval vouchers.',
    },
    {
      id: 'deal-006',
      companyName: 'Falcon Cyber Defense Labs',
      website: 'falconcyber.io',
      industry: 'Information Security & Cloud Audits',
      contactName: 'Manoj Pillai',
      contactRole: 'Managing Director',
      contactEmail: 'm.pillai@falconcyber.io',
      contactPhone: '+91 99200 66778',
      planTier: 'Professional',
      seatsCount: 20,
      dealValue: 150000,
      mrr: 12500,
      billingCycle: 'annual',
      paymentTerms: 'Annual Upfront',
      stage: 'lead_inbound',
      probability: 25,
      createdDate: '2026-11-19',
      expectedCloseDate: '2026-12-28',
      assignedSalesRep: 'Vikramaditya Rathore',
      nextStep: 'Inbound demo inquiry received from website form. Qualifying budget.',
      notes: 'Wants to replace monday.com with self-hosted high privacy ERP.',
    }
  ],
  // Special Section: Software Licenses Managed by Aishnar Digital
  licenses: [
    {
      id: 'lic-001',
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies (Internal Headquarters)',
      adminEmail: 'admin@aishnardigital.com',
      tier: 'Enterprise',
      seatLimit: 100,
      activeSeats: 18,
      status: 'active',
      issuedAt: '2025-01-01',
      expiresAt: '2028-01-01',
      autoRenew: true,
      featuresAllowed: ['all_modules', 'software_sales', 'user_activation', 'tv_wallboard', 'api_access', 'custom_branding'],
    },
    {
      id: 'lic-002',
      licenseKey: 'AISH-PRO-2026-77T1-9921',
      organizationName: 'Kaveri Logistics & Movers',
      adminEmail: 'gaurav@kaverilogistics.com',
      tier: 'Professional',
      seatLimit: 25,
      activeSeats: 14,
      status: 'active',
      issuedAt: '2026-11-02',
      expiresAt: '2027-11-02',
      autoRenew: true,
      featuresAllowed: ['today_dashboard', 'project_work', 'money_expenses', 'team_attendance'],
    },
    {
      id: 'lic-003',
      licenseKey: 'AISH-STARTER-2026-88F1-44B2',
      organizationName: 'Apex Financial Services (Client Portal Tenant)',
      adminEmail: 'ananya@apexfinancial.com',
      tier: 'Starter',
      seatLimit: 5,
      activeSeats: 1,
      status: 'suspended', // Suspended to show activation trigger!
      issuedAt: '2026-11-18',
      expiresAt: '2027-11-18',
      autoRenew: false,
      featuresAllowed: ['client_portal', 'project_viewer', 'invoice_approval'],
    }
  ],
  attendance: [
    {
      id: 'att-01',
      userId: 'usr-001',
      userName: 'Aishnar Admin',
      punchInTime: '08:55 AM',
      status: 'on_time',
      location: 'Aishnar Digital HQ · Jaipur Campus',
      hoursWorked: 4.5,
    },
    {
      id: 'att-02',
      userId: 'usr-002',
      userName: 'Vikramaditya Rathore',
      punchInTime: '09:05 AM',
      status: 'on_time',
      location: 'Aishnar Digital HQ · Jaipur Campus',
      hoursWorked: 4.3,
    },
    {
      id: 'att-03',
      userId: 'usr-003',
      userName: 'Priyanka Sen',
      punchInTime: '09:12 AM',
      status: 'on_time',
      location: 'Remote Work · Verified IP',
      hoursWorked: 4.2,
    },
    {
      id: 'att-04',
      userId: 'usr-004',
      userName: 'Rohit Khandelwal',
      punchInTime: '09:35 AM',
      status: 'late',
      location: 'Aishnar Digital HQ · Jaipur Campus',
      hoursWorked: 3.8,
    }
  ],
  meetings: [
    {
      id: 'mom-01',
      projectCode: 'AISH-PRJ-2026-01',
      title: 'Sprint 14 Architecture & Security Milestone Review',
      date: '2026-11-19',
      attendees: ['Aishnar Admin', 'Priyanka Sen', 'Rajesh Mehra (Apex VP)'],
      keyDecisions: [
        'Approved multi-region RDS read replicas for financial failover.',
        'Agreed on live user acceptance testing (UAT) cutoff on December 5th.',
        'Signed off on SOC2 audit remediation plan.'
      ],
      actionItems: [
        { item: 'Configure RDS read replica parameter groups', owner: 'Rohit Khandelwal', deadline: '2026-11-22' },
        { item: 'Submit final penetration test scope to auditors', owner: 'Priyanka Sen', deadline: '2026-11-24' }
      ]
    }
  ],
  messages: [
    {
      id: 'msg-01',
      channelId: 'general-announcements',
      senderName: 'Aishnar Admin',
      senderRole: 'Super Admin',
      content: 'Welcome team to Aishnar Digital-ERP v2.6. All sprint milestone deliveries and sales pipeline trackers are now live on this platform.',
      timestamp: '09:00 AM',
      isAnnouncement: true,
    },
    {
      id: 'msg-02',
      channelId: 'general-announcements',
      senderName: 'Vikramaditya Rathore',
      senderRole: 'SaaS Sales Lead',
      content: 'Great news team! We closed the Kaveri Logistics enterprise license deal for Aishnar Digital-ERP. License key issued and 15 seats provisioned.',
      timestamp: '10:15 AM',
      isAnnouncement: false,
    },
    {
      id: 'msg-03',
      channelId: 'engineering-ops',
      senderName: 'Rohit Khandelwal',
      senderRole: 'DevOps',
      content: 'Database migration scripts validated on staging. Automated zero-downtime deployment pipeline is standing by.',
      timestamp: '11:30 AM',
      isAnnouncement: false,
    }
  ],
  performanceScore: 94,
};

// Local storage loader with fallback
export function loadStore(): ERPStoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStore(defaultState);
      return defaultState;
    }
    const parsed: ERPStoreState = JSON.parse(raw);
    
    // Ensure Super Admin Narender is always configured with exact requested credentials
    const adminIndex = parsed.users.findIndex(u => u.email.toLowerCase() === 'narender@aishnar.com');
    if (adminIndex >= 0) {
      parsed.users[adminIndex].password = '#Narender0077';
      parsed.users[adminIndex].role = 'super_admin';
      parsed.users[adminIndex].isActive = true;
    } else {
      parsed.users = [defaultState.currentUser, ...parsed.users];
    }

    // Ensure all seeded users have passwords
    parsed.users.forEach(u => {
      if (!u.password) {
        if (u.email.toLowerCase() === 'narender@aishnar.com') u.password = '#Narender0077';
        else u.password = 'Aishnar@2026';
      }
    });

    saveStore(parsed);
    return parsed;
  } catch (e) {
    console.error('Error loading store from localStorage:', e);
    return defaultState;
  }
}

export function saveStore(state: ERPStoreState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving store to localStorage:', e);
  }
}

// Generate secure format license keys: AISH-[TIER]-[YEAR]-[4RANDOM]-[4RANDOM]
export function generateLicenseKey(tier: string = 'ENT'): string {
  const shortTier = tier.toUpperCase().slice(0, 3);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const randSegment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `AISH-${shortTier}-2026-${randSegment()}-${randSegment()}`;
}
