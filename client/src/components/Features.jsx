import React from 'react'

const Features = () => {
  return (
    <section className="bg-white py-10 md:py-20" id='Features'>
    <div className="max-w-7xl mx-auto text-center  min-h-screen">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10">Platform Features</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 lg:px-10">
        <div className="p-4 border rounded-lg shadow-md h-[27rem] md:h-80 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 hover:text-white">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Find Skills</h4>
          <div className="flex flex-col md:flex-row justify-around items-start h-[50vh] md:h-full">
            <img src="https://www.wikihow.com/images/thumb/9/9b/Learn-New-Things-Step-14.jpg/v4-460px-Learn-New-Things-Step-14.jpg.webp" alt="" className="h-64 w-full md:h-[77%] md:w-1/2 md:mr-6 mb-4 md:mb-0 object-cover rounded shadow-md" />
            <p className="text-justify text-md">Explore the variety of skills and services offered by professionals in your community.Discover local expertise across different fields.Connect with specialists providing unique solutions and support.</p>
          </div>
        </div>
  
        <div className="p-4 border rounded-lg shadow-md h-[27rem] md:h-80 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 hover:text-white">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Offer Skills</h4>
          <div className="flex flex-col md:flex-row justify-around items-start h-[50vh] md:h-full">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhLRl2pqet5AFKvaO79YHO-eQ7dDCyQ8IVAyt-qOaFUFy40Un-66dIRHbu40TypFW_Vy06XxJtzdTkAWNNmUVPOP4qw8uzbxpV7_YozSB-Mpgn9uWuqjBOq34p_7D85wVuCpJSo5578Xzi6beJ7ew4xk_Zep07ptsNBi_mMaQlNeBNPwVuQ7WITsG5hjWU/s16000-rw/school-4279290_1280.jpg" alt="" className="h-64 w-full md:h-[77%] md:w-1/2 md:mr-6 mb-4 md:mb-0 object-cover rounded shadow-md" />
            <p className='text-justify  text-md'>Share your knowledge and engage with learners in your area.Offer your skills to those seeking to learn and grow locally.Build connections by teaching and inspiring others nearby.</p>
          </div>
        </div>
  
        <div className="p-4 border rounded-lg shadow-md h-[27rem] md:h-80 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 hover:text-white">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Secure Payments</h4>
          <div className="flex flex-col md:flex-row justify-around items-start h-[50vh] md:h-full">
            <img src="https://media.istockphoto.com/id/1312765909/photo/man-using-mobile-smart-phone-online-payment-banking-and-online-shopping-at-home-business-and.jpg?s=612x612&w=0&k=20&c=KM8p57xos3f8v3_r97mssfgZImKTweyOCYPZzHViG5A=" alt="" className="h-64 w-full md:h-[77%] md:w-1/2 md:mr-6 mb-4 md:mb-0 object-cover rounded shadow-md" />
            <p className='text-justify text-md'>Easily book or offer premium classes using our seamless payment system.Take advantage of our integrated platform for secure transactions.Access high-quality classes and services with hassle-free payments.</p>
          </div>
        </div>
  
        <div className="p-4 border rounded-lg shadow-md h-[27rem] md:h-80 w-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-gray-600 hover:text-white">
          <h4 className="text-xl md:text-2xl font-semibold mb-2">Booking system</h4>
          <div className="flex flex-col md:flex-row justify-around items-start h-[50vh] md:h-full">
            <img src="https://assets.aten.com/webpage/shared/Product-Landing-Page/Control_System/RBS/050_Features_HoldEfficient_n2.png" alt="" className="h-64 w-full md:h-[77%] md:w-1/2 md:mr-6 mb-4 md:mb-0 object-cover rounded shadow-md" />
            <p className='text-justify text-md'>Use our integrated payment system to book or offer premium classes.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  
  )
}

export default Features
