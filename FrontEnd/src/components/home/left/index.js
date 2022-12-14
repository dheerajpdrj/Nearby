import LeftLink from "./LeftLink";
import "./style.scss";
import { left } from "../../../data/home";
import { Link } from "react-router-dom";
export default function LeftHome({ user }) {
  return (
    <div className="left_home">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.first_name} {user.last_name}
        </span>
      </Link>
      <Link to={'/friends'}>
        {left.slice(0, 1).map((link, i) => (
          <LeftLink
            key={i}
            img={link.img}
            text={link.text}
            notification={link.notification}
          />
        ))}
      </Link>
    </div>
  );
}
