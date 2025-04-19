import LoginComponent from "../../components/Common/Login";
import { selectHasInteracted } from '../../redux/slices/userInteractionSlice';
import { useSelector } from "react-redux";
function Login() {
  const globalHasInteracted = useSelector(selectHasInteracted);

  console.log(
    "Global Has ineracted value as component mount IN Login",
    globalHasInteracted
  );
  return (
    <div className="w-full flex justify-center">
      <LoginComponent />
    </div>
  );
}

export default Login;
