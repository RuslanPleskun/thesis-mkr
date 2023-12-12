import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { Error, Success } from '../../components/Messages/messages';
import { DeleteFilled } from '@ant-design/icons';
import "./Records.css"

const Records = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const getExpenses = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
                setData(res.data);
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

    const deleteItem = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/expense/delete/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(async (res) => {
            if (res.status === 200) {
                Success(res.data?.successMessage);
                getExpenses();
            }
            else {
                Error(res.data.errorMessage);
            }
        }).catch(err => {
            console.log(err);
            Error(err.message)
        })
    };

    useEffect(() => {
        getExpenses();

        return () => {

        }
    }, []);

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            sorter: (a, b) => a?.category.localeCompare(b?.category)
        },
        {
            title: 'Account',
            dataIndex: 'account',
        },
        {
            title: 'Labels',
            dataIndex: 'labels',
            render: (a, b) => (
                b?.labels?.map(t => {
                    return (
                        <Tag title={t.label} color={t?.color} className="mb-2 sm:mb-0">{t.label}</Tag>
                    )
                })
            )
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            sorter: (a, b) => a?.amount - b?.amount,
            render: (a, b) => (
                <div className={`${b?.type === "expense" ? "text-danger" : "text-success"} text-uppercase`}>{b?.currency} {b?.amount}</div>
            )
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            render: (a, b) => (
                <div>{moment(b?.createdAt).format("DD/MM/YYYY HH:mm:ss")}</div>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (a, b) => (
                <button className='border-0 bg-transparent text-danger' onClick={() => deleteItem(b?._id)}><DeleteFilled /></button>
            )
        },
    ];


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div className='p-4 Records'>
            <Table
                rowSelection={{
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};
export default Records;