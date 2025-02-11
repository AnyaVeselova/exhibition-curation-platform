# Exhibition Curator Project
The Exhibition Curator project is a web application that allows users to explore artworks from the Clevelend Art Museum and the MET Museum. Users can filter, and curate a personalised exhibition of selected artworks.

https://exhibition-curation-platform-omega.vercel.app/

# Built with 
- `Next.js`
- `React`
- `Tailwind CSS`

# Features
- `View Artworks:` Access and browse artworks from the cleveland museum of art.
- `Filter:` Use dropdown menu to filter artworks based on various criteria.
- `Curate Exhibitions:` Add selected artworks to a personalized exhibition page.
- `External Links:` Click on links to view detailed information about the artworks on external pages.

# Prerequisites
- Node.js (version 14 or later)
- npm (version 5.6 or later)

# Installation
- `Clone the repository:`
Fork the repository
git clone <repository-url>
cd exhibition-curation-platform

- `Install dependencies:`
Copy code
npm install

- `Start the development server:`

npm run dev

- `Open your browser and navigate to http://localhost:3000.`

# Usage
- View artwork collections from the Clevelend Art Museum
- Use searchbar and dropwdown menus to filter through artworks
- Select artworks and add them to your personal collection
- View all selected artworks in Exhibition page

# Extra features
- Delete artworks from Exhibition page

# Challenges
- `Managing a Large Collection of Images and Filters-`Displaying thousands of artworks from two museums posed a challenge. To optimize performance, I implemented lazy loading and pagination, ensuring smooth browsing without overwhelming the app. Filtering artworks by criteria such as type, artist, and time period was also complex, so I developed an efficient filtering system using React’s state management for real-time updates.

- `Meeting a 4-Week Deadline-` Given the short 4-week timeline, I carefully planned and prioritized key features, focusing first on core functionality before refining the design and adding enhancements. The tight schedule required me to stay organized and work efficiently throughout development.
