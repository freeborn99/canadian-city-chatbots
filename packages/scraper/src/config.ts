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
    tenantId: 'yyz',
    cityName: 'Toronto',
    province: 'Ontario',
    urls: [
      {
        url: 'https://www.toronto.ca/explore-enjoy/festivals-events/festivals-events-calendar/',
        category: 'events',
        label: 'City of Toronto Festivals and Events'
      },
      {
        url: 'https://www.toronto.ca/news/',
        category: 'news',
        label: 'City of Toronto Official Media & News Releases'
      }
    ]
  },
  {
    tenantId: 'yvr',
    cityName: 'Vancouver',
    province: 'British Columbia',
    urls: [
      {
        url: 'https://vancouver.ca/events.aspx',
        category: 'events',
        label: 'City of Vancouver Calendar of Events'
      },
      {
        url: 'https://vancouver.ca/news-calendar/news.aspx',
        category: 'news',
        label: 'City of Vancouver News and Announcements'
      }
    ]
  },
  {
    tenantId: 'yul',
    cityName: 'Montreal',
    province: 'Quebec',
    urls: [
      {
        url: 'https://montreal.ca/en/events',
        category: 'events',
        label: 'Ville de Montréal Events & Festivals'
      },
      {
        url: 'https://montreal.ca/en/news',
        category: 'news',
        label: 'Ville de Montréal News and Public Bulletins'
      }
    ]
  },
  {
    tenantId: 'yyc',
    cityName: 'Calgary',
    province: 'Alberta',
    urls: [
      {
        url: 'https://www.calgary.ca/events.html',
        category: 'events',
        label: 'City of Calgary Events Calendar'
      },
      {
        url: 'https://newsroom.calgary.ca/',
        category: 'news',
        label: 'City of Calgary Newsroom Releases'
      }
    ]
  },
  {
    tenantId: 'yeg',
    cityName: 'Edmonton',
    province: 'Alberta',
    urls: [
      {
        url: 'https://www.edmonton.ca/attractions_events/schedule_festivals_events',
        category: 'events',
        label: 'City of Edmonton Events & Festival Schedule'
      },
      {
        url: 'https://edmonton.ca/city_government/news/news-releases',
        category: 'news',
        label: 'City of Edmonton News & Media Notices'
      }
    ]
  },
  {
    tenantId: 'yow',
    cityName: 'Ottawa',
    province: 'Ontario',
    urls: [
      {
        url: 'https://ottawa.ca/en/recreation-and-parks/events',
        category: 'events',
        label: 'City of Ottawa Community Events'
      },
      {
        url: 'https://ottawa.ca/en/news',
        category: 'news',
        label: 'City of Ottawa Official News Releases'
      }
    ]
  },
  {
    tenantId: 'ywg',
    cityName: 'Winnipeg',
    province: 'Manitoba',
    urls: [
      {
        url: 'https://winnipeg.ca/events',
        category: 'events',
        label: 'City of Winnipeg Events Directory'
      },
      {
        url: 'https://winnipeg.ca/news',
        category: 'news',
        label: 'City of Winnipeg News Releases & Advisories'
      }
    ]
  },
  {
    tenantId: 'yhz',
    cityName: 'Halifax',
    province: 'Nova Scotia',
    urls: [
      {
        url: 'https://www.halifax.ca/parks-recreation/events',
        category: 'events',
        label: 'Halifax Regional Municipality Events'
      },
      {
        url: 'https://www.halifax.ca/city-hall/news-announcements',
        category: 'news',
        label: 'Halifax News and Public Service Announcements'
      }
    ]
  },
  {
    tenantId: 'yyj',
    cityName: 'Victoria',
    province: 'British Columbia',
    urls: [
      {
        url: 'https://www.victoria.ca/community-culture/events-activities',
        category: 'events',
        label: 'City of Victoria Events & Community Activities'
      },
      {
        url: 'https://www.victoria.ca/city-government/news',
        category: 'news',
        label: 'City of Victoria Civic News & Updates'
      }
    ]
  },
  {
    tenantId: 'yyt',
    cityName: "St. John's",
    province: 'Newfoundland and Labrador',
    urls: [
      {
        url: 'https://www.stjohns.ca/en/events-culture/events-calendar.aspx',
        category: 'events',
        label: "City of St. John's Public Events Calendar"
      },
      {
        url: 'https://www.stjohns.ca/en/news/index.aspx',
        category: 'news',
        label: "City of St. John's News & Public Advisories"
      }
    ]
  }
];
