import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const MoneySlider = ({ isDialogOpen, setIsDialogOpen }) => {
  const [amount, setAmount] = useState(50); // Default amount
  const [password, setPassword] = useState("");

  const handleAddMoney = () => {
    if (!password) {
      alert("Please enter your password");
      return;
    }
    alert(`Added ₹${amount} to your account!`);
    setIsDialogOpen(false);
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleAddMoney} className="w-full">
            Confirm Add ₹{amount}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoneySlider;



// Let me know if you want any changes or enhancements! ✌️
