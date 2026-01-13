'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Settings, 
  Shield, 
  Activity, 
  Menu, 
  FileText, 
  Zap,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: FileText, label: 'Converter' },
    { href: '/dashboard/team', icon: Users, label: 'Team' },
    { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
    { href: '/dashboard/security', icon: Shield, label: 'Security' },
    { href: '/dashboard/general', icon: Settings, label: 'General' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full relative">
      {/* Mobile header - Refined with Glassmorphism */}
      <div className="lg:hidden flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <Zap className="h-4 w-4 text-white fill-white" />
          </div>
          <span className="font-bold text-gray-900 tracking-tight">CSV Pro</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-xl hover:bg-gray-100"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar - Beautified */}
        <aside
          className={cn(
            "w-72 bg-gray-50/50 border-r border-gray-100 lg:block fixed lg:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 backdrop-blur-xl",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full py-6">
            {/* Desktop Logo Area */}
            <div className="hidden lg:flex items-center gap-3 px-8 mb-10">
              <div className="bg-orange-600 p-2 rounded-xl shadow-lg shadow-orange-200">
                <Zap className="h-5 w-5 text-white fill-white" />
              </div>
              <span className="font-black text-xl text-gray-900 tracking-tighter">CSV Pro</span>
            </div>

            <nav className="flex-1 space-y-2 px-4">
              <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative flex items-center px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-300",
                      isActive 
                        ? "text-orange-600 bg-orange-50/80 shadow-sm shadow-orange-100/50" 
                        : "text-gray-500 hover:text-gray-900 hover:bg-white hover:shadow-sm"
                    )}
                  >
                    {/* The Sliding Orange Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-[-4px] w-1.5 h-6 bg-orange-600 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    
                    <item.icon className={cn(
                      "mr-3 h-5 w-5 transition-colors duration-300",
                      isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600"
                    )} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Upgrade CTA Section */}
            <div className="px-6 mb-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="bg-gray-900 border-none shadow-2xl overflow-hidden rounded-[2rem]">
                  <CardContent className="p-6 relative">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-orange-500/20 text-orange-400 text-[10px] font-black mb-3">
                        <Zap className="h-3 w-3 fill-orange-400" />
                        PRO FEATURES
                      </div>
                      <p className="text-white font-bold text-sm mb-1 leading-tight">
                        Go beyond limits.
                      </p>
                      <p className="text-gray-400 text-[11px] mb-4">
                        Unlock SQL exports and millions of rows.
                      </p>
                      <Button 
                        asChild
                        size="sm" 
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold h-10 rounded-xl transition-all border-none"
                      >
                        <Link href="/pricing">
                          Upgrade Now <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                    {/* Decorative Background Blob */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600/20 rounded-full blur-3xl pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* User Profile Snippet */}
            <div className="px-6 pt-4 border-t border-gray-100/50">
              <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-100 to-rose-100 border border-white shadow-sm flex items-center justify-center text-orange-700 font-bold text-xs">
                    JD
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-gray-900 leading-none">John Doe</span>
                    <span className="text-[10px] text-gray-400">Personal Account</span>
                  </div>
                </div>
                <LogOut className="h-4 w-4 text-gray-400 group-hover:text-rose-500 transition-colors" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main content - Added subtle gray wash for depth */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10 bg-white/50 relative">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}