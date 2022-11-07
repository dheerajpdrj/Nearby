import React from 'react';
import "./style.scss"
import { useSelector } from 'react-redux';
import CreatePost from '../../components/createPost';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';


export default function Home() {
  const {user} = useSelector((user)=>({...user}))
  return (
    <>
    <Header />
    <LeftHome user={user} />
    <RightHome user={user} />
    <div className="home_middle">
        <CreatePost user={user} />
      </div>
    </>
  )
}
