import { updateProductSchema } from "../schema/index.js"
import { ApiError } from "../../../utils/apiError.js"
import { redisSetKey } from "../../../utils/redisHelper.js"
import { Product } from "../../index.model.js"
import { SKU } from "../../../utils/zodHelper.js"
import { z } from "zod"


export const serviceUpdateProduct = async (data, sku, vendor) => {
    const parsed = updateProductSchema.safeParse(data)
    if (!parsed.success) {
        const errors = parsed.error.issues.map(issue => issue.message)
        throw new ApiError(400, "Invalid data", errors)
    }
    if (!SKU().safeParse(sku).success)
        throw new ApiError(400, "Invalid SKU", "SKU must be a valid")

    const { name, description, price, discount, stock, status } = parsed.data;

    const product = await Product.findOne({ where: { sku, vendorId: vendor.vendorId } })
    if (!product)
        throw new ApiError(404, "Product not found")

    if (name !== undefined) product.name = name
    if (description !== undefined) product.description = description
    if (price !== undefined) product.price = price
    if (discount !== undefined) product.discount = discount
    if (stock !== undefined) product.stock = stock
    if (status !== undefined) product.status = status
    await product.save()

    const response = product.get({ plain: true });
    await redisSetKey(`product:${vendor.pincode}:${response.name}`, JSON.stringify(response), 60 * 60 * 2)
    return response
}

export const serviceToggleProducts = async (skus, vendor) => {
    if (!Array.isArray(skus))
        throw new ApiError(400, "Invalid skus", "skus must be an array")
    const check = z.array(SKU()).safeParse(skus)
    if (!check.success)
        throw new ApiError(400, "Invalid skus", "skus must be an array of valid skus")

    const products = await Product.findAll({ where: { sku: skus, vendorId: vendor.vendorId } })
    if (products.length === 0)
        throw new ApiError(404, "Products not found")
    await Promise.all(products.map(async (product) => {
        if (product.status === "active")
            product.status = "inactive"
        else
            product.status = "active"
        await product.save()
    }))

    const response = await Promise.all(products.map(async (product) => {
        const productData = product.get({ plain: true });
        await redisSetKey(`product:${vendor.pincode}:${productData.name}`, JSON.stringify(productData), 60 * 60 * 2)
        return productData
    }))
    return response
}

export const serviceUpdateProductStocks = async (data, vendor) => {
    if (!Array.isArray(data))
        throw new ApiError(400, "Invalid data", "Data must be an array")

    const parsed = z.array(updateProductSchema).safeParse(data)
    if (!parsed.success)
        throw new ApiError(400, "Invalid data", "Data must be an array of valid objects containing sku and stock")

    const productMap = new Map()
    data.forEach(product => productMap.set(product.sku, product.stock))

    const skus = data.map(product => product.sku)

    const products = await Product.findAll({ where: { sku: skus, vendorId: vendor.vendorId } })
    if (products.length !== skus.length)
        throw new ApiError(404, "Products not found")

    await Promise.all(products.map(async (product) => {
        product.stock = productMap.get(product.sku)
        await product.save()
    }))

    const response = await Promise.all(products.map(async (product) => {
        const productData = product.get({ plain: true });
        await redisSetKey(`product:${vendor.pincode}:${productData.name}`, JSON.stringify(productData), 60 * 60 * 2);
        return productData;
    }));
    return response
}

export const serviceUpdateProductPrices = async (data, vendor) => {
    if (!Array.isArray(data))
        throw new ApiError(400, "Invalid data", "Data must be an array")

    const parsed = z.array(updateProductSchema).safeParse(data)
    if (!parsed.success)
        throw new ApiError(400, "Invalid data", "Data must be an array of valid objects containing sku and price")

    const productMap = new Map()
    data.forEach(product => productMap.set(product.sku, product.price))

    const skus = data.map(product => product.sku)

    const products = await Product.findAll({ where: { sku: skus, vendorId: vendor.vendorId } })

    await Promise.all(products.map(async (product) => {
        product.price = productMap.get(product.sku)
        return await product.save();
    }));


    const response = await Promise.all(products.map(async product => {
        const productData = product.get({ plain: true });
        await redisSetKey(`product:${vendor.pincode}:${productData.name}`, JSON.stringify(productData), 60 * 60 * 2);
        return productData;
    }));
    return response
}

export const serviceUpdateProductDiscounts = async (data, vendor) => {
    if (!Array.isArray(data))
        throw new ApiError(400, "Invalid data", "Data must be an array")

    const parsed = z.array(updateProductSchema).safeParse(data)
    if (!parsed.success)
        throw new ApiError(400, "Invalid data", "Data must be an array of valid objects containing sku and stock")

    const productMap = new Map()
    data.forEach(product => productMap.set(product.sku, product.discount))

    const skus = data.map(product => product.sku)

    const products = await Product.findAll({ where: { sku: skus, vendorId: vendor.vendorId } })
    if (products.length !== skus.length)
        throw new ApiError(404, "Products not found")

    await Promise.all(products.map(async (product) => {
        product.discount = productMap.get(product.sku)
        await product.save()
    }))

    const response = await Promise.all(products.map(async (product) => {
        const productData = product.get({ plain: true });
        await redisSetKey(`product:${vendor.pincode}:${productData.name}`, JSON.stringify(productData), 60 * 60 * 2);
        return productData;
    }));
    return response
}