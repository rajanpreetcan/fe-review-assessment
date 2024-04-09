import { useMemo } from 'react';
import './listing.css';
import { useListingQuery } from '../../query';

interface Props {
    currentOffset: number;
    totalPages: number;
    totalCount: number | undefined;
   
}

export const Listing: React.FC<Props> = ({ currentOffset, totalPages, totalCount }) => {

    const { handleItemCountChange, onListingClick, itemCount } = useListingQuery();

    const isPrevDisabled = currentOffset <= 1;
    const isNextDisabled = currentOffset >= totalPages;

    const getDisplayText = useMemo(() => {
        const numCount = Number(itemCount)
        const numTotalCount = Number(totalCount)
        const lowerCount = (currentOffset - 1) * numCount + 1;
        let higherCount = currentOffset * numCount;
        if (higherCount > numTotalCount)
            higherCount = numTotalCount;

        return `Showing ${lowerCount}-${higherCount} of ${totalCount}`;
    }, [itemCount, currentOffset, totalCount]);

    return (
        <div className="custom-listing">
            <span>{getDisplayText}</span>
            <select value={itemCount} name="item-combobox" onChange={handleItemCountChange}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <button className={isPrevDisabled && 'disabled' || ''} disabled={isPrevDisabled} onClick={() => onListingClick(1)} >First</button>
            <button className={isPrevDisabled && 'disabled' || ''} disabled={isPrevDisabled} onClick={() => onListingClick(currentOffset - 1)} >Previous</button>
            <span>{currentOffset}</span>
            <button className={isNextDisabled && 'disabled' || ''} disabled={isNextDisabled} onClick={() => onListingClick(currentOffset + 1)} >Next</button>
            <button className={isNextDisabled && 'disabled' || ''} disabled={isNextDisabled} onClick={() => onListingClick(totalPages)} >Last</button>
        </div>

    )
}
