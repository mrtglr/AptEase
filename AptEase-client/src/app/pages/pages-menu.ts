import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'activity-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Board',
    group: true,
  },
  {
    title: 'Profile Management',
    icon: 'people-outline',
    children: [
      {
        title: 'My Profile',
        link: '/pages/profile-management/edit-user-profile',
      },
    ],
  },
  {
    title: 'Bill Management',
    icon: 'credit-card-outline',
    children: [
      {
        title: 'My Bills & Transections',
        link: '/pages/bill-management/my-bills',
      }
    ],
  },
  {
    title: 'Messages',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Apartment Chat',
        link: '/pages/chat/public-chat',
      }
    ],
  }
];
