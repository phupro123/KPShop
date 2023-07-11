import { capitalize, isEqual } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterWrapper from './FilterWrapper';

const Filter = ({ headerGroups, onChangeState }) => {
    const location = useLocation();
    const isFirstRender = useRef(true);

    const [columnFilter, setColumnFilter] = useState([]);
    const [tableState, setTableState] = useState({
        filterParams: columnFilter,
    });

    const filterDataArray = useMemo(
        () => [
            {
                filterBy: 'category',
                values: [capitalize(location.pathname.slice(1))],
            },
        ],
        [location],
    );

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
        <div className="relative mb-2 flex flex-wrap items-center justify-start">
            <FilterWrapper headerGroups={headerGroups} onChangeFilter={setColumnFilter} onToggleRef={handleToggleRef} />
        </div>
    );
};

export default Filter;
