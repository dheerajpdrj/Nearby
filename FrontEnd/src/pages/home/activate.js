import React, { useState } from 'react';
import "./style.scss"
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import ActivateForm from './ActivateForm';


export default function Activate() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((user) => ({ ...user }))
  return (
    <div className="home">
      <ActivateForm 
      type="success"
      header="Account verification succeded"
      text = {success}
      loading= {loading} />
      <Header />
      <LeftHome user={user} />
      <RightHome user={user} />
      <div className="home_middle">
        <CreatePost user={user} />
      </div>
    </div>
  )
}
