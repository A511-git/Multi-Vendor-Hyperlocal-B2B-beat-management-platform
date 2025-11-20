# Hyperlocal Platform — Data Model & Associations

This document is a clear, machine- and human-friendly reference of your backend data model, formatted as Markdown so tools and AIs can easily parse it.

> **Note:** paste your hosted schema diagram link below where indicated. If you want the repository to display your local SVG directly, replace the placeholder link with your `.svg` URL after you push to GitHub. An inline preview is included pointing to the local file path you provided.

---

# 1. Overview

This file lists all models, their primary/foreign keys, enums, and associations. Use it as the single source of truth when implementing Sequelize models, migrations, controllers, or tests.

---

# 2. Models

Each model shows field name (type/role) and short notes.

## User (Auth)
```
User
- userId (PK, binary UUID)
- firstName
- lastName
- password
- role (Enum: customer, seller, deliveryMan, fieldMan, admin)
- refreshToken
```

## Admin
```
Admin
- adminId (PK, binary UUID)
- userId (FK -> User.userId)
```

## Seller
```
Seller
- sellerId (PK, binary UUID)
- userId (FK -> User.userId)
- shopName
- address
- city
- pincode
- rating
```

## DeliveryPerson
```
DeliveryPerson
- deliveryPersonId (PK, binary UUID)
- userId (FK -> User.userId)
- phone
- address
- city
- pincode
- status (Enum: active, inactive, blocked)
```

## ProofOfDelivery
```
ProofOfDelivery
- proofOfDeliveryId (PK, binary UUID)
- orderId (FK -> Order.orderId)
- deliveryPersonId (FK -> DeliveryPerson.deliveryPersonId)
- signature (Enum: signed, unsigned)
- link
```

## Product
```
Product
- sku (PK, string)
- sellerId (FK -> Seller.sellerId)
- name
- description
- price
- discount
- stock
- rating
- status (Enum: active, inactive)
```

## ProductImage
```
ProductImage
- productImageId (PK, binary UUID)
- sku (FK -> Product.sku)
- link
```

## ProductReview
```
ProductReview
- productReviewId (PK, binary UUID)
- sku (FK -> Product.sku)
- customerId (FK -> Customer.customerId)
- rating
- comment
```

## Order
```
Order
- orderId (PK, binary UUID)
- customerId (FK -> Customer.customerId)
- address
- phone
- amount
- totalDiscount
- finalPrice
- paymentMethod (Enum: online, offline)
- paymentStatus (Enum: paid, unpaid)
- status (Enum: placed, accepted, dispatched, out for delivery, delivered, returned, cancelled)
```

## SellerOrder
```
SellerOrder
- sellerOrderId (PK, binary UUID)
- orderId (FK -> Order.orderId)
- sellerId (FK -> Seller.sellerId)
- deliveryPersonId (FK -> DeliveryPerson.deliveryPersonId)
- amount
- totalDiscount
- finalPrice
- acceptanceStatus (Enum: fully accepted, partially accepted, rejected)
- sellerStatus (Enum: pending, accepted, rejected, packed, ready for dispatch, cancelled)
- deliveryStatus (Enum: pending, pickup, picked up, out for delivery, delivered, failed, returned)
```

## OrderProduct
```
OrderProduct
- orderProductId (PK, binary UUID)
- sellerOrderId (FK -> SellerOrder.sellerOrderId)
- sku (FK -> Product.sku)
- quantity
- amount
- totalDiscount
- finalPrice
- acceptanceStatus (Enum: fully accepted, partially accepted, rejected)
```

## Customer
```
Customer
- customerId (PK, binary UUID)
- userId (FK -> User.userId)
- phone
- address
- city
- pincode
```

## CustomerComplaint
```
CustomerComplaint
- customerComplaintId (PK, binary UUID)
- customerId (FK -> Customer.customerId)
- orderId (FK -> Order.orderId)
- subject
- complaint (text)
```

## CustomerComplaintImage
```
CustomerComplaintImage
- customerComplaintImageId (PK, binary UUID)
- customerComplaintId (FK -> CustomerComplaint.customerComplaintId)
- link
```

