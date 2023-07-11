import React from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Best offers "}>
      <h1><p class="text-primary" >Welcome {auth?.user?.name}</p></h1>
      <h6>Made By:- Ansh Bansal</h6>
      <h6>Gmail:- anshbansal811@gmail.com</h6>
    </Layout>
  );
};

export default HomePage;