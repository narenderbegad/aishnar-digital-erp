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
    id: 'usr-001',
    name: 'Aishnar Admin',
    email: 'admin@aishnardigital.com',
    role: 'super_admin',
    department: 'Executive Leadership',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isActive: true,
    licenseKey: 'AISH-ENT-2026-HQ01-8890',
    organizationName: 'Aishnar Digital Technologies',
    phone: '+91 98290 11223',
    joinedAt: '2025-01-10',
  },
  users: [
    {
      id: 'usr-001',
      name: 'Aishnar Admin',
      email: 'admin@aishnardigital.com',
      role: 'super_admin',
      department: 'Executive Leadership',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isActive: true,
      licenseKey: 'AISH-ENT-2026-HQ01-8890',
      organizationName: 'Aishnar Digital Technologies',
      phone: '+91 98290 11223',
      joinedAt: '2025-01-10',
    },
    {
      id: 'usr-002',
      name: 'Vikramaditya Rathore',
      email: 'vikram@aishnardigital.com',
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
      id: 'usr-003',
      name: 'Priyanka Sen',
      email: 'priyanka.sen@aishnardigital.com',
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
      id: 'usr-004',
      name: 'Rohit Khandelwal',
      email: 'rohit.k@aishnardigital.com',
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
      id: 'usr-005',
      name: 'Ananya Mehra',
      email: 'ananya@apexfinancial.com',
      role: 'client_viewer',
      department: 'Client Representative',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      isActive: false, // Inactive example to demonstrate 1-click activation!
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
      contactName: 'Sanjay Deshmukh',
      contactEmail: 'sanjay@paramountretail.in',
      contactPhone: '+91 98200 44112',
      planTier: 'Enterprise',
      dealValue: 350000,
      billingCycle: 'annual',
      stage: 'Proposal Submitted',
      probability: 80,
      createdDate: '2026-11-10',
      expectedCloseDate: '2026-11-28',
      assignedSalesRep: 'Vikramaditya Rathore',
      notes: 'Need 50 employee seats with geofenced attendance and TV wallboard.',
    },
    {
      id: 'deal-002',
      companyName: 'BlueSky Digital Agency',
      contactName: 'Neha Tandon',
      contactEmail: 'neha@blueskydigital.co',
      contactPhone: '+91 98450 11998',
      planTier: 'Professional',
      dealValue: 180000,
      billingCycle: 'annual',
      stage: 'Contract Negotiation',
      probability: 90,
      createdDate: '2026-11-05',
      expectedCloseDate: '2026-11-24',
      assignedSalesRep: 'Vikramaditya Rathore',
      notes: 'Requested custom branding with their corporate color scheme.',
    },
    {
      id: 'deal-003',
      companyName: 'Titanium Engineering Consortium',
      contactName: 'Col. Rakesh Sharma',
      contactEmail: 'r.sharma@titaniumcorp.org',
      contactPhone: '+91 99100 88221',
      planTier: 'Custom White-Label',
      dealValue: 750000,
      billingCycle: 'annual',
      stage: 'Demo Completed',
      probability: 60,
      createdDate: '2026-11-14',
      expectedCloseDate: '2026-12-10',
      assignedSalesRep: 'Vikramaditya Rathore',
      notes: 'Multi-branch deployment with on-premise data residency requirement.',
    },
    {
      id: 'deal-004',
      companyName: 'Kaveri Logistics & Movers',
      contactName: 'Gaurav Hegde',
      contactEmail: 'gaurav@kaverilogistics.com',
      contactPhone: '+91 98440 22331',
      planTier: 'Starter',
      dealValue: 60000,
      billingCycle: 'annual',
      stage: 'Closed Won',
      probability: 100,
      createdDate: '2026-10-20',
      expectedCloseDate: '2026-11-02',
      assignedSalesRep: 'Vikramaditya Rathore',
      notes: 'License generated and activated. 15 seats active.',
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
    return JSON.parse(raw);
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
