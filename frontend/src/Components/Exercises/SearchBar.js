import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './SearchBar.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";




function SearchBar() {

    const [searchValue, setSearchValue] = useState();
    const [results, setResults] = useState([]);

    const clearSearchBar = () => {
        setSearchValue('');
    }


    useEffect(() => {
        
    }, [searchValue]);


    return (
        <div id="SearchBar">
            <h3>Find your exercise</h3>
            <Form>
                <div id='SearchBar2'>
                    <div className="searchContainer">
                        <Form.Control
                            id='formControl'
                            type="text"
                            value={searchValue}
                            placeholder="Type to search..."
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <i onClick={clearSearchBar} id="iForSearchBar2"><FontAwesomeIcon icon={faX} /></i>
                        <i id="iForSearchBar"><FontAwesomeIcon icon={faSearch} /></i>
                    </div>
                    {searchValue && searchValue.length > 0 && results && results.length > 0 && (
                        <div id="searchResults">
                            <Table striped hover bordered  >
                                <tbody id="resultsTable">
                                    {results.map((result, index) => (
                                        <tr key={index} id="tr">
                                            <td id="td"><img src={result.gifUrl}></img></td>
                                            <td id="td">{result.name}</td>
                                            <td id="td">{result.bodyPart}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </div>
            </Form>
        </div>
    );
}

export default SearchBar;