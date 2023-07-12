import { capitalize, isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import FilterWrapper from './FilterWrapper';

const Filter = ({ searchGroup, headerGroups, onChangeState }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const isFirstRender = useRef(true);

    const [columnFilter, setColumnFilter] = useState([]);
    const [tableState, setTableState] = useState({
        filterParams: columnFilter,
    });

    console.log(searchParams.get('name'));

    const filterDataArray = useMemo(() => {
        if (location.pathname.slice(1) === 'search') {
            return [
                {
                    filterBy: 'title',
                    values: [searchParams.get('name')],
                },
            ];
        }
        return [
            {
                filterBy: 'category',
                values: [capitalize(location.pathname.slice(1))],
            },
        ];
    }, [location]);

    const tableStateData = useMemo(() => {
        if (isFirstRender.current) {
            setColumnFilter(filterDataArray);
            return {
                filterParams: filterDataArray,
            };
        }

        return tableState;
    }, [filterDataArray, tableState]);

    const handleToggleRef = useCallback(() => {
        isFirstRender.current = false;
    }, []);

    useEffect(() => {
        if (isFirstRender.current) {
            return;
        }
        const newTableState = {
            filterParams: columnFilter,
        };

        setTableState((prev) => {
            const isChangeFilter = !isEqual(prev.filterParams, newTableState.filterParams);

            if (isChangeFilter) {
                return newTableState;
            }

            if (!isEqual(prev, newTableState)) {
                return newTableState;
            }

            return prev;
        });
    }, [columnFilter]);

    useEffect(() => {
        const convertTableState = Object.fromEntries(
            tableStateData.filterParams.map((obj) => [obj.filterBy, ...obj.values]),
        );
        onChangeState?.({
            ...convertTableState,
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [tableStateData, onChangeState]);

    return (
        <FilterWrapper
            searchGroup={searchGroup}
            headerGroups={headerGroups}
            onChangeFilter={setColumnFilter}
            onToggleRef={handleToggleRef}
        />
    );
};

export default Filter;
