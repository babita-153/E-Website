import React from "react";
import { NavLink } from "react-router";
import useProduct from "../hooks/useProductHook";

const HomePage = () => {
  const { allProducts } = useProduct();

  const features = [
    {
      title: "Fast Delivery",
      description: "Get your products delivered quickly and safely.",
      icon: "🚚",
    },
    {
      title: "Secure Shopping",
      description: "Your data and payments are safe with us.",
      icon: "🔒",
    },
    {
      title: "Quality Products",
      description: "We provide high-quality products at good prices.",
      icon: "⭐",
    },
    {
      title: "Easy Returns",
      description: "Simple and convenient return process.",
      icon: "↩️",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-blue-200 font-semibold mb-3">
              Welcome to ShopEase
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Shop Smart,
              <br />
              Live Better.
            </h1>

            <p className="text-lg text-blue-100 max-w-lg mb-8">
              Discover quality products at the best prices. Shop your favorite
              products easily and securely.
            </p>

            <div className="flex gap-4 flex-wrap">
              {
                <NavLink
                  to="/products"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Shop Now
                </NavLink>
              }

              {
                <NavLink
                  to="/about"
                  className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
                >
                  Learn More
                </NavLink>
              }
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
                alt="Shopping"
                className="rounded-2xl w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="text-blue-600 font-semibold">Our Collection</p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Featured Products
              </h2>
            </div>

            {
              <NavLink
                to="/products"
                className="hidden sm:block text-blue-600 font-semibold hover:underline"
              >
                View All →
              </NavLink>
            }
          </div>

          {/* Temporary Product Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {allProducts.map((item) => {
              return <div
                key={item._id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                <div className="h-52 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">
                    Product Image
                  </span>
                </div>

                <div className="p-5">

                  <p className="text-sm text-blue-600 mb-1">
                   {item.category}
                  </p>

                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">

                    <span className="font-bold text-lg">
                      {item.price}
                    </span>
{
                    <button
                      to="/products"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                      View
                    </button> }

                  </div>

                </div>

              </div>
            })}

          </div>*/}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-blue-600 font-semibold">Why ShopEase?</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">Why Choose Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>

              <h3 className="font-bold text-lg">{feature.title}</h3>

              <p className="text-gray-500 text-sm mt-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Start Shopping?
          </h2>

          <p className="text-blue-100 mt-3 mb-7">
            Explore our collection and find something you love.
          </p>

          {
            <NavLink
              to="/products"
              className="inline-block bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Products
            </NavLink>
          }
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">ShopEase</h2>

            <p className="text-sm mt-3 text-gray-400">
              Your simple and secure online shopping destination.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>

            <div className="flex flex-col gap-2 text-sm">
              {
                <button to="/" className="hover:text-white">
                  Home
                </button>
              }

              {
                <button to="/products" className="hover:text-white">
                  Products
                </button>
              }

              {
                <button to="/about" className="hover:text-white">
                  About
                </button>
              }
              {
                <button to="/cart" className="hover:text-white">
                  Cart
                </button>
              }
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>

            <p className="text-sm">Email: support@shopease.com</p>

            <p className="text-sm mt-2">Phone: +91 98765 43210</p>
          </div>
        </div>

        <div className="border-t border-gray-800 text-center py-5 text-sm">
          © 2026 ShopEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
