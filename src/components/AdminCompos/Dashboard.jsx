import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Bell, Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import './Dash.css'
import axios from 'axios'
import { TrustContext } from '../../context/TrustProvider'
import AdminNavbar from './AdminNavbar'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Access the base URL from .env
const Dashboard = () => {
  const { getTotalTrust, getTotalUser, getTotalTransactions } = useContext(TrustContext)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [totalTrust, setTotalTrust] = useState(null)
  const [totalUser, setTotalUser] = useState(null)
  const [totalTransactions, setTotalTransactions] = useState(null)
  const [transactionHistory, setTransactionHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // const handleLogout = async () => {
  //   try {
  //     const { data } = await axios.post(`${API_BASE_URL}/admin/adminlogout`, {}, { withCredentials: true })
  //     if (data.success) {
  //       navigate('/')
  //     } else {
  //       alert("admin is not logged in")
  //     }
  //   } catch (err) {
  //     if (err.response) {
  //       console.log(err.response.data.message)
  //     }
  //   }
  // }

  const fetchTransactionHistory = async (page) => {
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/transactions?page=${page}&limit=10`, { withCredentials: true })
      setTransactionHistory(response.data.data)   
       getTotalTransactions().then(res=>{setTotalPages (Math.ceil(res/10))})
    } catch (error) {
      console.error('Error fetching transaction history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTotalTrust().then(res => {
      setTotalTrust(res)
    })

    getTotalTransactions().then(res => {
      setTotalTransactions(res)
    })

    getTotalUser().then(res => {
      setTotalUser(res)
    })

    fetchTransactionHistory(currentPage)
  }, [currentPage])

  const data = [
    { name: 'Total Trust', value: totalTrust },
    { name: 'Users', value: totalUser },
    { name: 'Transactions', value: totalTransactions },
  ]

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <div className="dashboard">
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="main-content">
        <header className="header">
          <button className="icon-button mobile-only" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1>Welcome, Admin</h1>
          <div className="header-actions">
            <input type="search" placeholder="Search..." className="search-input" />
            <button className="icon-button">
              <Bell />
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="card-grid">
            <div className="card">
              <div className="card-header">
                <h3>Total Trust</h3>
              </div>
              <div className="card-content">
                <div className="card-value">{totalTrust}</div>
                <p className="card-subtext">updated last month</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Users</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalUser}</div>
                <p className="card-subtext">Updated 2 minutes ago</p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Transaction</h3>
                <svg viewBox="0 0 24 24" className="card-icon">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </div>
              <div className="card-content">
                <div className="card-value">{totalTransactions}</div>
                <p className="card-subtext">Updated 2 minutes ago</p>
              </div>
            </div>
          </div>
          <div className="chart-activities-grid">
            <div className="card">
              <div className="card-header">
                <h3>Overview</h3>
              </div>
              <div className="card-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3>Transaction History</h3>
              </div>
              <div className="card-content">
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <ul className="activity-list">
                      {transactionHistory.map((transaction) => (
                        <li key={transaction._id} className="activity-item">
                          <span className={`activity-indicator ${getStatusColor(transaction.status)}`}></span>
                          <span className="activity-text">{transaction.senderName} to {transaction.acceptedTrustName} </span>
                          <span className="activity-time">{formatDate(transaction.createdAt)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="pagination-button"
                      >
                        <ChevronLeft />
                      </button>
                      <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="pagination-button"
                      >
                        <ChevronRight />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'green'
    case 'pending':
    case 'processing':
      return 'yellow'
    case 'failed':
    case 'error':
      return 'red'
    default:
      return 'blue'
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default Dashboard

