// Menu data configuration for NorthyNook Catering packages
// Edit the options arrays below to update menu items — no HTML changes needed.

const menuData = {
    executive: {
        name: "Executive Package",
        price: 399,
        gstPercent: 5,
        description: "A curated selection of authentic North Indian flavors for your event.",
        included: ["Raita", "Pickle", "Salad"],
        categories: [
            {
                name: "Starter",
                pick: 1,
                options: ["Mini Samosa", "Hara Bhara Kabab", "Veg Cutlet", "Paneer Kurkure", "Noodles", "Veg. Manchurian"]
            },
            {
                name: "Gravy",
                pick: 1,
                options: ["Dal Tadka", "Dum Aloo", "Punjabi Chole Masala", "Rajma Masala", "Malai Kofta"]
            },
            {
                name: "Paneer Gravy",
                pick: 1,
                options: ["Paneer Makhani", "Kadai Paneer", "Kali Mirch Paneer", "Matar Paneer"]
            },
            {
                name: "Rice",
                pick: 1,
                options: ["Plain Rice", "Jeera Rice"]
            },
            {
                name: "Bread",
                pick: 1,
                options: ["Tawa Roti", "Plain/Palak Poori", "Parathas"]
            },
            {
                name: "Dessert",
                pick: 1,
                options: ["Gulab Jamun", "Dry Fruits Kheer", "Gajar Halwa (S)", "Desi Ghee Jalebi", "Shahi Toast + Rabri", "Moong Dal Halwa"]
            }
        ]
    },
    luxury: {
        name: "Luxury Package",
        price: 499,
        gstPercent: 5,
        description: "An elevated dining experience with more variety and premium selections.",
        included: ["Raita", "Pickle", "Salad"],
        categories: [
            {
                name: "Welcome Drink",
                pick: 1,
                options: ["JalJeera", "Mojito", "Aam Panna (S)"]
            },
            {
                name: "Starter",
                pick: 2,
                options: ["Mini Samosa", "Hara Bhara Kabab", "Veg Cutlet", "Paneer Kurkure", "Noodles", "Veg. Manchurian"]
            },
            {
                name: "Gravy",
                pick: 1,
                options: ["Dal Tadka", "Dal Makhani", "Dum Aloo", "Punjabi Chole Masala", "Rajma Masala", "Malai Kofta"]
            },
            {
                name: "Paneer Gravy",
                pick: 1,
                options: ["Paneer Makhani", "Kadai Paneer", "Kali Mirch Paneer", "Matar Paneer"]
            },
            {
                name: "Rice",
                pick: 1,
                options: ["Plain Rice", "Jeera Rice", "Veg Pulao", "Paneer Pulao"]
            },
            {
                name: "Bread",
                pick: 2,
                options: ["Tawa Roti", "Plain/Palak Poori", "Parathas"]
            },
            {
                name: "Dessert",
                pick: 2,
                options: ["Gulab Jamun", "Dry Fruits Kheer", "Gajar Halwa (S)", "Desi Ghee Jalebi", "Shahi Toast + Rabri", "Moong Dal Halwa"]
            }
        ]
    }
};
