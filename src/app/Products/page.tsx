"use client"
import Navbar from '../components/Navbar'
import ProductTable from '../components/ProductTable'

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="ml-60">
                <ProductTable />
            </div>
        </div>
    )
}

export default Admin