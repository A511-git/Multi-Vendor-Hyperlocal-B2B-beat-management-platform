import { sequelize } from "../db/sequalize/sequalize.js";
import {
  Admin,

  Customer,
  CustomerComplaint,
  CustomerComplaintImage,

  DeliveryPerson,
  ProofOfDelivery,

  Beat,
  BeatAssignment,
  Feedback,
  FieldManAttendance,
  FieldMan,
  FieldManSaleOrder,
  FieldManSale,
  Store,
  VisitLog,

  Order,
  OrderProduct,

  Product,
  ProductImage,
  ProductReview,

  Vendor,
  VendorOrder,

  User
} from "../modules/index.model.js"



User.hasOne(Vendor, { foreignKey: "userId" });
User.hasMany(ProductReview, { foreignKey: "customerId" });
User.hasOne(Customer, { foreignKey: "userId" });
User.hasOne(DeliveryPerson, { foreignKey: "userId" });
User.hasOne(Admin, { foreignKey: "userId" });





Customer.belongsTo(User, { foreignKey: "userId" });
Customer.hasMany(Order, { foreignKey: "customerId" });
Customer.hasMany(CustomerComplaint, { foreignKey: "customerId" });
User.hasOne(FieldMan, { foreignKey: "userId" });


CustomerComplaint.belongsTo(Customer, { foreignKey: "customerId" });
CustomerComplaint.belongsTo(Order, { foreignKey: "orderId" });
CustomerComplaint.hasMany(CustomerComplaintImage, {
  foreignKey: "customerComplaintId"
});


CustomerComplaintImage.belongsTo(CustomerComplaint, {
  foreignKey: "customerComplaintId"
});


Vendor.belongsTo(User, { foreignKey: "userId" });
Vendor.hasMany(Product, { foreignKey: "vendorId" });
Vendor.hasMany(VendorOrder, { foreignKey: "vendorId" });


VendorOrder.belongsTo(Order, { foreignKey: "orderId" });
VendorOrder.belongsTo(Vendor, { foreignKey: "vendorId" });
VendorOrder.belongsTo(DeliveryPerson, { foreignKey: "deliveryPersonId" });
VendorOrder.hasMany(OrderProduct, { foreignKey: "vendorOrderId" });





Product.belongsTo(Vendor, { foreignKey: "vendorId" });
Product.hasMany(ProductImage, { foreignKey: "sku" });
Product.hasMany(ProductReview, { foreignKey: "sku" });
Product.hasMany(OrderProduct, { foreignKey: "sku" });



ProductImage.belongsTo(Product, { foreignKey: "sku" });


ProductReview.belongsTo(Product, { foreignKey: "sku" });
ProductReview.belongsTo(Customer, { foreignKey: "customerId" });



Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.hasOne(ProofOfDelivery, { foreignKey: "orderId" });
Order.hasMany(VendorOrder, { foreignKey: "orderId" });
Order.hasMany(CustomerComplaint, { foreignKey: "orderId" });


OrderProduct.belongsTo(VendorOrder, { foreignKey: "vendorOrderId" });
OrderProduct.belongsTo(Product, { foreignKey: "sku" });



DeliveryPerson.belongsTo(User, { foreignKey: "userId" });
DeliveryPerson.hasMany(ProofOfDelivery, { foreignKey: "deliveryPersonId" });
DeliveryPerson.hasMany(VendorOrder, { foreignKey: "deliveryPersonId" });



ProofOfDelivery.belongsTo(DeliveryPerson, { foreignKey: "deliveryPersonId" });
ProofOfDelivery.belongsTo(Order, { foreignKey: "orderId" });



FieldMan.belongsTo(User, { foreignKey: "userId" });
FieldMan.hasMany(FieldManAttendance, { foreignKey: "fieldManId" });
FieldMan.hasMany(BeatAssignment, { foreignKey: "fieldManId" });
FieldMan.hasMany(FieldManSale, { foreignKey: "fieldManId" });
FieldMan.hasMany(Feedback, { foreignKey: "fieldManId" });
FieldMan.hasMany(VisitLog, { foreignKey: "fieldManId" });


FieldManAttendance.belongsTo(FieldMan, { foreignKey: "fieldManId" });



FieldManSale.belongsTo(FieldMan, { foreignKey: "fieldManId" });
FieldManSale.belongsTo(Store, { foreignKey: "storeId" });
FieldManSale.hasMany(FieldManSaleOrder, { foreignKey: "fieldManSaleId" });



FieldManSaleOrder.belongsTo(FieldManSale, { foreignKey: "fieldManSaleId" });



Beat.hasMany(BeatAssignment, { foreignKey: "beatId" });
Beat.hasMany(Store, { foreignKey: "beatId" });
Beat.hasMany(VisitLog, { foreignKey: "beatId" });


BeatAssignment.belongsTo(Beat, { foreignKey: "beatId" });
BeatAssignment.belongsTo(FieldMan, { foreignKey: "fieldManId" });


Store.belongsTo(Beat, { foreignKey: "beatId" });
Store.hasMany(FieldManSale, { foreignKey: "storeId" });
Store.hasMany(Feedback, { foreignKey: "storeId" });
Store.hasMany(VisitLog, { foreignKey: "storeId" });



Feedback.belongsTo(Store, { foreignKey: "storeId" });
Feedback.belongsTo(FieldMan, { foreignKey: "fieldManId" });


VisitLog.belongsTo(Beat, { foreignKey: "beatId" });
VisitLog.belongsTo(Store, { foreignKey: "storeId" });
VisitLog.belongsTo(FieldMan, { foreignKey: "fieldManId" });



Admin.belongsTo(User, { foreignKey: "userId" });
