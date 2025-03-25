import React from 'react'

const Features = () => {

const Features=[
  {
    title: "Find Skills",
    img: "https://img.freepik.com/free-photo/hands-working-digital-device-network-graphic-overlay_53876-132150.jpg",
    desc: "Explore the variety of skills and services offered by professionals in your community. Discover local expertise across different fields. Connect with specialists providing unique solutions and support.",
  },
  {
    title: "Offer Skills",
    img: "https://content.jdmagicbox.com/comp/def_content/skill-development-consultants/895b8028d3-skill-development-consultants-2-b8q88.jpg",
    desc: "Share your knowledge and engage with learners in your area. Offer your skills to those seeking to learn and grow locally. Build connections by teaching and inspiring others nearby.",
  },
 
  {
    title: "Connecting to Community Users",
    img: "https://static.vecteezy.com/system/resources/previews/001/261/012/non_2x/connecting-people-avatars-vector.jpg",
    desc: "Connect with like-minded individuals to exchange skills and grow together Seamlessly collaborate, learn,and schedule sessions with ease.",
  },
  {
    title: "Empowering Communities & Small Businesses",
    img: "https://www.shutterstock.com/image-photo/ensuring-workplace-inclusivity-through-diverse-260nw-2479011383.jpg",
    desc: "Our platform enables people to learn, share skills, and start small businesses like farming, tailoring, or handicrafts. By creating local opportunities, we reduce unemployment and empower women toward financial independence.",
  }
]



  return (
    <section className="py-10 md:py-20" id='Features'>
    <div className="max-w-7xl mx-auto text-center min-h-screen px-4 sm:px-6 lg:px-8">
  <h3 className="text-4xl text-black text-center font-bold mb-6 transition-all duration-700 ease-in-out opacity-0 animate-fade-in">We Are Here For</h3>
  <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
    {Features.map((feature, index) => (
      <div
        key={index}
        className="bg-gray-50 p-4 border rounded-lg shadow-sm shadow-black hover:shadow-black h-auto w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg "
      >
        <h4 className="text-xl sm:text-2xl font-semibold mb-2">{feature.title}</h4>
        <div className="flex flex-col sm:flex-row justify-around items-start h-auto sm:h-full">
          <img
            src={feature.img}
            alt={feature.title}
            className="h-64 w-full sm:h-[75%] sm:w-1/2 sm:mr-4 mb-4 sm:mb-0 object-cover rounded shadow-md"
          />
          <p className="text-justify text-md md:text-lg">
            {feature.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

  </section>
  
  
  )
}

export default Features
