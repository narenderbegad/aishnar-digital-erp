export type UserRole = 'super_admin' | 'sales_admin' | 'project_manager' | 'team_member' | 'client_viewer';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  department: string;
  avatarUrl: string;
  isActive: boolean;
  licenseKey?: string;
  organizationName: string;
  phone?: string;
  joinedAt: string;
}

export interface StandingDuty {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly';
  isCompleted: boolean;
  assignedTo: string;
  category: 'Security' | 'Code Quality' | 'Client Review' | 'Operations' | 'Finance';
}

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  assigneeName: string;
  assigneeRole: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  pointsDeductionOnOverdue: number;
}

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  targetDate: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercent: number;
}

export interface EnterpriseProject {
  id: string;
  code: string;
  name: string;
  clientOrganization: string;
  clientContact: string;
  leadManager: string;
  status: 'Planning' | 'Active Execution' | 'Client Review' | 'Delivered';
  progressPercent: number;
  startDate: string;
  targetDeliveryDate: string;
  budgetTotal: number;
  deliverablesCount: number;
  openTasksCount: number;
  criticalAlert?: string;
  venue?: string;
  guestCount?: number;
  eventType?: 'Destination Wedding' | 'Luxury Royal Wedding' | 'Celebrity Gala' | 'High-Net-Worth Conclave';
  countdownDays?: number;
}

export interface ExpenseClaim {
  id: string;
  claimantName: string;
  claimantRole: string;
  title: string;
  category: 'Cloud Infrastructure' | 'Software Licenses' | 'Hardware' | 'Client Travel' | 'Office Operations';
  amount: number;
  date: string;
  receiptUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  approvedBy?: string;
  projectCode?: string;
}

export interface ClientInvoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  projectName: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

export type SalesFunnelStage = 
  | 'lead_inbound' 
  | 'discovery_demo' 
  | 'proposal_quote' 
  | 'security_legal' 
  | 'contract_negotiation' 
  | 'closed_won' 
  | 'closed_lost';

export interface SoftwareSalesDeal {
  id: string;
  companyName: string;
  website?: string;
  industry: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  planTier: 'Starter' | 'Professional' | 'Enterprise' | 'Custom White-Label';
  seatsCount: number;
  dealValue: number;
  mrr: number;
  billingCycle: 'monthly' | 'annual' | 'multi_year';
  paymentTerms: 'Net 15' | 'Net 30' | 'Annual Upfront' | 'Quarterly Advance';
  stage: SalesFunnelStage;
  probability: number;
  createdDate: string;
  expectedCloseDate: string;
  assignedSalesRep: string;
  notes?: string;
  nextStep?: string;
  quotationNumber?: string;
  discountPercent?: number;
}

export interface EnterpriseQuotation {
  id: string;
  quoteNumber: string;
  dealId: string;
  clientCompany: string;
  clientContact: string;
  clientEmail: string;
  planTier: string;
  seats: number;
  baseAmount: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  validUntil: string;
  paymentTerms: string;
  issuedAt: string;
}

export interface SoftwareLicense {
  id: string;
  licenseKey: string;
  organizationName: string;
  adminEmail: string;
  tier: 'Starter' | 'Professional' | 'Enterprise' | 'Custom White-Label';
  seatLimit: number;
  activeSeats: number;
  status: 'active' | 'suspended' | 'trial' | 'expired';
  issuedAt: string;
  expiresAt: string;
  autoRenew: boolean;
  featuresAllowed: string[];
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  userName: string;
  punchInTime: string;
  punchOutTime?: string;
  status: 'on_time' | 'late' | 'work_from_home' | 'on_leave';
  location: string;
  hoursWorked: number;
}

export interface MeetingMOM {
  id: string;
  projectCode: string;
  title: string;
  date: string;
  attendees: string[];
  keyDecisions: string[];
  actionItems: { item: string; owner: string; deadline: string }[];
}

export interface ChatMessage {
  id: string;
  channelId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  isAnnouncement?: boolean;
}
