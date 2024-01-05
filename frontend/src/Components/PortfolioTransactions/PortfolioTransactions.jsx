import React from 'react'
import './PortfolioTransactions.css'

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { dateFormatter } from '../../utilityFunctions/dateFormatter';
import { Typography } from '@mui/material';

const PortfolioTransactions = () => {

  const {id} = useParams()
  const {transactions} = useSelector(state => state.stockTransactions)

  const portfolioTransactions = transactions.filter(transaction => transaction.portfolio_id == id)

  return (
    <TableContainer component={Paper} className='portfolio-transactions-section'>
        <Table sx={{width: "100%"}}>
            <TableHead>
            <TableRow>
                <TableCell align="center">Ticker</TableCell>
                <TableCell align="center">Company Name</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Shares</TableCell>
                <TableCell align="center">Price per Share</TableCell>
                <TableCell align="center">Total Amount</TableCell>
            </TableRow>
            </TableHead>
            {portfolioTransactions.length > 0
            ?
                <TableBody>
                    {portfolioTransactions.map(transaction => (
                        <TableRow key={transaction.id}>
                            <TableCell align="center">{transaction.company_ticker}</TableCell>
                            <TableCell align="center">{transaction.company_name}</TableCell>
                            <TableCell align="center">{transaction.type}</TableCell>
                            <TableCell align="center">{dateFormatter(transaction.transaction_date, "ddmmyy")}</TableCell>
                            <TableCell align="center">{transaction.quantity}</TableCell>
                            <TableCell align="center">{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(transaction.price_per_share)}</TableCell>
                            <TableCell align="center">{Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(transaction.total_amount)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            :
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={7} align="center" sx={{borderBottom: 0}}>
                            <Typography variant='body1' component="p">No previous transactions</Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            }
        </Table>
    </TableContainer>
  )
}

export default PortfolioTransactions