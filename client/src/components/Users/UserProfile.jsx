import React, { useState, useEffect, useId } from "react";
import {useNavigate ,Link, useParams } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import goToSection from "../../utils/GotoFunction.jsx";
import { useAuthContext } from "../../Authroute/AuthContext.jsx";
import { showToastMessage2,showToastMessage } from "../../utils/Toasting.js";

function UserProfile() {
  const { userId } = useParams();
  const [data, setData] = useState({});


  const goToProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5900/users/profile`, {
        headers: {
          "Content-Type": "application/json",
        
        },
        withCredentials: true, // Include cookies for authentication if needed
      });
      const userdata = response.data.user;
      //  console.log(userdata);
      setData(userdata);
      //  console.log(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error fetching user profile.");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToProfile();
    }, 1000); // Runs every 1000ms (1 second)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const [fault, setDefault] = useState(true);
  const [visibleDiv, setVisibleDiv] = useState(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  

  const [newAbout, setNewAbout] = useState(data.about);
  const [newSkills, setNewSkills] = useState(data.Skills || []);
  const [newCourse, setNewCoures] = useState(data.Course || []);
  const [newLearnt, setNewLearnt] = useState(data.learnt || []);

  const [message2, setMessage2] = useState("");

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
    setNewAbout(data.about); // Set the current about text
  };

  const handleUpdates = async (e) => {
    setIsEditing(false);
    e.preventDefault();
    const updates = {};

    if (newAbout && newAbout !== data.about) updates.about = newAbout;
    if (newCourse && newCourse !== data.Course) updates.Course = newCourse;
    if (newSkills && newSkills.length !== data.Skills.length)
      updates.Skills = newSkills;
    if (newLearnt && newLearnt.length !== data.Learnt.length)
      updates.Learnt = newLearnt;

    try {
        
      const response = await axios.put(
        `http://localhost:5900/users/update/${userId}`,
        updates
      );

      const updatedDetails = response.user;
      setData((prevData) => ({
        ...prevData,
        ...updatedDetails,
      }));

      showToastMessage("Profile updated successfully!");
     
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      alert("Error updating profile!");
    }
  };


  const toggleValue = (index) => {
    console.log(visibleDiv);
    setDefault(false);
    setVisibleDiv(index);
  };

  const { authUser,setAuthUser } = useAuthContext();


  useEffect(() => {
    const storedUser = localStorage.getItem("skill-exchange-user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);


  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5900/users/logout", {
        method: "POST",
      headers:{'Content-Type':"application/json"}
      });

      const data = await response.json();
      if(data.error){
         throw new Error(data.error);
      }
      localStorage.removeItem("token");
      setAuthUser(null);
      showToastMessage("successfully logout!");
          setTimeout(() => {

            navigate("/");
          }, 2000);
    }
    catch(error){
           showToastMessage2(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Get the selected file
    //  console.log(data.profilePicture.data);
  };

  //uploading picture
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onloadend = async () => {
      try {
        setUploading(true);
  // console.log(token);
        const response = await axios.post(
          "http://localhost:5900/users/uploadPicture",
          {
              image: reader.result, // Send the Base64 string
              userId: data._id, // Replace this with the actual user ID
          },
         
      );
      

        setUploading(false);
        setMessage("Profile picture uploaded successfully!");
        showToastMessage(message);
        console.log("Response:", response.data);
        setUser((prevUser) => ({
          ...prevUser,
          profilePic: response.data.profilePicUrl,
        }));
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
      const response = await axios.get(
        `http://localhost:5900/users/getUserProfile/${userId}`
      );
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
    <>
      <div className="flex flex-col md:flex-row md:justify-between w-full h-full bg-gray-100">
        {/* {goToProfile()} */}
        <ToastContainer />
        {/* left controller */}

        <div className="w-[95%] mx-2 md:w-1/2 lg:w-1/4 md:h-[90vh] lg:h-[100vh] md:mx-4 bg-white flex flex-col my-5  md:sticky md:top-14 lg:top-2">
          {/* Profile Section */}
          <div className="border-b-2 border-gray-300 h-1/4 flex flex-col items-center justify-center py-6 md:py-28 ">
            <div className="relative group">
              <img
                src={
                  user?.profilePic ||
                  "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-2 border-blue-500"
              />
              <form
                onSubmit={handleSubmit}
                className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-40 rounded-full"
              >
                <label
                  htmlFor="fileInput"
                  className="bg-white text-black px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-blue-600 hover:text-white"
                >
                  <FaUserEdit className="text-lg" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  name="image"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>

            <div className="flex justify-between mt-4 py-2">
              <Link to={`/dashboard/${userId}`}>
                <button className="bg-green-500 hover:bg-green-600 mx-2 text-white text-md font-semibold rounded-md px-3 py-2">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={handleLogout}
                className=" text-white px-3 py-2 text-md font-semibold bg-blue-500 hover:bg-blue-600 rounded-md"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="h-3/4 flex flex-col p-5 ">
            <button
              className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md"
              onClick={() => goToSection("userAbout")}
            >
              About
            </button>
            <button
              className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md"
              onClick={() => goToSection("userSkills")}
            >
              Skills
            </button>
            <button
              className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md"
              onClick={() => goToSection("userCourse")}
            >
              Course Providing
            </button>
            <button
              className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md"
              onClick={() => toggleDiv(4)}
            >
              Contact Me
            </button>
            <button
              className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md"
              onClick={() => toggleDiv(5)}
            >
              What I Have Learned?
            </button>
            <button className="py-3 md:my-1 lg:my-2 px-6 md:py-1 lg:py-3 text-md lg:text-lg font-semibold text-left hover:bg-blue-500 hover:text-white border-b-2 border-gray-200 rounded-md">
              Hello
            </button>
          </div>
        </div>

        {/* rightcontainer */}
        <div className=" w-full lg:w-3/4 mx-auto my-5 p-6  rounded-lg shadow-lg md:p-8">
          {
            <div className="w-full lg:w-2/3 h-auto mx-auto my-5 p-6 bg-white  rounded-lg ">
              <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-blue-500">
                  {" "}
                  Hello,Welcome {data.name}
                </h1>
              </header>

              <div className="w-full flex items-center justify-center ">
                <img
                  src={
                    user?.profilePic ||
                    "https://png.pngtree.com/png-vector/20230831/ourmid/pngtree-man-avatar-image-for-profile-png-image_9197911.png"
                  }
                  alt="loading"
                  className="w-64 h-64 rounded-full border-2 border-blue-500"
                />
              </div>
            </div>
          }

          <div
            className="max-w-4xl mx-auto my-5 p-6 bg-white rounded-lg shadow-lg md:p-8"
            id="userAbout"
          >
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-600 md:text-4xl">
                About
              </h1>
            </header>

            <section className="mb-8">
              {data.about ? (
                <p className="text-lg text-justify text-gray-800 md:w-3/4 md:mx-auto">
                  {!isEditing ? data.about : ""}
                </p>
              ) : (
                <p className="text-lg text-gray-500 text-center">
                  No About section found. Click "Add" to create one.
                </p>
              )}

              {isEditing && (
                <textarea
                  className="w-full p-3 mt-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="6"
                  placeholder="Write something about yourself..."
                  value={newAbout}
                  onChange={(e) => setNewAbout(e.target.value)}
                />
              )}

              <div className="flex justify-end mt-6">
                {isEditing && visibleDiv === 0 ? (
                  <button
                    className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    onClick={(e) => {
                      handleUpdates(e); // Perform save logic
                      toggleValue(null); // Reset visibleDiv after saving
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                      handleEditClick(); // Trigger editing
                      toggleValue(0); // Set visibleDiv to 0 to indicate this section is active
                    }}
                  >
                    {data.about ? "Edit" : "Add"}
                  </button>
                )}
              </div>
            </section>

            <section className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-700 text-lg">
                <span className="font-medium">Phone:</span>{" "}
                {data.phone || "Not available"}
              </p>
            </section>
          </div>

          <div
            className=" max-w-4xl  mx-auto my-5 p-6 bg-white rounded-lg shadow-lg md:p-8"
            id="userSkills"
          >
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-600 md:text-4xl">
                Skills Section
              </h1>
            </header>

            <section className="mb-6">
              {data.Skills && data.Skills.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {data.Skills.map((skill, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg shadow-sm"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-gray-500 text-center">
                  No skills added yet. Click "Add" to include your skills.
                </p>
              )}

              {/* Editable Section */}
              {isEditing && visibleDiv === 1 && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a skill (comma-separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value.split(","))}
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Add skills separated by commas. Example: React.js, Node.js,
                    Tailwind CSS
                  </p>
                </div>
              )}
            </section>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              {isEditing && visibleDiv === 1 ? (
                <button
                  className="px-6 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                  onClick={(e) => {
                    handleUpdates(e); // Perform save logic
                    toggleValue(null); // Reset visibleDiv after saving
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                  onClick={() => {
                    handleEditClick(); // Trigger editing
                    toggleValue(1); // Set visibleDiv to 0 to indicate this section is active
                  }}
                >
                  {data.about ? "Edit" : "Add"}
                </button>
              )}
            </div>
          </div>

          <div
            className="max-w-4xl mx-auto my-5 p-6 bg-white  rounded-lg shadow-lg"
            id="userCourse"
          >
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-500">
                Course Providing
              </h1>
            </header>

            <section className="mb-6">
              {data.Course && data.Course.length > 0 ? (
                <ul className="flex flex-wrap gap-3">
                  {data.Course.map((course, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg shadow-sm"
                    >
                      {course}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg text-gray-500 text-center">
                  wan't to provide any course. Click "Add" to include your
                  course.
                </p>
              )}

              {/* Editable Section */}
              {isEditing && visibleDiv === 2 && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a skill (comma-separated)"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCourse}
                    onChange={(e) => setNewCoures(e.target.value.split(","))}
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Add course separated by commas. Example: cooking, mushroom
                    farming,
                  </p>
                </div>
              )}
            </section>

            <div className="flex justify-end mt-6">
              {isEditing && visibleDiv === 2 ? (
                <button
                  className="px-6 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                  onClick={(e) => {
                    handleUpdates(e); // Perform save logic
                    toggleValue(null); // Reset visibleDiv after saving
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-6 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                  onClick={() => {
                    handleEditClick(); // Trigger editing
                    toggleValue(2); // Set visibleDiv to 0 to indicate this section is active
                  }}
                >
                  {data.about ? "Edit" : "Add"}
                </button>
              )}
            </div>
          </div>

          <div
            className="max-w-4xl mx-auto my-5 p-6 bg-white shadow-lg rounded-lg"
            id="userContact"
          >
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-500">Contact Me</h1>
            </header>

            {/* About Section */}
            <section className="mb-6">
              <h2 className="text-lg  mb-2">
                hello, you can connect with me through following media
              </h2>
            </section>

            {/* Contact Details Section */}
            <section className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Contact Details</h2>

              {/* Email Button */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-4 text-center px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition duration-200"
              >
                Send an Email
              </a>

              {/* Chat Request Button */}
              <button
                onClick={() => alert("Chat request sent!")}
                className="block w-full text-center px-4 py-2 bg-green-500 text-white font-semibold rounded shadow hover:bg-green-600 transition duration-200"
              >
                Send Chat Request
              </button>
            </section>
          </div>

          <div
            className="max-w-4xl mx-auto my-5 p-6 bg-white shadow-lg rounded-lg "
            id="userLearnt"
          >
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-500">
                what learned till now
              </h1>
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
          </div>
          <div className="max-w-4xl mx-auto my-5 p-6 bg-white shadow-lg rounded-lg ">
            <header className="text-center mb-6">
              <h1 className="text-3xl font-bold text-blue-500">
                what learned till now
              </h1>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
