import {Form, Input, Button, DatePicker, Upload, Modal, Cascader} from 'antd'
import React, {useEffect, useState} from "react"
import moment from "moment";
import "./write.css";
import HeaderPage from "../header/header";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import DaumPostCode from "react-daum-postcode";
import {UploadOutlined} from "@ant-design/icons";
import {useNavigate, useLocation} from "react-router-dom";



function AmendWritePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const itemId = location.state


    const [form] = Form.useForm()

    const getItem = () => {
        axios.get("/items/"+itemId,
            {headers: {Authorization: 'Bearer ' + sessionStorage.getItem("token")}})
            .then (response => {

                const big = String(response.data.data.item.categoryBig)
                const middle = String(response.data.data.item.categoryMiddle)
                const small = String(response.data.data.item.categorySmall)
                let array = [];

                writeOptions.filter((e)=>{
                    if(e.value === big){
                        array.push(e.label)
                        e.children.filter((e)=>{
                            if(e.value === middle){
                                array.push(e.label)
                                e.children.filter((e)=>{
                                    if(e.value === small){
                                        array.push(e.label)
                                    }
                                })
                            }
                        })
                    }
                })

                form.setFieldsValue({
                    title: response.data.data.item.itemTitle,
                    content: response.data.data.item.itemContent,
                    price: response.data.data.item.price,
                    deposit: response.data.data.item.deposit,
                    cate : array,
                })

                let photos = response.data.data.item.photos;
                photos.map(photo => {
                    fetch(photo.itemPhoto)
                        .then(res => res.blob()) // Gets the response and returns it as a blob
                        .then(blob => {
                                const ext = photo.itemPhoto.split(".").pop(); // url ????????? ?????? ????????? ???
                                const filename = photo.itemPhoto.split("/").pop(); // url ????????? ?????? ????????? ???
                                const metadata = { type: "image/" + ext };
                                let data = new Object();
                                data.uid = photo.itemPhotoIndex;
                                data.status = "done";
                                data.url = photo.itemPhoto;
                                data.originFileObj = new File([blob], filename, metadata);
                                setImageList((prev) => [...prev, data])

                            }
                        );

                })

                setBig(response.data.data.item.categoryBig)
                setMiddle(response.data.data.item.categoryMiddle)
                setSmall(response.data.data.item.categorySmall)
                setTitle(response.data.data.item.itemTitle)
                setContent(response.data.data.item.itemContent)
                setPrice (response.data.data.item.price)
                setDeposit (response.data.data.item.deposit)
                setStartDate(moment(response.data.data.item.startDate))
                setEndDate(moment(response.data.data.item.endDate))
                console.log(response.data.data.item)
                setQuality(response.data.data.item.itemQuality)
                setAddress(response.data.data.item.itemAddress)
            })
    }

    //???????????? ??????
    const writeOptions = [
        {
            value: '1',
            label: '?????????????????',
            children: [
                {
                    value: '11', label: '???????????????????????',
                    children: [
                        {value: '111', label: '125cc ??????',},
                        {value: '112', label: '125cc ??????',},
                        {value: '113', label: '????????????',}
                    ],

                },
                {
                    value: '12', label: '?????????',
                    children: [
                        {value: '121', label: 'MTB????????',},
                        {value: '122', label: '??????',},
                        {value: '123', label: '?????????????????',},
                        {value: '124', label: '???????????????',},
                        {value: '125', label: '??????',}

                    ],

                },
                {
                    value: '13', label: '??????????????',
                    children: [
                        {value: '131', label: '??????',},
                        {value: '132', label: '????????????',},
                        {value: '133', label: '????????????',},
                        {value: '134', label: '????????????',},
                        {value: '135', label: '??????',}

                    ],

                },
                {
                    value: '14', label: '?????????',
                    children: [
                        {value: '141', label: '??????',},
                        {value: '142', label: '??????',},
                        {value: '143', label: '??????',},
                        {value: '144', label: '????????????',},
                        {value: '145', label: '?????????',},
                        {value: '146', label: '??????',}

                    ],

                },
                {
                    value: '15', label: '??????',
                    children: [
                        {value: '151', label: '??????',}

                    ],

                },
            ],
        },
        {
            value: '2',
            label: '??????',
            children: [
                {
                    value: '21', label: '??????',
                    children: [
                        {value: '211', label: '??????',},
                        {value: '212', label: '???????????????',},
                        {value: '213', label: '??????',},
                        {value: '214', label: '?????????',},
                        {value: '215', label: '??????',},
                        {value: '216', label: '??????',},
                    ],

                },
                {
                    value: '22', label: '??????',
                    children: [
                        {value: '221', label: '??????????????',},
                        {value: '222', label: '????????????',},
                        {value: '223', label: '??????/??????',},
                        {value: '224', label: '????????????????????',},
                        {value: '225', label: '??????',},
                        {value: '226', label: '??????/??????',},
                        {value: '227', label: '???????????IT',},
                        {value: '228', label: '??????',}
                    ],

                },
                {
                    value: '23', label: '????????????????????',
                    children: [
                        {value: '231', label: '?????????',},
                        {value: '232', label: '?????????',},
                        {value: '233', label: '??????',},
                        {value: '234', label: '???????????????',},
                        {value: '235', label: '???????????????',},
                        {value: '236', label: '???????????????',},
                        {value: '237', label: '??????',}

                    ],

                },
                {
                    value: '24', label: '??????',
                    children: [
                        {value: '241', label: '??????',}
                    ],

                },
            ],
        },
        {
            value: '3',
            label: '????????????',
            children: [
                {
                    value: '31', label: '?????????',
                    children: [
                        {value: '311', label: '????????????????????????????????',},
                        {value: '312', label: 'DSLR??????????????',},
                        {value: '313', label: '??????/??????',},
                        {value: '314', label: '????????????????????????????',},
                        {value: '315', label: '??????',}
                    ],

                },
                {
                    value: '32', label: 'PC',
                    children: [
                        {value: '321', label: '????????????',},
                        {value: '322', label: '?????????',},
                        {value: '323', label: '??????',}
                    ],

                },
            ],
        },
        {
            value: '4',
            label: '??????',
            children: [
                {
                    value: '41', label: '?????????',
                    children: [
                        {value: '411', label: '?????????',},
                        {value: '412', label: '?????????????????????',},
                        {value: '413', label: 'X box',}
                    ],

                },
                {
                    value: '42', label: '????????????',
                    children: [
                        {value: '421', label: '?????????',},
                        {value: '422', label: '??????????????',},
                        {value: '423', label: '??????????????????',},
                        {value: '424', label: '??????',},
                        {value: '425', label: '??????',}
                    ],

                },
            ],
        }




    ];
    const [big, setBig] = useState();
    const [middle, setMiddle] = useState();
    const [small, setSmall] = useState();

    //??????, ??????
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    //?????????, ?????????
    const [price, setPrice] = useState();
    const [deposit, setDeposit] = useState();

    //????????????
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());

    //?????? ??????, ?????????
    const [quality, setQuality] = useState();
    const [imageList, setImageList] = useState([]);

    //??????
    const [address, setAddress] = useState();

    //????????? ?????? ??????
    const [isModalVisible, setIsModalVisible] = useState(false);

    // <- input ????????? text ?????? ??????
    const setTitleChange = (e) => { setTitle(e.target.value); };
    const setContentChange = (e) => { setContent(e.target.value); };
    const setPriceChange = (e) => { setPrice(e.target.value); };
    const setDepositChange = (e) => { setDeposit(e.target.value); };
    const itemQualityHandleChange = (e) => { setQuality(e.target.value) };
    const setCategoryChange = (value) => {
        setBig(value[0])
        setMiddle(value[1])
        setSmall(value[2])
    }

    //?????? ?????? ??????
    const onPictureChange = ({ fileList: newFileList }) => { setImageList(newFileList); console.log(imageList)};

    //daum ???????????? API??? ???????????? ?????? ????????????
    const getAddress = (data) => {

        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            setAddress(fullAddress)
            console.log(data)
        }
    }

    //????????? ????????????, ??????
    const showModal = () => { setIsModalVisible(true) };
    const modalClose = () =>{ setIsModalVisible(false) };

    //?????? ????????????
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    //?????? ?????? 1??? ??????
    const pictureAlert = () =>{
        if (imageList.length === 0){
            alert("????????? ?????? ????????? ????????? ??????????????????!")

        }
    }

    //startDate ?????? ????????? ??????
    const disabledDate = (startDate) =>{
        return startDate && startDate < moment().startOf('day');
    }

    //endDate??? startDate?????? ????????? ??????
    const disabledEndDate = (endDate) =>{
        return endDate && endDate < startDate;
    }

    //data onSubmit
    const onSubmit = () => {

        const data = {
            categoryBig : big,
            categoryMiddle : middle,
            categorySmall : small,
            itemTitle : title,
            itemContent : content,
            itemQuality : quality,
            contractStatus : 1,
            startDate : startDate.format("YYYY-MM-DD"),
            endDate : endDate.format("YYYY-MM-DD"),
            price : price,
            deposit : deposit,
            itemAddress : address

        }

        const formData = new FormData();
        formData.append('item', new Blob([ JSON.stringify(data) ], {type : "application/json"}));
        imageList.forEach(image => formData.append("itemPhoto", image.originFileObj))

        const option = {
            url : "/items/"+itemId,
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem("token"),
                'Content-Type': 'multipart/form-data'
            },
            data: formData

        }

        axios(option)
            .then(res=>{
                console.log(res.data);
                navigate(-1);
            }).catch(res=>{
            alert(res.response.data.message);
        });
    };

    //data ?????? ????????? ?????? ?????????
    const onSubmitFailed = (errorInfo) => {  //exception ?????? ??? ?????? ?????? ????????????
        console.log("?????? ????????? ??????????????????",errorInfo);  //????????? ???????????? ???
    };

    useEffect(() => {
        getItem()

    },[itemId])
    useEffect(() => {
        console.log(imageList)

    },[imageList])


    return (
        <div className="write">
            <header><HeaderPage/></header>

            <Form className="write_container"
                  form={form}
                  onFinish={onSubmit}
                  onFinishFailed={onSubmitFailed}>

                <h1 className="h1"> ?????? ?????? ??????</h1>

                <div className="write_wrap">
                    <span>??????</span>

                    <Form.Item
                        className="title"
                        name = "title"
                        rules={[{required: true, message: '????????? ??????????????????!'}]}>

                        <Input
                            placeholder="????????? ??????????????????"
                            onChange={setTitleChange}
                        />
                    </Form.Item>
                </div>

                <div className="write_wrap">
                    <span>?????? ??????</span>

                    <Form.Item
                        className="content"
                        name = "content"
                        rules={[{required: true, message: '?????? ????????? ??????????????????!'}]}>

                        <Input.TextArea
                            rows={5}
                            placeholder="?????? ????????? ??????????????????"
                            size="large"
                            showCount
                            maxLength={200}
                            onChange = {setContentChange}
                        />
                    </Form.Item>
                </div>

                <div className="write_wrap">
                    <span>?????????</span>

                    <Form.Item className="write_money"
                               name = "price"
                               rules={[{required: true, message: '???????????? ??????????????????!'}]}>

                        <Input
                            type="number" placeholder="???????????? ??????????????????"
                            onChange = {setPriceChange}
                        />
                    </Form.Item>
                </div>

                <div className="write_wrap">
                    <span>?????????</span>

                    <Form.Item className="write_money"
                               name = "deposit"
                               rules={[{required: true, message: '???????????? ??????????????????!'}]}>

                        <Input type="number" placeholder="???????????? ??????????????????"
                               onChange = {setDepositChange}
                        />
                    </Form.Item>
                </div>

                <div className="write_wrap">

                    <span>????????????</span>

                    <Form.Item name="cate">
                        <Cascader
                            style={{ width: '420px'}}
                            options={writeOptions}
                            expandTrigger="hover"
                            placeholder="????????????"
                            onChange={setCategoryChange}
                        />
                    </Form.Item>
                </div>


                <div className="write_wrap">
                    <span>??????</span>

                    <Form.Item
                        className = "itemPhoto"
                        name="itemPhoto"
                    >
                        <ImgCrop rotate>

                            <Upload
                                listType="picture"
                                fileList={imageList}
                                onPreview={onPreview}
                                onChange={onPictureChange}
                                beforeUpload={() => false}
                            >

                                <Button icon={<UploadOutlined />}>Upload</Button>

                            </Upload>
                        </ImgCrop>
                    </Form.Item>
                </div>

                <div className="write_wrap">
                    <span>?????? ??????</span>

                    <Form.Item name = "address">

                        <Button type="primary" onClick={showModal}>
                            ?????? ??????
                        </Button>

                        <Modal title="?????? ?????? ??????"
                               visible={isModalVisible}
                               onOk={modalClose}
                               onCancel={modalClose}
                        >
                            <DaumPostCode
                                onComplete={getAddress}
                                autoClose={false}
                            />
                            {address}
                        </Modal>
                        <br/>
                        {address}

                    </Form.Item>
                </div>

                <div className="write_wrap">

                    <span>?????? ??????</span>
                    <Form.Item name="date">
                        <span>?????????</span>
                        <br/>
                        <DatePicker
                            value={startDate}
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            disabledDate={disabledDate}
                        />

                        <br/>
                        <span>?????????</span>
                        <br/>
                        <DatePicker
                            value={endDate}
                            onChange={date => setEndDate(date)}
                            selected={endDate}
                            disabledDate={disabledEndDate}
                        />
                    </Form.Item>

                </div>

                <div className="write_wrap">
                    <span>??????</span>

                    <Form.Item
                        name="quality"
                        initialValue={quality}
                    >

                        <label>???</label>
                        <Input
                            type="radio"
                            value="HIGH"
                            checked={quality === "HIGH"}
                            onChange={itemQualityHandleChange}
                        />

                        <br/>
                        <label>???</label>
                        <Input
                            type="radio"
                            value="MIDDLE"
                            checked={quality === "MIDDLE"}
                            onChange={itemQualityHandleChange}
                        />

                        <br/>
                        <label>???</label>
                        <Input
                            type="radio"
                            value="LOW"
                            checked={quality === "LOW"}
                            onChange={itemQualityHandleChange}
                        />

                    </Form.Item>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="button" onClick={pictureAlert} > ???????????? </Button>
                </Form.Item>

            </Form>

        </div>
    )


}

export default AmendWritePage;