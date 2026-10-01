import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    TbBrandWhatsapp,
    TbMail,
    TbClock,
    TbSend,
    TbChevronRight,
    TbHeartFilled,
} from "react-icons/tb";
import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter } from "react-icons/fa6";
import PageTitle from "../components/PageTitle";

/* ---------- Edit these with your real info ---------- */
const WHATSAPP_NUMBER = "201000000000"; // international format, no + or leading zeros
const EMAIL = "support@yourstore.com";
const WORKING_HOURS = "Sat – Thu, 10 AM to 8 PM";

const SOCIAL_LINKS = [
    { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/yourstore" },
    { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com/yourstore" },
    { icon: FaTiktok, label: "TikTok", href: "https://tiktok.com/@yourstore" },
    { icon: FaXTwitter, label: "X", href: "https://x.com/yourstore" },
];

const CONTACT_METHODS = [
    {
        icon: TbBrandWhatsapp,
        title: "WhatsApp",
        text: "Fastest way to reach us",
        badge: "Chat with us",
        href: `https://wa.me/${WHATSAPP_NUMBER}`,
        external: true,
        card: "bg-purple-50 hover:bg-purple-100/70",
        iconBox: "bg-purple-100 text-purple-600",
        badgeStyle: "bg-purple-100 text-purple-700",
    },
    {
        icon: TbMail,
        title: "Email",
        text: EMAIL,
        badge: "We reply within 24 hours",
        href: `mailto:${EMAIL}`,
        card: "bg-pink-50 hover:bg-pink-100/70",
        iconBox: "bg-pink-100 text-pink-700",
        badgeStyle: "bg-pink-100 text-pink-600",
    },
    {
        icon: TbClock,
        title: "Working hours",
        text: WORKING_HOURS,
        badge: "We're here for you",
        card: "bg-sky-50",
        iconBox: "bg-sky-100 text-sky-700",
        badgeStyle: "bg-sky-100 text-sky-700",
    },
];

const INITIAL_FORM = { name: "", email: "", orderNumber: "", message: "" };

const inputClass =
    "w-full px-4 py-3 rounded-xl border border-surfaceLavender bg-white text-sm outline-none focus:border-primary transition-colors";

function ContactUs() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [isSending, setIsSending] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Please enter your name";
        if (!form.email.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (form.message.trim().length < 10) {
            newErrors.message = "Please write at least 10 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            setIsSending(true);

            // TODO: replace with your real API call, e.g.
            // await axios.post("/api/contact", form);
            await new Promise((resolve) => setTimeout(resolve, 800));

            toast.success("Message sent. We'll get back to you soon.");
            setForm(INITIAL_FORM);
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0 py-6 md:py-12">
            <PageTitle title="Contact Us" />

            <div className="text-center mb-10 relative">
                <img
                    src="/lines.png"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block w-28 lg:w-40 h-auto object-contain absolute start-36 rotate-12 top-1 -translate-y-1/2 pointer-events-none select-none"
                />

                <h1 className="text-2xl md:text-3xl font-bold text-textPrimary relative z-10">
                    Contact us
                </h1>
                <p className="text-textMuted text-sm mt-2 relative z-10">
                    Questions about your design or your order? Send us a message.
                </p>

                <img
                    src="/sticker1.png"
                    alt=""
                    aria-hidden="true"
                    className="hidden md:block w-28 lg:w-40 h-auto object-contain absolute end-28 top-1/2 rotate-45 -translate-y-1/2 pointer-events-none select-none"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-8">
                {/* Contact methods */}
                <div className="flex flex-col min-w-0 order-2 lg:order-1">
                    <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                        Get in touch
                    </p>
                    <h2 className="text-2xl font-bold text-textPrimary mt-2">
                        Ways to reach us
                    </h2>
                    <p className="text-sm text-textMuted mt-2 mb-6">
                        We&apos;re available during our working hours and usually reply within a few hours.
                    </p>

                    <div className="flex flex-col gap-4">
                        {CONTACT_METHODS.map(
                            ({ icon: Icon, title, text, badge, href, external, card, iconBox, badgeStyle }) => {
                                const content = (
                                    <>
                                        <div
                                            className={`${iconBox} rounded-md w-14 h-14 shrink-0 flex items-center justify-center`}
                                        >
                                            <Icon className="text-3xl" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-textPrimary">{title}</h3>
                                            <p className="text-sm text-textMuted break-words">{text}</p>
                                            <span
                                                className={`${badgeStyle} inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium`}
                                            >
                                                {badge}
                                            </span>
                                        </div>
                                        <TbChevronRight className="shrink-0 text-xl text-textMuted rtl:rotate-180" />
                                    </>
                                );

                                const base = `${card} flex items-center gap-4 rounded-2xl p-5 transition-colors`;

                                return href ? (
                                    <a
                                        key={title}
                                        href={href}
                                        target={external ? "_blank" : undefined}
                                        rel={external ? "noreferrer" : undefined}
                                        className={base}
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={title} className={base}>
                                        {content}
                                    </div>
                                );
                            }
                        )}
                    </div>

                    {/* Follow us */}
                    <div className="hidden border-t border-borderLight mt-8 pt-6 md:flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div className="">
                            <p className="text-sm font-medium text-textPrimary mb-3">Follow us</p>
                            <div className="flex gap-3 justify-center">
                                {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={label}
                                        className="w-10 h-10 rounded-full bg-primary hover:bg-primaryDark transition-colors text-white flex items-center justify-center"
                                    >
                                        <Icon className="text-base" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="relative hidden sm:flex flex-col items-end text-primary select-none">
                            <span
                                className="text-lg -rotate-12 leading-tight text-end"
                                style={{ fontFamily: "'Caveat', 'Comic Sans MS', cursive" }}
                            >
                                Let&apos;s stay
                                <br />
                                connected!
                            </span>
                            <TbHeartFilled className="text-lg mt-1" />
                            <svg
                                className="absolute -start-14 top-6 w-14 h-8 rtl:scale-x-[-1]"
                                viewBox="0 0 56 32"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M52 4 C40 2 20 6 8 24" />
                                <path d="M8 24 L9 14 M8 24 L17 21" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="order-1 lg:order-2 min-w-0 bg-white rounded-2xl shadow-cardShadow border border-surfaceLavender p-5 md:p-8 flex flex-col gap-4">
                    <div>

                        <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                            send us message
                        </p>
                        <h2 className="text-2xl font-bold text-textPrimary">
                            Fill out the form
                        </h2>
                        <p className="text-sm text-textMuted">
                            Tell us what&apos;s on your mind and we&apos;ll get back to you as soon as possible.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-textPrimary after:content-['*'] after:text-red-500 after:ms-1">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                className={`${inputClass} mt-1`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-textPrimary after:content-['*'] after:text-red-500 after:ms-1">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={form.email}
                                required
                                onChange={handleChange}
                                className={`${inputClass} mt-1`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="orderNumber" className="text-sm font-medium text-textPrimary">
                            Order number <span className="text-textMuted font-normal">(optional)</span>
                        </label>
                        <input
                            id="orderNumber"
                            name="orderNumber"
                            placeholder="If you have one"
                            type="text"
                            value={form.orderNumber}
                            onChange={handleChange}
                            className={`${inputClass} mt-1`}
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="text-sm font-medium text-textPrimary after:content-['*'] after:text-red-500 after:ms-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            value={form.message}
                            onChange={handleChange}
                            placeholder="How can we help you?"
                            className={`${inputClass} mt-1 resize-none`}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isSending}
                        className="bg-primary hover:bg-primaryDark transition duration-700 shadow-cardShadow rounded-full text-white text-sm py-3 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isSending ? (
                            <span className="loading loading-ring loading-md"></span>
                        ) : (
                            <>
                                <TbSend className="text-lg" />
                                <span>Send message</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ContactUs;