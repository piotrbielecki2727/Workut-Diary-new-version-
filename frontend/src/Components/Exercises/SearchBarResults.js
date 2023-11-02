import React, { useEffect, useState } from 'react'
import './SearchBarResults.css';






function SearchBarResults({ results }) {


    return (
        <div id='searchBarResults'>
            {results.map((result, id) => {
                return <div id="searchBarResultsRow" key={id}> {result.Name}</div>
            })}
        </div>
    );
}

export default SearchBarResults;
