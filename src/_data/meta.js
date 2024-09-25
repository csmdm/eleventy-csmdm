export const url = process.env.URL || 'http://localhost:8080';
export const siteName = 'CSM Duilio Marcante';
export const siteDescription =
  'Il Centro Subacqueo Mediterraneo “Duilio Marcante” (CSM) è un punto di riferimento nella subacquea dal 1952.';
export const siteType = 'Person'; // schema
export const locale = 'it_IT';
export const lang = 'it';
export const skipContent = 'Salta al contenuto';
export const author = {
  name: 'Lene Saile', // i.e. Lene Saile - page / blog author's name. Must be set.
  avatar: '/icon-512x512.png', // path to the author's avatar. In this case just using a favicon.
  email: 'hola@lenesaile.com', // i.e. hola@lenesaile.com - email of the author
  website: 'https://www.lenesaile.com' // i.e. https.://www.lenesaile.com - the personal site of the author
};
export const creator = {
  name: 'Lene Saile', // i.e. Lene Saile - creator's (developer) name.
  email: 'hola@lenesaile.com',
  website: 'https://www.lenesaile.com',
  social: 'https://front-end.social/@lene'
};
export const pathToSvgLogo = 'src/assets/svg/misc/logo.svg'; // used for favicon generation
export const themeColor = '#DD4462'; //  Manifest: defines the default theme color for the application
export const themeBgColor = '#FBFBFB'; // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
export const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default_alt =
  "Visible content: An Eleventy starter with CUBE CSS, Cube CSS, Every Layout, Design Tokens and Tailwind for uitility classes. A workflow for building modern and resilient websites, introduced by Andy Bell's project buildexcellentwebsit.es"; // alt text for default meta image"
export const blog = {
  // RSS feed
  name: 'Blog del CSM Duilio Marcante',
  description: '',
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    {
      title: 'Atom Feed',
      url: '/feed.xml',
      type: 'application/atom+xml'
    },
    {
      title: 'JSON Feed',
      url: '/feed.json',
      type: 'application/json'
    }
  ],
  // Tags
  tagSingle: 'Tag',
  tagPlural: 'Tag',
  tagMore: 'Altri tag:',
  // pagination
  paginationLabel: 'Blog',
  paginationPage: 'Pagina',
  paginationPrevious: 'Precedente',
  paginationNext: 'Avanti',
  paginationNumbers: true
};
export const details = {
  aria: 'section controls',
  expand: 'expand all',
  collapse: 'collapse all'
};
export const dialog = {
  close: 'chiudere'
};
export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Principale',
  ariaBottom: 'Complementare',
  ariaPlatforms: 'Piattaforme',
  drawerNav: true
};
export const themeSwitch = {
  title: 'Tema',
  light: 'chiaro',
  dark: 'scuro'
};
export const greenweb = {
  // this goes into src/common/greenweb.njk
  providers: {
    // if you want to add more than one, edit the array directly.
    domain: 'netlify.com',
    service: 'cdn'
  },
  credentials: {
    // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
    domain: '',
    doctype: '',
    url: ''
  }
};
export const viewRepo = {
  // this is for the view/edit on github link. The value in the package.json will be pulled in.
  allow: false,
  infoText: 'View this page on GitHub'
};
export const easteregg = true;
