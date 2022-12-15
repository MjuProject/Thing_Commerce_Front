import React, { Fragment, useEffect, useState } from "react";
import "./myBorrowList.css";
import { Link, useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from 'antd';
import axios from "axios";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

function MyBasketListPage() {


    let [page, setPage] = useState(0);
    const [last, setLast] = useState(false);
    const [myBasketItemList, setMyBasketItemList] = useState([]);

    const navigate = useNavigate();


    const toProductViewDetailsPage = (itemId) => {
        navigate("/ProductViewDetails", { state: itemId });
    }
    const increasePage = () => {
        setPage(++page);

        onLendingBaskets()
    };

    useEffect(() => {
        delBasket()
        onLendingBaskets()
    }, []);

    const onLendingBaskets = () => {
        axios.get('http://localhost:8000/items/clients/me/baskets?page=' + page,
            {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }
            }
            ,
        )
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    console.log(response.data.data)
                    setMyBasketItemList(response.data.data);
                    setLast(response.data.data.last);
                }
            })
            .catch(res => {
                console.log(res.response + "1");

            })

    };
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

    function format(date) {
        return date.getFullYear() + "년 " + (("00" + (date.getMonth() + 1))).slice(-2) + "월 " + (("00" + date.getDate()).slice(-2)) + "일 " + date.getHours() + "시";
    }

    return (
        <Fragment>

            <div className="row">

                <Row gutter={24}>

                    {myBasketItemList.map((basketItem) => {

                        return (

                            <Col span={4.5} className="col">
                                <Card hoverable
                                    key={basketItem.itemId} className="cards">
                                    <HeartFilled onClick={() => { delBasket(basketItem.itemId) }}></HeartFilled>

                                    <span>
                                        <h2 className="title"
                                            onClick={() => { toProductViewDetailsPage(basketItem.itemId) }}
                                        >
                                            제목: {basketItem.itemTitle}</h2>

                                        {basketItem.status === false ?
                                            <p className="rental">구매완료</p> :
                                            <p className="reservation">구매가능</p>}</span>

                                    <p>게시일: {format(new Date(basketItem.createdDate))}</p>
                                    <p>대여료: {basketItem.price}</p>
                                    <p>보증금: {basketItem.deposit}</p>
                                    <p>아이템 위치: {basketItem.itemAddress}</p>

                                    <img className="phoneImage" src={"http://localhost:8000" + basketItem.itemPhoto} />


                                </Card>
                            </Col>
                        )
                    })}
                </Row>

            </div>
            {last === true ?
                <Button className="moreButton" disabled>더보기</Button> :
                <Button className="moreButton" onClick={increasePage}>더보기</Button>
            }



        </Fragment>

    )


}
export default MyBasketListPage;