## FieldMan
```
FieldMan
- fieldManId (PK, binary UUID)
- userId (FK -> User.userId)
- phone
- address
```

## FieldManAttendance
```
FieldManAttendance
- fieldManAttendanceId (PK, binary UUID)
- fieldManId (FK -> FieldMan.fieldManId)
- date
- attendanceStatus (Enum: present, absent)
```

## Beat
```
Beat
- beatId (PK, binary UUID)
- city
- pincode
```

## Store
```
Store
- storeId (PK, binary UUID)
- beatId (FK -> Beat.beatId)
- storeName
- city
- pincode
```

## BeatAssignment
```
BeatAssignment
- beatAssignmentId (PK, binary UUID)
- beatId (FK -> Beat.beatId)
- fieldManId (FK -> FieldMan.fieldManId)
- status (Enum: assigned, unassigned)
```

## VisitLog
```
VisitLog
- visitLogId (PK, binary UUID)
- beatId (FK -> Beat.beatId)
- storeId (FK -> Store.storeId)
- fieldManId (FK -> FieldMan.fieldManId)
- visited (Enum: visited, unvisited)
- remark
- date
```

## Feedback
```
Feedback
- feedbackId (PK, binary UUID)
- storeId (FK -> Store.storeId)
- fieldManId (FK -> FieldMan.fieldManId)
- feedback (text)
```

## FieldManSales
```
FieldManSales
- fieldManSaleId (PK, binary UUID)
- fieldManId (FK -> FieldMan.fieldManId)
- storeId (FK -> Store.storeId)
- date
- status (Enum: pending, closed, cancelled)
```

## FieldManSaleOrder
```
FieldManSaleOrder
- fieldManSaleOrderId (PK, binary UUID)
- fieldManSaleId (FK -> FieldManSales.fieldManSaleId)
- productName
- quantity
```

---

# 3. Associations Summary

- **User**
  - `User.hasOne(Admin, { foreignKey: 'userId' })`
  - `User.hasOne(Seller, { foreignKey: 'userId' })`
  - `User.hasOne(Customer, { foreignKey: 'userId' })`
  - `User.hasOne(DeliveryPerson, { foreignKey: 'userId' })`
  - `User.hasOne(FieldMan, { foreignKey: 'userId' })`
  - `User.hasMany(ProductReview, { foreignKey: 'customerId' })`

- **Customer**
  - `Customer.hasMany(Order, { foreignKey: 'customerId' })`
  - `Customer.hasMany(CustomerComplaint, { foreignKey: 'customerId' })`

- **Seller**
  - `Seller.hasMany(Product, { foreignKey: 'sellerId' })`
  - `Seller.hasMany(SellerOrder, { foreignKey: 'sellerId' })`

- **Product**
  - `Product.hasMany(ProductImage, { foreignKey: 'sku' })`
  - `Product.hasMany(ProductReview, { foreignKey: 'sku' })`
  - `Product.hasMany(OrderProduct, { foreignKey: 'sku' })`

- **Order**
  - `Order.hasMany(SellerOrder, { foreignKey: 'orderId' })`
  - `Order.hasMany(CustomerComplaint, { foreignKey: 'orderId' })`
  - `Order.hasOne(ProofOfDelivery, { foreignKey: 'orderId' })`

- **SellerOrder**
  - `SellerOrder.hasMany(OrderProduct, { foreignKey: 'sellerOrderId' })`

- **FieldMan**
  - `FieldMan.hasMany(FieldManAttendance, { foreignKey: 'fieldManId' })`
  - `FieldMan.hasMany(BeatAssignment, { foreignKey: 'fieldManId' })`
  - `FieldMan.hasMany(FieldManSales, { foreignKey: 'fieldManId' })`
  - `FieldMan.hasMany(Feedback, { foreignKey: 'fieldManId' })`
  - `FieldMan.hasMany(VisitLog, { foreignKey: 'fieldManId' })`

- **Beat**
  - `Beat.hasMany(BeatAssignment, { foreignKey: 'beatId' })`
  - `Beat.hasMany(Store, { foreignKey: 'beatId' })`
  - `Beat.hasMany(VisitLog, { foreignKey: 'beatId' })`

