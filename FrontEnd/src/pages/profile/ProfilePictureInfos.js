import { useRef, useState } from "react";
import ProfilePicture from "../../components/profilePicture";
import useClickOutside from "../../helpers/clickOutside";

export default function ProfielPictureInfos({ profile, visitor }) {
    const [show, setShow] = useState(false);
    const showref = useRef(null)
    const propic = useRef(null);

    return (
        <div className="profile_img_wrap">
            {show && <ProfilePicture show={show} setShow={setShow}  propic={propic} />}
            <div className="profile_w_left">
                <div className="profile_w_img">
                    <div
                        className="profile_w_bg"
                        ref={propic}
                        style={{
                            backgroundSize: "cover",
                            backgroundImage: `url(${profile.picture})`,
                        }}
                    ></div>
                    {!visitor ? (<div className="profile_circle hover1" onClick={() => { setShow(true) }}>
                        <i className="camera_filled_icon"></i>
                    </div>) : ""}

                </div>
                <div className="profile_w_col">
                    <div className="profile_name">
                        {profile.first_name} {profile.last_name}
                        {/* <div className="othername">Othername</div> */}
                    </div>
                    <div className="profile_friend_count"></div>
                    <div className="profile_friend_imgs"></div>
                </div>
            </div>
            <div className="profile_w_right">
                {!visitor ? <div className="gray_btn" >
                    <i className="edit_icon" style={{ marginTop: '5px' }}></i>
                    <span>Edit profile</span>
                </div> : ""}


            </div>
        </div>
    );
}
