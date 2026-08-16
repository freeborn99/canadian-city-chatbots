export interface CityScrapeTarget {
  tenantId: string;
  cityName: string;
  province: string;
  urls: {
    url: string;
    category: 'events' | 'news' | 'municipal' | 'transit';
    label: string;
  }[];
}

export const CITY_SCRAPE_TARGETS: CityScrapeTarget[] = [
  {
    tenantId: 'yyc',
    cityName: 'Calgary',
    province: 'Alberta',
    urls: [
      { url: 'https://newsroom.calgary.ca/', category: 'municipal', label: 'City of Calgary Newsroom' },
      { url: 'https://www.cbc.ca/news/canada/calgary', category: 'news', label: 'CBC News Calgary' },
    ]
  },
  {
    tenantId: 'yyz',
    cityName: 'Toronto',
    province: 'Ontario',
    urls: [
      { url: 'https://www.toronto.ca/news/', category: 'municipal', label: 'City of Toronto News' },
      { url: 'https://www.cbc.ca/news/canada/toronto', category: 'news', label: 'CBC News Toronto' },
    ]
  },
  {
    tenantId: 'yvr',
    cityName: 'Vancouver',
    province: 'British Columbia',
    urls: [
      { url: 'https://vancouver.ca/news-calendar/news.aspx', category: 'municipal', label: 'City of Vancouver News' },
      { url: 'https://www.cbc.ca/news/canada/british-columbia', category: 'news', label: 'CBC News BC' },
    ]
  },
  {
    tenantId: 'yul',
    cityName: 'Montreal',
    province: 'Quebec',
    urls: [
      { url: 'https://montreal.ca/en/news', category: 'municipal', label: 'Ville de Montreal News' },
      { url: 'https://www.cbc.ca/news/canada/montreal', category: 'news', label: 'CBC News Montreal' },
    ]
  },
  {
    tenantId: 'yeg',
    cityName: 'Edmonton',
    province: 'Alberta',
    urls: [
      { url: 'https://edmonton.ca/city_government/news/news-releases', category: 'municipal', label: 'City of Edmonton News' },
      { url: 'https://www.cbc.ca/news/canada/edmonton', category: 'news', label: 'CBC News Edmonton' },
    ]
  },
  {
    tenantId: 'yow',
    cityName: 'Ottawa',
    province: 'Ontario',
    urls: [
      { url: 'https://ottawa.ca/en/news', category: 'municipal', label: 'City of Ottawa News' },
      { url: 'https://www.cbc.ca/news/canada/ottawa', category: 'news', label: 'CBC News Ottawa' },
    ]
  },
  {
    tenantId: 'ywg',
    cityName: 'Winnipeg',
    province: 'Manitoba',
    urls: [
      { url: 'https://winnipeg.ca/news', category: 'municipal', label: 'City of Winnipeg News' },
      { url: 'https://www.cbc.ca/news/canada/manitoba', category: 'news', label: 'CBC News Manitoba' },
    ]
  },
  {
    tenantId: 'yhz',
    cityName: 'Halifax',
    province: 'Nova Scotia',
    urls: [
      { url: 'https://www.halifax.ca/city-hall/news-announcements', category: 'municipal', label: 'Halifax News' },
      { url: 'https://www.cbc.ca/news/canada/nova-scotia', category: 'news', label: 'CBC News Nova Scotia' },
    ]
  },
  {
    tenantId: 'yyj',
    cityName: 'Victoria',
    province: 'British Columbia',
    urls: [
      { url: 'https://www.victoria.ca/city-government/news', category: 'municipal', label: 'City of Victoria News' },
      { url: 'https://www.cbc.ca/news/canada/british-columbia', category: 'news', label: 'CBC News BC' },
    ]
  },
  {
    tenantId: 'yyt',
    cityName: "St. John's",
    province: 'Newfoundland and Labrador',
    urls: [
      { url: 'https://www.stjohns.ca/en/news/index.aspx', category: 'municipal', label: "City of St. John's News" },
      { url: 'https://www.cbc.ca/news/canada/newfoundland-and-labrador', category: 'news', label: 'CBC News NL' },
    ]
  }
];
