const registerUser = async (req, res) => {
  const { phone, email } = req.body;

  try {
    const checkphone = await User.findOne({ phone });
    if (checkphone) {
      return res.status(404).json({ message: "Kindly Login Account exit" });
    }
    // code to  sedn  otp   to phone number
    return res.status(200).json({ message: "Otp has been send to ur Phone" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: null,
      success: false,
    });
  }
};

module.exports = { registerUser };
