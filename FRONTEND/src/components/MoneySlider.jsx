import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "./ToastContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoneySlider = ({ isDialogOpen, setIsDialogOpen }) => {
  const [clientError, setClientError] = useState(null);
  const [isAdding, setIsAdding] = useState(false)
  const [amount, setAmount] = useState(50); // Default amount
  const [password, setPassword] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleAddMoney = async () => {
    if (!password) {
      showToast("Please enter you password", "warning");
      return;
    }
    setIsAdding(true)
    try {
      const token = localStorage.getItem('accessToken')
      const moneyAddData = {
        amount: amount,
        password: password
      }

      const response = await axios.post("http://localhost:5000/api/v1/transaction/add-money", moneyAddData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      showToast(`Added ₹${amount} to your account!`, "success");
      navigate("/transaction-success", 
        {
          state: {
            message: `Transaction Successful! ₹${amount} added.`
          }
        }
      )
      setIsDialogOpen(false);
    } catch (error) {
      if (error.response) {
        if (error.response.status >= 400 && error.response.status < 500) {
          setClientError(error.response?.data?.message)
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
      setIsAdding(false)
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-lg">Amount: ₹{amount}</p>
          <Slider
            defaultValue={[50]}
            min={10}
            max={5000}
            step={10}
            onValueChange={(value) => setAmount(value[0])}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setClientError(null)
            }}
          />
          {
            clientError && <p className="text-red-600">{clientError}</p>
          }
          <Button onClick={handleAddMoney} className="w-full" disabled={isAdding} >{
            !isAdding ? `Confirm Add ₹${amount} `: `Depositing...`
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoneySlider;



// Let me know if you want any changes or enhancements! ✌️
