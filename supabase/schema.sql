-- ==============================================================================
-- Aishnar Digital-ERP · Production Supabase PostgreSQL Schema
-- ==============================================================================

-- 1. Organizations / Client Tenants
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan_tier text not null check (plan_tier in ('Starter', 'Professional', 'Enterprise', 'Custom White-Label')),
  status text not null default 'active' check (status in ('active', 'suspended', 'trial', 'expired')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Cryptographic Software Licenses (Sold to Clients)
create table if not exists public.software_licenses (
  id uuid primary key default gen_random_uuid(),
  license_key text unique not null,
  organization_id uuid references public.organizations(id) on delete cascade,
  organization_name text not null,
  admin_email text not null,
  tier text not null check (tier in ('Starter', 'Professional', 'Enterprise', 'Custom White-Label')),
  seat_limit int not null default 25,
  active_seats int not null default 1,
  status text not null default 'active' check (status in ('active', 'suspended', 'trial', 'expired')),
  issued_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  auto_renew boolean not null default true,
  features_allowed jsonb not null default '["all_modules"]'::jsonb
);

-- 3. Software Sales Pipeline & Inquiries (Managing sales of Aishnar Digital-ERP)
create table if not exists public.software_sales_deals (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  plan_tier text not null,
  deal_value numeric not null,
  billing_cycle text not null default 'annual',
  stage text not null check (stage in ('Inbound Lead', 'Demo Completed', 'Proposal Submitted', 'Contract Negotiation', 'Closed Won')),
  probability int not null default 50,
  created_date date default current_date,
  expected_close_date date,
  assigned_sales_rep text,
  notes text
);

-- 4. User Profiles & In-App Activation
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text unique not null,
  role text not null check (role in ('super_admin', 'sales_admin', 'project_manager', 'team_member', 'client_viewer')),
  department text not null,
  avatar_url text,
  is_active boolean not null default true,
  organization_name text not null,
  license_key text references public.software_licenses(license_key),
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Standing Operational Duties (SOP Checklist)
create table if not exists public.standing_duties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  frequency text not null default 'daily',
  is_completed boolean not null default false,
  assigned_to text not null,
  category text not null
);

-- 6. Enterprise Projects & Deliverables
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  client_organization text not null,
  client_contact text not null,
  lead_manager text not null,
  status text not null default 'Active Execution',
  progress_percent int not null default 0,
  start_date date not null,
  target_delivery_date date not null,
  budget_total numeric not null,
  critical_alert text
);

-- 7. Project Tasks
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  title text not null,
  assignee_name text not null,
  assignee_role text not null,
  due_date date not null,
  priority text not null check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null check (status in ('pending', 'in_progress', 'completed', 'overdue')),
  points_deduction int not null default 8
);

-- 8. Expense Claims
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  claimant_name text not null,
  claimant_role text not null,
  title text not null,
  category text not null,
  amount numeric not null,
  date date default current_date,
  receipt_url text,
  status text not null check (status in ('pending', 'approved', 'rejected', 'reimbursed')),
  approved_by text,
  project_code text
);

-- 9. Invoices
create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text unique not null,
  client_name text not null,
  project_name text not null,
  amount numeric not null,
  issue_date date default current_date,
  due_date date not null,
  status text not null check (status in ('draft', 'sent', 'paid', 'overdue'))
);

-- 10. Enable Row Level Security (RLS)
alter table public.organizations enable row level security;
alter table public.software_licenses enable row level security;
alter table public.software_sales_deals enable row level security;
alter table public.profiles enable row level security;
alter table public.standing_duties enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.expenses enable row level security;
alter table public.invoices enable row level security;

-- Public read/write policies for authenticated tenants
create policy "Allow all operations for authenticated users" on public.profiles for all using (true);
create policy "Allow all operations for licenses" on public.software_licenses for all using (true);
create policy "Allow all operations for deals" on public.software_sales_deals for all using (true);
create policy "Allow all operations for projects" on public.projects for all using (true);
create policy "Allow all operations for duties" on public.standing_duties for all using (true);
create policy "Allow all operations for expenses" on public.expenses for all using (true);
