import { AiOutlineArrowUp } from 'react-icons/ai';

function Ticket({ show }) {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {show && (
                <div>
                    <img
                        className={'left-[calc(((100vw-1240px)/2)-95px)] fixed top-80 duration-500'}
                        src="https://cdn.tgdd.vn/2022/08/banner/Trai-79x271-2.png"
                    />
                    <img
                        className={'right-[calc(((100vw-1240px)/2)-95px)] fixed top-80 duration-500'}
                        src="https://cdn.tgdd.vn/2022/08/banner/Phai-79x271-7.png"
                    />
                    <button
                        className="rounded-full bg-yellow-300 fixed right-4 bottom-4 h-10 w-10 flex items-center justify-center"
                        onClick={scrollToTop}
                    >
                        <AiOutlineArrowUp size={24} />
                    </button>
                </div>
            )}
        </>
    );
}

export default Ticket;
