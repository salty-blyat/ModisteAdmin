"use client"
import CustomerTable from '../components/CustomerTable'
import Navbar from '../components/Navbar'

const Customer = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-4 md:mt-5">
                <div className="mt-24 md:mt-0 md:ml-44">
                    <CustomerTable />
                </div>
            </div>
        </div>
    )
}

export default Customer