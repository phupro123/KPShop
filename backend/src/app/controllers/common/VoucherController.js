const StoreVoucher = require("../../models/StoreVoucher");
const Voucher = require("../../models/Voucher");

class VoucherController {
  // [GET] /voucher/all
  async getAllVoucher(req, res, next) {
    const pageIndex = parseInt(req.query.pageIndex);
    const pageSize = parseInt(req.query.pageSize);
    const skipIndex = (pageIndex - 1) * pageSize;

    const fromDate = req.query.fromDate;
    const toDate = req.query.toDate;
    const sort = req.query.sort && JSON.parse(req.query.sort);
    const name = req.query.name || "";

    const queryObj = {
      ...req.query,
      ...(fromDate &&
        toDate && {
          expiredDate: {
            $gte: new Date(fromDate),
            $lt: new Date(toDate),
          },
        }),
      ...(name && {
        name: { $regex: name, $options: "i" },
      }),
    };
    const excludedFields = ["pageIndex", "pageSize"];
    excludedFields.forEach((el) => delete queryObj[el]);
    try {
      const data = await Voucher.find(queryObj)
        .sort(sort)
        .limit(pageSize)
        .skip(skipIndex)
        .exec();
      const count = await Voucher.countDocuments(queryObj);
      res.status(200).json({
        data,
        total: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [delete] /voucher/delete/:id
  async deleteVoucher(req, res) {
    try {
      await Voucher.findByIdAndDelete(req.params.id);
      res.status(200).json("Voucher deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  // [GET] /voucher/get/:id
  async getVoucher(req, res, next) {
    await Voucher.find({ voucherId: req.params.id })
      .then((voucher) => {
        console.log(voucher);
        res.status(200).json(voucher);
      })
      .catch(next);
  }
  //[PUT]  /voucher/edit/:id
  async update(req, res, next) {
    await Voucher.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        Voucher.findById(req.params.id).then((voucher) => {
          res.status(200).json(voucher);
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //  [POSt] /voucher/new
  async newVoucher(req, res, next) {
    try {
      const count = await Voucher.find().count();
      const formData = req.body;

      Voucher.init();
      const temp = { ...formData, voucherId: count + 1 };
      const voucher = new Voucher(temp);

      voucher
        .save()
        .then((voucher) => res.status(200).json(voucher))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async checkVoucher(req, res, next) {
    try {
      const { name } = req.body;

      let voucher = await Voucher.findOne({ name: name });
      if (voucher) {
        if (voucher.quantity < 1) {
          res.status(404).json({ error: "Mã hết lượt sử dụng" });
        }
        else if( req.body.price< voucher.condition){
          res.status(405).json({error:`Mã cần phải từ ${voucher.condition} trở lên`})
        } 
        let today = new Date();
        let expiredDate = new Date(voucher.expiredDate);
        await StoreVoucher.find({voucherId:voucher._id,uid:req.body.uid}).then((e)=>{
            if(e.length > voucher.redeemUse){
              res.status(404).json({ error: "Bạn đã sử dùng mã này rồi !!!" });
            }
        })
        if (expiredDate < today) {
          res.status(404).json({ error: "Mã hết hạn sử dụng" });
        } else {
           const useVoucher = new StoreVoucher({voucherId:voucher._id,uid:req.body.uid})
           useVoucher.save()
          res.status(200).json(voucher);
        }
      } else {
        res.status(404).json({ error: "Mã không đúng vui lòng kiểm tra lại" });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new VoucherController();
