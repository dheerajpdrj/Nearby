import Moment from "react-moment";

export default function Comment({ comment }) {
    return (
        <div className='comment'>
            <img src={comment?.commentBy?.picture} alt="" className='comment_img' />
            <div className="comment_col">
                <div className="comment_wrap">
                    <div className="comment_name">
                        {comment.commentBy.first_name} {comment.commentBy.last_name}
                    </div>
                    <div className="comment_text">
                        {comment.comment}
                    </div>
                </div>
                <div className="comment_actions">
                    <span><Moment fromNow interval={30}>{comment.commentAt}</Moment></span>
                </div>
            </div>
        </div>
    )
}
