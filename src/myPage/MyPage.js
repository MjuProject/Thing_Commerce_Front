import React, { useEffect, useState } from "react";
import Layout from "../component/layout/Layout";
import "./MyPage.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MyLendListPage from "./myLendList";
import MyBorrowListPage from "./myBorrowList";
import MyBasketListPage from "./myBasketList";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Space, Upload } from "antd";

function MyPage() {
    const dispatch = useDispatch();
    const [tabIndex, setTabIndex] = useState(0);
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    
    const [ready, setReady] = useState(0);
    const [isSelect0, setIsSelect0] = useState(false);
    const [isSelect1, setIsSelect1] = useState(false);
    const [isSelect2, setIsSelect2] = useState(false);

    const tabHandler = (index) => {
        setTabIndex(index);
    }


    const getClientInfo = () => {
        axios.get("http://localhost:8000/clients/me", {
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        }).then(response => {
            sessionStorage.setItem('client_index', response.data.data.clientIndex)
            setEmail(response.data.data.email)
            setName(response.data.data.clientName)
            setPhoneNum(response.data.data.phoneNumber)
            setImageList(response.data.data.clientPhoto)
        })
            .catch(error => {
            })
    }


    const nickNameHandler = () => {
        if (ready === 0) {
            setReady(1)
        } else {
            setReady(0)

        }

    }

    const onSubmit = () => {
        const clientIndex = sessionStorage.getItem('client_index');
        const option = {
            url : "http://localhost:8000/clients/"+clientIndex+"/nickname",
            method: 'PUT',
            header: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            },
            data: 'nickname=' + userNick
        }

        axios(option)
            .then(res=>{
                if (res.status >= 200 && res.status <= 204) {
                    setReady(0)
                    dispatch({type: "NICKNAME", payload: userNick})
                }
            }).catch(res=>{
            setReady(1)
            alert(res.response.data.message);
        });
    };

    const nickName = useSelector(state => state.nickName);
    const [userNick, setUserNick] = useState(nickName);

    const nickNameChange = (e) => {
        setUserNick(e.target.value)
    }
    const onProfileChange = () => {

        const formData = new FormData();
        imageAntList.forEach(image => formData.append("image", image.originFileObj))

        const option = {
            url: 'http://localhost:8000/clients/me/client-photo',
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),

            },
            data: formData

        }

        axios(option)
            .then(res => {
                setImageAntList([])
                getClientInfo();

            }).catch(res => {
                console.log(res.response);
                alert("대표사진을 올려주세요.");
            });
    };

    const TapContent = [
        {
            myTitle: (
                <li className={isSelect0 ? "tabTitle1_Active" : "tabTitle1"}
                    onClick={() => {
                        tabHandler(0)
                        setIsSelect0(true)
                        setIsSelect1(false)
                        setIsSelect2(false)
                    }}>내가 올린 물품 보기</li>
            ),
            myContent: (
                <div>
                <MyLendListPage/>
                </div>
            )
        },
        {
            myTitle: (
                <li className={isSelect1 ? "tabTitle_Active" : "tabTitle"}
                    onClick={() => {
                        tabHandler(1)
                        setIsSelect0(false)
                        setIsSelect1(true)
                        setIsSelect2(false)
                    }}>내가 산 물품 보기</li>
            ),
            myContent: (
                <div><MyBorrowListPage/></div>
            )
        },
        {
            myTitle: (
                <li className={isSelect2 ? "tabTitle_Active" : "tabTitle"}
                    onClick={() => {
                        tabHandler(2)
                        setIsSelect0(false)
                        setIsSelect1(false)
                        setIsSelect2(true)
                    }}>내가 찜한 물품 보기</li>
            ),
            myContent: (
                <div><MyBasketListPage/></div>
            )
        }
    ]


    useEffect(() => {
        getClientInfo()
    }, [])
    const [imageList, setImageList] = useState('');
    const [imageAntList, setImageAntList] = useState([]);

    const onPictureChange = ({ fileList: newFileList }) => { setImageAntList(newFileList); };
    return (
        <Layout>

            <div className="myPageWrap">
                <Card className="userCard">
                    <div className="user">
                        <div className="left">
                            <img className="userPhoto" src={"http://localhost:8000" + imageList} />
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%',
                                }}
                                size="large"
                            >
                                <Upload
                                    listType="picture"
                                    fileList={imageAntList}
                                    onChange={onPictureChange}
                                    maxCount={1}
                                    beforeUpload={() => false}
                                >
                                    <Button type="primary" ghost className="imgBtn" icon={<UploadOutlined />}>대표사진 수정</Button>
                                </Upload>
                                <Button type="primary" ghost className="imgOkBtn" onClick={onProfileChange}>
                                    확인
                                </Button>
                            </Space>

                        </div>


                        <div className="userContent">
                            <div className="userName">이름 : {name}</div>
                            {ready === 0 ?
                                <div className="usersNick">
                                    닉네임 : {nickName}
                                    <Button ghost type="primary" className="nickNameChangeBtn" onClick={nickNameHandler}>닉네임 수정</Button>

                                </div>

                                :
                                <div className="usersNick">
                                    <input type="text" maxLength="40" onChange={nickNameChange} value={userNick} />
                                    <Button type="primary" ghost className="nickNameChangeBtn" onClick={() => {
                                        onSubmit() }}>수정</Button>
                                </div>
                            }

                            <div className="userEmail">이메일: {email}</div>

                            <div className="userPhoneNum">휴대번호 : {phoneNum}</div>

                        </div>

                    </div>
                </Card>
                <Divider></Divider>

                <div>
                    <Card>
                        <ul className="tab">
                            {TapContent.map((section) => {
                                return section.myTitle
                            })}
                        </ul>

                        <div className="tabCont">
                            <div className="tabContDetail">
                                {TapContent[tabIndex].myContent}
                            </div>
                        </div>
                    </Card>
                </div>

            </div>

        </Layout>
    )
}
export default MyPage;