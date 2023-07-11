import ListDevice from './ListDevice';
import { useEffect } from 'react';
import DeviceBanner from './DeviceBanner';
const Device = ({ title, device }) => {
    useEffect(() => {
        document.title = title;
    });
    return (
        <div className="flex flex-col space-y-6 my-6">
            <DeviceBanner />
            <ListDevice device={device}></ListDevice>
        </div>
    );
};
export default Device;
