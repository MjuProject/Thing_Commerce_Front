import React, {useEffect, useState} from "react"
import Layout from "../component/layout/Layout";
import axios from "axios";
import {useSelector} from "react-redux";
import "./search.css";
import {Button, Card, Col, Row} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


function SearchPage() {

    //위도, 경도, 페이지 설정
    const latitude = useSelector(state => state.latitude)
    const longitude = useSelector(state => state.longitude)
    let [page, setPage] = useState(0);
    //아이템 리스트
    const [itemList, setItemList] = useState([]);
    //처음 정확도순으로 sorting
    const [orderType, setOrderType] = useState('ACCURATE');
    //아이템 번호
    const [itemNum, setItemNum] = useState(0);
    //검색어 설정
    const [searchTextItem, setSearchTextItem] = useState('');
    const [last, setLast] = useState(false);
    const navi = useNavigate();
    //redux store에 저장된 검색어 값 가져오기
    const searchText = useSelector(state => state.searchText);
    //아이템 자세히보기
    const toProductViewDetailsPage = (itemId) => { navi("/ProductViewDetails" , {state : itemId}); }

    useEffect(()=>{
        getSearchItem();
        setSearchTextItem(searchText)
    }, [searchText, orderType])

    const increasePage = () => {
        setPage(++page);
        addSearchItem(latitude, longitude)
    };

    //현재 위도,경도, sorting, 검색어, 페이지 값으로 아이템 리스트 가져오기
    const getSearchItem = () => {
        const option = {
            url : "http://localhost:8000/items/search?page="+page+'&orderType='+orderType+'&query='+searchText+'&longitude='+longitude+'&latitude='+latitude,
            method: 'GET',
            headers: {
                 Authorization: 'Bearer ' + sessionStorage.getItem("token"),
            }
        }
        axios(option)
            .then(res=>{
                console.log(res.data);
                setItemList(res.data.data.content);
                setItemNum(res.data.data.content.length)
                console.log(longitude, latitude);
                setLast(res.data.data.last);
            }).catch(res=>{
            alert(res.response.data.message);
        });
    }

    const addSearchItem = () => {
        const option = {
            url : "http://localhost:8000/items/search-keyword?page="+page+'&orderType='+orderType+'&query='+searchText+'&longitude='+longitude+'&latitude='+latitude,
            method: 'GET',
            headers: {
                // Authorization: 'Bearer ' + sessionStorage.getItem("token"),
            }
        }
        axios(option)
            .then(res=>{
                setItemList(itemList.concat(res.data.data.content));
                setItemNum(res.data.data.content.length)
                setLast(res.data.data.last);
            }).catch(res=>{
            alert(res.response.data.message);
        });
    }

    //찜하기가 안된상태에서 찜하기를 눌렀을때
    const addBasket = (itemId,index) => { //찜하기가 안된상태에서 찜하기를 눌렀을때

        axios.post("http://localhost:8000/baskets/clients/me/items/"+itemId,
            {},{headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}


        ).then(response => {
            onSubmit(latitude, longitude, index);

        })
            .catch(error => {
                console.log(error.response);
            })
    }

    const delBasket = (itemId,index) => { //찜하기가 안된상태에서 찜하기를 눌렀을때

        axios.delete("http://localhost:8000/baskets/clients/me/items/"+itemId,
            {headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}


        ).then(response => {
            onSubmit(latitude, longitude, index);
        })
            .catch(error => {
                console.log(error.response);
            })
    }

    function format  (date) {
        return date.getFullYear() + "년 " + date.getMonth() + "월 " + date.getDate() + "일 " + date.getHours() + "시" ;

    }
    const changeOrderType = () => {
        setOrderType('ACCURATE')
        setItemList([])
        setPage(0)
    }
    const changeOrderExType = () => {
        setOrderType('EXPENSIVE')
        setItemList([])
        setPage(0)
    }
    const changeOrderInExType = () => {
        setOrderType('INEXPENSIVE')
        setItemList([])
        setPage(0)
    }
    const changeOrderReType = () => {
        setOrderType('RECENTLY')
        setItemList([])
        setPage(0)
    }

    return(
        <Layout>

            <main>

                <div className="itemSearch">

                    <div className="itemSearchResult">
                        <span>{searchTextItem}</span>
                        의 검색결과
                        <span> {itemNum} 개</span>
                    </div>

                    <div className="itemSort">
                        {orderType === 'ACCURATE' ?
                            <Button className="accurate" disabled>정확도순</Button> :
                            <Button className="accurate" onClick={changeOrderType}>정확도순</Button>
                        }
                        {orderType === 'RECENTLY' ?
                            <Button className="recent" disabled>최신순</Button> :
                            <Button className="recent" onClick={changeOrderReType}>최신순</Button>
                        }
                        {orderType === "EXPENSIVE" ?
                            <Button className="lowPrice" disabled>고가순</Button> :
                            <Button className="lowPrice" onClick={changeOrderExType}>고가순</Button>
                        }
                        {orderType === "INEXPENSIVE" ?
                            <Button className="highPrice" disabled>저가순</Button> :
                            <Button className="highPrice" onClick={changeOrderInExType}>저가순</Button>
                        }
                    </div>

                </div>

                <Row  gutter={24}>

                    {itemList.map(item => {


                        return (

                            <Col span={4.5} className="col">
                                <Card  hoverable
                                       key={item.itemId} className="cards">

                                    {item.isLike?

                                        <HeartFilled onClick ={()=>{delBasket(item.itemId,item.isLike)}}>

                                        </HeartFilled> :

                                        <HeartOutlined onClick ={()=>addBasket(item.itemId,item.isLike)}>

                                        </HeartOutlined>
                                    }


                                    <span> <h2 className="title"
                                               onClick={ () => {toProductViewDetailsPage(item.itemId) }}>
                                        제목: {item.itemTitle}</h2>

                                        {item.status === false ?
                                            <p className="rental">구매완료</p> :
                                            <p className="reservation">구매가능</p>}</span>
                                    <p>게시일: {format(new Date(item.createdDate))}</p>
                                    <p>가격: {item.price}</p>

                                    <img className="phoneImage" src={"http://localhost:8000" + item.itemPhoto}/>


                                </Card>
                            </Col>
                        )
                    })}
                </Row>

            </main>


        </Layout>
    )
}
export default SearchPage;