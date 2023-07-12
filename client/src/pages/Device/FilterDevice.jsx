import { useMemo } from 'react';
import Filter from './Filter.jsx';
import { brandService } from '../../services';
import { capitalize, uniq } from 'lodash';
import {
    ProductPriceEnum,
    RAMEnum,
    ROMEnum,
    StarEnum,
    StorageEnum,
    featureCameraEnum,
    specialFeatureEnum,
} from '../../Constants/Enums';

const FilterDevice = ({ category, onChangeState }) => {
    const headerGroups = useMemo(
        () => [
            {
                id: 'price',
                header: 'Price',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'price',
                    filterChange: 'value',
                    filterLabel: 'Giá',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(ProductPriceEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                },
            },
            {
                id: 'star',
                header: 'Star',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'star',
                    filterChange: 'value',
                    filterLabel: 'Đánh giá',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(StarEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                },
            },
            {
                id: 'brand',
                header: 'Brand',
                meta: {
                    filterBy: 'name',
                    customFilterBy: 'brand',
                    filterLabel: 'Thương hiệu',
                    filterQuery: capitalize(category),
                    filterOptionLabelFactory: (option) => String(option),
                    getFilterOptions: brandService.getBrandsByCategory,
                    isHidden: category === 'search',
                },
            },
            {
                id: 'RAM',
                header: 'RAM',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'parameter.RAM',
                    filterChange: 'value',
                    filterLabel: 'RAM',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(RAMEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                },
            },
            {
                id: 'ROM',
                header: 'ROM',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'parameter.ROM',
                    filterChange: 'value',
                    filterLabel: 'ROM',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(ROMEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                    isHidden: category !== 'phone',
                },
            },
            {
                id: 'Storage',
                header: 'Dung lượng lưu trữ',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'parameter.storage',
                    filterChange: 'value',
                    filterLabel: category === 'tablet' ? 'Dung lượng lưu trữ' : 'Ổ cứng',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(StorageEnum)).slice(category === 'tablet' ? 0 : 4),
                    filterOptionLabelFactory: (option) => String(option),
                    isHidden: category === 'phone' || category === 'search',
                },
            },
            {
                id: 'specialFeature',
                header: 'Tính năng đặt biệt',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'parameter.specialFeature',
                    filterChange: 'value',
                    filterLabel: 'Tính năng đặt biệt',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(specialFeatureEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                    isHidden: category === 'laptop' || category === 'search',
                },
            },
            {
                id: 'featureCamera',
                header: 'Tính năng camera',
                meta: {
                    filterBy: 'key',
                    customFilterBy: 'parameter.featureCamera',
                    filterChange: 'value',
                    filterLabel: 'Tính năng camera',
                    filterType: 'enum',
                    getFilterDataEnum: uniq(Object.values(featureCameraEnum)),
                    filterOptionLabelFactory: (option) => String(option),
                    isHidden: category === 'laptop',
                },
            },
        ],
        [],
    );

    const searchGroup = useMemo(
        () => [
            {
                key: 'information',
                label: 'Information',
                field: {
                    title: 'Name',
                },
            },
        ],
        [],
    );

    return <Filter headerGroups={headerGroups} searchGroup={searchGroup} onChangeState={onChangeState} />;
};

export default FilterDevice;
