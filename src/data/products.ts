import { artisans } from "./artisans";

export type Product = {
    id: string;
    title: string;
    artisanId: string;
    price: number;
    image: string;
    category: string;
    description: string;
    transparency: {
        artisan: number;
        materials: number;
        platform: number;
    };
};

export const products: Product[] = [
    {
        id: "p1",
        title: "Hand-Woven Banarasi Silk Saree",
        artisanId: "2", // Kabir (Weaver) - Correct
        price: 4200,
        image: "/images/silk_saree_varanasi_1767859999068.png",
        category: "Textiles",
        description: "A luxurious pure silk saree with intricate gold zari work, woven by hand over 300 hours.",
        transparency: {
            artisan: 65,
            materials: 20,
            platform: 15,
        },
    },
    {
        id: "p2",
        title: "Antique Brass Lamp",
        artisanId: "1", // Lakshmi (Kutch) - Okay for now
        price: 1200,
        image: "/images/brass_oil_lamp_antique_1767865506645.png",
        category: "Decor",
        description: "Handcrafted brass lamp with intricate carvings, perfect for adding a warm cultural glow.",
        transparency: {
            artisan: 60,
            materials: 25,
            platform: 15,
        },
    },
    {
        id: "p3",
        title: "Jaipur Blue Pottery Vase",
        artisanId: "5", // Ramesh (Potter) - FIXED
        price: 850,
        image: "/images/blue_pottery_vase_jaipur_1767860040091.png",
        category: "Pottery",
        description: "Signature blue and white floral patterns on a glossy pottery vase. A timeless piece of Jaipur art.",
        transparency: {
            artisan: 70,
            materials: 15,
            platform: 15,
        },
    },
    {
        id: "p4",
        title: "Madhubani Folk Painting",
        artisanId: "4", // Sita (Painter) - Correct
        price: 1800,
        image: "/images/madhubani_painting_1767863625075.png",
        category: "Art",
        description: "Authentic hand-painted Madhubani art on handmade paper, depicting nature and mythology.",
        transparency: {
            artisan: 75,
            materials: 10,
            platform: 15,
        },
    },
    {
        id: "p5",
        title: "Bankura Terracotta Horse",
        artisanId: "5", // Ramesh (Potter/Clay) - FIXED
        price: 650,
        image: "/images/terracotta_horse_bankura_1767863645430.png",
        category: "Decor",
        description: "Traditional Bankura horse figurine, a symbol of Indian craftsmanship and earthy aesthetics.",
        transparency: {
            artisan: 60,
            materials: 25,
            platform: 15,
        },
    },
    {
        id: "p6",
        title: "Kashmiri Pashmina Shawl",
        artisanId: "3", // Fatima (Pashmina) - Correct
        price: 5500,
        image: "/images/pashmina_shawl_kashmir_1767863661625.png",
        category: "Textiles",
        description: "Ultra-soft, pure Pashmina wool shawl with intricate hand-embroidery from the valleys of Kashmir.",
        transparency: {
            artisan: 80,
            materials: 10,
            platform: 10,
        },
    },
    // Duplicates for "Tons of Placeholders"
    {
        id: "p7",
        title: "Royal Blue Pottery Plate",
        artisanId: "5", // Ramesh (Potter) - FIXED (Was 1/Lakshmi)
        price: 450,
        image: "/images/blue_pottery_plate_jaipur_1767865219463.png",
        category: "Pottery",
        description: "A decorative wall plate featuring the classic geometric patterns of Jaipur blue pottery.",
        transparency: {
            artisan: 70,
            materials: 15,
            platform: 15,
        },
    },
    {
        id: "p8",
        title: "Vintage Brass Oil Lamp",
        artisanId: "1", // Lakshmi
        price: 950,
        image: "/images/brass_oil_lamp_antique_1767865506645.png",
        category: "Decor",
        description: "A small, ornate oil lamp perfect for festivals and home altars.",
        transparency: {
            artisan: 60,
            materials: 25,
            platform: 15,
        },
    },
    {
        id: "p9",
        title: "Banarasi Silk Dupatta",
        artisanId: "2", // Kabir (Weaver) - FIXED
        price: 1800,
        image: "/images/silk_dupatta_banarasi_1767865574921.png", // New Generated Image
        category: "Textiles",
        description: "A versatile silk stole that adds a touch of elegance to any outfit.",
        transparency: {
            artisan: 65,
            materials: 20,
            platform: 15,
        },
    },
    {
        id: "p10",
        title: "Madhubani Tree of Life",
        artisanId: "4", // Sita (Painter) - FIXED
        price: 2200,
        image: "/images/madhubani_painting_1767863625075.png",
        category: "Art",
        description: "A large-format painting symbolizing growth and prosperity in the Madhubani style.",
        transparency: {
            artisan: 75,
            materials: 10,
            platform: 15,
        },
    },
    {
        id: "p11",
        title: "Terracotta Elephant",
        artisanId: "5", // Ramesh (Potter) - FIXED
        price: 550,
        image: "/images/terracotta_elephant_bankura_1767865599202.png", // New Generated Image
        category: "Decor",
        description: "The companion piece to the Bankura horse, these elephants are guardians of the home.",
        transparency: {
            artisan: 60,
            materials: 25,
            platform: 15,
        },
    },
    {
        id: "p12",
        title: "Embroidered Pashmina Stole",
        artisanId: "3", // Fatima
        price: 3500,
        image: "/images/pashmina_shawl_kashmir_1767863661625.png",
        category: "Textiles",
        description: "Lighter than a shawl, this stole features delicate needlework.",
        transparency: {
            artisan: 80,
            materials: 10,
            platform: 10,
        },
    },
];
