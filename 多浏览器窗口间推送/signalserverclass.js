class SignalServer {
  constructor(channel) {
    this.socket = new WebSocket("ws://localhost:80"); // 创建WebSocket连接

    // 当连接打开时，发送加入信令通道的消息
    this.socket.addEventListener("open", () => {
      this.postMessage({ type: "join-channel", channel });
    });

    // 当接收到消息时，处理消息
    this.socket.addEventListener("message", (e) => {
      const object = JSON.parse(e.data); // 解析接收到的数据
      if (object.type === "connection-established") console.log("连接已建立");
      else if (object.type === "joined-channel") console.log("已加入的频道: " + object.channel);
      else this.onmessage({ data: object }); // 转发其他类型的消息给onmessage方法
    });
  }

  // 默认的消息处理函数，可以被子类覆盖
  onmessage(e) { }

  // 发送消息到WebSocket服务器
  postMessage(data) {
    this.socket.send(JSON.stringify(data)); // 将数据转换为JSON字符串并发送
  }
}