import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productsModel';

connectDB();

const product = async (req, res) => {
  switch (req.method) {
    case 'GET':
      if (Object.keys(req.query).length) {
        await getProducts(req, res);
      } else {
        await getAllProducts(req, res);
      }
      break;
  }
};

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObject = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((el) => delete queryObject[el]);

    if (queryObject.category !== 'all') {
      this.query.find({ category: queryObject.category });
    }
    if (queryObject.title !== 'all') {
      this.query.find({ title: { $regex: queryObject.title } });
    }

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  paginating() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 8;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const getProducts = async (req, res) => {
  try {
    const features = new APIfeatures(Products.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const products = await features.query;

    res.json({
      status: 'success',
      result: products.length,
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json({
      status: 'success',
      products,
      result: products.length,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
export default product;
