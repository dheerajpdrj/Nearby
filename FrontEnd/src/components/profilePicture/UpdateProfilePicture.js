import { useRef } from "react";
import { useCallback, useState } from "react";
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/userProfilePicture";
import getCroppedImg from '../../helpers/getCroppedImg'
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";


export default function UpdateProfilePicture({ setImage, image, setError, setShow, propic }) {

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [loading, setLoading] = useState(false);
    const slider = useRef(null);
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);
    const zoomIn = () => {
        slider.current.stepUp();
        setZoom(slider.current.value);
    };
    const zoomOut = () => {
        slider.current.stepDown();
        setZoom(slider.current.value);
    };
    const getCroppedImage = useCallback(
        async (show) => {
            try {
                const img = await getCroppedImg(image, croppedAreaPixels);
                if (show) {
                    setZoom(1);
                    setCrop({ x: 0, y: 0 });
                    setImage(img);
                } else {
                    console.log(img);

                    return img;
                }
            } catch (error) {
                console.log(error);
            }
        },
        [croppedAreaPixels]
    );

    const updateProfilePicture = async () => {
        try {
            setLoading(true);
            let img = await getCroppedImage();
            let blob = await fetch(img).then((b) => b.blob());
            const path = `${user.username}/profile_pictures`;
            let formdata = new FormData();
            formdata.append('file', blob);
            formdata.append('path', path);
            const res = await uploadImages(formdata, path, user.token);
            const updatedPicture = await updateprofilePicture(res[0].url, user.token);
            if (updatedPicture === "ok") {
                const profilePicturePost = await createPost('profilePicture', null, null, res, user.id, user.token);
                if (profilePicturePost.status === "ok") {
                    setLoading(false);
                    setImage("");
                    propic.current.style.backgroundImage = `url(${res[0].url})`;
                    Cookies.set("user", JSON.stringify({
                        ...user,
                        picture: res[0].url
                    }))
                    dispatch({
                        type: "UPDATEPROFILEPICTURE",
                        payload: res[0].url,
                    })
                    setShow(false);
                } else {
                    setLoading(false);
                    setError(profilePicturePost);
                }
            } else {
                setLoading(false);
                setError(updatedPicture);
            }
        } catch (error) {
            setError(error.response.data.error)
        }
    }

    return (
        <div className="postBox update_img">
            <div className="box_header">
                <div className="small_circle" onClick={() => setImage("")}>
                    <i className="exit_icon"></i>
                </div>
                <span>Update profile picture</span>
            </div>
            <div className="update_center">
                <div className="crooper">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        cropShape="round"
                        aspect={1 / 1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <div className="slider">
                    <div className="slider_circle">
                        <i className="minus_icon" onClick={zoomOut}></i>
                    </div>
                    <input type="range"
                        min={1}
                        max={3}
                        step={0.2}
                        value={zoom}
                        ref={slider}
                        onChange={(e) => { setZoom(e.target.value) }} />
                    <div className="slider_circle">
                        <i className="plus_icon" onClick={zoomIn}></i>
                    </div>
                </div>
            </div>
            <div className="flex_up">
                <div className="gray_btn" onClick={() => getCroppedImage("show")}>
                    <i className="crop_icon"></i>Crop photo
                </div>
            </div>
            <div className="flex_p_t">
                <i className="public_icon"></i>
                Your profile picture is public
            </div>
            <div className="update_submit_wrap">
                <div className="blue_link">Cancel</div>
                <button className="blue_btn" disabled={loading} onClick={() => { updateProfilePicture() }}>{loading ? <PulseLoader color="#fff" size={5} /> : "Save"}</button>
            </div>
        </div>
    );
}
