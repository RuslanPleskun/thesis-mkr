import { MoneyCollectOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Divider, Progress } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DemoPie from '../../Chart2';
import { isAuthenticated } from '../../components/Auth/auth';
import Loading from '../../components/Loading/Loading';
import { Error } from '../../components/Messages/messages';
import "./Home.css"

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getExpenses = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/expense`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(async (res) => {
      console.log(res)
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

  useEffect(() => {
    getExpenses();

    return () => {

    }
  }, []);

  let income = data?.filter(f => f.type === "income").reduce((a, b) => a + parseInt(b?.amount), 0);
  let expense = data?.filter(f => f.type === "expense").reduce((a, b) => a + parseInt(b?.amount), 0);

  return (
    loading ?
      <Loading />
      :
      <div className='Home'>
        <div>
          <header>
            <div className='my-4 d-flex justify-content-between align-items-center'>
              <h4>Hi, {isAuthenticated()?.fullName}</h4>
              <div>
                <Link to="/profile">
                  <img src={isAuthenticated()?.picture?.url} alt="User" />
                </Link>
              </div>
            </div>
            <div>
              <div className='balance'>
                <h4>Your Balance</h4>
                <h4>UAH {data?.filter(f => f.type === "income").reduce((a, b) => a + parseInt(b?.amount), 0)}</h4>
                <Link to="/add-record">
                  <PlusCircleFilled />
                </Link>
              </div>
              <div className='budgetCont'>
                <div>
                  <div className='cash'>
                    <p>Cash</p>
                    <h5>UAH {data?.filter(f => f.type === "income" && f.account === "cash").reduce((a, b) => a + parseInt(b?.amount), 0)}</h5>
                  </div>
                  <Divider type="vertical" style={{ fontSize: "41px" }} />
                  <div className='bank'>
                    <p>Mono Bank</p>
                    <h5>UAH {data?.filter(f => f.type === "income" && f.account === "bankTransfer").reduce((a, b) => a + parseInt(b?.amount), 0)}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className='budgetChartCont'>
              <div className='iconCont'>
                <button>
                  <MoneyCollectOutlined />
                </button>
              </div>
              <div className='cash'>
                <h5>Monthly Budget</h5>
                <h6>UAH {income}</h6>
                <div className='bank'>
                  <Progress showInfo={false} strokeColor="#2ea673" labels={false} percent={expense / income * 100} />
                  <div>
                    <snall>Spent: UAH {expense}</snall>
                    <snall>Left: UAH {income - expense}</snall>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* <ExpenseChart data={data?.filter(f => f.type === "expense")} /> */}
          <div className='mt-5'>
            <DemoPie data={data?.filter(f => f.type === "expense")} />
          </div>
        </div>
      </div>
  )
}

export default Home
