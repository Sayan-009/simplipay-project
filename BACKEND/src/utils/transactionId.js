function generateTransactionId() {
    let transactionId = '';
    for (let i = 0; i < 15; i++) {
      transactionId += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
    }
    return transactionId;
  }
  
  const transactionId = generateTransactionId();


  export default generateTransactionId;
  