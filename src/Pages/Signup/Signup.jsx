import SignupComponent from "../../components/Common/Signup";
import { selectHasInteracted } from '../../redux/slices/userInteractionSlice';
import { useSelector } from "react-redux";
function Signup() {
  const globalHasInteracted = useSelector(selectHasInteracted);

  console.log(
    "Global Has ineracted value as component mount IN Signup",
    globalHasInteracted
  );
  return (
    <div className="w-full flex justify-center">
      <SignupComponent />
    </div>
  );
}

export default Signup;
