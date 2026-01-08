export type Artisan = {
    id: string;
    name: string;
    role: string;
    location: string;
    image: string;
    story: string;
    verified: boolean;
    joinedDate: string;
};

export const artisans: Artisan[] = [
    {
        id: "1",
        name: "Lakshmi",
        role: "Master Metalworker",
        location: "Kutch, Gujarat",
        image: "/images/artisan_lakshmi_brass_1767870684922.png", // New Authentic Brass Portrait
        story: "Forging heritage into gold, Lakshmi has spent 40 years perfecting the ancient art of brass sand casting.",
        verified: true,
        joinedDate: "Jan 12, 2026",
    },
    {
        id: "2",
        name: "Kabir",
        role: "Silk Weaver",
        location: "Varanasi, UP",
        image: "/images/artisan_kabir_weaver_1767865159129.png", // New portrait
        story: "Kabir's family has been weaving Banarasi silk for 7 generations.",
        verified: true,
        joinedDate: "Dec 05, 2025",
    },
    {
        id: "3",
        name: "Fatima",
        role: "Pashmina Artist",
        location: "Srinagar, Kashmir",
        image: "/images/artisan_fatima_pashmina_1767865617664.png", // FIXED: New authentic portrait
        story: "Hand-spinning the finest Pashmina wool into timeless luxury.",
        verified: true,
        joinedDate: "Feb 10, 2026",
    },
    {
        id: "4",
        name: "Sita",
        role: "Madhubani Artist",
        location: "Madhubani, Bihar",
        image: "/images/artisan_sita_painter_1767865196538.png", // New portrait
        story: "Painting ancient mythology on handmade paper using natural dyes.",
        verified: true,
        joinedDate: "Mar 01, 2026",
    },
    {
        id: "5",
        name: "Ramesh",
        role: "Master Potter",
        location: "Jaipur, Rajasthan",
        image: "/images/artisan_ramesh_potter_1767865179679.png", // New portrait
        story: "Keeping the tradition of Blue Pottery alive with every spin of the wheel.",
        verified: true,
        joinedDate: "Jan 20, 2026",
    },
];
