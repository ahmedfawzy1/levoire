import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const menuItems = [
  {
    url: '/shop',
    label: 'Shop',
  },
  {
    url: '/brands',
    label: 'Brands',
  },
  {
    url: '/blog',
    label: 'Blog',
  },
];

export const socialHandles = [
  {
    icon: Twitter,
    url: 'https://x.com/levoire_fashion',
  },
  {
    icon: Facebook,
    url: 'https://www.facebook.com/levoire.fashion',
  },
  {
    icon: Instagram,
    url: 'https://www.instagram.com/levoire_fashion',
  },
  {
    icon: Youtube,
    url: 'https://www.youtube.com/@levoire_fashion',
  },
];

export const footerLinks = [
  {
    title: 'COMPANY',
    links: [
      { href: '/about', label: 'About' },
      { href: '/features', label: 'Features' },
      { href: '/works', label: 'Works' },
      { href: '/career', label: 'Career' },
    ],
  },
  {
    title: 'Help',
    links: [
      {
        href: '/customer-support',
        label: 'Customer Support',
        ariaLabel: 'Customer Support',
      },
      {
        href: '/delivery-details',
        label: 'Delivery Details',
        ariaLabel: 'Delivery Details',
      },
      {
        href: '/terms-conditions',
        label: 'Terms & Conditions',
        ariaLabel: 'Terms and Conditions',
      },
      {
        href: '/privacy-policy',
        label: 'Privacy Policy',
        ariaLabel: 'Privacy Policy',
      },
    ],
  },
  {
    title: 'SERVICES',
    links: [
      {
        href: '/returns-refunds',
        label: 'Returns & Refunds',
        ariaLabel: 'Returns and Refunds',
      },
      {
        href: '/shipping-info',
        label: 'Shipping Information',
        ariaLabel: 'Shipping Information',
      },
      {
        href: '/payment-options',
        label: 'Payment Options',
        ariaLabel: 'Payment Options',
      },
      {
        href: '/order-tracking',
        label: 'Order Tracking',
        ariaLabel: 'Order Tracking',
      },
    ],
  },
  {
    title: 'FAQ',
    links: [
      {
        href: '/account',
        label: 'Account',
        ariaLabel: 'Account',
      },
      {
        href: '/manage-delivery',
        label: 'Manage Delivery',
        ariaLabel: 'Manage Delivery',
      },
      {
        href: '/orders',
        label: 'Orders',
        ariaLabel: 'Orders',
      },
      {
        href: '/payment',
        label: 'Payment',
        ariaLabel: 'Payment',
      },
    ],
  },
];
