export interface FooterItem {
  title: string;
  href: string;
}

export interface FooterSection {
  id: number;
  title: string;
  items: FooterItem[];
}

export const FOOTER_NAVIGATION: FooterSection[] = [
  {
    "id": 1,
    "title": "Company",
    "items": [
      {
        "title": "About",
        "href": "/about"
      },
      {
        "title": "Features",
        "href": "/features"
      },
      {
        "title": "Works",
        "href": "/works"
      },
      {
        "title": "Career",
        "href": "/career"
      }
    ]
  },
  {
    "id": 2,
    "title": "Help",
    "items": [
      {
        "title": "Customer Support",
        "href": "/support"
      },
      {
        "title": "Delivery Details",
        "href": "/delivery-details"
      },
      {
        "title": "Terms & Conditions",
        "href": "/terms-and-conditions"
      },
      {
        "title": "Privacy Policy",
        "href": "/privacy-policy"
      }
    ]
  },
  {
    "id": 3,
    "title": "FAQ",
    "items": [
      {
        "title": "Account",
        "href": "/account"
      },
      {
        "title": "Manage Deliveries",
        "href": "/manage-deliveries"
      },
      {
        "title": "Orders",
        "href": "/orders"
      },
      {
        "title": "Payments",
        "href": "/payments"
      }
    ]
  },
  {
    "id": 4,
    "title": "Resources",
    "items": [
      {
        "title": "Free eBooks",
        "href": "/resources/free-ebooks"
      },
      {
        "title": "Development Tutorial",
        "href": "/resources/tutorials"
      },
      {
        "title": "How To - Blog",
        "href": "/blog"
      },
      {
        "title": "YouTube Playlist",
        "href": "/resources/youtube-playlist"
      }
    ]
  }
]