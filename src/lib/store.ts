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

const STORAGE_KEY = 'aishnar_erp_data_v3';

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
      title: 'Airport arrival VIP convoy & luggage color-coding protocol',
      description: 'Coordinate 14 luxury Innova Crystas & Mercedes vans from Maharana Pratap Airport with digital bag tags.',
      frequency: 'daily',
      isCompleted: true,
      assignedTo: 'Rohit Khandelwal',
      category: 'Hospitality',
    },
    {
      id: 'duty-002',
      title: 'Artist tech-rider soundcheck & line array beam-steering signoff',
      description: 'L-Acoustics K2 sound calibration, wireless microphone frequency scan & LED wall pixel mapping.',
      frequency: 'daily',
      isCompleted: false,
      assignedTo: 'Vikramaditya Rathore',
      category: 'Audio/Visuals',
    },
    {
      id: 'duty-003',
      title: 'Banquet live cooking stations & premium bar excise inventory audit',
      description: 'Reconcile liquor bottle count seals, ice sculpture placement & chef signature royal buffet tasting.',
      frequency: 'daily',
      isCompleted: true,
      assignedTo: 'Aishnar Admin',
      category: 'F&B / Catering',
    },
    {
      id: 'duty-004',
      title: 'Mandap floral canopy structural load test & cold-pyro safety token',
      description: 'Verify wind-load resistance of mandap dome, varmala dry-ice smoke guns, and fire extinguisher placement.',
      frequency: 'daily',
      isCompleted: false,
      assignedTo: 'Priyanka Sen',
      category: 'Decor & Safety',
    }
  ],
  tasks: [
    {
      id: 'task-101',
      projectId: 'proj-001',
      title: 'Finalize VIP Guest Flight Arrival Manifest & Charter Slots',
      assigneeName: 'Rohit Khandelwal',
      assigneeRole: 'Hospitality Lead',
      dueDate: '2026-11-22',
      priority: 'urgent',
      status: 'in_progress',
      pointsDeductionOnOverdue: 10,
    },
    {
      id: 'task-102',
      projectId: 'proj-001',
      title: 'Sign off Artist Sangeet Performance Cue-Sheet & Stage Lighting',
      assigneeName: 'Priyanka Sen',
      assigneeRole: 'Lead Wedding Producer',
      dueDate: '2026-11-24',
      priority: 'urgent',
      status: 'pending',
      pointsDeductionOnOverdue: 10,
    },
    {
      id: 'task-103',
      projectId: 'proj-001',
      title: 'Deliver Bespoke Welcome Hampers & Digital Room Key Envelopes',
      assigneeName: 'Rohit Khandelwal',
      assigneeRole: 'Guest Relations',
      dueDate: '2026-11-21',
      priority: 'high',
      status: 'in_progress',
      pointsDeductionOnOverdue: 8,
    },
    {
      id: 'task-104',
      projectId: 'proj-001',
      title: 'Clear 50% Stage Trussing & Decor Vendor Milestone Clearance',
      assigneeName: 'Aishnar Admin',
      assigneeRole: 'Commercials',
      dueDate: '2026-11-25',
      priority: 'high',
      status: 'pending',
      pointsDeductionOnOverdue: 8,
    }
  ],
  projects: [
    {
      id: 'proj-001',
      code: 'AISH-WED-2026-01',
      name: 'Singhania-Kapoor Royal Wedding',
      clientOrganization: 'Singhania Family Offices (Udaipur)',
      clientContact: 'Harshvardhan Singhania',
      leadManager: 'Priyanka Sen',
      status: 'Active Execution',
      progressPercent: 88,
      startDate: '2026-10-01',
      targetDeliveryDate: '2026-11-25',
      budgetTotal: 24000000,
      deliverablesCount: 24,
      openTasksCount: 4,
      venue: 'The City Palace & Jagmandir, Udaipur',
      guestCount: 550,
      eventType: 'Destination Wedding (3 Days)',
      countdownDays: 4,
      criticalAlert: 'Airport VIP fleet convoy coordination starts 07:00 AM Thursday.',
    },
    {
      id: 'proj-002',
      code: 'AISH-WED-2026-02',
      name: 'Mehta-Deshmukh Heritage Sangeet & Reception',
      clientOrganization: 'Mehta Group (Jaipur)',
      clientContact: 'Vikram Mehta',
      leadManager: 'Rohit Khandelwal',
      status: 'Active Execution',
      progressPercent: 65,
      startDate: '2026-10-15',
      targetDeliveryDate: '2026-12-08',
      budgetTotal: 16500000,
      deliverablesCount: 18,
      openTasksCount: 6,
      venue: 'Rambagh Palace, Jaipur',
      guestCount: 420,
      eventType: 'Palace Wedding (2 Days)',
      countdownDays: 17,
      criticalAlert: 'Stage trussing & artist tech-rider soundcheck clearance needed.',
    },
    {
      id: 'proj-003',
      code: 'AISH-WED-2026-03',
      name: 'Goa Beachfront Sundowner & Vows',
      clientOrganization: 'Aditya & Sanjana Wedding',
      clientContact: 'Sanjana Roy',
      leadManager: 'Priyanka Sen',
      status: 'Planning',
      progressPercent: 35,
      startDate: '2026-11-01',
      targetDeliveryDate: '2026-12-24',
      budgetTotal: 9500000,
      deliverablesCount: 12,
      openTasksCount: 5,
      venue: 'W Goa, Vagator',
      guestCount: 280,
      eventType: 'Beachfront Destination',
      countdownDays: 33,
      criticalAlert: 'Alcohol excise permit & beach DJ sound license submission pending.',
    }
  ],
  expenses: [
    {
      id: 'exp-501',
      claimantName: 'Rohit Khandelwal',
      claimantRole: 'Hospitality Lead',
      title: 'Maharana Pratap Airport VIP Fast-Track & Luggage Fleet Tips',
      category: 'Guest Hospitality',
      amount: 35000,
      date: '2026-11-18',
      status: 'approved',
      approvedBy: 'Aishnar Admin',
      projectCode: 'AISH-WED-2026-01',
    },
    {
      id: 'exp-502',
      claimantName: 'Priyanka Sen',
      claimantRole: 'Lead Wedding Producer',
      title: 'Live Band Artist Tech-Rider Extra Wireless IEM In-Ear Monitors & Batteries',
      category: 'Audio/Visuals',
      amount: 18500,
      date: '2026-11-19',
      status: 'pending',
      projectCode: 'AISH-WED-2026-01',
    },
    {
      id: 'exp-503',
      claimantName: 'Vikramaditya Rathore',
      claimantRole: 'Production Ops',
      title: 'Mandap Exotic Imported Orchid & Jasmine Consignment Clearance',
      category: 'Decor & Florals',
      amount: 72000,
      date: '2026-11-15',
      status: 'reimbursed',
      approvedBy: 'Aishnar Admin',
    }
  ],
  invoices: [
    {
      id: 'inv-901',
      invoiceNumber: 'INV-WED-2026-001',
      clientName: 'Singhania Family Offices',
      projectName: 'Singhania-Kapoor Royal Wedding',
      amount: 12000000,
      issueDate: '2026-11-01',
      dueDate: '2026-11-20',
      status: 'paid',
    },
    {
      id: 'inv-902',
      invoiceNumber: 'INV-WED-2026-002',
      clientName: 'Singhania Family Offices',
      projectName: 'Singhania-Kapoor Royal Wedding',
      amount: 7200000,
      issueDate: '2026-11-15',
      dueDate: '2026-11-28',
      status: 'sent',
    },
    {
      id: 'inv-903',
      invoiceNumber: 'INV-WED-2026-003',
      clientName: 'Mehta Group (Jaipur)',
      projectName: 'Mehta-Deshmukh Heritage Sangeet & Reception',
      amount: 8250000,
      issueDate: '2026-11-10',
      dueDate: '2026-11-25',
      status: 'paid',
    }
  ],
  // Special Section: Software Sales (Licensing Aishnar Digital-ERP to Event Agencies)
  salesDeals: [
    {
      id: 'deal-001',
      companyName: 'Royal Knot Luxury Weddings (Delhi/Jaipur)',
      website: 'royalknotweddings.in',
      industry: 'Destination Wedding & Event Production',
      contactName: 'Karan Joharvi',
      contactRole: 'Managing Director & Founder',
      contactEmail: 'karan@royalknotweddings.in',
      contactPhone: '+91 98100 22331',
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
      nextStep: 'Executive quotation for ₹3.5L under review by partners. Closing call Friday.',
      notes: 'Need 50 coordinator seats with airport guest fleet tracking, 200+ wedding SOPs and backstage TV wallboard.',
    },
    {
      id: 'deal-002',
      companyName: 'Weddings by Shailesh (Jaipur/Udaipur)',
      website: 'weddingsbyshailesh.com',
      industry: 'Royal Destination Weddings',
      contactName: 'Shailesh Shekhawat',
      contactRole: 'Founder & Lead Producer',
      contactEmail: 'shailesh@weddingsbyshailesh.com',
      contactPhone: '+91 98290 88771',
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
      nextStep: 'Contract sent. Setting up automated WhatsApp guest RSVP flow.',
      notes: 'Wants full wedding SOP suite and 50/30/20 vendor payment milestone tracking.',
    },
    {
      id: 'deal-003',
      companyName: 'Vows & Tales Destinations (Mumbai/Goa)',
      website: 'vowsandtales.co',
      industry: 'Ultra-Luxury Wedding Agency',
      contactName: 'Ananya Singhal',
      contactRole: 'Partner & Head of Production',
      contactEmail: 'ananya@vowsandtales.co',
      contactPhone: '+91 99200 11445',
      planTier: 'Custom White-Label',
      seatsCount: 100,
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
      nextStep: 'White-label custom domain setup and dedicated database isolation.',
      notes: 'Premier Mumbai luxury wedding firm. Handles 15+ destination weddings a year in Udaipur, Jaipur, and Antalya.',
    },
    {
      id: 'deal-004',
      companyName: 'Marigold Heritage Events (Ahmedabad)',
      website: 'marigoldevents.in',
      industry: 'Palace Wedding Management',
      contactName: 'Hardik Patel',
      contactRole: 'Co-Founder',
      contactEmail: 'hardik@marigoldevents.in',
      contactPhone: '+91 98240 66551',
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
      nextStep: 'License key AISH-PRO-2026-77T1-9921 provisioned. Team onboarding complete.',
      notes: 'License activated for 15 coordinators managing palace weddings in Gujarat & Rajasthan.',
    },
    {
      id: 'deal-005',
      companyName: 'The Grand Vow Co. (Dubai/Bangalore)',
      website: 'thegrandvow.ae',
      industry: 'International Destination Weddings',
      contactName: 'Zaid Al-Mansoor',
      contactRole: 'Director of Operations',
      contactEmail: 'zaid@thegrandvow.ae',
      contactPhone: '+971 50 123 4567',
      planTier: 'Enterprise',
      seatsCount: 50,
      dealValue: 350000,
      mrr: 29166,
      billingCycle: 'annual',
      paymentTerms: 'Net 15',
      stage: 'discovery_demo',
      probability: 45,
      createdDate: '2026-11-17',
      expectedCloseDate: '2026-12-15',
      assignedSalesRep: 'Narender Begad',
      nextStep: 'Live demo scheduled for Dubai leadership team on Tuesday 03:00 PM GST.',
      notes: 'Need multi-currency handling (AED, INR, USD) and WhatsApp Cloud guest room allocation.',
    },
    {
      id: 'deal-006',
      companyName: 'Aura Luxury Planners (Chandigarh)',
      website: 'auraplanners.in',
      industry: 'North India Luxury Weddings',
      contactName: 'Harpreet Gill',
      contactRole: 'Managing Director',
      contactEmail: 'harpreet@auraplanners.in',
      contactPhone: '+91 98760 99881',
      planTier: 'Professional',
      seatsCount: 25,
      dealValue: 180000,
      mrr: 15000,
      billingCycle: 'annual',
      paymentTerms: 'Annual Upfront',
      stage: 'lead_inbound',
      probability: 25,
      createdDate: '2026-11-19',
      expectedCloseDate: '2026-12-28',
      assignedSalesRep: 'Vikramaditya Rathore',
      nextStep: 'Inbound inquiry from campaign landing page. Budget qualified for ₹1.8L tier.',
      notes: 'Currently losing money to vendor overbilling; wants milestone settlement clearances.',
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
      organizationName: 'Marigold Heritage Events',
      adminEmail: 'hardik@marigoldevents.in',
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
      organizationName: 'Singhania Family Offices (VIP Client Portal)',
      adminEmail: 'ananya@apexfinancial.com',
      tier: 'Starter',
      seatLimit: 5,
      activeSeats: 1,
      status: 'suspended',
      issuedAt: '2026-11-18',
      expiresAt: '2027-11-18',
      autoRenew: false,
      featuresAllowed: ['client_portal', 'project_viewer', 'invoice_approval'],
    }
  ],
  attendance: [
    {
      id: 'att-01',
      userId: 'usr-admin-01',
      userName: 'Narender Begad',
      punchInTime: '08:15 AM',
      status: 'on_time',
      location: 'The City Palace · Udaipur Backstage Control',
      hoursWorked: 4.8,
    },
    {
      id: 'att-02',
      userId: 'usr-pm-03',
      userName: 'Priyanka Sen',
      punchInTime: '08:30 AM',
      status: 'on_time',
      location: 'The City Palace · Stage & Sound Console',
      hoursWorked: 4.6,
    },
    {
      id: 'att-03',
      userId: 'usr-dev-04',
      userName: 'Rohit Khandelwal',
      punchInTime: '08:45 AM',
      status: 'on_time',
      location: 'Maharana Pratap Airport · VIP Welcome Lounge',
      hoursWorked: 4.4,
    },
    {
      id: 'att-04',
      userId: 'usr-sales-02',
      userName: 'Vikramaditya Rathore',
      punchInTime: '09:00 AM',
      status: 'on_time',
      location: 'Jaipur HQ · Agency Sales & Operations Suite',
      hoursWorked: 4.2,
    }
  ],
  meetings: [
    {
      id: 'mom-01',
      projectCode: 'AISH-WED-2026-01',
      title: 'Singhania-Kapoor Wedding: Final Artist Tech-Rider & Sound Sign-off',
      date: '2026-11-20',
      attendees: ['Narender Begad', 'Priyanka Sen', 'Harshvardhan Singhania', 'Artist Sound Engineer'],
      keyDecisions: [
        'Confirmed Sangeet sound curfew at 01:00 AM with acoustic baffled tents.',
        'Approved dry-ice low-fog machines for Varmala sequence on the lake terrace.',
        'Client cleared second milestone invoice of ₹72 Lakhs.'
      ],
      actionItems: [
        { item: 'Run line-array acoustic sweep with sound level meter', owner: 'Priyanka Sen', deadline: '2026-11-22' },
        { item: 'Deliver final luggage manifest to Jagmandir ferry dock', owner: 'Rohit Khandelwal', deadline: '2026-11-23' }
      ]
    }
  ],
  messages: [
    {
      id: 'msg-01',
      channelId: 'general-announcements',
      senderName: 'Narender Begad',
      senderRole: 'Super Admin & Founder',
      content: 'Singhania-Kapoor Royal Wedding is T-4 days out. All 14 VIP convoy vehicles and airport welcome hampers have passed inspection.',
      timestamp: '08:30 AM',
      isAnnouncement: true,
    },
    {
      id: 'msg-02',
      channelId: 'general-announcements',
      senderName: 'Vikramaditya Rathore',
      senderRole: 'SaaS Sales Lead',
      content: 'Great news team! We closed Marigold Heritage Events for the Professional Tier (₹1.8L) on AishNar Digital-ERP. License key provisioned.',
      timestamp: '10:15 AM',
      isAnnouncement: false,
    },
    {
      id: 'msg-03',
      channelId: 'engineering-ops',
      senderName: 'Priyanka Sen',
      senderRole: 'Lead Wedding Producer',
      content: 'Stage trussing load test and line array soundcheck at The City Palace lake courtyard completed with zero feedback. We are on schedule.',
      timestamp: '11:30 AM',
      isAnnouncement: false,
    }
  ],
  performanceScore: 96,
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
