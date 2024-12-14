import React, { useState,useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "./Authroute/AuthContext.jsx"
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { FaUserEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from 'axios'


function UserProfile() {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const [fault, setDefault] = useState(true);
  const [visibleDiv, setVisibleDiv] = useState(null);


  const [file, setFile] = useState(null); // State to hold the selected file
  const [uploading, setUploading] = useState(false); // State to track uploading process
  const [message, setMessage] = useState(""); // State for success or error message
  const [user,setUser]=useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(""); 
  

  const toggleDiv = (index) => {
    console.log(visibleDiv);
    setDefault(false);
    setVisibleDiv(index);
  }

  const [navbar, setNavbar] = useState(true);


  const { logout } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5900/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log("Server response:", result);

        if (response.ok) {
          Swal.fire({
            title: "Logged Out",
            text: "You have successfully logged out.",
            icon: "success",
          }).then(() => {
            logout();
            navigate("/");

          });
        } else {
          console.log("Logout error:", result.message);
        }
      } else {
        console.error("Unexpected server response format.");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

   const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
    //  console.log(data.profilePicture.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    // Convert the selected file to a Base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file); // Read the file
     console.log(data._id)
    reader.onloadend = async () => {
      try {
        setUploading(true);

        const response = await axios.post("http://localhost:5900/users/uploadPicture", {
          image: reader.result, // Send the Base64 string
          userId: data._id, // Replace this with the actual user ID
        });

        setUploading(false);
        setMessage("Profile picture uploaded successfully!");
        console.log("Response:", response.data);
        //  setUrl(data.profilePic);
      } catch (error) {
        setUploading(false);
        setMessage("Error uploading profile picture.");
        console.error("Error:", error.response?.data || error.message);
      }
    };
  };

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5900/users/getUserProfile/${data._id}`);
      setUser(response.data.user); // Set the user data
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error fetching user profile.");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
     fetchUserProfile();
  }, []);




  return (
    <div className='flex justify-between w-full h-full'>

   { navbar?<IoMdArrowDropupCircle className='h-10 w-10' onClick={() => setNavbar(!navbar)} /> : <IoMdArrowDropdownCircle className='h-10 w-10' onClick={() => setNavbar(!navbar)} />}
      {navbar && <div className='w-1/3 lg:w-1/4 h-[94vh] mx-4 bg-white flex flex-col my-5 rounded-md'>
        <div className='border-b-4 border-black h-1/4 flex justify-between items-center py-8'>
          <div className='flex flex-wrap w-40 h-40 group'>
            <img src={user?.profilePic||"https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png"} alt="" className='w-32 h-32 rounded-md' />
            <div className="h-32 w-32">
          <form onSubmit={handleSubmit} className='flex items-center'>
            <label
              htmlFor="fileInput"
              className=" bg-white text-black px-3 py-1 rounded-md 
              text-sm cursor-pointer hover:bg-blue-600 "
            >
              <FaUserEdit  className='text-lg'/>
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              name='image'
            />
             <button type='submit' className='bg-blue-500 py-1 px-2 rounded-md text-white '>submit</button>
          </form>
               
          </div>
          </div>


          <button onClick={handleLogout} className='block text-white px-14 py-2  md:px-4  lg:px-3 lg:py-1 text-lg md:text-md font-semibold bg-blue-500  hover:bg-blue-600  rounded-md  text-nowrap mr-2'>Log out</button>
        </div>


        <div className='h-3/4 flex flex-col p-7'>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(1)}>About</button>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(2)}>Skills</button>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(3)}>course providing</button>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(4)}>Contact me</button>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(5)}>what i have learnt?</button>
          <button className='my-1 px-8 py-3 text-lg font-semibold hover:bg-blue-500
             hover:text-white border-b-2 border-blue-300' onClick={() => toggleDiv(6)}>Hello</button>

        </div>
      </div>
      }


      {fault == true && <div className="w-2/3 h-[94vh] mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500"> Hello,Welcome {data.name}</h1>
        </header>

        <div className='w-full flex items-center justify-center'>
          <img src={user?.profilePic||"https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png"} alt="loading" className='w-80 h-80' />
        </div>
        <p className='text-lg font-semibold'>Go through fire and be ready for the strong comeback</p>


      </div>}



      {visibleDiv === 1 && <div className="w-2/3 h-[94vh] mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">About</h1>
        </header>

        <section className="mb-6">
          <p className='text-lg'>Hello Connections ,my self Rinku Dhurua, from Bhadimara village, is passionate about acquiring vocational knowledge and fostering development in this field. With a strong interest in community growth, Rinku aims to learn and share practical skills that empower others. Dedicated to building a better society, Rinku focuses on teaching and guiding the community toward sustainable progress. Their vision is to create opportunities that drive collective development and uplift the local community. Rinku believes in the power of education and collaboration to bring about meaningful change. Inspired by grassroots efforts, they strive to be a catalyst for growth and innovation.</p>
        </section>

        <section>
          <h2 className='text-md'>Conatcts:</h2>
          <p>Phone:{data.phone}</p>

        </section>
      </div>}
      {visibleDiv === 2 && <div className="w-2/3 h-[94vh] mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">Skills-Section</h1>

        </header>

      </div>}
      {visibleDiv === 3 && <div className="w-2/3 mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">Course Providing</h1>
        </header>

      </div>}
      {visibleDiv === 4 && <div className="w-2/3 mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">{data.name}</h1>
          <p className="text-blue-500">{data.email}</p>
          <p className='text-blue-500'>{data.role}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">About</h2>
          <p>Hobbies</p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">what we provide</h2>
          <ul>
            {/* {user.skills.map(skill => (
            <li key={skill} className="text-gray-700">- {skill}</li>
          ))} */}
            making toy@@@@
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <ul>
            {/* {user.projects.map(project => (
            <li key={project.id} className="text-gray-700">{project.name}</li>
          ))} */}
            uvuid
          </ul>
        </section>
      </div>}
      {visibleDiv === 5 && <div className="w-2/3 mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">{data.name}</h1>
          <p className="text-blue-500">{data.email}</p>
          <p className='text-blue-500'>{data.role}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">About</h2>
          <p>Hobbies</p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">what we provide</h2>
          <ul>
            {/* {user.skills.map(skill => (
            <li key={skill} className="text-gray-700">- {skill}</li>
          ))} */}
            making toy@@@@
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <ul>
            {/* {user.projects.map(project => (
            <li key={project.id} className="text-gray-700">{project.name}</li>
          ))} */}
            uvuid
          </ul>
        </section>
      </div>}
      {visibleDiv === 6 && <div className="w-2/3 mx-auto my-5 p-6 bg-white  rounded-lg ">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-500">{data.name}</h1>
          <p className="text-blue-500">{data.email}</p>
          <p className='text-blue-500'>{data.role}</p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold">About</h2>
          <p>Hobbies</p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">what we provide</h2>
          <ul>
            {/* {user.skills.map(skill => (
            <li key={skill} className="text-gray-700">- {skill}</li>
          ))} */}
            making toy@@@@
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold">Projects</h2>
          <ul>
            {/* {user.projects.map(project => (
            <li key={project.id} className="text-gray-700">{project.name}</li>
          ))} */}
            uvuid
          </ul>
        </section>
      </div>}

    </div>
  );
}

export default UserProfile;

