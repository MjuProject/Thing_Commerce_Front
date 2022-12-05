import React, {useEffect} from "react";
import "./Login.css";
import {Link, useLocation, useNavigate} from "react-router-dom"
// import axios from "axios";
import {Button, Checkbox, Divider, Form, Input} from "antd";
import * as PropTypes from "prop-types";
import axios from "axios";

function UserOutlined(props) {
    return null;
}

UserOutlined.propTypes = {className: PropTypes.string};

function LockOutlined(props) {
    return null;
}

LockOutlined.propTypes = {className: PropTypes.string};

function Login() {
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        const data = {
            clientId    : values.id,
            password    : values.password
        }

        const option = {
            url : 'http://localhost:8000/auth/login',
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            data: data
        }

        axios(option)
            .then(res=>{
                sessionStorage.setItem('token', res.data.data);
                navigate('/');
            }).catch(res=>{
            alert(res.response.data.message);
        });
    };



    const onSubmitFailed = (errorInfo) => {  //exception 발생 시 에러 원인 불러오기
        console.log("로그인에 실패했습니다",errorInfo);  //서버로 요청하는 값
    };


    return(
        <div className = "login_container">
            <Form
                name = "login"
                onFinish={onSubmit}  //콜백함수 구현 , 값 받아서 values에 넣음
                onFinishFailed={onSubmitFailed} //
                autoComplete="off"   //자동완성 끄기
                // initialValues={{
                //     remember: true,  //아이디 기억할 때 값 기억하는 거
                // }}
            >

                <h1>로그인</h1>


                <Form.Item
                    name ="id" //values에 들어갈 key 값
                    rules = {[{required :true, message : "아이디를 입력해주세요!"},]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />} //아이디 입력창 옆 아이콘
                        placeholder="아이디를 입력하세요." />

                </Form.Item>


                <Form.Item
                    name ="password"  //values에 들어갈 key 값
                    rules = {[{required :true, message : "비밀번호를 입력해주세요!"},]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />} //비밀번호 입력창 옆 아이콘
                        type="password"
                        placeholder="비밀번호를 입력하세요."/>
                </Form.Item>

                <Form.Item
                    name="remember"  //values에 들어갈 key 값
                    valuePropName="checked">
                    <Checkbox>아이디 기억하기</Checkbox>
                </Form.Item>
                {/* 아이디 기억하기 체크 박스 */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className='login_button'>
                        로그인
                    </Button>
                </Form.Item>
                {/* 로그인 버튼 구현 */}

                <Divider>

                </Divider>
                <p>신규 회원이신가요?
                    <Link className='signUp_Link' to={'/signUp'}>
                        띵커머스 회원가입하기
                    </Link>
                </p>
                {/* 보기 쉽게 구분선 구현 */}
            </Form>

        </div>
    )
}

export default Login;