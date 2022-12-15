import React, {Fragment, useEffect, useState} from "react";
import "./myLendList.css";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row, Button} from 'antd';
import axios from "axios";

function MyLendListPage() {

    let [page, setPage] = useState(0);
    const [last, setLast] = useState(false);
    const [myLendingItemList, setMyLendingItemList] = useState([]);
    const navigate = useNavigate();


    const toProductViewDetailsPage = (itemId) => {
        navigate("/ProductViewDetails" , {state : itemId});
    }
    const increasePage = () => {
        setPage(++page);

        onLending()
    };

    useEffect(() => {
        onLending()

    }, []);

    const onLending = () => {
        axios.get( 'http://localhost:8000/items/clients/me?page='+page,
            {headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}
            ,
        )
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    setMyLendingItemList(response.data.data.content);
                    setLast(response.data.data.last);
                }
            })
            .catch(res => {
                console.log(res.response)
            })

    };

    function format  (date) {

        return date.getFullYear() + "년 " + (("00"+(date.getMonth() + 1))).slice(-2) + "월 " + (("00"+date.getDate()).slice(-2)) + "일 " + date.getHours() + "시" ;

    }


    return (
        <Fragment>

            <div className="row">

                <Row  gutter={24}>

                    {myLendingItemList.map(lendingitem => {


                        return (

                            <Col span={4.5} className="col">
                                <Card  hoverable
                                       key={lendingitem.itemId} className="cards">


                                    <span> <h2 className="title"
                                               onClick={ () => {toProductViewDetailsPage(lendingitem.itemId) }}>
                                        제목: {lendingitem.itemTitle}</h2>

                                        {lendingitem.status === false ?
                                            <p className="rental">구매완료</p> :
                                            <p className="reservation">구매가능</p>}</span>
                                    <p>게시일: {format(new Date(lendingitem.createdDate))}</p>
                                    <p>가격: {lendingitem.price}</p>
                                    <p>아이템 위치: {lendingitem.itemAddress}</p>

                                    <img className="phoneImage" src={"http://localhost:8000" + lendingitem.itemPhoto}/>


                                </Card>
                            </Col>
                        )
                    })}
                </Row>

            </div>
            {last === true?
                <Button className="moreButton" disabled>더보기</Button>:
                <Button className="moreButton" onClick={increasePage}>더보기</Button>
            }



        </Fragment>

    )


}
export default MyLendListPage;

