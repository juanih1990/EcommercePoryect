import { ProductoService } from '../services/index.js'

export const addProduct = async (req, res) => {
    const { title, description, price, stock, category, code, thumbnail } = req.body
    try {
        //busco si el producto existe
        const isMatchProduct = await ProductoService.getProductOne({ code })
        if (isMatchProduct) return res.status(400).json({ message: "El producto ya esta en existencia." })

        const newProdut = {
            title,
            description,
            price,
            stock,
            category,
            code,
            thumbnail
        }

        const result = await ProductoService.productCreate(newProdut)

        return res.json({
            title,
            description,
            price,
            stock,
            category,
            code,
            thumbnail
        })

    } catch (error) {
        console.log(error)
    }
}
export const getProduct = async (req, res) => {
    try {
        const { limit, page } = req.params
        const lm = limit && parseInt(limit, 10) || 4
        const pg = page && parseInt(page, 10) || 1

        const products = await ProductoService.getProduct({ lm, pg })
        if (!products) return res.status(400).json({ message: " no hay productos en existencia" })

        return res.status(200).json(products)
    } catch (error) {
        console.error("Error al obtener productos:", error)
        return res.status(500).json({ error: "Error al obtener productos" })
    }

}
export const getProductByid = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductoService.getProductById(id)
        if (!product) return res.status(400).json({ message: "El producto solicitado no esta en stock" })
        return res.status(200).json(product)
    } catch (error) {
        console.log("Error al realizar la busqueda" + error)
        return res.status(500).json({ message: "Server error" })
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const deleteProduct = await ProductoService.prductoDelete(id)
        return res.status(200).json({ message: "Producto borrado con exito" })
    } catch (error) {
        console.log("Error al borrar el servidor " + error)
        return res.status(500).json({ message: "Server error" })
    }
}
export const getOneProduct = async (req, res) => {
    try {
        const code = req.body
        const product = await ProductoService.getProductOne( code )
        if (!product) return res.status(400).json({ message: "El producto solicitado no se encuentra en stock" })

        return res.status(200).json(product)
    } catch (error) {
        console.log("Error al realizar la busqueda" + error)
        return res.status(500).json({ message: "Server error" })
    }
}
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updateParams = req.body
        const product = await ProductoService.productoUpdate(id,updateParams)

        if (!product) return res.status(400).json({ message: "El producto a actualizar no esta en stock" })
        return res.status(200).json(product)
    } catch (error) {
        console.log("Error de servidor: " + error)
        return res.status(500).json({ message: "Server error" })
    }
}