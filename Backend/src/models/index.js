import { User } from "../modules/user/model/User.model";
import { Seller } from "../modules/seller/model/seller.model";
import { Product } from "../modules/product/model/product.model";
import { ProductImage } from "../modules/product/model/productImage.model";
import { ProductReview } from "../modules/product/model/productReview.model";
import { Customer } from "../modules/customer/model/customer.model";
import { Order } from "../modules/order/model/order.model";
import { OrderProduct } from "../modules/order/model/orderProduct.model";
import { DeliveryPerson } from "../modules/deliveryPerson/model/deliveryPerson.model";
import { ProofOfDelivery } from "../modules/proofOfDelivery/model/proofOfDelivery.model";
import { SellerOrder } from "../modules/sellerOrder/model/sellerOrder.model";
import { CustomerComplaint } from "../modules/customerComplaint/model/customerComplaint.model";
import { Admin } from "../modules/admin/model/admin.model";
import { FieldMan } from "../modules/fieldMan/model/fieldMan.model";
import { FieldManAttendance } from "../modules/fieldManAttendance/model/fieldManAttendance.model";
import { BeatAssignment } from "../modules/beatAssignment/model/beatAssignment.model";
import { FieldManSales } from "../modules/fieldManSales/model/fieldManSales.model";
import { FieldManSaleOrder } from "../modules/fieldManSaleOrder/model/fieldManSaleOrder.model";
import { Beat } from "../modules/beat/model/beat.model";
import { Store } from "../modules/store/model/store.model";
import { Feedback } from "../modules/feedback/model/feedback.model";
import { VisitLog } from "../modules/visitLog/model/visitLog.model";
import { CustomerComplaintImage } from "../modules/customerComplaintImage/model/customerComplaintImage.model";








User.hasOne(Seller, { foreignKey: "userId" });
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


Seller.belongsTo(User, { foreignKey: "userId" });
Seller.hasMany(Product, { foreignKey: "sellerId" });
Seller.hasMany(SellerOrder, { foreignKey: "sellerId" });


SellerOrder.belongsTo(Order, { foreignKey: "orderId" });
SellerOrder.belongsTo(Seller, { foreignKey: "sellerId" });
SellerOrder.belongsTo(DeliveryPerson, { foreignKey: "deliveryPersonId" });
SellerOrder.hasMany(OrderProduct, { foreignKey: "sellerOrderId" });





Product.belongsTo(Seller, { foreignKey: "sellerId" });
Product.hasMany(ProductImage, { foreignKey: "sku" });
Product.hasMany(ProductReview, { foreignKey: "sku" });
Product.hasMany(OrderProduct, { foreignKey: "sku" });



ProductImage.belongsTo(Product, { foreignKey: "sku" });


ProductReview.belongsTo(Product, { foreignKey: "sku" });
ProductReview.belongsTo(User, { foreignKey: "customerId" });



Order.belongsTo(Customer, { foreignKey: "customerId" });
Order.hasOne(ProofOfDelivery, { foreignKey: "orderId" });
Order.hasMany(SellerOrder, { foreignKey: "orderId" });
Order.hasMany(CustomerComplaint, { foreignKey: "orderId" });


OrderProduct.belongsTo(SellerOrder, { foreignKey: "sellerOrderId" });
OrderProduct.belongsTo(Product, { foreignKey: "sku" });



DeliveryPerson.belongsTo(User, { foreignKey: "userId" });
DeliveryPerson.hasMany(ProofOfDelivery, { foreignKey: "deliveryPersonId" });
DeliveryPerson.hasMany(SellerOrder, { foreignKey: "deliveryPersonId" });



ProofOfDelivery.belongsTo(DeliveryPerson, { foreignKey: "deliveryPersonId" });
ProofOfDelivery.belongsTo(Order, { foreignKey: "orderId" });



FieldMan.belongsTo(User, { foreignKey: "userId" });
FieldMan.hasMany(FieldManAttendance, { foreignKey: "fieldManId" });
FieldMan.hasMany(BeatAssignment, { foreignKey: "fieldManId" });
FieldMan.hasMany(FieldManSales, { foreignKey: "fieldManId" });
FieldMan.hasMany(Feedback, { foreignKey: "fieldManId" });
FieldMan.hasMany(VisitLog, { foreignKey: "fieldManId" });


FieldManAttendance.belongsTo(FieldMan, { foreignKey: "fieldManId" });



FieldManSales.belongsTo(FieldMan, { foreignKey: "fieldManId" });
FieldManSales.belongsTo(Store, { foreignKey: "storeId" });
FieldManSales.hasMany(FieldManSaleOrder, { foreignKey: "fieldManSaleId" });



FieldManSaleOrder.belongsTo(FieldManSales, { foreignKey: "fieldManSaleId" });



Beat.hasMany(BeatAssignment, { foreignKey: "beatId" });
Beat.hasMany(Store, { foreignKey: "beatId" });
Beat.hasMany(VisitLog, { foreignKey: "beatId" });


BeatAssignment.belongsTo(Beat, { foreignKey: "beatId" });
BeatAssignment.belongsTo(FieldMan, { foreignKey: "fieldManId" });


Store.belongsTo(Beat, { foreignKey: "beatId" });
Store.hasMany(FieldManSales, { foreignKey: "storeId" });
Store.hasMany(Feedback, { foreignKey: "storeId" });
Store.hasMany(VisitLog, { foreignKey: "storeId" });



Feedback.belongsTo(Store, { foreignKey: "storeId" });
Feedback.belongsTo(FieldMan, { foreignKey: "fieldManId" });


VisitLog.belongsTo(Beat, { foreignKey: "beatId" });
VisitLog.belongsTo(Store, { foreignKey: "storeId" });
VisitLog.belongsTo(FieldMan, { foreignKey: "fieldManId" });



Admin.belongsTo(User, { foreignKey: "userId" });
