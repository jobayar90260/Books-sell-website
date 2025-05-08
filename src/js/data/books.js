// Sample book data
const books = [
  {
    id: 1,
    title: "The Silent Echo",
    author: "Elena Michaels",
    price: 24.99,
    originalPrice: 29.99,
    coverImage: "https://images.pexels.com/photos/3747279/pexels-photo-3747279.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.7,
    reviewCount: 124,
    genre: "Fiction",
    categories: ["Contemporary Fiction", "Literary Fiction"],
    featured: true,
    bestseller: true,
    new: false,
    inStock: true,
    description: "In a small coastal town where secrets run as deep as the ocean, a mysterious diary washes ashore, unraveling a decades-old mystery that will change everything for its finder. Elena Michaels crafts a haunting tale of memory, loss, and redemption that lingers long after the final page.",
    publishDate: "2024-03-15",
    publisher: "Luminary Press",
    language: "English",
    pages: 342,
    isbn: "978-1-2345-6789-0",
    dimensions: "5.5 x 8.5 x 1 inches",
    reviews: [
      {
        id: 101,
        name: "Sarah Johnson",
        date: "2024-04-02",
        rating: 5,
        text: "Absolutely captivating from start to finish. The way Michaels weaves together the past and present creates a tapestry of emotion that felt incredibly real."
      },
      {
        id: 102,
        name: "Michael Roberts",
        date: "2024-03-28",
        rating: 4,
        text: "A beautifully written story with rich character development. The coastal setting becomes almost a character itself. My only critique is that the middle section felt slightly drawn out."
      },
      {
        id: 103,
        name: "Ava Chen",
        date: "2024-03-20",
        rating: 5,
        text: "This book kept me up at night in the best possible way. The mystery elements are perfectly balanced with emotional depth. One of my favorite reads this year!"
      }
    ]
  },
  {
    id: 2,
    title: "Quantum Horizons",
    author: "Dr. Marcus Reid",
    price: 32.50,
    originalPrice: 32.50,
    coverImage: "https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.5,
    reviewCount: 89,
    genre: "Non-Fiction",
    categories: ["Science", "Physics", "Quantum Mechanics"],
    featured: true,
    bestseller: false,
    new: true,
    inStock: true,
    description: "Embark on a mind-bending journey through the frontiers of quantum physics. Dr. Marcus Reid, a leading physicist at Cambridge University, explains complex quantum theories in accessible language, exploring their implications for our understanding of reality, consciousness, and the future of technology.",
    publishDate: "2024-04-10",
    publisher: "Science Horizons Publishing",
    language: "English",
    pages: 412,
    isbn: "978-0-9876-5432-1",
    dimensions: "6 x 9 x 1.2 inches",
    reviews: [
      {
        id: 201,
        name: "Professor Alan Thompson",
        date: "2024-04-18",
        rating: 5,
        text: "As someone who has studied quantum mechanics for decades, I'm impressed by Reid's ability to make these concepts accessible without sacrificing accuracy. This book bridges the gap between popular science and academic texts perfectly."
      },
      {
        id: 202,
        name: "Sophia Williams",
        date: "2024-04-15",
        rating: 4,
        text: "I've always been intimidated by quantum physics, but this book changed that. The analogies and thought experiments were incredibly helpful. Some sections still went over my head, but overall an illuminating read."
      }
    ]
  },
  {
    id: 3,
    title: "Midnight Conspiracy",
    author: "James Blackwood",
    price: 19.99,
    originalPrice: 25.99,
    coverImage: "https://images.pexels.com/photos/3747508/pexels-photo-3747508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.3,
    reviewCount: 156,
    genre: "Mystery",
    categories: ["Thriller", "Mystery", "Crime Fiction"],
    featured: true,
    bestseller: false,
    new: false,
    inStock: true,
    description: "When Detective Alexis Morgan is called to investigate a murder at an exclusive gala, she finds herself entangled in a web of political intrigue, corporate espionage, and deadly secrets. As the body count rises, Morgan must navigate a dangerous landscape of lies where no one is who they seem, and everyone has something to hide.",
    publishDate: "2023-11-05",
    publisher: "Enigma Books",
    language: "English",
    pages: 398,
    isbn: "978-3-5791-3468-2",
    dimensions: "5.5 x 8.25 x 1.1 inches",
    reviews: [
      {
        id: 301,
        name: "Thomas Reed",
        date: "2024-01-12",
        rating: 5,
        text: "Blackwood has crafted the perfect thriller - smart, fast-paced, and unpredictable. I was guessing until the very last page."
      },
      {
        id: 302,
        name: "Rebecca Liu",
        date: "2023-12-30",
        rating: 4,
        text: "A solid mystery with excellent character development. Detective Morgan is a refreshing protagonist with real depth. Looking forward to more cases featuring her."
      },
      {
        id: 303,
        name: "John Martinez",
        date: "2023-12-15",
        rating: 3,
        text: "Good plot with some genuinely surprising twists, but I found the pacing in the middle section a bit slow. The ending made up for it though."
      }
    ]
  },
  {
    id: 4,
    title: "The Forgotten Garden",
    author: "Sophia Montgomery",
    price: 22.99,
    originalPrice: 22.99,
    coverImage: "https://images.pexels.com/photos/7139717/pexels-photo-7139717.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.6,
    reviewCount: 112,
    genre: "Fiction",
    categories: ["Historical Fiction", "Literary Fiction"],
    featured: false,
    bestseller: true,
    new: false,
    inStock: true,
    description: "Spanning three generations, this enchanting tale centers on an abandoned garden in Cornwall and the secrets it has kept for over a century. When young architect Ella discovers an old diary in her grandmother's attic, it leads her on a journey across continents and time to uncover a family history shrouded in mystery and long-buried truths.",
    publishDate: "2023-09-20",
    publisher: "Heritage House",
    language: "English",
    pages: 456,
    isbn: "978-4-8276-1094-5",
    dimensions: "5.75 x 8.5 x 1.3 inches",
    reviews: [
      {
        id: 401,
        name: "Elizabeth Parker",
        date: "2024-02-03",
        rating: 5,
        text: "Beautifully written with such vivid descriptions I could almost smell the flowers in the garden. Montgomery's ability to weave timelines together is masterful."
      },
      {
        id: 402,
        name: "David Wilson",
        date: "2024-01-17",
        rating: 4,
        text: "A rich, atmospheric novel that transports you completely. The historical details are well-researched and add depth to an already compelling story."
      }
    ]
  },
  {
    id: 5,
    title: "Coding the Future",
    author: "Dr. Aisha Patel",
    price: 39.99,
    originalPrice: 45.99,
    coverImage: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.8,
    reviewCount: 75,
    genre: "Science",
    categories: ["Technology", "Computer Science", "Artificial Intelligence"],
    featured: true,
    bestseller: false,
    new: true,
    inStock: true,
    description: "In this groundbreaking exploration of artificial intelligence, Dr. Patel examines how machine learning algorithms are reshaping our world and what that means for humanity's future. Drawing on her experiences as both a software engineer and ethicist, she presents a balanced view of AI's potential benefits and risks, offering a roadmap for responsible innovation.",
    publishDate: "2024-02-28",
    publisher: "Tech Frontiers Press",
    language: "English",
    pages: 380,
    isbn: "978-6-7123-9045-8",
    dimensions: "6 x 9 x 1 inches",
    reviews: [
      {
        id: 501,
        name: "Dr. Robert Zhang",
        date: "2024-04-10",
        rating: 5,
        text: "As someone working in the AI field, I appreciate Dr. Patel's nuanced approach. She avoids both techno-utopianism and fear-mongering, focusing instead on practical ethical frameworks."
      },
      {
        id: 502,
        name: "Jamal Davis",
        date: "2024-03-22",
        rating: 5,
        text: "Accessible for non-technical readers while still offering depth for professionals. The case studies are particularly enlightening and relevant to current AI debates."
      }
    ]
  },
  {
    id: 6,
    title: "The Last Lighthouse Keeper",
    author: "Henry Calloway",
    price: 21.50,
    originalPrice: 21.50,
    coverImage: "https://images.pexels.com/photos/2272854/pexels-photo-2272854.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.4,
    reviewCount: 98,
    genre: "Fiction",
    categories: ["Contemporary Fiction", "Literary Fiction"],
    featured: false,
    bestseller: false,
    new: false,
    inStock: true,
    description: "When Andrew Sullivan accepts a position as the keeper of a remote lighthouse off the rugged Maine coast, he's seeking solitude to heal from personal tragedy. But the small island community harbors its own mysteries, and as winter storms cut the lighthouse off from the mainland, Andrew begins to question his own sanity and the strange phenomena he witnesses each night.",
    publishDate: "2023-08-15",
    publisher: "Atlantic Publishing House",
    language: "English",
    pages: 324,
    isbn: "978-2-9083-4571-6",
    dimensions: "5.5 x 8.5 x 0.9 inches",
    reviews: [
      {
        id: 601,
        name: "Margaret Fletcher",
        date: "2024-01-28",
        rating: 4,
        text: "Calloway's atmospheric writing creates a palpable sense of isolation and intrigue. The line between reality and imagination blurs beautifully in this haunting tale."
      },
      {
        id: 602,
        name: "Ryan O'Connor",
        date: "2023-11-05",
        rating: 5,
        text: "I couldn't put this down. The character development is superb, and the lighthouse setting becomes almost a character itself. A perfect winter read."
      }
    ]
  },
  {
    id: 7,
    title: "Financial Freedom Blueprint",
    author: "Marcus Taylor",
    price: 27.99,
    originalPrice: 32.99,
    coverImage: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.5,
    reviewCount: 142,
    genre: "Non-Fiction",
    categories: ["Personal Finance", "Investing", "Self-Help"],
    featured: false,
    bestseller: true,
    new: false,
    inStock: true,
    description: "Renowned financial advisor Marcus Taylor presents a comprehensive guide to achieving financial independence at any age. Moving beyond conventional wisdom, Taylor introduces innovative strategies for debt reduction, smart investing, and creating passive income streams, all explained in straightforward language for both beginners and experienced investors.",
    publishDate: "2023-07-10",
    publisher: "Prosperity Publishing",
    language: "English",
    pages: 296,
    isbn: "978-8-6431-0927-5",
    dimensions: "6 x 9 x 0.8 inches",
    reviews: [
      {
        id: 701,
        name: "Jennifer Harris",
        date: "2024-02-15",
        rating: 5,
        text: "I've read dozens of finance books, and this one stands out for its practical, actionable advice. I've already implemented several of Taylor's strategies and seen positive results."
      },
      {
        id: 702,
        name: "Carlos Mendez",
        date: "2023-12-20",
        rating: 4,
        text: "Great for beginners but also offers advanced concepts. The section on tax optimization strategies was particularly valuable and not something I've seen covered as thoroughly in other finance books."
      }
    ]
  },
  {
    id: 8,
    title: "The Poison Crown",
    author: "Victoria Blackthorne",
    price: 18.99,
    originalPrice: 18.99,
    coverImage: "https://images.pexels.com/photos/4329143/pexels-photo-4329143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    rating: 4.9,
    reviewCount: 203,
    genre: "Fiction",
    categories: ["Fantasy", "Epic Fantasy"],
    featured: true,
    bestseller: true,
    new: false,
    inStock: true,
    description: "In the first installment of the Crown of Thorns trilogy, an unlikely heroine discovers her connection to an ancient magical bloodline. As political intrigues threaten to plunge the Five Kingdoms into war, she must navigate a treacherous court, master her unpredictable powers, and confront the dark legacy that has both blessed and cursed her family for generations.",
    publishDate: "2023-05-22",
    publisher: "Mythic Press",
    language: "English",
    pages: 520,
    isbn: "978-5-2198-7463-0",
    dimensions: "6 x 9 x 1.5 inches",
    reviews: [
      {
        id: 801,
        name: "Ethan Brooks",
        date: "2024-03-15",
        rating: 5,
        text: "Blackthorne has created a fantasy world that feels both familiar and fresh. The magic system is one of the most innovative I've encountered, and the political machinations rival Game of Thrones."
      },
      {
        id: 802,
        name: "Olivia Martinez",
        date: "2024-02-10",
        rating: 5,
        text: "I was completely absorbed in this world from page one. The character development is exceptional, and the plot twists genuinely surprised me. Can't wait for the next book!"
      },
      {
        id: 803,
        name: "Neil Patel",
        date: "2023-11-28",
        rating: 4,
        text: "A strong start to what promises to be an epic series. The worldbuilding is detailed without becoming overwhelming, and the protagonist's journey is compelling."
      }
    ]
  }
];

