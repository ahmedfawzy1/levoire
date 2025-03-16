import { PortableTextBlock } from 'next-sanity';

export interface BlogOverview {
  title: string;
  short_description: string;
  slug: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}

export interface BlogDetail {
  title: string;
  short_description: string;
  content: PortableTextBlock[];
  slug: string;
  image: {
    asset: {
      _ref: string;
    };
  };
}
