import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useJurniAuth } from '../../hooks/useJurniAuth';
import { Bell, Shield, Globe, Moon, CreditCard, User as UserIcon, Mail, Phone, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Switch } from '@headlessui/react';

export const SettingsPage = () => {
  const { user } = useJurniAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    offers: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    showHistory: true,
    dataSharing: false
  });

  const [darkMode, setDarkMode] = useState(false);

  const sections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: UserIcon,
      description: 'Manage your personal information and how it appears to others.',
      items: [
        { label: 'Display Name', value: user?.displayName, type: 'text' },
        { label: 'Email Address', value: user?.email, type: 'text' },
        { label: 'Phone Number', value: '+1 (555) 000-0000', type: 'text' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Control how and when you receive updates from Jurni.',
      items: [
        { label: 'Email Notifications', key: 'email', type: 'toggle', state: notifications.email, setter: (val: boolean) => setNotifications({...notifications, email: val}) },
        { label: 'Push Notifications', key: 'push', type: 'toggle', state: notifications.push, setter: (val: boolean) => setNotifications({...notifications, push: val}) },
        { label: 'SMS Alerts', key: 'sms', type: 'toggle', state: notifications.sms, setter: (val: boolean) => setNotifications({...notifications, sms: val}) }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Manage your data and account security preferences.',
      items: [
        { label: 'Public Profile', key: 'profilePublic', type: 'toggle', state: privacy.profilePublic, setter: (val: boolean) => setPrivacy({...privacy, profilePublic: val}) },
        { label: 'Two-Factor Authentication', value: 'Disabled', type: 'link' },
        { label: 'Data Sharing', key: 'dataSharing', type: 'toggle', state: privacy.dataSharing, setter: (val: boolean) => setPrivacy({...privacy, dataSharing: val}) }
      ]
    }
  ];

  return (
    <div className="bg-pearl min-h-screen py-12 lg:py-20 px-6 sm:px-12">
      <div className="max-w-screen-2xl mx-auto space-y-12 lg:space-y-16">
        <div data-aos="fade-down">
          <span className="text-rose font-bold text-[10px] tracking-[0.5em] uppercase block mb-4">Preferences</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-midnight leading-[1.1] tracking-tight">Settings</h1>
          <p className="text-lg text-midnight/60 mt-4 max-w-2xl italic">Refine your experience and manage your preferences. Tailored to your unique journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-4" data-aos="fade-right">
            {sections.map((section) => (
              <button
                key={section.id}
                className="w-full flex items-center gap-6 p-6 text-left bg-pearl border border-midnight/5 hover:border-champagne/50 transition-all group rounded-2xl shadow-sm hover:shadow-md"
              >
                <div className="h-12 w-12 rounded-xl bg-midnight/5 flex items-center justify-center text-midnight/40 group-hover:text-champagne group-hover:bg-midnight transition-all duration-500 shadow-inner">
                  <section.icon size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-midnight">{section.title}</p>
                  <p className="text-[10px] text-midnight/40 uppercase tracking-widest mt-1">Manage {section.id}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-8 space-y-10" data-aos="fade-left">
            {sections.map((section) => (
              <Card key={section.id} className="p-8 lg:p-10 space-y-10 rounded-[32px] shadow-card border-midnight/5 bg-pearl hover:shadow-hover transition-all duration-700">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 rounded-2xl bg-midnight/5 flex items-center justify-center text-champagne shadow-inner">
                    <section.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-midnight leading-tight">{section.title}</h3>
                    <p className="text-sm text-midnight/50 mt-1">{section.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-6 border-b border-midnight/5 last:border-0 group/item">
                      <span className="text-sm font-bold text-midnight/70 group-hover/item:text-midnight transition-colors">{item.label}</span>
                      
                      {item.type === 'text' && (
                        <span className="text-sm font-serif text-midnight font-bold">{item.value}</span>
                      )}

                      {item.type === 'toggle' && (
                        <Switch
                          checked={item.state}
                          onChange={item.setter}
                          className={cn(
                            item.state ? 'bg-champagne' : 'bg-midnight/10',
                            'relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-500 focus:outline-none shadow-inner'
                          )}
                        >
                          <span
                            className={cn(
                              item.state ? 'translate-x-6' : 'translate-x-1',
                              'inline-block h-5 w-5 transform rounded-full bg-pearl transition-transform duration-500 shadow-md'
                            )}
                          />
                        </Switch>
                      )}

                      {item.type === 'link' && (
                        <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-champagne hover:text-midnight transition-all">
                          {item.value} <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <div className="pt-12 flex flex-col sm:flex-row justify-end gap-6">
              <Button variant="outline" className="rounded-2xl px-10 py-5 text-xs font-bold uppercase tracking-widest text-midnight/40 hover:text-midnight border-midnight/10">Reset to Defaults</Button>
              <Button className="rounded-2xl px-12 py-5 text-xs font-bold uppercase tracking-widest shadow-2xl shadow-champagne/20">Save All Changes</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