// Function to get a single book by ID
function getBookById(id) {
  return books.find(book => book.id === parseInt(id));
}

// Function to get all unique genres
function getAllGenres() {
  const genres = new Set();
  books.forEach(book => {
    genres.add(book.genre);
  });
  return Array.from(genres);
}

// Function to get books by genre
function getBooksByGenre(genre) {
  return books.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
}

// Function to get featured books
function getFeaturedBooks() {
  return books.filter(book => book.featured);
}

// Function to get bestseller books
function getBestsellerBooks() {
  return books.filter(book => book.bestseller);
}

// Function to get new releases
function getNewReleases() {
  return books.filter(book => book.new);
}

// Function to get related books (same genre, excluding the current book)
function getRelatedBooks(bookId, limit = 4) {
  const currentBook = getBookById(bookId);
  if (!currentBook) return [];
  
  return books
    .filter(book => book.id !== bookId && book.genre === currentBook.genre)
    .sort(() => 0.5 - Math.random()) // Shuffle
    .slice(0, limit);
}

// Function to search books
function searchBooks(query) {
  query = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(query) || 
    book.author.toLowerCase().includes(query) || 
    book.genre.toLowerCase().includes(query) ||
    (book.categories && book.categories.some(category => category.toLowerCase().includes(query)))
  );
}

// Export the functions for use in other files
window.booksAPI = {
  getAllBooks: () => books,
  getBookById,
  getAllGenres,
  getBooksByGenre,
  getFeaturedBooks,
  getBestsellerBooks,
  getNewReleases,
  getRelatedBooks,
  searchBooks
};