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
    <div className="p-4 sm:p-8 max-w-5xl mx-auto space-y-8 lg:space-y-12">
      <div data-aos="fade-down">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-midnight mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-midnight opacity-60 font-light italic">Refine your experience and manage your preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4" data-aos="fade-right">
          {sections.map((section) => (
            <button
              key={section.id}
              className="w-full flex items-center gap-4 p-4 text-left bg-white border border-midnight border-opacity-5 hover:border-champagne transition-all group"
            >
              <div className="h-10 w-10 rounded-none bg-pearl flex items-center justify-center text-midnight opacity-40 group-hover:text-champagne group-hover:opacity-100 transition-all">
                <section.icon size={20} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-midnight">{section.title}</p>
                <p className="text-[10px] text-midnight opacity-40 uppercase tracking-wider">Manage {section.id}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-8" data-aos="fade-left">
          {sections.map((section) => (
            <Card key={section.id} className="p-6 sm:p-8 space-y-6 rounded-none shadow-lg border-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-none bg-pearl flex items-center justify-center text-champagne">
                  <section.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-midnight">{section.title}</h3>
                  <p className="text-xs text-midnight opacity-50">{section.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-4 border-b border-midnight border-opacity-5 last:border-0">
                    <span className="text-sm font-medium text-midnight opacity-70">{item.label}</span>
                    
                    {item.type === 'text' && (
                      <span className="text-sm font-serif text-midnight">{item.value}</span>
                    )}

                    {item.type === 'toggle' && (
                      <Switch
                        checked={item.state}
                        onChange={item.setter}
                        className={cn(
                          item.state ? 'bg-champagne' : 'bg-midnight bg-opacity-10',
                          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none'
                        )}
                      >
                        <span
                          className={cn(
                            item.state ? 'translate-x-6' : 'translate-x-1',
                            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform'
                          )}
                        />
                      </Switch>
                    )}

                    {item.type === 'link' && (
                      <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-champagne hover:underline">
                        {item.value} <ChevronRight size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          ))}

          <div className="pt-8 flex justify-end gap-4">
            <Button variant="outline" className="rounded-none">Reset to Defaults</Button>
            <Button className="rounded-none px-8">Save All Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
