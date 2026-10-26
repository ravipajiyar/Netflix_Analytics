import { Clock, FileText, Film, Home, Map, Smile, Tag, TrendingUp, User, Users } from 'lucide-react';

export const navSections = [
  {
    label: 'Overview',
    items: [{ to: '/', label: 'Dashboard', icon: Home }],
  },
  {
    label: 'Explore',
    items: [
      { to: '/content-trend', label: 'Content', icon: Film },
      { to: '/genre-analysis', label: 'Genres', icon: Tag },
      { to: '/actors', label: 'Actors', icon: Users },
      { to: '/directors', label: 'Directors', icon: User },
      { to: '/sentiment-analysis', label: 'Sentiment', icon: Smile },
      { to: '/duration-analysis', label: 'Duration', icon: Clock },
      { to: '/map', label: 'Geo Map', icon: Map },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { to: '/reports', label: 'Reports', icon: FileText },
      { to: '/trends', label: 'Trend Signals', icon: TrendingUp, disabled: true },
    ],
  },
];

export const navItems = navSections.flatMap((section) =>
  section.items.filter((item) => !item.disabled)
);
