export const hotels = [
  {
    id: 1,
    name: "Urbana Suites",
    location: "Miami Beach, Florida",
    price: 399,
    rating: 4.5,
    reviews: 123,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience the epitome of luxury at Urbana Suites. Located in the heart of Miami Beach, our hotel offers stunning ocean views, world-class dining, and exclusive amenities that will make your stay unforgettable.",
    rooms: 248,
    capacity: 3,
    featured: true,
    bestSeller: true,
    amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'tv'],
    roomTypes: [
      {
        name: "Deluxe King Suite",
        price: 399,
        capacity: 2,
        description: "Spacious suite featuring a king-size bed, luxurious bathroom with rainfall shower, and a private balcony with partial ocean views.",
        amenities: ['Free WiFi', 'Air conditioning', '55-inch smart TV', 'Minibar', 'Safe'],
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Premium Ocean View Suite",
        price: 599,
        capacity: 2,
        description: "Stunning suite with panoramic ocean views, king-size bed, separate living area, and a spacious bathroom with soaking tub and walk-in shower.",
        amenities: ['Free WiFi', 'Air conditioning', '65-inch smart TV', 'Minibar', 'Safe', 'Nespresso machine'],
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Executive Two Bedroom Suite",
        price: 899,
        capacity: 4,
        description: "Expansive suite with two bedrooms, separate living and dining areas, full kitchen, and two luxurious bathrooms. Perfect for families or longer stays.",
        amenities: ['Free WiFi', 'Air conditioning', 'Multiple TVs', 'Full kitchen', 'Washer/dryer', 'Dining area'],
        image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  },
  {
    id: 2,
    name: "Regency Grand Hotel",
    location: "New York City, New York",
    price: 299,
    rating: 4.3,
    reviews: 189,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Located in the heart of Manhattan, the Regency Grand Hotel offers a perfect blend of luxury, comfort, and convenience. Enjoy easy access to the city's major attractions while indulging in our premium amenities and exemplary service.",
    rooms: 315,
    capacity: 2,
    featured: true,
    bestSeller: false,
    amenities: ['wifi', 'gym', 'restaurant', 'spa', 'tv'],
    roomTypes: [
      {
        name: "Standard Queen Room",
        price: 299,
        capacity: 2,
        description: "Cozy room with a queen-size bed, work desk, and modern bathroom. Perfect for business travelers or short stays.",
        amenities: ['Free WiFi', 'Air conditioning', '42-inch TV', 'Coffee maker', 'Safe'],
        image: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Deluxe King Room",
        price: 399,
        capacity: 2,
        description: "Spacious room featuring a king-size bed, sitting area, and luxurious bathroom with premium toiletries.",
        amenities: ['Free WiFi', 'Air conditioning', '50-inch smart TV', 'Minibar', 'Safe', 'Bathrobes'],
        image: "https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "City View Suite",
        price: 599,
        capacity: 3,
        description: "Elegant suite with separate living area, king-size bed, and floor-to-ceiling windows offering stunning city views.",
        amenities: ['Free WiFi', 'Air conditioning', '55-inch smart TV', 'Minibar', 'Safe', 'Nespresso machine', 'Dining area'],
        image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  },
  {
    id: 3,
    name: "Azure Bay Resort",
    location: "Cancun, Mexico",
    price: 349,
    rating: 4.7,
    reviews: 246,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Nestled on the pristine beaches of Cancun, Azure Bay Resort offers an all-inclusive tropical paradise. Immerse yourself in luxury with multiple swimming pools, world-class restaurants, and breathtaking ocean views from every room.",
    rooms: 420,
    capacity: 4,
    featured: true,
    bestSeller: false,
    amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'tv'],
    roomTypes: [
      {
        name: "Ocean View Room",
        price: 349,
        capacity: 2,
        description: "Bright and airy room with a king-size bed or two queen beds, private balcony with ocean views, and modern amenities.",
        amenities: ['Free WiFi', 'Air conditioning', 'Smart TV', 'Minibar', 'Safe', 'Ocean view'],
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Premium Swim-Up Suite",
        price: 599,
        capacity: 2,
        description: "Exclusive suite with direct access to a semi-private pool from your terrace. Features a king-size bed, luxurious bathroom, and premium amenities.",
        amenities: ['Free WiFi', 'Air conditioning', '60-inch smart TV', 'Premium minibar', 'Safe', 'Direct pool access'],
        image: "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Family Ocean Suite",
        price: 799,
        capacity: 4,
        description: "Spacious suite perfect for families with a master bedroom, second bedroom with two beds, living area, and two bathrooms. Features a large balcony with panoramic ocean views.",
        amenities: ['Free WiFi', 'Air conditioning', 'Multiple TVs', 'Minibar', 'Safe', 'Ocean view', 'Dining area'],
        image: "https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  },
  {
    id: 4,
    name: "Alpine Lodge & Spa",
    location: "Aspen, Colorado",
    price: 499,
    rating: 4.8,
    reviews: 178,
    image: "https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Nestled in the heart of the Rocky Mountains, Alpine Lodge & Spa offers a perfect mountain retreat experience. Enjoy ski-in/ski-out access, a world-class spa, and cozy accommodations with stunning mountain views.",
    rooms: 156,
    capacity: 2,
    featured: true,
    bestSeller: true,
    amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'tv'],
    roomTypes: [
      {
        name: "Mountain View King",
        price: 499,
        capacity: 2,
        description: "Cozy room with a king-size bed, gas fireplace, private balcony with mountain views, and a luxurious bathroom with soaking tub.",
        amenities: ['Free WiFi', 'Fireplace', 'Smart TV', 'Coffee maker', 'Safe', 'Mountain view'],
        image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Deluxe Chalet Suite",
        price: 799,
        capacity: 4,
        description: "Spacious suite with a separate living area, king-size bed, pull-out sofa, gas fireplace, kitchenette, and a private balcony with panoramic mountain views.",
        amenities: ['Free WiFi', 'Fireplace', 'Smart TV', 'Kitchenette', 'Safe', 'Mountain view', 'Dining area'],
        image: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Grand Alpine Residence",
        price: 1299,
        capacity: 6,
        description: "Luxurious residence featuring two bedrooms, a spacious living area, full kitchen, dining area, gas fireplace, and a large private terrace with hot tub and mountain views.",
        amenities: ['Free WiFi', 'Fireplace', 'Multiple TVs', 'Full kitchen', 'Private hot tub', 'Washer/dryer', 'Mountain view'],
        image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  },
  {
    id: 5,
    name: "Pacific Palms Hotel",
    location: "San Diego, California",
    price: 279,
    rating: 4.2,
    reviews: 203,
    image: "https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Experience the laid-back California lifestyle at Pacific Palms Hotel. Just steps from the beach, our hotel offers comfortable accommodations, a relaxing pool area, and easy access to San Diego's top attractions.",
    rooms: 189,
    capacity: 3,
    featured: false,
    bestSeller: false,
    amenities: ['wifi', 'pool', 'restaurant', 'gym', 'tv'],
    roomTypes: [
      {
        name: "Standard Double Room",
        price: 279,
        capacity: 2,
        description: "Comfortable room with two double beds, work desk, and modern bathroom. Perfect for friends or small families.",
        amenities: ['Free WiFi', 'Air conditioning', 'TV', 'Coffee maker', 'Safe'],
        image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Ocean View King",
        price: 349,
        capacity: 2,
        description: "Relaxing room with a king-size bed, sitting area, and private balcony with partial ocean views.",
        amenities: ['Free WiFi', 'Air conditioning', 'Smart TV', 'Mini-fridge', 'Safe', 'Ocean view'],
        image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Family Suite",
        price: 499,
        capacity: 4,
        description: "Spacious suite with a king-size bed in the main bedroom, a separate living area with sofa bed, kitchenette, and dining area.",
        amenities: ['Free WiFi', 'Air conditioning', 'Multiple TVs', 'Kitchenette', 'Safe', 'Dining area'],
        image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  },
  {
    id: 6,
    name: "Cosmopolitan Retreat",
    location: "Las Vegas, Nevada",
    price: 329,
    rating: 4.6,
    reviews: 312,
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Located on the famous Las Vegas Strip, Cosmopolitan Retreat offers luxury accommodations, a vibrant casino, multiple restaurants, and a rooftop pool with stunning views of the city skyline.",
    rooms: 520,
    capacity: 2,
    featured: false,
    bestSeller: true,
    amenities: ['wifi', 'pool', 'spa', 'gym', 'restaurant', 'tv'],
    roomTypes: [
      {
        name: "Deluxe Room",
        price: 329,
        capacity: 2,
        description: "Modern room with a king-size bed or two queen beds, floor-to-ceiling windows, and a luxurious bathroom with a Japanese soaking tub.",
        amenities: ['Free WiFi', 'Air conditioning', 'Smart TV', 'Minibar', 'Safe'],
        image: "https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Strip View Suite",
        price: 599,
        capacity: 2,
        description: "Elegant suite with a king-size bed, separate living area, and floor-to-ceiling windows offering panoramic views of the Las Vegas Strip.",
        amenities: ['Free WiFi', 'Air conditioning', 'Smart TV', 'Premium minibar', 'Safe', 'Strip view'],
        image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        name: "Luxury Penthouse",
        price: 1599,
        capacity: 4,
        description: "Extravagant penthouse featuring two bedrooms, a spacious living area, dining room, full kitchen, and a private terrace with hot tub and breathtaking views of the Strip.",
        amenities: ['Free WiFi', 'Air conditioning', 'Multiple TVs', 'Full kitchen', 'Private hot tub', 'Strip view', 'Butler service'],
        image: "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
    ]
  }
]