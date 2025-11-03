import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Wrench,
  Bolt,
  Plug,
  Home as HomeIcon,
  Star,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Users,
  Award,
  ArrowRight,
  PaintRoller,
  CogIcon,
  BookOpenIcon,
  WashingMachine,
} from "lucide-react";
import classNames from "classnames";
import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.js";
import AnimateTxt from "../components/animateTxt.jsx";
import PinSearchBar from "../components/handlePinCode";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const { themeKey, user } = useMyContext();
  const [activeTab, setActiveTab] = useState("hire");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const T = themes[themeKey];

  const services = [
    {
      icon: Wrench,
      name: "Plumbers",
      description: "Pipe repairs, installations, leaks",
      rating: 4.8,
      workers: 150,
    },
    {
      icon: Bolt,
      name: "Electricians",
      description: "Wiring, fixtures, repairs",
      rating: 4.9,
      workers: 120,
    },
    {
      icon: Plug,
      name: "Technicians",
      description: "Appliance repairs, maintenance",
      rating: 4.7,
      workers: 200,
    },
    {
      icon: HomeIcon,
      name: "House Help",
      description: "Cleaning, cooking, daily tasks",
      rating: 4.6,
      workers: 300,
    },
    {
      icon: PaintRoller,
      name: "Painter",
      description: "Wall painting, touch-ups, decorative finishes",
      rating: 4.7,
      workers: 4,
    },
    {
      icon: CogIcon,
      name: "Mechanic",
      description: "Vehicle repair, maintenance, servicing",
      rating: 4.6,
      workers: 110,
    },
    {
      icon: BookOpenIcon,
      name: "Tutor",
      description: "Homework help, subject coaching, exam prep",
      rating: 4.8,
      workers: 200,
    },
    {
      icon: WashingMachine,
      name: "Laundry",
      description: "Washing, ironing, dry cleaning services",
      rating: 4.5,
      workers: 140,
    },
  ];

  const featuredWorkers = [
    {
      name: "Rajesh Kumar",
      specialty: "Electrician",
      rating: 4.9,
      jobs: 150,
      price: "₹300/hr",
      image: "👨‍🔧",
      verified: true,
      area: "Gomti Nagar",
    },
    {
      name: "Priya Singh",
      specialty: "House Help",
      rating: 4.8,
      jobs: 200,
      price: "₹200/hr",
      image: "👩‍🦳",
      verified: true,
      area: "Hazratganj",
    },
    {
      name: "Mohammed Ali",
      specialty: "Plumber",
      rating: 4.9,
      jobs: 180,
      price: "₹250/hr",
      image: "👨‍🔧",
      verified: true,
      area: "Alambagh",
    },
    {
      name: "Sunita Devi",
      specialty: "Cleaner",
      rating: 4.7,
      jobs: 120,
      price: "₹150/hr",
      image: "👩‍💼",
      verified: true,
      area: "Indira Nagar",
    },
  ];

  useEffect(() => {
    document.title =
      "Handynest - Hire Trusted Technicians & Home Services Online";
  }, []);

  return (
    <div className="min-100% flex flex-col bg-white">
      {/* Hero Section */}

      <section
        id="home"
        className={classNames(
          "flex-1  flex items-center min-h-[80vh] bg-gradient-to-br",
          T.heroBg
        )}
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center p-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimateTxt
              heroHeading={"Connect with Local Technicians in Your Area"}
              properties={{
                highlights: {
                  words: ["Local", "Technicians"],
                  style: "gradient",
                },
                type: "heading",
              }}
            />

            <p className="mt-4 text-gray-600 text-lg leading-relaxed">
              <strong>For Customers:</strong> Find affordable, skilled
              technicians right in your neighborhood. <br />{" "}
              <strong>For Technicians:</strong> Earn money using your skills by
              serving your local community.{" "}
            </p>

            {/* Search Section */}
            <motion.div
              id="searchCard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={classNames(
                "mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6",
                "border",
                T.softBorder100
              )}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Find local technicians near you
              </h3>
              <PinSearchBar T={T} classes={"items-start"} />

              {/* Popular Searches */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Popular searvices:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Plumber",
                    "Electrician",
                    "House Cleaning",
                    "AC Repair",
                    "Painter",
                  ].map((tag) => (
                    <button
                      key={tag}
                      className={classNames(
                        "px-3 py-1 text-sm rounded-full transition-colors",
                        T.lightAccent
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="mt-6 flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className={T.primaryColor} size={16} />
                <span>500+ Local Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className={T.primaryColor} size={16} />
                <span>50+ Localities</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className={T.primaryColor} size={16} />
                <span>Affordable Rates</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                onClick={() => navigate("/services")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={classNames(
                  "px-8 py-4 text-white rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 font-semibold",
                  "bg-gradient-to-r",
                  T.primaryGradient,
                  T.primaryHoverGradient
                )}
              >
                Need Help? Find Local Workers
                <ArrowRight size={20} />
              </motion.button>
              <motion.button
                onClick={() => navigate("/worker/login")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={classNames(
                  "px-8 py-4 bg-white rounded-xl shadow-lg transition-all font-semibold border-2",
                  T.primaryColor,
                  T.softBorder200
                )}
              >
                Are You a Technician? Start Earning
              </motion.button>
            </div>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className={classNames(
                  "p-6 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group border",
                  T.softBorder100,
                  "bg-white/80"
                )}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <service.icon
                  className={classNames(
                    T.primaryColor,
                    "transition-colors mb-3 group-hover:opacity-90"
                  )}
                  size={32}
                />
                <p className="font-semibold text-gray-800 mb-1">
                  {service.name}
                </p>
                <p className="text-sm text-gray-500">
                  {service.workers}+ available
                </p>
              </motion.div>
            ))}
            <motion.div
              className={classNames(
                "col-span-2 text-center p-6 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer group border",
                T.softBorder100,
                "bg-white/80"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: services.length * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <span className="text-gray-500 font-semibold text-lg">
                + More
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Dual Sided Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Connecting Local Communities
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Fixora bridges the gap between local customers who need affordable
              services and skilled technicians who want to earn from their
              expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Customers */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={classNames(
                  "rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br",
                  T.lightBg
                )}
              >
                <Users className={T.primaryColor} size={40} />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                For Customers
              </h4>
              <div className="space-y-4 text-left">
                {[
                  "Find technicians in your own locality - no long waits or high travel costs",
                  "Affordable rates from local professionals who understand your budget",
                  "Support your local community while getting quality services",
                  "Quick response times - they're just around the corner",
                ].map((txt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className={classNames(
                        "mt-1 flex-shrink-0",
                        T.primaryColor
                      )}
                      size={20}
                    />
                    <p className="text-gray-600">{txt}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/services")}
                className={classNames(
                  "mt-6 px-6 py-3 text-white rounded-lg transition-colors",
                  T.primaryBg,
                  T.primaryHover
                )}
              >
                Find Local Technicians
              </button>
            </motion.div>

            {/* For Technicians */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className={classNames(
                  "rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 bg-gradient-to-br",
                  T.lightBg
                )}
              >
                <Wrench className={T.primaryColor} size={40} />
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-4">
                For Local Technicians
              </h4>
              <div className="space-y-4 text-left">
                {[
                  "Earn money using your skills right in your own neighborhood",
                  "No need to travel far - serve customers near your home",
                  "Build lasting relationships with your local community",
                  "Flexible work - choose your own hours and rates",
                ].map((txt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle
                      className={classNames(
                        "mt-1 flex-shrink-0",
                        T.primaryColor
                      )}
                      size={20}
                    />
                    <p className="text-gray-600">{txt}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/worker/login")}
                className={classNames(
                  "mt-6 px-6 py-3 text-white rounded-lg transition-colors",
                  T.primaryBg,
                  T.primaryHover
                )}
              >
                Start Earning Today
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Our Services
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Professional services for your home and office needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                className={classNames(
                  "rounded-2xl p-6 transition-all cursor-pointer border",
                  T.softBorder100,
                  "bg-gradient-to-br",
                  T.cardBg,
                  T.cardHoverBg,
                  "hover:shadow-lg"
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <service.icon
                  className={classNames(T.primaryColor, "mb-4")}
                  size={40}
                />
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h4>
                <p className="text-gray-600 mb-4 text-sm">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {service.workers} workers
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workers */}
      <section
        id="workers"
        className={classNames("py-16 bg-gradient-to-br", T.workersBg)}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Your Local Technicians
            </h3>
            <p className="text-gray-600 text-lg">
              Real people from your community, ready to help
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredWorkers.map((worker, index) => (
              <motion.div
                key={worker.name}
                className={classNames(
                  "bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border",
                  T.softBorder100
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{worker.image}</div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-800">
                      {worker.name}
                    </h4>
                    {worker.verified && (
                      <CheckCircle className={T.primaryColor} size={16} />
                    )}
                  </div>
                  <p className={classNames(T.primaryColor, "text-sm mb-1")}>
                    {worker.specialty}
                  </p>
                  <p className="text-gray-500 text-xs mb-3 flex items-center justify-center gap-1">
                    <MapPin size={12} />
                    {worker.area}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="font-medium">{worker.rating}</span>
                    <span className="text-gray-500 text-sm">
                      ({worker.jobs} jobs)
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-800 mb-4">
                    {worker.price}
                  </p>
                  <button
                    className={classNames(
                      "w-full py-2 text-white rounded-lg transition-colors",
                      T.primaryBg,
                      T.primaryHover
                    )}
                  >
                    Contact Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Fixora's Local Network?
            </h3>
            <p className="text-gray-600 text-lg">
              Supporting local communities while getting the best service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MapPin,
                title: "Hyper-Local Focus",
                desc: "Technicians from your own locality who understand local needs and offer competitive rates",
              },
              {
                icon: Users,
                title: "Community Building",
                desc: "Connect neighbors with neighbors - building stronger, more self-reliant communities",
              },
              {
                icon: Award,
                title: "Economic Empowerment",
                desc: "Help local technicians earn a living while customers get affordable, quality services",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div
                  className={classNames(
                    "rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gradient-to-br",
                    T.lightBg
                  )}
                >
                  <feature.icon className={T.primaryColor} size={32} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={classNames("py-16 bg-gradient-to-r", T.ctaGradient)}>
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Connect with Your Local Community?
            </h3>
            <p className="text-green-50 text-lg mb-8">
              Whether you need help or want to help others, Fixora connects you
              with your neighbors
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/services")}
                className="px-8 py-4 bg-white rounded-xl shadow-lg transition-all font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={classNames(T.primaryColor)}>
                  I Need Local Help
                </span>
              </motion.button>
              <motion.button
                onClick={() => navigate("/worker/login")}
                className={classNames(
                  "px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white transition-all font-semibold",
                  T.hoverColor
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                I Want to Earn Money
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={classNames("py-16 bg-gradient-to-br", T.contactBg)}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 text-lg">
              Have questions? We're here to help!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: import.meta.env.VITE_C_NUMBER,
              },
              {
                icon: Mail,
                title: "Email Us",
                info: import.meta.env.VITE_C_EMAIL,
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: import.meta.env.VITE_C_LOCATION,
              },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                className={classNames(
                  "text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border",
                  T.softBorder100
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={classNames(
                    "rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-gradient-to-br",
                    T.lightBg
                  )}
                >
                  <contact.icon className={T.primaryColor} size={24} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {contact.title}
                </h4>
                <p className="text-gray-600">{contact.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Tailwind safelist helper (kept hidden); ensures soft borders per theme build --- */}
    </div>
  );
}
