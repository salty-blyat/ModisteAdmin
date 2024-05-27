"use client"
import CustomerTable from '../components/CustomerTable'
import Navbar from '../components/Navbar'

const Customer = () => {
    return (
        <div>
            <Navbar />
            <div className="ml-60">
                <CustomerTable />
            </div>
        </div>
    )
}

export default Customer