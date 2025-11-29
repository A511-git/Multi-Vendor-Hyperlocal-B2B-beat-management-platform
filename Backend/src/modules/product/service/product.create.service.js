import { createProductSchema } from "../schema/index.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import { Product } from "../../index.model.js"


export const serviceCreateProduct = async (data, vendor) => {

    const parsed = createProductSchema.safeParse(data)
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }

    const { name, description, price, discount, stock, status } = parsed.data;

    const product = await Product.create({ vendorId: vendor.userId, name, description, price, discount, stock, rating, status }, { raw: true })
    if (!product)
        throw new ApiError(500, "Product creation failed")
    redisSetKey(`product:${vendor.pincode}:${product.name}`, JSON.stringify(product), 60 * 60 * 2)
    return product
}

export const serviceBulkCreateProducts = async (data, vendor) => {
    if (!Array.isArray(data))
        throw new ApiError(400, "Invalid data", "Data must be an array")

    const parsed = data.map(product => createProductSchema.safeParse({ ...product, vendorId: vendor.userId }))
    const validated = parsed.filter(product => product.success)
    const failedValidation = parsed.filter(product => !product.success)
    let errorMessage;

    if (failedValidation.length !== 0)
        errorMessage = failedValidation.map(product => product.error.issues.map(issue => issue.message))

    if (validated.length === 0)
        throw new ApiError(400, "Invalid data", errorMessage)

    const products = await Product.bulkCreate(validated.map(product => product.data), { raw: true })
    if (products.length === 0)
        throw new ApiError(500, "Product creation failed")


    for (const product of createdProducts) {
        redisSetKey(
            `product:${vendor.pincode}:${product.name}`,
            JSON.stringify(product),
            60 * 60 * 2
        );
    }



    return {
        total: data.length,
        created: products.length,
        failed: failedValidation.length,
        errorMessage,
        products,
    }


}