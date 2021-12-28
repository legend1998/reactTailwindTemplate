import {useRef, useState} from "react";
import {auth, firebasefb} from "./firebaseconfig";
import {useNavigate} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import {signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";
import {buttons} from "./data/repo";

export default function Login() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  let email = useRef();
  let password = useRef();
  const [{user}, dispatch] = useStateValue();

  const validate = () => {
    if (email.current.value.length < 6) {
      alert("enter valid email");
      return false;
    } else if (password.current.value.length < 6) {
      alert("enter valid password");
      return false;
    } else return true;
  };

  function gotohomepage(e) {
    e.preventDefault();

    if (!validate() || loading) return;
    setloading(true);

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(async (res) => {
        if (res.user) {
          const docref = doc(firebasefb, "admin", email.current.value);
          const docsnap = await getDoc(docref);
          if (!docsnap.exists()) {
            alert("something went wrong while fetching data for admin user");
          }
          var data = docsnap.data();
          console.log(data);
          if (data.role === "admin") {
            navigate("/home");
            dispatch({type: "SET_USER", user: data});

            console.log("wokring login ");
          } else {
            setloading(false);
            alert("not valid credential");
          }
        } else {
          setloading(false);
          alert("bad request");
        }
      })
      .catch((e) => {
        setloading(false);
        alert(e);
      });
  }
  return (
    <div className=" h-screen w-full flex items-center justify-center bg-black bg-opacity-70">
      <div className=" w-96 bg-white bg-opacity-10 p-4 rounded-sm">
        <h1 className="text-center text-3xl font-semibold mb-5">
          Review Collector
        </h1>
        <form method="get">
          <input
            ref={email}
            type="email"
            name="email"
            placeholder="email "
            required
            className={buttons.inputStyleDark}
          />
          <br />
          <input
            ref={password}
            type="password"
            required
            name="password"
            placeholder="password"
            className={buttons.inputStyleDark}
          />
          <br />
          <button
            type="submit"
            onClick={(e) => gotohomepage(e)}
            className={buttons.red}
          >
            {loading ? (
              <span className=" ">
                <span className="fas fa-spinner animate-spin"></span>
              </span>
            ) : null}
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
