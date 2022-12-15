import React, {useEffect, useState} from "react";
import {Form, Image, Input, Button, Divider, Tag, Row, Col, Card, Avatar, Rate, Modal} from 'antd';
import Layout from "../component/layout/Layout";
import "./productViewDetails.css";
import axios from "axios";
// import HeaderPage from "../header/header";
import Meta from "antd/es/card/Meta";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {useHistory, useLocation} from "react-router-dom";    //수정부분
import {render} from "react-dom";

import {useNavigate} from "react-router-dom"  //수정부분



function ProductViewDetailsPage () {

    const [itemId,setItemId ] = useState(useLocation().state) ;





    const [productDetailsView, setProductDetailsView] = useState({
        categoryBig: "",
        categoryMiddle: "",
        categorySmall: "",
        contractStatus: "",
        create_date: "",
        deposit: "",
        endDate: "",
        itemAddress: "",
        itemContent: "",
        itemLatitude: "",
        itemLongitude: "",
        itemQuality: "",
        itemTitle: "",
        ownerId: "",
        price: "",
        start_Date: "",
        update_Date: "",
        views: "",


    });

    const [productPicture, setProductPicture] = useState([]);
    const [productThumbnail, setProductThumbnail] = useState("");

    const [productOwnerInfo, setProductOwnerInfo] = useState({
        nickname: "",
        trustPoint: ""
    });

    const [client, setClient] = useState([]);
    const [productBasket, setProductBasket] = useState("");

    const [isLike, setIsLike] = useState(false);

    const [productReview, setProductReview] = useState([]);
    const [userReview, setUserReview] = useState([]);

    const [userProduct, setUserProduct] = useState([]);    //수정부분
    const [userProductDetails, setUserProductDetails] = useState([]); //수정부분

    const [visible, setVisible] = useState(false);

    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false); //수정부분

    const [isProductModalVisible, setIsProductModalVisible] = useState(false); //수정부분

    const [last, setLast] = useState(false); //수정부분

    let [page, setPage] = useState(0); //수정부분
    const [imageList, setImageList] = useState('');

    const showModal = () => {
        setIsReviewModalVisible(true);   //수정부분
    };

    const showProductModal = () => {
        setIsProductModalVisible(true);   //수정부분
        setPage(0); //수정부분
        // userProductList(); //수정부분
    };

    const handleOk = () => {
        setIsReviewModalVisible(false);   //수정부분
    };

    const handleProductOk = () => {
        setIsProductModalVisible(false);   //수정부분
        setUserProduct([]); //수정부분

    };

    const handleCancel = () => {
        setIsReviewModalVisible(false);   //수정부분
    };

    const handleProductCancel = () => {
        setIsProductModalVisible(false);    //수정부분
        setUserProduct([]);    //수정부분
    };



    const onClickBasketButton = () => {

        isLike ?
            delBasket(itemId,isLike)
            :addBasket(itemId,isLike)

        console.log(isLike)
    }

    const increasePage = () => {      //수정부분
        setPage(page+1);         //수정부분
        console.log(page)         //수정부분
    }; //수정부분



    const navigate = useNavigate();  //수정부분


    const toProductViewDetailsPage = (itemId) => {     //수정부분
        console.log(itemId)    //수정부분
        setItemId(itemId);     //수정부분
        handleProductCancel();    //수정부분


    }



    function ItemProduct (){
        console.log(itemId)
        axios.get("http://localhost:8000/items/" + itemId , {headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }})

            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    console.log(response.data.data)
                    setProductDetailsView(response.data.data.item)
                    setProductBasket(response.data.data.basketCount)
                    setProductPicture(response.data.data.item.itemPhotoUri)
                    setProductThumbnail(response.data.data.item.itemPhotoUri[0])
                    setProductOwnerInfo(response.data.data.ownerInfo)
                    setIsLike(response.data.data.isLike)
                    setImageList(response.data.data.ownerInfo.clientPhoto)




                    console.log(response.data.data);
                    // console.log(response.data.data.item);
                    // console.log(response.data.data.ownerInfo);
                    // console.log(productBasket);
                    // console.log(productPicture);
                    // console.log(isLike);
                }
            })
            .catch(res => {
                console.log(res);
                console.log("fail");
            })
    }

    const getClient = () => {
        axios.get("http://localhost:8000/clients/me",
            {headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }})
            .then(response => {setClient(response.data.data)})
    }




    const addBasket = (itemId,isLike) => {
        axios.post("http://localhost:8000/baskets/clients/me/items/"+itemId,
            {},{headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}


        ).then(response => {
            console.log("찜하기 등록 성공")
            setIsLike(true)
            setProductBasket(productBasket+1)

        })
            .catch(error => {
                console.log(error.response);
                alert("로그인 후 가능합니다!")

            })
    }



    const delBasket = (itemId,isLike) => {

        axios.delete("http://localhost:8000/baskets/clients/me/items/"+itemId,
            {headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}


        ).then(response => {
            console.log("찜하기 삭제 성공")
            setIsLike(false)
            setProductBasket(productBasket-1)

        })
            .catch(error => {
                console.log(error.response);

            })
    }
    const addContract = () => {

        axios.post("http://localhost:8000/contracts/clients/me/items/"+itemId,
            {},{headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }}


        ).then(response => {
            alert("구매가 완료되었습니다.")
            navigate("/*")

        })
            .catch(error => {
                console.log(error.response);
            })
    }



    const userProductListAdd = () => {
        console.log(productDetailsView.ownerId);
        axios.get("http://localhost:8000/items/owner/"+productDetailsView.ownerId+'?page='+page )
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    setUserProduct(userProduct.concat(response.data.data.content));
                    setLast(response.data.data.last);
                    console.log(response.data.data);
                    console.log(last)
                    console.log(userProductDetails);
                    console.log(page);
                }
            })
            .catch(res => {
                console.log("fail");
            })};

    const deleteProduct = () => {
        axios.delete("http://localhost:8000/items/" + itemId,
            {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem("token")
                }
            }).then(response =>{
            alert("삭제되었습니다.")
            navigate(-1)
            console.log("성공")
        })
    }

    useEffect(() => {
        getClient();
    }, []);

    useEffect(() => {
        ItemProduct();
        // userReviewAxios();
        // productReviewAxios();

    }, [itemId]);

    useEffect(() => {
        if (productDetailsView.ownerId != "")
        {userProductListAdd();}
    }, [page]);




    //card 안 meta에는 바로 스트링을 넣을 수 없어서 임의로 상수 생성
    const trustPoint = "믿음 지수 : "

    //날짜 변환
    function format(date) {
        return date.getFullYear() + "년 "
            + (date.getMonth()+1) + "월 "               //수정부분
            + date.getDate() + "일 "
    }



    //대여 상태 변환
    const contractStatusFormat = () => {
        if (productDetailsView.contractStatus === "RENTAL") {
            return  "대여중";
        }
        else if (productDetailsView.contractStatus === "RESERVATION"){
            return "예약중" ;

        }

        else {
            return "대여가능" ;

        }


    }


    return (        //334줄부터 396줄까지 수정사항
        <Layout>

            <Form className="productViewDetailsPage_container"

            >
                <h1 className="productViewDetails_Header">{productDetailsView.itemTitle}</h1>
                <p className="productView">조회수: {productDetailsView.views}회</p>
                <Divider></Divider>

                <Image
                    className="ImageGroup"
                    preview={{ visible: false }}
                    src={"http://localhost:8000" + productThumbnail}
                    onClick={() => setVisible(true)}
                />
                <div style={{ display: 'none' }}>
                    <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                        {productPicture.map(picture => {
                                return (
                                    <Image src={ "http://localhost:8000" + picture} />
                                )
                            }
                        )}
                    </Image.PreviewGroup>
                </div>

                <Divider></Divider>

                {
                    productDetailsView.ownerId != client.clientIndex ?
                        null : <Button onClick={() => navigate("/amendWrite", {state : itemId})}> 수정 </Button>

                }

                {
                    productDetailsView.ownerId != client.clientIndex ?
                        null : <Button onClick={deleteProduct}> 삭제 </Button>

                }

                <p>물품 내용 : </p>
                <p>{productDetailsView.itemContent}</p>
                <Divider></Divider>
                <p>등록 날짜 : {format(new Date(productDetailsView.createdDate))}</p>
                <p>물품 상태 : {contractStatusFormat("")}</p>
                <p>가격 : {productDetailsView.price}원</p>
                <p>거래 지역 : {productDetailsView.itemAddress}</p>
                <p>찜한 수 : {productBasket}회</p>
                <Button className="contractButton" onClick={ () => {addContract()}}>
                    물품 구매하기
                </Button>
                <Card className="productBasketCard">
                    해당 물품 찜하기
                    &nbsp;
                    {isLike ?
                        <HeartFilled className="heartFilledButton"
                                     onClick={ () => {onClickBasketButton()}}
                        /> :
                        <HeartOutlined className="heartOutButton"
                                       onClick={ () => {onClickBasketButton()}} />}


                </Card>


                <Card
                    className="ownerInfoCard">
                    <Meta
                        avatar={<Avatar src={imageList}/>}
                        title={productOwnerInfo.nickname}
                        description={trustPoint + (productOwnerInfo.trustPoint == null ? "사용자가 받은 평점이 없습니다" : (productOwnerInfo.trustPoint+"점"))}
                    />

                    {/*<Button className="chattingButton"        //399줄부터 471줄까지 수정사항*/}

                    {/*        onClick={ async () => {*/}
                    {/*            await itemChatInfo()*/}
                    {/*            onClickChatButton(itemId)*/}
                    {/*        }}>*/}
                    {/*    채팅하기*/}
                    {/*</Button>*/}
                    {/*<Button  className="userReviewModal" onClick={showModal}>*/}
                    {/*    판매자 리뷰 보기*/}
                    {/*</Button>*/}
                    {/*<Modal title= {"<"+productOwnerInfo.nickname + "님에 대한 리뷰>"}*/}
                    {/*       visible={isReviewModalVisible}*/}
                    {/*       onOk={handleOk}*/}
                    {/*       onCancel={handleCancel}*/}
                    {/*       footer={[*/}
                    {/*           <Button onClick={handleOk}>*/}
                    {/*               닫기*/}
                    {/*           </Button> ]}>*/}
                    {/*    {userReview.map(review => {*/}
                    {/*            return (*/}
                    {/*                <Card className="reviewCardChild" title={review.reviewTitle}>*/}
                    {/*                    <Rate className="rate" disabled defaultValue={review.reviewScore} />*/}
                    {/*                    <p className="reviewModalContent">{review.reviewContent}</p>*/}
                    {/*                    <p>리뷰 작성자 : {review.writer}</p>*/}
                    {/*                    <p>작성일자 : {format(new Date(review.createDate))}</p>*/}
                    {/*                </Card>*/}


                    {/*            )*/}
                    {/*        }*/}
                    {/*    )}*/}
                    {/*</Modal>*/}

                    <Button  className="userProductModal" onClick={ () => {showProductModal()
                    }}>
                        판매 물품 보기
                    </Button>

                    <Modal
                        title= {"<"+productOwnerInfo.nickname + "님이 판매중인 물품>"}
                        visible={isProductModalVisible}
                        onOk={handleProductOk}
                        onCancel={handleProductCancel}
                        footer={[
                            <Button onClick={handleProductOk}>
                                닫기
                            </Button> ]}>
                        {userProduct.map(product => {
                                return (
                                    <Card className="userProductCardChild"
                                          title={product.itemTitle}
                                          hoverable
                                          onClick={ () => {toProductViewDetailsPage(product.itemId) }}>
                                        <img className="productImage" src={product.itemPhoto}/>
                                        <p className="createDate">작성일자 : {format(new Date(product.createDate))}</p>

                                    </Card>
                                )
                            }
                        )}

                        {last === true?
                            <Button disabled>더보기</Button>:
                            <Button onClick={increasePage}>더보기</Button>
                        }

                    </Modal>

                </Card>


                <Divider> </Divider>

                {/*<Form.Item*/}

                {/*    className="productReviews"*/}
                {/*>*/}
                {/*    <Card*/}
                {/*        className="reviewCard"              //473줄부터 482줄까지 수정사항*/}
                {/*        title="<제품 리뷰>">*/}
                {/*        {productReview.map(review => {*/}
                {/*                return (*/}
                {/*                    <Card className="reviewCardChild" title={review.reviewTitle}>*/}
                {/*                        <Rate className="rate" disabled defaultValue={review.reviewScore} />*/}
                {/*                        <p className="reviewCardContent">{review.reviewContent}</p>*/}
                {/*                        <p>리뷰 작성자 : {review.writer}</p>*/}
                {/*                        <p>작성일자 : {format(new Date(review.createDate))}</p>*/}
                {/*                    </Card>*/}


                {/*                )              //수정부분*/}
                {/*            }              //수정부분*/}
                {/*        )}*/}


                {/*    </Card>*/}
                {/*</Form.Item>*/}


            </Form>

            )}
        </Layout>

    )



};


export default ProductViewDetailsPage;
