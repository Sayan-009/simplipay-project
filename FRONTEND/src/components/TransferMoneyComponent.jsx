import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from './ToastContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

function TransferMoneyComponent({ isMoneyTransferDialogOpen, setIsMoneyTransferDialogOpen }) {
    const [upiId, setUpiId] = useState("");
    const [amount, setAmount] = useState(50);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [clientError, setClientError] = useState(null);
    const [isFinalAlert, setIsFinalAlert] = useState(false);
    const [isTransfering, setIsTransfering] = useState(false);
    const { showToast } = useToast();
    const navigate = useNavigate()

    function handleContinue() {
        const pattern = /^\d{10}@spay$/;
        const upiError = !pattern.test(upiId) ? "Enter the UPI ID in the format: xxxxxxxxxx@spay" : "";
        const passwordMissing = !password;

        setClientError(upiError);
        setPasswordError(passwordMissing);
        if (!upiError && !passwordMissing) {
            setIsFinalAlert(true);
        }
    }

    async function handleTransferMoney() {
        setIsTransfering(true)
        try {
            const token = localStorage.getItem('accessToken')
            const moneyTransferData = {
                receiverUPI: upiId,
                sendingAmount: amount,
                password: password
            }

            await axios.post("http://localhost:5000/api/v1/transaction/send-money", moneyTransferData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            showToast(`transfered ₹${amount} from your account!`, "success");
            navigate("/transaction-success",
                {
                    state: {
                        message: `Transaction Successful! 
                        ₹${amount} transfered to ${upiId}.`
                    }
                }
            )
            setIsMoneyTransferDialogOpen(false);
            setUpiId("");
            setAmount(50);
            setPassword("");
            setClientError(null);
            setPasswordError(false);
        } catch (error) {
            if (error.response) {
                if (error.response.status >= 400 && error.response.status < 500) {
                    showToast(error.response?.data?.message, "error")
                }
                if (error.response.status >= 500) {
                    navigate("/500")
                }
                console.error("Error:", error.response?.data || error.message);
            } else if (error.request) {
                showToast(error.request)

            } else {
                showToast(error.message, "error")
            }
        } finally {
            setIsFinalAlert(false);
            setIsTransfering(false)
        }
    }

    function dialogCLose() {
        setIsMoneyTransferDialogOpen(false);
        setUpiId("");
        setAmount(50);
        setPassword("");
        setClientError(null);
        setPasswordError(false);
        setIsFinalAlert(false);
        setIsTransfering(false)
    }

    return (
        <div className='max-w-md'>
            {
                isTransfering && <Loader message={"transfering..."} />
            }
            <Dialog open={isMoneyTransferDialogOpen} onOpenChange={dialogCLose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Transfer Money</DialogTitle>
                    </DialogHeader>
                    <p className="text-lg">Amount: ₹{amount}</p>
                    <Slider
                        defaultValue={[50]}
                        min={10}
                        max={5000}
                        step={10}
                        onValueChange={(value) => setAmount(value[0])}
                        disabled={isTransfering}
                    />
                    <Input
                        type="text"
                        placeholder="Enter recipient's UPI ID"
                        value={upiId}
                        disabled={isTransfering}
                        onChange={(e) => {
                            setUpiId(e.target.value);
                            setClientError(null);
                        }}
                    />
                    {clientError && <p className="text-red-600">{clientError}</p>}
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        disabled={isTransfering}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                            setClientError(null);
                        }}
                        
                    />
                    {passwordError && <p className="text-red-600">Please enter your password</p>}

                    <Button onClick={handleContinue} className="w-full" disabled={isTransfering}>
                        {
                            !isTransfering ? "Continue" : "transfering..."
                        }
                        
                    </Button>
                </DialogContent>
            </Dialog>

            <AlertDialog open={isFinalAlert} onOpenChange={setIsFinalAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You are about to send ₹{amount} to {upiId}. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsFinalAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleTransferMoney}>Confirm Transfer</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default TransferMoneyComponent;
