import React from "react";

const About = () => {
  return (
    <section id="About" className=" py-10 md:py-20">
      <div className="max-h-screen w-auto  p-6 md:p-10">
        <h1 className="text-4xl text-black text-center font-bold mb-6 transition-all duration-700 ease-in-out opacity-0 animate-fade-in">
          About
        </h1>

        <div className="w-full flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 py-2">
          <div className="w-full md:w-1/2 h-full transition-all duration-700 ease-in-out transform scale-95 opacity-0 animate-slide-up">
            <img
              src="https://img.freepik.com/premium-photo/community-support-teamwork_1046319-73022.jpg"
              alt="Community Support"
              className="h-48 w-full object-cover rounded-lg md:h-72"
            />
          </div>

          <div className="w-full md:h-full md:w-1/2 transition-all duration-900 ease-in-out transform translate-x-10 opacity-0 animate-slide-in">
            <p className="text-justify text-md md:text-lg">
              The Skill Exchange Platform empowers local communities by enabling
              the exchange of skills and knowledge. We connect individuals with
              skills to offer and those eager to learn, fostering a
              collaborative environment. Whether you're improving a craft,
              learning new skills, or offering professional guidance, our
              platform builds meaningful connections. We aim to create
              self-sustaining communities through shared knowledge. Join us to
              learn, grow, and contribute together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
