import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { TVWallboard } from './components/common/TVWallboard';
import { NotificationsDrawer } from './components/common/NotificationsDrawer';
import { SearchModal } from './components/common/SearchModal';
import { AdminVisualGuideModal } from './components/common/AdminVisualGuideModal';
import { LoginView } from './components/auth/LoginView';

import { TodayView } from './components/views/TodayView';
import { ProjectsView } from './components/views/ProjectsView';
import { FinanceView } from './components/views/FinanceView';
import { CommView } from './components/views/CommView';
import { SoftwareSalesView } from './components/views/SoftwareSalesView';
import { UserActivationView } from './components/views/UserActivationView';
import { SettingsView } from './components/views/SettingsView';

import { loadStore, saveStore, ERPStoreState } from './lib/store';
import { UserRole, UserProfile } from './types';

const AUTH_STORAGE_KEY = 'aishnar_erp_auth_user_v1';

export default function App() {
  const [state, setState] = useState<ERPStoreState>(loadStore);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [currentTab, setCurrentTab] = useState('today');
  const [userRole, setUserRole] = useState<UserRole>(() => currentUser?.role || 'super_admin');
  const [isDark, setIsDark] = useState(false);
  const [isTvBoardOpen, setIsTvBoardOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAdminGuideOpen, setIsAdminGuideOpen] = useState(false);

  // Sync state to LocalStorage
  const handleUpdateState = (newState: ERPStoreState) => {
    setState(newState);
    saveStore(newState);
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    setUserRole(user.role);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  // Sync theme with document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Global Keyboard Shortcuts (Ctrl+K for search, Escape for modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        if (isTvBoardOpen) setIsTvBoardOpen(false);
        if (isSearchOpen) setIsSearchOpen(false);
        if (isNotificationsOpen) setIsNotificationsOpen(false);
        if (isAdminGuideOpen) setIsAdminGuideOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTvBoardOpen, isSearchOpen, isNotificationsOpen, isAdminGuideOpen]);

  // If unauthenticated, show secure Login View
  if (!currentUser) {
    return <LoginView users={state.users} onLogin={handleLogin} />;
  }

  // Role friendly name
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'sales_admin': return 'Sales Director';
      case 'project_manager': return 'Delivery Lead';
      case 'team_member': return 'Operations Specialist';
      case 'client_viewer': return 'Client Observer';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f5f5f7] dark:bg-[#000000] font-sans antialiased text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors">
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        userName={currentUser.name}
        userRoleName={getRoleName(userRole)}
        onOpenTvBoard={() => setIsTvBoardOpen(true)}
        onOpenAdminGuide={() => setIsAdminGuideOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          userRole={userRole}
          setUserRole={setUserRole}
          isDark={isDark}
          setIsDark={setIsDark}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenTvBoard={() => setIsTvBoardOpen(true)}
          onOpenAdminGuide={() => setIsAdminGuideOpen(true)}
          unreadCount={2}
        />

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {currentTab === 'today' && (
              <TodayView
                state={state}
                onUpdateState={handleUpdateState}
                onOpenTvBoard={() => setIsTvBoardOpen(true)}
              />
            )}

            {currentTab === 'projects' && (
              <ProjectsView
                state={state}
                onUpdateState={handleUpdateState}
              />
            )}

            {currentTab === 'finance' && (
              <FinanceView
                state={state}
                onUpdateState={handleUpdateState}
              />
            )}

            {currentTab === 'comms' && (
              <CommView
                state={state}
                onUpdateState={handleUpdateState}
              />
            )}

            {currentTab === 'sales' && (
              <SoftwareSalesView
                state={state}
                onUpdateState={handleUpdateState}
              />
            )}

            {currentTab === 'activation' && (
              <UserActivationView
                state={state}
                onUpdateState={handleUpdateState}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView
                state={state}
              />
            )}
          </div>
        </main>
      </div>

      {/* Global Modals & Overlays */}
      <TVWallboard
        isOpen={isTvBoardOpen}
        onClose={() => setIsTvBoardOpen(false)}
        state={state}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        state={state}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          setIsSearchOpen(false);
        }}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        state={state}
      />

      <AdminVisualGuideModal
        isOpen={isAdminGuideOpen}
        onClose={() => setIsAdminGuideOpen(false)}
        onNavigateTab={(tab) => {
          setCurrentTab(tab);
          setIsAdminGuideOpen(false);
        }}
      />
    </div>
  );
}

export { App };
