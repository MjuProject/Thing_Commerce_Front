import React, {useEffect, useState} from "react"
import "./SearchBar.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";

function SearchBar() {
    //store에 저장할 검색어 값

    const dispatch = useDispatch();
    const navi =useNavigate();

    //store에 저장된 검색어 값
    const text = useSelector(state => state.searchText);

    const [searchText, setSearchText] = useState('');

    useEffect(()=>{
        setSearchText(text);
    }, [text])


    const onChange= (e) => {
        console.log(e.target.value)
        setSearchText(e.target.value)
    }


    const onSubmit = (e) => {
        dispatch({type: "SEARCH_TEXT", payload: searchText})
        navi('/search')
    }

    return(
        <div>
            <fieldset>
                <form >
                    <legend className="visually-hidden"/>
                    <div className="search_box">
                        <input type="text" maxLength="225" tabIndex="1" onChange={onChange} value={searchText}/>
                        <button type="button" tabIndex="2" onClick={onSubmit}>
                            검색
                        </button>

                    </div>
                </form>
            </fieldset>
        </div>

    )
}

export default SearchBar;