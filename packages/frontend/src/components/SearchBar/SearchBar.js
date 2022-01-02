import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const SearchBar = ({ searchQuery, setSearchQuery}) => {
    console.log(searchQuery);
    return (
    <form action="" method="get">
        <div className="form-control">
            <div className="relative ml-5 mr-5 mt-5">
                <input type="text" placeholder="Des frites ?" value={searchQuery} onInput={e => setSearchQuery(e.target.value)} className="w-full pr-16 input input-primary input-bordered"/>
                <button className="absolute top-0 right-0 rounded-l-none btn btn-primary" type="submit">go</button>
            </div>
        </div>
    </form>
);
}

export default SearchBar

