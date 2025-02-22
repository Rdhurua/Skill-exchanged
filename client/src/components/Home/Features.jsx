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
    title: "Secure Payments",
    img: "https://media.istockphoto.com/id/1312765909/photo/man-using-mobile-smart-phone-online-payment-banking-and-online-shopping-at-home-business-and.jpg?s=612x612&w=0&k=20&c=KM8p57xos3f8v3_r97mssfgZImKTweyOCYPZzHViG5A=",
    desc: "Easily book or offer premium classes using our seamless payment system. Take advantage of our integrated platform for secure transactions. Access high-quality classes and services with hassle-free payments.",
  },
  {
    title: "Booking System",
    img: "https://assets.aten.com/webpage/shared/Product-Landing-Page/Control_System/RBS/050_Features_HoldEfficient_n2.png",
    desc: "Use our integrated payment system to book or offer premium classes.",
  },
]



  return (
    <section className="py-10 md:py-20" id='Features'>
    <div className="max-w-7xl mx-auto text-center min-h-screen px-4 sm:px-6 lg:px-8">
  <h3 className="text-4xl text-black text-center font-bold mb-6 transition-all duration-700 ease-in-out opacity-0 animate-fade-in">We are here for</h3>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
    {Features.map((feature, index) => (
      <div
        key={index}
        className="p-4 border rounded-lg shadow-sm shadow-black hover:shadow-black h-auto w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-transparent"
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
