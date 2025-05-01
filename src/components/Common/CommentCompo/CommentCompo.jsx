import CommentCount from "../../Common/CommentSystem/CommentCount.jsx";
import Button from "../../ui/Button";
import SummarizeComments from "../../Common/CommentSystem/SummarizeComments.jsx";
import AddComment from "../../Common/CommentSystem/AddComment.jsx";
import CommentList from "../../Common/CommentSystem/CommentList.jsx";
import Shradha from "../../../assets/shradha.jpg";
import { closeComment } from "../../../redux/slices/commentSlice";
import { useDispatch } from "react-redux";

const CommentCompo = ({ isReel }) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeComment());
  };

  return (
    <div className="px-[10px] lg:px-[20px] py-[10px] lg:py-[25px] flex flex-col gap-[30px] rounded-[8px] border border-[#D5D7DA] bg-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),_0px_0px_0px_3px_#F5F5F5] overflow-y-auto max-h-[90vh] relative">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-[38px] gap-[18px] w-fit">
        <CommentCount />
        <Button
          text="Summarize Comments"
          gap="gap-[5px] lg:gap-[10px]"
          textSize="text-[16px] lg:text-[17px]"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              viewBox="0 0 24 24"
              fill="#00c950"
              className="w-[23px] h-[23px] lg:w-[30px] lg:h-[30px]"
            >
              {/* <g>
              <rect fill="none" height="24" width="24" x="0" />
            </g> */}
              <g>
                <g>
                  <polygon points="19,9 20.25,6.25 23,5 20.25,3.75 19,1 17.75,3.75 15,5 17.75,6.25" />
                  <polygon points="19,15 17.75,17.75 15,19 17.75,20.25 19,23 20.25,20.25 23,19 20.25,17.75" />
                  <path d="M11.5,9.5L9,4L6.5,9.5L1,12l5.5,2.5L9,20l2.5-5.5L17,12L11.5,9.5z M9.99,12.99L9,15.17l-0.99-2.18L5.83,12l2.18-0.99 L9,8.83l0.99,2.18L12.17,12L9.99,12.99z" />
                </g>
              </g>
            </svg>
          }
        />
      </div>
      <SummarizeComments />
      <AddComment profilePic={Shradha} />
      <CommentList profilePic={Shradha} />
      <CommentList profilePic={Shradha} />
      {isReel && (
        <div
          className="absolute top-[10px] right-[10px] cursor-pointer"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#00c950"
            className="w-[35px] h-[35px] lg:w-[40px] lg:h-[40px]"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default CommentCompo;
