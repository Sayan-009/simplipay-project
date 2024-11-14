import asyncHandler from "../../utils/asyncHandler.js";
import apiResponse from "../../utils/apiResponse.js";
import apiError from "../../utils/apiError.js";
import generateTransactionId from "../../utils/transactionId.js";
import { User } from "../../models/User.model.js";
import { Notification } from "../../models/Notificaton.model.js";
import { Transaction } from "../../models/Transaction.model.js";

const sendMoney = asyncHandler(async (req, res) => {
  const user = req.user;
  const sender = await User.findById(user._id);
  const senderUPI = sender.upiId;
  const { receiverUPI, sendingAmount, password } = req.body;
  if (
    [receiverUPI, sendingAmount, password].some((field) => {
      return field === "" || field === undefined;
    })
  ) {
    throw new apiError(400, "all fields are required");
  }
  const receiver = await User.findOne({
    upiId: receiverUPI,
  });
  if (!receiver) {
    throw new apiError(400, "receiver is not found");
  }
  const passwordMatch = await sender.isPasswordCorrect(password);
  if (!passwordMatch) {
    throw new apiError(400, "password is incorrect");
  }
  const existingBalance = sender?.balance;
  if (existingBalance < sendingAmount) {
    await Notification.create({
      userID: sender._id,
      message: `Transaction failed: Unable to send ₹${amount} due to insufficient funds`,
    });
    throw new apiError(400, "insufficient balance");
  }
  const isSentMoney = await User.findByIdAndUpdate(
    sender._id,
    { $inc: { balance: -sendingAmount } },
    { new: true }
  );

  const transactionId = generateTransactionId();

  if (!isSentMoney) {
    await Notification.create({
      userID: sender._id,
      message: `Transaction failed: An error occurred'`,
    });
    await Transaction.create({
      senderUPI: senderUPI,
      receiverUPI: receiverUPI,
      amount: sendingAmount,
      transactionID: transactionId,
      status: "failed",
    });
    throw new apiError(500, "money is not sent due to some reason");
  }

  const isReceiveMoney = await User.findByIdAndUpdate(
    receiver._id,
    { $inc: { balance: sendingAmount } },
    { new: true }
  );

  if (!isReceiveMoney) {
    await User.findByIdAndUpdate(
      sender._id,
      { $inc: { balance: sendingAmount } },
      { new: true }
    );
    await Transaction.create({
      senderUPI: senderUPI,
      receiverUPI: receiverUPI,
      amount: sendingAmount,
      transactionID: transactionId,
      status: "failed",
    });
    await Notification.create({
      userID: sender._id,
      message: `Transaction failed: The receiver’s account cannot accept payments at this time'`,
    });
    throw new apiError(
      500,
      "The receiver’s account cannot accept payments at this time"
    );
  }

  if (isSentMoney && isReceiveMoney) {
    const transactionDetails = await Transaction.create({
      senderUPI: senderUPI,
      receiverUPI: receiverUPI,
      amount: sendingAmount,
      transactionID: transactionId,
      status: "success",
    });

    await Notification.create({
      userID: sender._id,
      message: `You sent ₹${sendingAmount} to user ${receiverUPI}`,
    });

    await Notification.create({
      userID: receiver._id,
      message: `You received ₹${sendingAmount} from ${senderUPI}`,
    });

    return res
      .status(200)
      .json(
        new apiResponse(200, transactionDetails, "Trasaction is successfull")
      );
  }
});

export default sendMoney;
