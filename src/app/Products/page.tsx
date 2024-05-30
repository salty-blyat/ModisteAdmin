"use client"
import Navbar from '../components/Navbar'
import ProductTable from '../components/ProductTable'

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="mx-4 md:mt-5">
                <div className="mt-24 md:mt-0 md:ml-44">
                    <ProductTable />
                </div>
            </div>
        </div>
    )
}

export default Admin