import { NextSeo } from "next-seo";
import { useState } from "react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };
    return (
        <section className="max-w-3xl mx-auto px-6 py-12">
            <NextSeo
            title="Contact us"
            description="If you want to contact us, please email us."
            />
            <h1 className="text-4xl font-extrabold text-center text-gray-900">Contact Us</h1>
            <p className="text-center text-gray-700 mt-3">
                Have any questions? Feel free to reach out using the form below.
            </p>

            <form className="mt-8 bg-white shadow-lg rounded-lg p-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
                        placeholder="Enter your message"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300"
                >
                    Send Message
                </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-gray-700">Or reach us directly at:</p>
                <p className="text-lg font-bold text-red-500">support@soundcloudmp3.com</p>
            </div>
        </section>
    );
}

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
           'header'
        ])),
        // Will be passed to the page component as props
      },
    }
  }