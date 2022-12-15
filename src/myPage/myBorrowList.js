import React, {Fragment, useEffect, useState} from "react";
import "./myBorrowList.css";
import {Link, useNavigate} from "react-router-dom";
import {Card, Col, Row, Avatar, Button, Badge, Modal, Input, Form, Rate} from 'antd';
import { HeartOutlined,HeartFilled, BorderOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";
import axios from "axios";
import ProductViewDetailsPage from "../productViewDetails/productViewDetails";
import {useSelector, useDispatch, batch} from "react-redux";
import {FormInstance} from "antd";



function MyBorrowListPage() {

    let [page, setPage] = useState(0);
    const [last, setLast] = useState(false);
    const [myBorrowItemList, setMyBorrowItemList] = useState([]);

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
        axios.get( 'http://localhost:8000/contracts/clients/me?page='+page,
            {headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}
            ,
        )
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    console.log(response.data.data)
                    setMyBorrowItemList(response.data.data);
                    setLast(response.data.data.last);

                }
            })
            .catch(res => {
            })

    };




    function format  (date) {

        return date.getFullYear() + "년 " + (("00"+(date.getMonth() + 1))).slice(-2) + "월 " + (("00"+date.getDate()).slice(-2)) + "일 " + date.getHours() + "시" ;

    }
    return (
        <Fragment>

            <div className="row">

                <Row  gutter={24}>

                    {myBorrowItemList.map((borrowitem) => {


                        return (

                            <Col span={4.5} className="col">
                                <Card  hoverable
                                       key={borrowitem.itemDetailResponseDTO.item.itemId} className="cards">
                                    <span> <h2 className="title"
                                               onClick={ () => {toProductViewDetailsPage(borrowitem.itemDetailResponseDTO.item.itemId) }}>
                                        제목: {borrowitem.itemDetailResponseDTO.item.itemTitle}</h2>
                                    <p className="done">구매완료</p></span>
                                    <p>날짜: {format(new Date(borrowitem.itemDetailResponseDTO.item.createdDate))}</p>
                                    <p>가격: {borrowitem.itemDetailResponseDTO.item.price}</p>
                                    <p>아이템 위치: {borrowitem.itemDetailResponseDTO.item.itemAddress}</p>

                                    <img className="phoneImage" src={"http://localhost:8000" + borrowitem.itemDetailResponseDTO.item.itemPhotoUri[0]}/>

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
export default MyBorrowListPage;

