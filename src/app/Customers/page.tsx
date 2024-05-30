"use client"
import CustomerTable from '../components/CustomerTable'
import Footer from '../components/Footer/footer'
import Navbar from '../components/Navbar'

const Customer = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-4 md:mt-5">
                <div className="mt-24 md:mt-0 md:ml-44">
                    <CustomerTable />
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default Customer