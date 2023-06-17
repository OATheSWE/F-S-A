import React, { useState } from 'react';

const DesktopSearch: React.FC = () => {

    const [searchValue, setSearchValue] = useState('');

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };


    return (
        /* Desktop Search Bar */
        <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
      </div>
    );
};

export default DesktopSearch;
