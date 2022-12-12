import React, {useState} from "react";
import {Form, Input, Button, Divider, Tag, Row, Col, Card} from "antd";
import "./SignUp.css";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

function SignUp() {
    const navigate = useNavigate();

    const idCheck = () => {
        console.log(clientId + "");
        axios.get("http://localhost:8000/clients/id-check?clientId=" + clientId)
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    alert('사용가능한 닉네임 입니다!');
                }
            })
            .catch(res => {
                alert(res.response.data.message);
            })

    };


    const nickNameCheck = () => {
        console.log(nickname + "");
        axios.get("http://localhost:8000/clients/nickname-check?nickname=" + nickname)
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    alert('사용가능한 닉네임 입니다!');
                }
            })
            .catch(res => {
                alert(res.response.data.message);
            })

    };


    const onSubmit = (values) => {
        console.log(clientId + " " + password + " " + nickname + " " + phoneNumber + " " + birthdate + " ");
        axios.post("http://localhost:8000/auth/signup ", {
            clientId: clientId,
            password: password,
            clientName: clientName,
            nickname: nickname,
            birthdate: birthdate,
            phoneNumber: phoneNumber,
            email: email
        })
            .then((response) => {
                if (response.status >= 200 && response.status <= 204) {
                    alert('회원가입에 성공했습니다.');
                    navigate("/Main")
                }
            })
            .catch(res => {
                alert(res.response.data.message);

            })

    };

    //state 선언    ''로 공백상태로 둠 -> 각 항목 기입창에 onchange 사용해서 state 바뀌도록 함 -> value 값 변경
    const [clientId, setClientId] = useState("");
    const [password, setPassword] = useState("");
    const [clientName, setClientName] = useState("");
    const [nickname, setNickName] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");
    const [first3digit, setFirst3digit] = useState("");
    const [middle4digit, setMiddle4digit] = useState("");
    const [last4digit, setLast4digit] = useState("");
    const [email, setEmail] = useState("");

    const [disable_id, setDisable_id] = useState(true);
    const [disable_nickname, setDisable_nickname] = useState(true);

    const birthdate = year + "-" + month + "-" + date;
    const phoneNumber = first3digit + "-" + middle4digit + "-" + last4digit;

    //Handler 구현    //받아온 값 전달
    const onClientIdHandler = (event) => {
        setClientId(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onClientNameHandler = (event) => {
        setClientName(event.currentTarget.value)
    }
    const onNickNameHandler = (event) => {
        setNickName(event.currentTarget.value)
    }

    //birthdate
    const onYearHandler = (event) => {
        setYear(event.currentTarget.value)
    }
    const onMonthHandler = (event) => {
        setMonth(event.currentTarget.value)
    }
    const onDateHandler = (event) => {
        setDate(event.currentTarget.value)
    }

    //phoneNumber
    const onFirst3digitHandler = (event) => {
        setFirst3digit(event.currentTarget.value)
    }
    const onMiddle4digitHandler = (event) => {
        setMiddle4digit(event.currentTarget.value)
    }
    const onLast4digitHandler = (event) => {
        setLast4digit(event.currentTarget.value)
    }

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
    //아이디,닉네임 중복체크 버튼 2개 클릭시 회원가입 버튼 unDisable 해제
    const isSignUp = () => {
        if (disable_id === false && disable_nickname === false) {
            return false;
        } else {
            return true;
        }
    };

    //Type 숫자일때 maxLength 기능이 안 먹히므로 따로 길이 제어 함수 생성
    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            return (object.target.value = object.target.value.slice(
                0,
                object.target.maxLength
            ));
        }
    };

    //type validation 적용
    const idExp = /[^a-z0-9]/;
    const passwordExp = /(?=.*\d{1,50})(?=.*[a-z]{1,50}).{1,50}$/;
    const nameExp = /[^a-z가-힣]/;
    const nicknameExp = /[^a-zA-Z0-9가-힣]/;
    const birthdateExp = /[^0-9]/;
    const phoneExp = /[^0-9]/;
    const emailExp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    return (
        <div className="signup_container">
            <Card className="signUpCard">
                <Form
                    name="signup"
                    onFinish={onSubmit} //콜백함수 구현 , 값 받아서 Values 넣음
                    onSubmit={onSubmitHandler}
                >
                    <h1 className="signUp_Header">DDing Commerce 회원가입</h1>

                    <Link className="main_Link" to={"/login"}>
                        로그인 화면으로 돌아가기
                    </Link>

                    <Divider/>

                    <Button
                        className="idCheck_Button"
                        onClick={() => {
                            idCheck();
                            setDisable_id(false);
                        }}
                    >
                        아이디 중복 확인
                    </Button>
                    <Form.Item
                        name="clientId"
                        label="아이디"
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "아이디를 입력해주세요!",
                            },
                            {min: 5, message: "최소 5자리를 입력해주세요."},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (idExp.test(value)) {
                                        return Promise.reject(
                                            new Error("영문 소문자, 숫자만 가능합니다!")
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input value={clientId} onChange={onClientIdHandler}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="비밀번호"
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "비밀번호를 입력해주세요!",
                            },
                            {min: 6, message: "최소 6자리를 입력해주세요."},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!passwordExp.test(value)) {
                                        return Promise.reject(
                                            new Error("영문 소문자,숫자를 모두 포함해주세요")
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                        hasFeedback //입력 창 옆 체크&x 표시
                    >
                        <Input.Password value={password} onChange={onPasswordHandler}/>
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="비밀번호 확인"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "비밀번호를 입력해주세요!",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error("입력하신 비밀번호가 일치하지 않습니다.")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="clientName"
                        label="이름"
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "이름을 입력해주세요!",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (nameExp.test(value)) {
                                        return Promise.reject(
                                            new Error("영문 소문자 , 한글만 가능합니다!")
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input value={clientName} onChange={onClientNameHandler}/>
                    </Form.Item>

                    <Button
                        className="nicknameCheck_Button"
                        onClick={() => {
                            nickNameCheck();
                            setDisable_nickname(false);
                        }}
                    >
                        닉네임 중복 확인
                    </Button>
                    <Form.Item
                        name="nickname"
                        label="닉네임"
                        tooltip="빌리마켓에서 이름 대신 보여집니다. 멋진 닉네임을 지어보세요!"
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "닉네임을 입력해주세요!",
                            },
                            {min: 2, message: "최소 2자리를 입력해주세요."},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (nicknameExp.test(value)) {
                                        return Promise.reject(
                                            new Error("특수문자는 빼주세요 ^__^")
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input value={nickname} onChange={onNickNameHandler}/>
                    </Form.Item>

                    <Form.Item
                        name="birthdate"
                        label="생년월일"
                        style={{marginBottom: 0}}
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "",
                            },
                        ]}
                    >
                        <Row gutter={8}>
                            <Col span={8}>
                                <Form.Item
                                    name="year"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "년도를 입력해주세요!",
                                        },
                                        {min: 4, message: "4자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (birthdateExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        value={year}
                                        placeholder="예) 2000"
                                        maxLength="4"
                                        onInput={maxLengthCheck}
                                        onChange={onYearHandler}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="month"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "월을 입력해주세요!",
                                        },
                                        {min: 2, message: "2자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (birthdateExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        maxLength="2"
                                        onInput={maxLengthCheck}
                                        value={month}
                                        placeholder="예) 01"
                                        onChange={onMonthHandler}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="date"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "일을 입력해주세요!",
                                        },
                                        {min: 2, message: "2자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (birthdateExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        maxLength="2"
                                        onInput={maxLengthCheck}
                                        value={date}
                                        placeholder="예) 12"
                                        onChange={onDateHandler}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="전화번호"
                        style={{marginBottom: 0}}
                        rules={[
                            {
                                //입력이 안되면 메세지 뜨는 속성
                                required: true,
                                message: "",
                            },
                        ]}
                    >
                        <Row gutter={8}>
                            <Col span={8}>
                                <Form.Item
                                    name="first3digit"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "첫 3자리를 입력하세요!",
                                        },
                                        {min: 3, message: "3자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (phoneExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        maxLength="3"
                                        onInput={maxLengthCheck}
                                        value={first3digit}
                                        placeholder="예) 010"
                                        onChange={onFirst3digitHandler}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="middle4digit"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "중간 4자리를 입력하세요!",
                                        },
                                        {min: 4, message: "4자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (phoneExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        maxLength="4"
                                        onInput={maxLengthCheck}
                                        value={middle4digit}
                                        placeholder="예) 1234"
                                        onChange={onMiddle4digitHandler}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    name="last4digit"
                                    rules={[
                                        {
                                            //입력이 안되면 메세지 뜨는 속성*/}
                                            required: true,
                                            message: "마지막 4자리를 입력하세요!",
                                        },
                                        {min: 4, message: "4자리를 입력해주세요."},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {
                                                if (phoneExp.test(value)) {
                                                    return Promise.reject(
                                                        new Error("숫자만 가능합니다!")
                                                    );
                                                }
                                                return Promise.resolve();
                                            },
                                        }),
                                    ]}
                                    style={{width: 100}}
                                >
                                    <Input
                                        maxLength="4"
                                        onInput={maxLengthCheck}
                                        value={last4digit}
                                        placeholder="예) 1234"
                                        onChange={onLast4digitHandler}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="이메일"
                        rules={[
                            {
                                required: true,
                                message: "이메일을 입력해주세요!",
                            },
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value.match(emailExp)) {
                                        return Promise.reject(
                                            new Error("올바른 이메일 형식이 아닙니다!")
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    >
                        <Input value={email} onChange={onEmailHandler}/>
                    </Form.Item>

                    <Divider/>

                    <Form.Item>
                        <Tag color="error" className="comment">
                            {" "}
                            아이디와 닉네임 중복확인을 하면 회원가입 버튼이 활성화 됩니다.
                        </Tag>

                        <Button
                            type="primary"
                            onSubmit={onSubmitHandler}
                            disabled={isSignUp()}
                            className="signUp_Button"
                            htmlType="submit"
                        >
                            회원가입하기
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default SignUp;
