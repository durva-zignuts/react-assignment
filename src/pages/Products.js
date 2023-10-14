// import { Link } from "react-router-dom"
// import Navbar from "../components/Navbar"
// import { useEffect, useState } from "react"

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [httpError, setHttpError] = useState()

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const response = await fetch("https://dummyjson.com/products")

//       if (!response.ok) {
//         throw new Error("Something went wrong!")
//       }

//       const responseData = await response.json()
//       let data = responseData.products
//       console.log(data)

//       setProducts(data)
//       setIsLoading(false)
//     }

//     fetchProducts().catch((error) => {
//       setIsLoading(false)
//       setHttpError(error.message)
//     })
//   }, [])

//   if (isLoading) {
//     return (
//       <section>
//         <p>Loading...</p>
//       </section>
//     )
//   }

//   if (httpError) {
//     return (
//       <section>
//         <p>{httpError}</p>
//       </section>
//     )
//   }

//   return (
//     <div>
//       <Navbar />
//       Products Page:
//       <div>
//         <ul>
//           {products.map((product) => (
//             <Link to={`${product.id}`}>
//               <li key={product.id}>{product.title}</li>
//             </Link>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Products

import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"

const Products = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8
  const [isLoading, setIsLoading] = useState(false)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products")

      if (!response.ok) {
        throw new Error("Something went wrong!")
      }

      const responseData = await response.json()
      let data = responseData.products

      setProducts(data)
      setIsLoading(false)
    }

    fetchProducts().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <div>
      <Navbar />
      <h2>Products Page:</h2>
      <div>
        <ul>
          {currentProducts.map((product) => (
            <Link to={`${product.id}`} key={product.id}>
              <li>{product.title}</li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Products
