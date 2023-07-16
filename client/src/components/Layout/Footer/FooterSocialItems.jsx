import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const FooterSocialItems = ({ className }) => {
    return (
        <div className={className}>
            <div className="mr-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-blue-500 shadow-md duration-200 hover:bg-blue-500 hover:text-white">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    <FiFacebook size={20} />
                </a>
            </div>
            <div className="mr-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-primary-500 shadow-md duration-200 hover:bg-primary-500 hover:text-white">
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    <FiInstagram hostname="instagram" size={20} />
                </a>
            </div>
            <div className="mr-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white text-cyan-500 shadow-md duration-200 hover:bg-cyan-500 hover:text-white">
                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                    <FiTwitter hostname="twitter" size={20} className="mt-1" />
                </a>
            </div>
        </div>
    );
};

export default FooterSocialItems;
