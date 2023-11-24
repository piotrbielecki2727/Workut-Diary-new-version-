import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import './SearchBar.css';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faX } from "@fortawesome/free-solid-svg-icons";




function SearchBar() {

    const [searchValue, setSearchValue] = useState();
    const [results, setResults] = useState([]);

    const clearSearchBar = () => {
        setSearchValue('');
    }

    useEffect(() => {
        if (searchValue && searchValue.length !== 0) {
            axios.get(`http://localhost:3001/getSearch/${searchValue}`)
                .then(res => {
                    if (res.data.Status = "Success") {
                        console.log(res.data.results);
                        setResults(res.data.results);
                    }
                    else {
                        setResults([]);
                    }
                })
                .catch(err => console.log(err))
        }
    }, [searchValue])


    return (
        <div id="SearchBar">
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
                    </div>
                    {searchValue && searchValue.length > 0 && results && results.length > 0 && (
                        <div id="searchResults">
                            <Table striped hover bordered  >
                                <tbody id="resultsTable">
                                    {results.map((result, index) => (
                                        <tr key={index} id="tr">
                                            <td id="td"><Link to={`/getExercise/${result.main_muscle_group}/${result.Name}`} id="searchBarLink">{result.Name}</Link></td>
                                            <td id="td">{result.main_muscle_group}</td>

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