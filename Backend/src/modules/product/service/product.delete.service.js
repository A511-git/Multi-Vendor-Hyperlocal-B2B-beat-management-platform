import { ApiError } from "../../../utils/apiError.js"
import { redisDeleteKey } from "../../../utils/redisHelper.js"
import { Product } from "../../index.model.js"
import { SKU } from "../../../utils/zodHelper.js"
import z from "zod"
export const serviceDeleteProduct = async (sku, vendor) => {
    if (!SKU().safeParse(sku).success)
        throw new ApiError(400, "Invalid SKU", "SKU must be a valid")
    const product = await Product.findOne({ where: { sku, vendorId: vendor.vendorId } })
    if (!product)
        throw new ApiError(404, "Product not found")
    await product.destroy()
    await redisDeleteKey(`product:${vendor.pincode}:${product.name}`)
    return product
}

export const serviceDeleteProducts = async (skus, vendor) => {
    if (!Array.isArray(skus))
        throw new ApiError(400, "Invalid skus", "skus must be an array")
    const check = z.array(SKU()).safeParse(skus)
    if (!check.success)
        throw new ApiError(400, "Invalid skus", "skus must be an array of valid skus")

    const products = await Product.findAll({ where: { sku: skus, vendorId: vendor.vendorId } })
    if (products.length === 0)
        throw new ApiError(404, "Products not found")
    await Product.destroy({ where: { sku: skus, vendorId: vendor.vendorId } });
    await Promise.all(products.forEach(async(product) => await redisDeleteKey(`product:${vendor.pincode}:${product.name}`)))
    return products
}