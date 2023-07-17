const ParameterTranslate = ({ data }) => {
    const translate = {
        RAM: 'RAM',
        screen: 'Màn hình',
        displayCard: 'Card màn hình',
        connect: 'Cổng kết nối',
        specialFeature: 'Tính năng đặc biệt',
        operatingSystem: 'Hệ điều hành',
        design: 'Thiết kế',
        size: 'Kích thước, khối lượng',
        storage: 'Bộ nhớ',
        chip: 'Chip',
        ROM: 'ROM',
        sim: 'Sim',
        battery: 'Pin, sạc',
        frontCamera: 'Camera trước',
        rearCamera: 'Camera sau',
    };

    return <div>{translate[data]}</div>;
};

export default ParameterTranslate;
