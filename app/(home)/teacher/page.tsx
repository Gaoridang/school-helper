import React from "react";
import axios from "axios";

const TeacherMainPage = async () => {
  const res = await axios.get("http://localhost:3000/api/check?role=teacher");

  console.log(res.data);

  return <div></div>;
};

export default TeacherMainPage;
