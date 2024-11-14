import asyncHandler from "../../utils/asyncHandler.js";
import apiError from "../../utils/apiError.js";
import apiResponse from "../../utils/apiResponse.js";
import { User } from "../../models/User.model.js";
import { Transaction } from "../../models/Transaction.model.js";

const transactionHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const transactionHistoryDetails = await Transaction.find({senderUPI: user.upiId}).sort({ transactionDate: -1 });

  if (!transactionHistoryDetails) {
    throw new apiError(500, "Error fetching transaction history");
  }

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        transactionHistoryDetails,
        "Transaction History fetch successfully"
      )
    );
});

export default transactionHistory;
