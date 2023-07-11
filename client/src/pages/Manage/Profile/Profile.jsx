import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LeftProfile } from './LeftProfile';
import { RightProfile } from './RightProfile';

function Profile({ title }) {
    const currentUser = useSelector((state) => state.user?.currentUser);
    useEffect(() => {
        document.title = title;
    }, []);
    return (
        <div>
            <p className="text-2xl font-semibold mb-6">Thông tin cá nhân</p>
            <div className="flex bg-white rounded-xl space-x-6">
                <div className="w-3/5 border-r-2 pr-6">
                    <LeftProfile currentUser={currentUser} />
                </div>
                <div className="w-2/5">
                    <RightProfile currentUser={currentUser} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
