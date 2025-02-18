# Exhibition Curator Project
The Exhibition Curator project is a web application that allows users to explore and curate artworks from The Cleveland Museum of Art and The Art Institute of Chicago. Users can filter and create personalized exhibitions by selecting their favorite artworks from the collections.

https://exhibition-curation-platform-omega.vercel.app/

# Built with 
- `Next.js`
- `React`
- `Tailwind CSS`

# Features
- `View Artworks:` Access and browse artworks from the Cleveland museum of art and The Art Institute of Chicago.
- `Filter:` Use a pop-up form to filter artworks based on various criteria.
- `Curate Exhibitions:` Add selected artworks to a personalized exhibition page.
- `View artwork:` Navigate to a saved artwork withing a collection of saved artworks.
- `Delete saved artworks:` Delete an artwork you no longer want to see inside your saved collections.
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

# Walkthrough
Open the front page of the app.
Click on the Cleveland Art Museum card to view the available collections from the museum.
At the bottom of the screen, click the filter icon to choose your preferred department and artwork type.
For example, select Sculptures within the American Painting and Sculpture department.
Click Apply Filters, and now you’ll see all sculptures within that department.
Click on an artwork to view its detailed description.
In the upper-right corner, click the add to collection icon to add the artwork to your personalized collection.
You can access your collection via the Gallery link in the footer or the Collection link in the top right corner.
All your selected artworks are saved within a particular collection.
You can delete artworks or visit individual artwork routes to refresh your memory on a specific piece.


# Extra features
- Delete artworks from Exhibition page

# Challenges
- `Managing a Large Collection of Images and Filters-`Displaying thousands of artworks from two museums posed a challenge. To optimize performance, I implemented lazy loading and pagination, ensuring smooth browsing without overwhelming the app. Filtering artworks by criteria such as type, artist, and time period was also complex, so I developed an efficient filtering system using React’s state management for real-time updates.

- `Meeting a 4-Week Deadline-` Given the short 4-week timeline, I carefully planned and prioritized key features, focusing first on core functionality before refining the design and adding enhancements. The tight schedule required me to stay organized and work efficiently throughout development.


# Future Development
Currently, users can filter artworks by type within Cleveland's collections. However, I am working on extending the filtering options to allow users to filter artworks by artist and type globally across all available artworks in the APIs.
