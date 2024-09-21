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
    title: 'User Management',
    icon: 'people-outline',
    children: [
      {
        title: 'User List',
        link: '/pages/user-management/user-list',
      },
    ],
  },
  {
    title: 'Bill Management',
    icon: 'credit-card-outline',
    children: [
      {
        title: 'Bill List',
        link: '/pages/bill-management/bill-list',
      },
      {
        title: 'Transection List',
        link: '/pages/bill-management/transection-list',
      },
    ],
  },
  {
    title: 'Info Management',
    icon: 'bell-outline',
    children: [
      {
        title: 'Announcements',
        link: '/pages/info-management/announcement-list',
      },
    ],
  },
  {
    title: 'Apartment Management',
    icon: 'options-2-outline',
    children: [
      {
        title: 'Bill Payment Rules',
        link: '/pages/apartment-management/bill-payment-rule',
      }
    ],
  }
];
