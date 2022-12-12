import "./Header.css"
import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import CategoryPage from "../../categorySearch/category";
import SearchBar from "../../search/SearchBar";
import MyPage from "../../myPage/MyPage"
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const [logged, setLogged] = useState(false); //현재 로그 상태에 따라서 로그인상태인지 아웃상태인지 판단
    const dispatch = useDispatch();
    const nickName = useSelector(state => state.nickName);

    const isLogin = () => { //로그아웃 상태 일 때 로그인이 필요한 기능이라는 alert 메세지
        if (logged === false) {
            alert("로그인 이후 사용 가능합니다.")
        }
    }

    const tokenRemove = () => { //저장되어있는 모든 토큰 값을 삭제
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('nickName');
    }

    const onLogin = () => { //로그인일 경우 logged를 true로 설정
        setLogged(true);

    }

    const onLogout = () => { //로그아웃일 경우 logged를 false로 설정, 및 모든 토큰값 삭제
        tokenRemove();
        setLogged(false);
        window.location.replace("/")

    }

    const getNickName = () => { //닉네임을 가져오는 함수

        axios.get("http://localhost:8000/clients/me", {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        }).then(response => {
            sessionStorage.setItem('nickName', response.data.data.nickname)
            sessionStorage.setItem('clientIndex', response.data.data.clientIndex)

            dispatch({ type: "NICKNAME", payload: sessionStorage.getItem('nickName') })
        })
            .catch(error => {
                console.log(error.response.data);
            })


    }

    useEffect(() => { // useEffect를 사용하여 초기값을 설정하고, login과 logout일 때를 분리
        const token = sessionStorage.getItem('token');

        if (token === null) {
            setLogged(false);
            console.log("로그아웃 상태!")

        } else {
            onLogin();
            console.log("로그인 상태!")
            getNickName()
        }
    }, [])

    return (
        <div className="header_container">
            

            <div className="top">
                {/* NavLink 이미지 클릭시 화면이동 */}
                <NavLink to={"/MainPage"} >
                    <img src={require("../../assets/ThingCommerce.png")} className="img_logo" />
                </NavLink>

            

            <div className="links">
                {logged === false ?
                    <span className="link_text"> </span>
                    :
                    <span className="link_text"> {nickName} 님 환영합니다.</span>
                }

                {logged === false ?
                    <Link to='/login' className="link_text">로그인/회원가입</Link>
                    :
                    <Link to='/' onClick={onLogout} className="link_text">로그아웃</Link>
                }

                {logged === false ?
                    <Link to='/' onClick={isLogin} className="link_text">마이페이지</Link>
                    :
                    <Link to='/MyPage' onClick={isLogin} className="link_text">마이페이지</Link>
                }
                {/*???님 환영합니다.*/}

                {/* 검색창 껍데기 */}
                <div className='SearchBar'>
                    <SearchBar />
                </div>
            </div>

            </div>

            <div className="links_button">
                {logged === false ?
                    <Link to='/' onClick={isLogin} />

                    :
                    <Link to='/write' />

                }
            </div>


            {/* 카테고리 껍데기  */}
            <nav>
                <CategoryPage />

            </nav>





        </div>
    )
}

export default Header