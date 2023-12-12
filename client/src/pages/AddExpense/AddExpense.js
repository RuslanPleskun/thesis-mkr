import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css';
import Loading from '../../components/Loading/Loading';
import { Error, Success } from '../../components/Messages/messages';
import { Checkbox, Col, DatePicker, Input, InputNumber, Radio, Row, Select, TimePicker } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { categoriesArray } from '../../categories';
import TagSelect from './TagsSelect';
import { CaretDownOutlined } from '@ant-design/icons';


const AddExpense = () => {
    const [loading, setLoading] = useState(false);
    const [another, setAnother] = useState(false);
    const [expenseData, setExpenseData] = useState({
        account: "cash",
        amount: "",
        currency: "uah",
        category: "",
        labels: [],
        date: "",
        time: "",
        payer: "",
        note: "",
        paymentType: "cash",
        paymentStatus: "cleared",
        type: "expense"
    });

    const handleChange = (name, value) => {
        setExpenseData({
            ...expenseData,
            [name]: value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/expense/create`, expenseData, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                Success(res.data.successMessage);
                if (another) {
                    document.location.reload();
                }
            }
            else {
                Error(res.data.errorMessage);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
            Error(err.message)
        })
    };


    return (
        <div className='AddExpense'>
            {
                loading ?
                    <Loading />
                    :
                    <form onSubmit={submitHandler}>
                        <Row gutter={[16, 16]}>
                            <Col xs={24} md={12} className="leftContainer">
                                <div className='leftContainerTop'>
                                    <div className='topRadio'>
                                        <Radio.Group value={expenseData.type} buttonStyle="solid" onChange={(e) => handleChange("type", e.target.value)}>
                                            <Radio.Button value="expense">Expense</Radio.Button>
                                            <Radio.Button value="income">Income</Radio.Button>
                                        </Radio.Group>
                                    </div>
                                    <div className='item'>
                                        <label>Account</label>
                                        <div className="input-group">
                                            <Select suffixIcon={<CaretDownOutlined />}
                                                value={expenseData.account}
                                                className='w-100'
                                                onChange={(val) => handleChange("account", val)}
                                                options={[
                                                    {
                                                        value: 'cash',
                                                        label: 'Cash',
                                                    },
                                                    {
                                                        value: 'bankTransfer',
                                                        label: 'Bank Transfer',
                                                    }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className='item'>
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} md={12}>
                                                <label>Amount</label>
                                                <InputNumber className='w-100' onChange={(val) => handleChange("amount", val)} min={1} value={expenseData.amount} />
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <label>Currency</label>
                                                <Select
                                                    suffixIcon={<CaretDownOutlined />}
                                                    className='w-100'
                                                    value={expenseData.currency}
                                                    onChange={(val) => handleChange("currency", val)}
                                                    options={[
                                                        {
                                                            value: 'usd',
                                                            label: 'USD',
                                                        },
                                                        {
                                                            value: 'uah',
                                                            label: 'UAH',
                                                        },
                                                        {
                                                            value: 'JPY',
                                                            label: 'JPY',
                                                        },
                                                        {
                                                            value: 'AUD',
                                                            label: 'AUD',
                                                        },
                                                        {
                                                            value: 'CAD',
                                                            label: 'CAD',
                                                        },
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div className='leftContainerBottom'>
                                    <div className='item'>
                                        <Row gutter={[16, 0]}>
                                            <Col xs={24} md={12}>
                                                <div className='item'>
                                                    <label>Category</label>
                                                    <Select
                                                        suffixIcon={<CaretDownOutlined />}
                                                        // value={expenseData.category}
                                                        className='w-100'
                                                        placeholder="Choose"
                                                        onChange={(val) => handleChange("category", val)}
                                                        options={categoriesArray}
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <div className='item tags'>
                                                    <label>Labels</label>
                                                    <TagSelect updateLabel={(val) => handleChange("labels", val)} />
                                                </div>
                                            </Col>
                                            <Col xs={24} md={24}>
                                                <div className='item'>
                                                    <label>Date</label>
                                                    <DatePicker className='w-100' format="DD MMM, YYYY" onChange={(val, valb) => handleChange("date", valb)} />
                                                </div>
                                            </Col>
                                            <Col xs={24} md={24}>
                                                <div className=''>
                                                    <label>Time</label>
                                                    <TimePicker className='w-100' showNow={false} format="hh:mm" onChange={(val, valb) => handleChange("time", valb)} showSecond={false} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={12}>
                                <div className="rightContainer">
                                    <div className='item'>
                                        <label>Payer</label>
                                        <Input onChange={(e) => handleChange("payer", e.target.value)} />
                                    </div>
                                    <div className='item'>
                                        <label>Note</label>
                                        <TextArea onChange={(e) => handleChange("note", e.target.value)} />
                                    </div>
                                    <div className='item'>
                                        <label>Payment Type</label>
                                        <Select suffixIcon={<CaretDownOutlined />}
                                            className='w-100'
                                            value={expenseData.paymentType}
                                            onChange={(val) => handleChange("paymentType", val)}
                                            options={[
                                                {
                                                    value: 'cash',
                                                    label: 'Cash',
                                                },
                                                {
                                                    value: 'bank transfer',
                                                    label: 'Bank transfer',
                                                }
                                            ]}
                                        />
                                    </div>
                                    <div className='item'>
                                        <label>Payment Status</label>
                                        <Select suffixIcon={<CaretDownOutlined />}
                                            className='w-100'
                                            value={expenseData.paymentStatus}
                                            onChange={(val) => handleChange("paymentStatus", val)}
                                            options={[
                                                {
                                                    value: 'cleared',
                                                    label: 'Cleared',
                                                },
                                                {
                                                    value: 'pending',
                                                    label: 'Pending',
                                                }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24}>
                                <Col xs={24} md={24} className="btnContainer">
                                    <div>
                                        <Checkbox onChange={(e) => setAnother(e.target.checked)}>Create another record</Checkbox>
                                        <button className='submit'>Add Record</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </form>
            }
        </div>
    )
}

export default AddExpense
