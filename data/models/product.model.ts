import {
  IProduct,
  IProductModel,
  createProductParams,
  productId,
  ProductSearchParams,
  unpackProductParams
} from "../../interfaces/products";
import {
  ProductSchema
} from "../schemas/product.schema";
import {
  Quantities
} from './quantity.model';
import { model } from 'mongoose';
import { merchantId } from "../../interfaces/merchant";
import { branchId } from "../../interfaces/branch";


ProductSchema.statics.createNewProduct = async function (params: createProductParams) {
  const branches = params.branch;
  const product = await this.create(params);
  branches.forEach(async branch => {
    await Quantities.createQuantity({
      product: product._id,
      branch: branch,
      price: product.price,
      quantity: 1
    })
  });
  return product;
}

ProductSchema.statics.editProduct = async function (id: productId, params: createProductParams) {
  const product = await this.findById(id);
  if (!product) {
    return { status: false, data: product._id };
  }
  await product.updateOne(params);
  return { status: true, data: product._id };
}

ProductSchema.statics.getProduct = async function (id: productId) {
  const product = await this.findById(id);
  if (!product) {
    return false
  }
  return product;
}

ProductSchema.statics.getProducts = async function () {
  return await this.find({})
}

ProductSchema.statics.getMerchantProducts = async function (id: merchantId) {
  const products = await this.find({
    merchant: id
  })
  return products;
}

ProductSchema.statics.getProductsByBranches = async function (id: branchId) {
  const products = await this.find({
    brannch: id
  });
  // console.log(products)
  return products;
}

ProductSchema.statics.search = async function (params: ProductSearchParams) {
  let products = await this.find({
    merchant: params.merchant,
    name: {
      $regex: params.term,
      $options: 'i'
    }
  })
  console.log(products)

  return products
}

ProductSchema.statics.getBatchBranchProducts = async function (merchantId: merchantId, branchId: branchId) {
  console.log(merchantId)
  let products = await this.aggregate([{
    $lookup: {
      from: "quantities",
      localField: "_id",
      foreignField: "product",
      as: "qu"
    }
  },
  {
    $unwind: "$qu"
  },
  {
    $match: {
      'qu.branch': branchId,
      'qu.merchant': merchantId
    }
  },
  {
    $project: {
      name: 1,
      costPrice: 1,
      id: '$_id',
      quantity: "$qu.quantity",
      minimumStock: 1,
      price: 1,
      merchant: 1,
      packProduct: 1,
      unpackable: 1,
      stockable: 1,
      packQuantity: 1,
      barcode: 1
    }
  }
  ]);
  // console.log(products)
  if(products.length < 1){
    products = await this.find({ merchant: merchantId, branch: branchId})
  }

  return products
}

ProductSchema.statics.deleteProduct = async function (id: productId) {
  const product = await this.findByIdAndDelete(id)
  if (product) {
    return { status: true, data: '' }
  }
  return { status: false, data: product._id }
}

ProductSchema.statics.getProductDetailsByBranches = async function (merchant: merchantId, branch: branchId) {
  let productLength = await this.find({
    merchant: merchant,
    branch: branch
  }).countDocuments();
  console.log(productLength);
  let total: number = 0;
  let documents = await Quantities.find({ branch });
  for (let i = 0; i < productLength; i++) {
    total += documents[i].price //* documents[i].quantity
  }

  console.log(total, productLength);
  return {
    count: productLength,
    networth: total
  }
}


ProductSchema.statics.unpackProducts = async function (params: unpackProductParams) {
  let parentProduct = await this.findById(params.productId);
  let product = await this.findById(parentProduct.packProduct);

  let parentQuantities = await Quantities.find({
    product: parentProduct._id,
    branch: params.branchId,
  });

  let quantities = await Quantities.find({
    product: product._id,
    branch: params.branchId,
  });

  let quantity = quantities[0];
  let parentQuantity = parentQuantities[0];

  if (parentQuantity.quantity < params.quantity)
    throw new Error("Insufficient!! Please restock");

  quantity.quantity += params.quantity * parentProduct.packQuantity;
  parentQuantity.quantity -= params.quantity;

  console.log(quantity);

  await quantity.save();
  await parentQuantity.save();
  return product
}
export const Products = model<IProduct, IProductModel>('product', ProductSchema);