import React from "react";
import Dashboardlayout from "../../components/layouts/Dashboardlayout";
import drpic from '../../assets/images/drpic.png';

const About = () => {
  return (
    <Dashboardlayout activeMenue="about">
      {/* 🌿 Banner Section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80"
          alt="Clinic Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wide">
            Welcome to Zaib Clinic
          </h1>
        </div>
      </div>

      {/* 💬 Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-4">
          Your Health, Our Priority
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At <span className="font-semibold text-green-700">Zaib Clinic</span>, we are
          committed to providing compassionate and high-quality healthcare to
          our community. Our dedicated team works around the clock to ensure
          that every patient receives the best possible care in a comfortable
          and caring environment.
        </p>
      </section>

      {/* 🎯 Mission & Vision Section */}
      <section className="bg-green-50 py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-green-700 text-xl font-semibold mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To provide accessible, affordable, and reliable medical care to
              patients with compassion and integrity.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
            <h3 className="text-green-700 text-xl font-semibold mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To be recognized as a trusted healthcare provider that transforms
              lives through excellence and innovation in medicine.
            </p>
          </div>
        </div>
      </section>

      {/* 👨‍⚕️ Doctor Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-green-700 mb-8">
          Meet Our Doctor
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center w-full md:w-1/2 hover:shadow-xl transition">
            <img
              src={drpic}
              alt="Dr. Jhanzaib"
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-500 mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800">Dr. Jhanzaib</h3>
            <p className="text-green-700 font-medium">Heart Specialist</p>
            <p className="text-gray-500 mt-2">8 Years of Experience</p>
          </div>
        </div>
      </section>

      {/* 📞 Contact Section */}
      <section className="bg-green-50 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6">
            Contact Information
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>
              <span className="font-semibold text-green-700">Address:</span> Quaidabad,
              Malir, Karachi
            </p>
            <p>
              <span className="font-semibold text-green-700">Phone:</span> 0303-2747982
            </p>
            <p>
              <span className="font-semibold text-green-700">Email:</span>{" "}
              asad2747982@gmail.com
            </p>
          </div>
        </div>
      </section>
    </Dashboardlayout>
  );
};

export default About;
