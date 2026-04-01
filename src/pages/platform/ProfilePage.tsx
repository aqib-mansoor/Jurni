import React, { useState } from 'react';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { User as UserIcon, Mail, Phone, Globe, Shield, Trash2, Camera } from 'lucide-react';

export const ProfilePage = () => {
  const { user, logout } = useJurniAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 lg:space-y-12">
      <div data-aos="fade-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-midnight mb-2">My Profile</h1>
        <p className="text-sm sm:text-base text-midnight opacity-60 font-light italic">Manage your personal details and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Profile Sidebar */}
        <div className="space-y-6 lg:space-y-8" data-aos="fade-right">
          <Card className="p-6 sm:p-8 text-center space-y-6 rounded-none shadow-lg">
            <div className="relative inline-block">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-champagne flex items-center justify-center overflow-hidden mx-auto border-4 border-pearl shadow-xl">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.displayName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserIcon size={48} className="text-midnight sm:size-16" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 h-8 w-8 sm:h-10 sm:w-10 bg-midnight text-champagne rounded-full flex items-center justify-center border-2 border-pearl hover:scale-110 transition-transform">
                <Camera size={16} className="sm:size-5" />
              </button>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif text-midnight">{user?.displayName}</h3>
              <p className="text-[10px] sm:text-sm opacity-50 uppercase tracking-widest font-bold">{user?.role}</p>
            </div>
            <div className="pt-6 border-t border-midnight border-opacity-5 flex flex-col gap-3">
              <Button variant="outline" className="w-full rounded-none text-xs sm:text-sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
              <Button variant="ghost" className="w-full text-rose hover:bg-rose hover:bg-opacity-5 rounded-none text-xs sm:text-sm" onClick={logout}>
                Sign Out
              </Button>
            </div>
          </Card>

          <Card className="p-5 sm:p-6 space-y-4 rounded-none shadow-md">
            <h4 className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-midnight opacity-40">Account Security</h4>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="opacity-70">Two-Factor Auth</span>
              <span className="text-rose font-bold">Disabled</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="opacity-70">Last Password Change</span>
              <span className="text-midnight font-medium">3 months ago</span>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-[10px] sm:text-xs rounded-none">Change Password</Button>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8" data-aos="fade-left">
          <Card className="p-6 sm:p-8 space-y-6 lg:space-y-8 rounded-none shadow-lg">
            <h3 className="text-xl sm:text-2xl font-serif text-midnight">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                  <input 
                    type="text" 
                    defaultValue={user?.displayName} 
                    disabled={!isEditing}
                    className="w-full bg-white border border-midnight border-opacity-20 rounded-none py-3 pl-10 pr-4 focus:outline-none focus:border-champagne disabled:opacity-50 text-sm text-midnight" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                  <input 
                    type="email" 
                    defaultValue={user?.email} 
                    disabled={!isEditing}
                    className="w-full bg-white border border-midnight border-opacity-20 rounded-none py-3 pl-10 pr-4 focus:outline-none focus:border-champagne disabled:opacity-50 text-sm text-midnight" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                  <input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    disabled={!isEditing}
                    className="w-full bg-white border border-midnight border-opacity-20 rounded-none py-3 pl-10 pr-4 focus:outline-none focus:border-champagne disabled:opacity-50 text-sm text-midnight" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40">Preferred Language</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                  <select 
                    disabled={!isEditing}
                    className="w-full bg-white border border-midnight border-opacity-20 rounded-none py-3 pl-10 pr-4 focus:outline-none focus:border-champagne disabled:opacity-50 appearance-none text-sm text-midnight"
                  >
                    <option>English (US)</option>
                    <option>French</option>
                    <option>Italian</option>
                    <option>Japanese</option>
                  </select>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="pt-6 lg:pt-8 border-t border-midnight border-opacity-5 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
                <Button variant="outline" className="rounded-none text-xs sm:text-sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button className="rounded-none text-xs sm:text-sm" onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            )}
          </Card>

          <Card className="p-6 sm:p-8 border-rose border-opacity-20 bg-rose bg-opacity-5 rounded-none shadow-md">
            <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-rose bg-opacity-20 flex items-center justify-center text-rose shrink-0">
                <Shield size={20} className="sm:size-6" />
              </div>
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-lg lg:text-xl font-serif text-midnight">Danger Zone</h3>
                <p className="text-xs sm:text-sm opacity-70">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="danger" className="flex items-center gap-2 rounded-none text-xs sm:text-sm">
                  <Trash2 size={16} className="sm:size-[18px]" /> Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
