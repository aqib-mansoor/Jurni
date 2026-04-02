import React, { useState } from 'react';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Button } from '../../components/ui/Button';
import { User as UserIcon, Camera, LogOut, Shield, Bell, ChevronRight, Heart, Calendar, Star, Crown, Award, MapPin, Sparkles, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import { SecuritySettingsModal } from '../../components/profile/SecuritySettingsModal';
import { DeleteAccountModal } from '../../components/profile/DeleteAccountModal';

export const ProfilePage = () => {
  const { user, logout } = useJurniAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully signed out');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const handleDeleteAccount = () => {
    toast.error('Account deletion is restricted in this preview.');
    setIsDeleteModalOpen(false);
  };

  const stats = [
    { label: 'Journeys', value: '12', icon: MapPin },
    { label: 'Wishlist', value: user?.wishlist?.length || '0', icon: Heart },
    { label: 'Points', value: '12,450', icon: Sparkles },
  ];

  const menuGroups = [
    {
      title: 'Account Settings',
      items: [
        { label: 'Personal Information', icon: UserIcon, description: 'Manage your profile details', onClick: () => setIsEditModalOpen(true) },
        { label: 'Security & Privacy', icon: Shield, description: 'Update password and 2FA', onClick: () => setIsSecurityModalOpen(true) },
        { label: 'Notifications', icon: Bell, description: 'Configure journey alerts', onClick: () => {} },
      ]
    },
    {
      title: 'Travel Preferences',
      items: [
        { label: 'Payment Methods', icon: CreditCard, description: 'Securely manage your cards', onClick: () => {} },
        { label: 'Loyalty Programs', icon: Award, description: 'Connect memberships', onClick: () => {} },
      ]
    }
  ];

  const tiers = [
    { name: 'Silver', minPoints: 0, color: 'bg-slate-400' },
    { name: 'Gold', minPoints: 10000, color: 'bg-champagne' },
    { name: 'Platinum', minPoints: 50000, color: 'bg-midnight text-pearl' },
  ];

  const currentTier = tiers[1]; // Mocking Gold tier

  return (
    <div className="min-h-screen bg-pearl p-6 lg:p-12 space-y-12 pb-24 lg:pb-12">
      {/* Profile Header */}
      <header className="relative">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-champagne/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-champagne/20 to-transparent rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-32 w-32 lg:h-40 lg:w-40 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="h-full w-full bg-midnight flex items-center justify-center text-pearl/20">
                  <UserIcon size={64} />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-midnight text-champagne rounded-2xl flex items-center justify-center shadow-xl border-2 border-white">
              <Crown size={20} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl lg:text-5xl font-serif text-midnight tracking-tight">{user?.displayName}</h1>
              <span className={cn(
                "w-fit mx-auto md:mx-0 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm",
                currentTier.color === 'bg-champagne' ? "bg-champagne text-midnight" : "bg-midnight text-pearl"
              )}>
                {currentTier.name} Member
              </span>
            </div>
            <p className="text-sm text-midnight/40 font-light tracking-wide">{user?.email}</p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleLogout}
              className="rounded-2xl px-6 py-3 bg-rose/10 text-rose text-[10px] font-bold uppercase tracking-widest hover:bg-rose hover:text-pearl transition-all"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 lg:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 lg:p-8 rounded-[32px] border border-midnight/5 shadow-card hover:shadow-2xl hover:shadow-midnight/5 transition-all duration-500 group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-midnight/[0.03] text-midnight/20 flex items-center justify-center group-hover:bg-champagne group-hover:text-midnight transition-colors duration-500">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-serif text-midnight tracking-tight">{stat.value}</p>
                  <p className="text-[9px] text-midnight/30 uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Menu Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {menuGroups.map((group, groupIndex) => (
          <section key={group.title} className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-midnight/30 px-2">{group.title}</h3>
            <div className="space-y-4">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={item.onClick}
                    transition={{ delay: (groupIndex * 3 + itemIndex) * 0.1 }}
                    className="w-full group flex items-center justify-between p-6 bg-white rounded-[24px] border border-midnight/5 shadow-sm hover:shadow-xl hover:shadow-midnight/5 transition-all duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 rounded-2xl bg-midnight/[0.03] text-midnight/40 flex items-center justify-center group-hover:bg-midnight group-hover:text-champagne transition-all duration-500">
                        <Icon size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-midnight group-hover:text-midnight transition-colors">{item.label}</p>
                        <p className="text-[10px] text-midnight/30 font-medium">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-midnight/20 group-hover:text-champagne group-hover:translate-x-1 transition-all" />
                  </motion.button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Loyalty Progress */}
      <section className="bg-midnight p-8 lg:p-12 rounded-[40px] relative overflow-hidden shadow-2xl shadow-midnight/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-champagne/20 flex items-center justify-center text-champagne">
                <Crown size={24} />
              </div>
              <h3 className="text-2xl font-serif text-pearl">Platinum Status Awaits</h3>
            </div>
            <p className="text-sm text-pearl/40 font-light max-w-md leading-relaxed">
              You are only 7,550 points away from unlocking Platinum benefits, including private jet upgrades and personal travel curators.
            </p>
          </div>
          
          <div className="flex-1 max-w-md space-y-4">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-pearl/60">
              <span>Gold</span>
              <span>Platinum</span>
            </div>
            <div className="h-3 bg-pearl/10 rounded-full overflow-hidden p-0.5 border border-pearl/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-champagne via-champagne/80 to-champagne rounded-full shadow-[0_0_20px_rgba(247,215,148,0.4)]"
              />
            </div>
            <p className="text-[10px] text-center text-champagne font-bold uppercase tracking-widest">65% Progress to Platinum</p>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="p-8 border-2 border-rose/20 bg-rose/[0.02] rounded-[40px] space-y-6">
        <div className="flex items-center gap-3 text-rose">
          <Shield size={20} />
          <h3 className="text-sm font-bold uppercase tracking-widest">Danger Zone</h3>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-xs text-midnight/50 leading-relaxed max-w-md">
            Deleting your account is permanent and will remove all your data from our servers. This action cannot be undone.
          </p>
          <Button 
            variant="danger" 
            className="rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-widest bg-rose text-pearl shadow-xl shadow-rose/20"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </section>

      {/* Modals */}
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user} 
      />
      <SecuritySettingsModal 
        isOpen={isSecurityModalOpen} 
        onClose={() => setIsSecurityModalOpen(false)} 
      />
      <DeleteAccountModal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onConfirm={handleDeleteAccount} 
      />
    </div>
  );
};