- **Store**
  - `Store.hasMany(FieldManSales, { foreignKey: 'storeId' })`
  - `Store.hasMany(Feedback, { foreignKey: 'storeId' })`
  - `Store.hasMany(VisitLog, { foreignKey: 'storeId' })`

- **Other**
  - `CustomerComplaint.hasMany(CustomerComplaintImage, { foreignKey: 'customerComplaintId' })`
  - `ProofOfDelivery.belongsTo(DeliveryPerson, { foreignKey: 'deliveryPersonId' })`

---

# 4. How to embed / attach your schema diagram

- **If your diagram is hosted (GitHub, CDN):** paste the URL below and it will display inline.  
  Example: `https://raw.githubusercontent.com/you/repo/main/diagram.svg`

- **To use the local preview I have here (auto-converted by the environment):**

![Schema Diagram](/mnt/data/7a5bd55b-a92b-4b1d-b8ff-f58ebba0d26e.png)

> Replace the image path above with your GitHub raw `.svg` URL to show the SVG inline in Markdown viewers (GitHub will render it).


---

# 5. Copy-ready Sequelize association snippet

```js
// place after all models are imported and initialized
User.hasOne(Admin, { foreignKey: 'userId' });
User.hasOne(Seller, { foreignKey: 'userId' });
User.hasOne(Customer, { foreignKey: 'userId' });
User.hasOne(DeliveryPerson, { foreignKey: 'userId' });
User.hasOne(FieldMan, { foreignKey: 'userId' });
User.hasMany(ProductReview, { foreignKey: 'customerId' });

Customer.hasMany(Order, { foreignKey: 'customerId' });
Customer.hasMany(CustomerComplaint, { foreignKey: 'customerId' });

Seller.hasMany(Product, { foreignKey: 'sellerId' });
Seller.hasMany(SellerOrder, { foreignKey: 'sellerId' });

Product.hasMany(ProductImage, { foreignKey: 'sku' });
Product.hasMany(ProductReview, { foreignKey: 'sku' });
Product.hasMany(OrderProduct, { foreignKey: 'sku' });

Order.hasMany(SellerOrder, { foreignKey: 'orderId' });
Order.hasMany(CustomerComplaint, { foreignKey: 'orderId' });
Order.hasOne(ProofOfDelivery, { foreignKey: 'orderId' });

SellerOrder.hasMany(OrderProduct, { foreignKey: 'sellerOrderId' });

FieldMan.hasMany(FieldManAttendance, { foreignKey: 'fieldManId' });
FieldMan.hasMany(BeatAssignment, { foreignKey: 'fieldManId' });
FieldMan.hasMany(FieldManSales, { foreignKey: 'fieldManId' });
FieldMan.hasMany(Feedback, { foreignKey: 'fieldManId' });
FieldMan.hasMany(VisitLog, { foreignKey: 'fieldManId' });

Beat.hasMany(BeatAssignment, { foreignKey: 'beatId' });
Beat.hasMany(Store, { foreignKey: 'beatId' });
Beat.hasMany(VisitLog, { foreignKey: 'beatId' });

Store.hasMany(FieldManSales, { foreignKey: 'storeId' });
Store.hasMany(Feedback, { foreignKey: 'storeId' });
Store.hasMany(VisitLog, { foreignKey: 'storeId' });

CustomerComplaint.hasMany(CustomerComplaintImage, { foreignKey: 'customerComplaintId' });
ProofOfDelivery.belongsTo(DeliveryPerson, { foreignKey: 'deliveryPersonId' });
```

---

# 6. Next steps / suggestions

- Add migrations to create binary UUID columns as `BINARY(16)` (or `VARBINARY(16)` depending on dialect).  
- Centralize UUID conversion helpers (`toBinaryUUID` / `fromBinaryUUID`) and possibly a `BaseUUIDModel` so models stay DRY.  
- Keep associations in one `models/index.js` (you already do this) to avoid circular imports.  
- For performance, add indexes on frequently queried fields: `Order.orderId`, `Order.customerId`, `Seller.sellerId`, `Product.sku`, `VisitLog.date`, etc.  


