import { useMemo, useState } from "react";
import { TbMessageCircle, TbSearch } from "react-icons/tb";
import {
    TbShirt,
    TbShoppingBag,
    TbTruckDelivery,
    TbRefresh,
} from "react-icons/tb";
import { Link, useSearchParams } from "react-router-dom";
import FaqItem from "../features/Help/FaqItem";

/* ---------- Content (edit the answers to match your real policies) ---------- */
const CATEGORIES = [
    { id: "custom", label: "Customizing", icon: TbShirt },
    { id: "order", label: "Ordering & payment", icon: TbShoppingBag },
    { id: "shipping", label: "Shipping", icon: TbTruckDelivery },
    { id: "returns", label: "Returns & sizing", icon: TbRefresh },
];

const FAQS = [
    // Customizing
    {
        category: "custom",
        q: "How do I design my own T-shirt?",
        a: "Open the customizer, pick a T-shirt color and size, then add your image or text. You can move, resize and rotate everything on the shirt until it looks right. When you're happy, add it to your cart.",
    },
    {
        category: "custom",
        q: "Which image formats can I upload?",
        a: "PNG, JPG and JPEG. For the sharpest print, upload an image at least 1500 px wide. A PNG with a transparent background gives the cleanest result.",
    },
    {
        category: "custom",
        q: "Can I choose the color of my text?",
        a: "Yes. After typing your text, choose any color from the color picker. You can also change the font, size and position.",
    },
    {
        category: "custom",
        q: "Can I print on both the front and the back?",
        a: "Yes. Switch between the front and back views in the customizer and design each side separately.",
    },
    {
        category: "custom",
        q: "Will my design look exactly like the preview?",
        a: "The preview is a close match. Printed colors can look slightly different from your screen, depending on the shirt color and your display brightness.",
    },
    // Ordering
    {
        category: "order",
        q: "How do I place an order?",
        a: "Finish your design, choose your size and quantity, and tap Add to cart. Then open your cart, check the details and confirm your order. You need to be logged in to order.",
    },
    {
        category: "order",
        q: "Can I change or cancel my order after confirming?",
        a: "You can change or cancel while the order is still waiting to be printed. Once printing starts, it can't be changed because each shirt is made just for you.",
    },
    {
        category: "order",
        q: "Which payment methods do you accept?",
        a: "You can see the available payment methods at checkout. Choose the one that suits you before confirming.",
    },
    {
        category: "order",
        q: "Can I save a design and order it later?",
        a: "Yes. Log in and your designs stay in your account, so you can come back and finish them anytime.",
    },
    // Shipping
    {
        category: "shipping",
        q: "How long does delivery take?",
        a: "Custom shirts are printed after you order, so delivery takes a little longer than ready-made items. You'll see the estimated delivery time at checkout.",
    },
    {
        category: "shipping",
        q: "How much does shipping cost?",
        a: "Shipping depends on your governorate. The exact cost appears in your cart before you confirm.",
    },
    {
        category: "shipping",
        q: "How can I track my order?",
        a: "Open your orders page to see the current status of every order, from printing to delivery.",
    },
    // Returns
    {
        category: "returns",
        q: "How do I pick the right size?",
        a: "Open the size chart on the product page and compare it with a T-shirt you already own and like. If you're between two sizes, choose the bigger one.",
    },
    {
        category: "returns",
        q: "Can I return a customized T-shirt?",
        a: "Because every custom shirt is made specifically for you, we can only accept returns for printing mistakes or damaged items. Contact us within a few days of delivery and include a photo.",
    },
    {
        category: "returns",
        q: "My shirt arrived damaged or the print is wrong. What now?",
        a: "We're sorry about that. Send us your order number and a photo, and we'll reprint or refund it.",
    },
];

function HelpFAQs() {
    const [searchParams] = useSearchParams();
    const categoryFromUrl = searchParams.get("category");
    const [activeCategory, setActiveCategory] = useState(
        CATEGORIES.some((c) => c.id === categoryFromUrl) ? categoryFromUrl : "custom"
    );
    const [openQuestion, setOpenQuestion] = useState(null);
    const [search, setSearch] = useState("");

    const isSearching = search.trim().length > 0;

    const visibleFaqs = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (term) {
            return FAQS.filter(
                (f) =>
                    f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)
            );
        }
        return FAQS.filter((f) => f.category === activeCategory);
    }, [search, activeCategory]);

    const selectCategory = (id) => {
        setActiveCategory(id);
        setOpenQuestion(null);
    };

    return (
        <section className="max-w-4xl mx-auto py-8 md:py-12">
            {/* Header + search */}
            <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-textPrimary">
                    Help & FAQs
                </h1>
                <p className="text-textMuted text-sm mt-2">
                    Everything you need to know about designing and ordering your T-shirt.
                </p>

                <div className="relative max-w-md mx-auto mt-6">
                    <TbSearch className="absolute top-1/2 -translate-y-1/2 start-4 text-xl text-textMuted" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setOpenQuestion(null);
                        }}
                        placeholder="Search for a question"
                        className="w-full ps-11 pe-4 py-3 rounded-full border border-surfaceLavender bg-white shadow-cardShadow text-sm outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Category tabs (hidden while searching) */}
            {!isSearching && (
                <div className="flex gap-3 overflow-x-auto pb-2 mb-6 md:justify-center">
                    {CATEGORIES.map(({ id, label, icon: Icon }) => {
                        const active = id === activeCategory;
                        return (
                            <button
                                key={id}
                                onClick={() => selectCategory(id)}
                                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${active
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-textPrimary border-surfaceLavender hover:border-primary"
                                    }`}
                            >
                                <Icon className="text-lg" />
                                {label}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Questions */}
            <div className="bg-white rounded-2xl shadow-cardShadow border border-surfaceLavender px-5 md:px-8">
                {visibleFaqs.length > 0 ? (
                    visibleFaqs.map((item) => (
                        <FaqItem
                            key={item.q}
                            item={item}
                            isOpen={openQuestion === item.q}
                            onToggle={() =>
                                setOpenQuestion(openQuestion === item.q ? null : item.q)
                            }
                        />
                    ))
                ) : (
                    <p className="py-10 text-center text-sm text-textMuted">
                        No results for &quot;{search}&quot;. Try different words or contact us below.
                    </p>
                )}
            </div>

            {/* Contact */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-borderLight/40 rounded-2xl p-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                        <TbMessageCircle className="text-2xl text-primary" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-textPrimary">
                            Didn&apos;t find your answer?
                        </h2>
                        <p className="text-sm text-textMuted">
                            Send us a message and we&apos;ll get back to you.
                        </p>
                    </div>
                </div>
                <Link
                    to="/contact"
                    className="bg-primary hover:bg-primaryDark transition duration-700 shadow-cardShadow rounded-full text-white text-sm py-2 px-8"
                >
                    Contact us
                </Link>
            </div>
        </section>
    );
}

export default HelpFAQs;
