import React, { useState, useRef, useEffect } from 'react';
import { BiSearchAlt } from '../../../assets/IconImports';

const MobileSearch: React.FC = () => {

    const mobileSearchRef = useRef<HTMLDivElement>(null);
    const [isSearchVisible, setSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!mobileSearchRef.current?.contains(e.target as Node)) {
                setSearchVisible(false);
            }

        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const mobileSearch = () => {
        setSearchVisible(!isSearchVisible);
    };

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
      };

    const mobileSearchStyle: React.CSSProperties = {
        visibility: isSearchVisible ? 'visible' : 'hidden',
        transform: isSearchVisible ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isSearchVisible ? '1' : '0',
    };

    return (
        /* Mobile Search Bar */
        <div className="mobile-search" ref={mobileSearchRef}>
            <div className="icon-contain" onClick={mobileSearch}>
                <BiSearchAlt className="icon-search" />
            </div>
            <div className="popup-search" style={mobileSearchStyle}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
            </div>
        </div>
    );
};

export default MobileSearch;
