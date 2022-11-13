import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import axios, { post } from "axios";

function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  
  const [image, setImage] = useState('');

  function handleImage(event) {
    setImage(event.target.files[0]);
  }

  function handleApi() {
    const formData = new FormData();
    formData.append('image', image);
    axios.post('url', formData)
    .then((res) => {
      console.log(res);
    });
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
       <div className="file__upload__container">
        <input type="file" onChange={handleImage}/>
        <button onClick={handleApi}>Upload</button>
       </div>
     </div>
  );
}
export default Dashboard;