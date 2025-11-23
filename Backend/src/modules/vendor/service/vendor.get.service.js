
export const getVendor = async (id) => {
    
    const vendor = await Vendor.findOne({ where: { id } })
}