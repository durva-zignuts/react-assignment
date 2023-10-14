import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

const SingleProduct = () => {
  const param = useParams()
  let id = param.id
  const [productDetail, setProductDetails] = useState({})

  const loadData = async () => {
    const result = await axios(`https://dummyjson.com/products/${id}`)
    setProductDetails(result.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      Single Product {param.id}
      <div>
        <Navbar />

        <div>{productDetail.title}</div>
      </div>
    </div>
  )
}

export default SingleProduct
