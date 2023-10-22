import React, { useEffect, useState } from 'react'






function SearchBarResults({ results }) {


    return (
        <div id='searchBarResults'>
            {results.map((result, id) => {
                return <div key={id}> {result.Name}</div>
            })}
        </div>
    );
}

export default SearchBarResults;
