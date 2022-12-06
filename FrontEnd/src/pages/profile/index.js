import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import CreatePost from '../../components/createPost';
import Post from '../../components/post';
import Photos from "./Photos";
import Friends from "./Friends";



export default function Profile({ setVisible }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  var userName = username === undefined ? user.username : username;
  const [{ loading, error, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  useEffect(() => {
    getProfile();
  }, [userName]);
  
  let visitor = userName === user.username ? false : true;

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="profile">
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover cover={profile.cover} visitor={visitor} />
          <ProfielPictureInfos profile={profile} visitor = {visitor} />
          <ProfileMenu />
          <div className="profile_grid">
            <div className="profile_left">
              <Photos username={userName} />
              <Friends friends={profile.friends} />
            </div>
            <div className="profile_right">
              
              {!visitor ? <CreatePost user={user} setVisible={setVisible} /> : "" }
              <div className="createPost">
                <div
                  className="createPost_header">
                  <div className="left_header_grid" style={{ fontSize: '1.5rem', fontWeight: '3rem' }}>Posts</div>
                </div>
              </div>
              <div className="posts">
                {profile?.post && profile.post.length? (profile.post.map((post)=>(
                  <Post user={user} post={post} key={post._id} profile />
                ))): (
                  <div className="no_posts">No Post Available</div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
