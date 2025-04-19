import YtPlaying from "../../components/Youtube/Components/YtPlaying";
import videoFile from "../../assets/Megham Karukatha - Official Video Song _ Thiruchitrambalam _ Dhanush _ Anirudh _ Sun Pictures.mp4"

const YtPlayingPage = () => {
    return (
        <div className="w-full lg:px-[15%] md:px-[15px] py-[10px] px-[10px]">
            <YtPlaying url={videoFile} />
        </div>
    )
}

export default YtPlayingPage;