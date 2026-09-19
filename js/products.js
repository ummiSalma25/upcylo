/* ==========================================================
   UPCYLO: product catalogue
   One entry per product. The Products page, the Product
   Detail page and the featured products on Home all read
   from this list, so edit a product here and it updates
   everywhere.

   IMAGES: every image below is a stand-in from Unsplash.
   Each one has a note saying what to change it to. Replace
   the URL with the real product photo (for example
   "images/tyre-chairs.jpg").
   ========================================================== */

const stock = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=75`;

const PRODUCTS = [
  {
    slug: "ottoman-center-table",
    name: "Ottoman Centre Table",
    category: "Furniture",
    material: "Tyre",
    blurb: "A double deck ottoman centre table made from tyres.",
    desc: "Two tyres stacked and finished as an ottoman-style centre table. It sits in the middle of a living room and takes whatever you put on it.",
    where: "Living rooms",
    featured: true,
    // change this image to: the double deck ottoman centre table photo from the catalogue (product 1)
    image: "img/tyre-coffee-table.webp",
  },
  {
    slug: "toy-storage",
    name: "Toy Storage",
    category: "Storage",
    material: "Tyre",
    blurb: "Don't let your toys litter the floor. Give them a home.",
    desc: "A round tyre shelf that keeps small toys tidy and on show, so they stop ending up all over the house.",
    where: "Kids' rooms",
    featured: false,
    // change this image to: the tyre toy storage shelf photo from the catalogue (product 2)
    image: "img/tyre-toy.webp",
  },
  {
    slug: "tyre-planters",
    name: "Tyre Planters",
    category: "Garden",
    material: "Tyre",
    blurb: "Why throw tyres away when they can hold your flowers?",
    desc: "Old tyres turned into planters for flowers. Stack them, paint them, and give your garden or compound some colour.",
    where: "Gardens and homes",
    featured: true,
    // change this image to: the painted tyre planters photo from the catalogue (product 3)
    image: "img/tyre-planters.webp",
  },
  {
    slug: "pvc-pipe-lamps",
    name: "PVC Pipe Lamps",
    category: "Lighting",
    material: "PVC pipe",
    blurb: "Reading lamps made from PVC pipes.",
    desc: "Reading lamps built from PVC pipe, with clean lines and a simple modern look that works next to a chair or a desk.",
    where: "Reading corners",
    featured: true,
    // change this image to: the blue PVC pipe reading lamp photo from the catalogue (product 4)
    image: "img/lamp.webp",
  },
  {
    slug: "tyre-lamp",
    name: "Tyre Lamp",
    category: "Lighting",
    material: "Tyre",
    blurb: "Bedside lamps made from tyre.",
    desc: "A bedside lamp built inside a tyre, so the light glows out of a piece that used to be on a road.",
    where: "Bedrooms",
    featured: false,
    // change this image to: the glowing tyre bedside lamp photo from the catalogue (product 5)
    image: "img/tyre-lamp.webp",
  },
  {
    slug: "shoe-rack",
    name: "Shoe Rack",
    category: "Storage",
    material: "Tyre",
    blurb: "A simple rack so your shoes stop littering the floor.",
    desc: "A simple tyre shoe rack that keeps footwear off the floor and in one place.",
    where: "Homes",
    featured: false,
    // change this image to: the tyre shoe rack photo from the catalogue (product 6)
    image: "img/tyre-shoe-rack.webp",
  },
  {
    slug: "tyre-chairs",
    name: "Tyre Chairs",
    category: "Furniture",
    material: "Tyre",
    blurb: "A chair made entirely of tyre.",
    desc: "A full chair built from tyre, from the seat to the frame. It is sturdy, and nobody will have seen one like it before.",
    where: "Homes",
    featured: true,
    // change this image to: the black tyre chair photo from the catalogue (product 7)
    image: "img/tyre-chair.webp",
  },
  {
    slug: "tyre-baskets",
    name: "Tyre Baskets",
    category: "Storage",
    material: "Tyre",
    blurb: "Baskets to store and carry produce from the farm.",
    desc: "Strong baskets made from tyre for storing and carrying produce, whether you are coming from the farm or the market.",
    where: "Storing and carrying produce",
    featured: false,
    // change this image to: the black tyre baskets photo from the catalogue (product 8)
    image: "img/tyre-baskets.webp",
  },
  {
    slug: "tyre-mirror",
    name: "Tyre Mirror",
    category: "Decor",
    material: "Tyre",
    blurb: "A tyre mirror for your bedroom or bathroom.",
    desc: "A round mirror framed in tyre tread. It works as a mirror and as a talking point on the wall.",
    where: "Bedrooms and bathrooms",
    featured: true,
    // change this image to: the round tyre-tread mirror photo from the catalogue (product 9)
    image: "img/tyre-mirror.webp",
  },
  {
    slug: "umbrella-holder",
    name: "Umbrella Holder",
    category: "Storage",
    material: "Tyre",
    blurb: "Don't leave umbrellas on the floor. A tyre holder does the trick.",
    desc: "A tyre holder with slots for umbrellas and more, so wet umbrellas have a proper place to stand.",
    where: "Homes and offices",
    featured: false,
    // change this image to: the blue tyre umbrella holder photo from the catalogue (product 10)
    image: "img/tyre-umbrella.webp",
  },
  {
    slug: "ottoman-coffee-table",
    name: "Ottoman Coffee Table",
    category: "Furniture",
    material: "Tyre",
    blurb: "A tyre ottoman coffee table.",
    desc: "A tyre coffee table finished in an ottoman style, with a glass top for a clean, modern surface.",
    where: "Living rooms",
    featured: false,
    // change this image to: the ottoman coffee table with glass top photo from the catalogue (product 11)
    image: "img/tyre-table2.webp",
  },
  {
    slug: "plastic-spoon-decor",
    name: "Plastic Spoon Decor",
    category: "Decor",
    material: "Plastic spoons",
    blurb: "Your party plastic spoons turned into treasure.",
    desc: "Plastic spoons from parties and takeaways, arranged into a striking hanging piece that people will stop to look at.",
    where: "Homes",
    featured: false,
    // change this image to: the white plastic spoon hanging decor photo from the catalogue (product 12)
    image: "img/tyre-spoon.webp",
  },
  {
    slug: "bicycle-tyre-coffee-table",
    name: "Bicycle Tyre Coffee Table",
    category: "Furniture",
    material: "Bicycle tyre",
    blurb: "An amazing, stylish coffee table built on a bicycle tyre.",
    desc: "A coffee table with a bicycle wheel at its heart and a glass top. Light on its feet and easy to notice.",
    where: "Living rooms",
    featured: true,
    // change this image to: the bicycle wheel glass-top coffee table photo from the catalogue (product 13)
    image: "img/tyre-bicycle-table.webp",
  },
  {
    slug: "tyre-sink",
    name: "Tyre Sink with Storage",
    category: "Decor",
    material: "Tyre",
    blurb: "Not your regular sink. A tyre sink with storage for the bathroom.",
    desc: "Want something different from your usual ceramic sink? This one is built from stacked tyres, with storage built in.",
    where: "Bathrooms",
    featured: false,
    // change this image to: the stacked tyre sink with storage photo from the catalogue (product 14)
    image: "img/tyre-sink.webp",
  },
  {
    slug: "tyre-seat-with-storage",
    name: "Classy Seat with Storage",
    category: "Furniture",
    material: "Tyre",
    blurb: "A classy, beautiful tyre seat with storage for just about anything.",
    desc: "A round seat made from tyre with storage built in, so you can sit on it and keep things inside it.",
    where: "Homes",
    featured: false,
    // change this image to: the blue and white tyre seat with storage photo from the catalogue (product 15)
    image: "img/tyre-storage.webp",
  },
  {
    slug: "pvc-pipe-storage-rack",
    name: "Classy PVC Pipe Storage",
    category: "Storage",
    material: "PVC pipe",
    blurb: "Store just about anything, from wine to shoes and tools.",
    desc: "A rack made from cut lengths of PVC pipe. Use it for wine bottles, shoes, tools, or whatever needs a tidy place to sit.",
    where: "Homes and workshops",
    featured: false,
    // change this image to: the white PVC pipe storage rack photo from the catalogue (product 16)
    image: "img/tyre-pipe-storage.webp",
  },
];
