import chatModel from '../Models/message.model.js';

class chatController {
  async handlePostChat(req, res) {
    try {
      const {text, users, sender} = req.body;
      
      const newMessage = await chatModel.create({
        text,
        users,
        sender,
      });

      req.app.get("io").emit('chatMessage', newMessage);
      
      res.status(200).json({
        message: "Tin nhắn đã gửi thành công",
        data: newMessage,
      })
    } catch (error) {
      console.error("Lỗi khi lưu tin nhắn:", error);
      res.status(500).json({
        message: "Có lỗi xảy ra khi xử lý tin nhắn",
        error: error.message,
      });
    }
  }
}


export default new chatController();